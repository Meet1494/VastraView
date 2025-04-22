from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import base64
import io
from PIL import Image
import os
import logging
import threading
import time
import uuid

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='threading', logger=True, engineio_logger=True)

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(
    static_image_mode=False,
    model_complexity=1,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# Load clothing images
def load_image(filename):
    try:
        image_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
        image_path = os.path.join(image_dir, filename)
        
        if not os.path.exists(image_path):
            logger.error(f"Image file not found: {image_path}")
            return None
            
        return Image.open(image_path).convert("RGBA")
    except Exception as e:
        logger.error(f"Error loading image {filename}: {e}")
        return None

# Global variables
active_clothing = {'shirt': False, 'jacket': False, 'tie': False, 'hat': False}
clothing_images = {}
camera_thread = None
camera_active = False
camera_lock = threading.Lock()

def initialize_clothing_images():
    global clothing_images
    clothing_images = {
        'shirt': load_image('shirt.png'),
        'jacket': load_image('jacket.png'),
        'tie': load_image('tie.png'),
        'hat': load_image('hat.png')
    }
    
    for item, img in clothing_images.items():
        if img is not None:
            logger.info(f"Successfully loaded {item} image")
        else:
            logger.warning(f"Failed to load {item} image")

# Enhanced overlay functions (unchanged)
def overlay_cloth(frame, landmarks, cloth_img, scale_factor=0.7):
    try:
        shoulder_left = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        shoulder_right = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        hip_left = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
        hip_right = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]

        x1, y1 = int(shoulder_left.x * frame.shape[1]), int(shoulder_left.y * frame.shape[0])
        x2, y2 = int(shoulder_right.x * frame.shape[1]), int(shoulder_right.y * frame.shape[0])
        x3, y3 = int(hip_left.x * frame.shape[1]), int(hip_left.y * frame.shape[0])
        x4, y4 = int(hip_right.x * frame.shape[1]), int(hip_right.y * frame.shape[0])

        width = int(np.sqrt((x2 - x1) ** 2)) * 2 * 1.2
        height = int(np.sqrt((y4 - y1) ** 2)) * 2
        width = int(width * scale_factor)
        height = int(height * scale_factor)

        if cloth_img == clothing_images['jacket']:
            width = int(width * 1.06)
            scale_factor = 0.7

        cloth_img_resized = cloth_img.resize((width, height), Image.LANCZOS)
        cloth_img_resized = np.array(cloth_img_resized)

        if cloth_img_resized.shape[-1] != 4:
            return frame

        mask = cloth_img_resized[:, :, 3] / 255.0
        cloth_img_resized = cloth_img_resized[:, :, :3]

        torso_center_x = (x1 + x2) // 2
        torso_center_y = (y1 + y3) // 2

        y_offset = torso_center_y - height // 2
        x_offset = torso_center_x - width // 2

        y_end = min(y_offset + height, frame.shape[0])
        x_end = min(x_offset + width, frame.shape[1])
        y_offset = max(y_offset, 0)
        x_offset = max(x_offset, 0)

        mask = mask[:y_end - y_offset, :x_end - x_offset]
        cloth_img_resized = cloth_img_resized[:y_end - y_offset, :x_end - x_offset]

        for c in range(3):
            frame[y_offset:y_end, x_offset:x_end, c] = (
                frame[y_offset:y_end, x_offset:x_end, c] * (1 - mask) +
                cloth_img_resized[:, :, c] * mask
            )

        return frame
    except Exception as e:
        logger.error(f"Exception in overlay_cloth: {e}")
        return frame

def overlay_tie(frame, landmarks, tie_img):
    try:
        frame_height, frame_width, _ = frame.shape

        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        nose = landmarks[mp_pose.PoseLandmark.NOSE]

        if left_shoulder.visibility > 0.5 and right_shoulder.visibility > 0.5:
            collar_x = int((left_shoulder.x + right_shoulder.x) / 2 * frame_width)
            collar_y = int((left_shoulder.y + right_shoulder.y) / 2 * frame_height)
            shoulder_width = abs(right_shoulder.x - left_shoulder.x) * frame_width
        elif left_shoulder.visibility > 0.5:
            collar_x = int(left_shoulder.x * frame_width)
            collar_y = int(left_shoulder.y * frame_height)
            shoulder_width = frame_width * 0.15
        elif right_shoulder.visibility > 0.5:
            collar_x = int(right_shoulder.x * frame_width)
            collar_y = int(right_shoulder.y * frame_height)
            shoulder_width = frame_width * 0.15
        elif nose.visibility > 0.5:
            collar_x = int(nose.x * frame_width)
            collar_y = int(nose.y * frame_height) + int(frame_height * 0.05)
            shoulder_width = frame_width * 0.12
        else:
            return frame

        tie_width = int(shoulder_width * 0.5)
        tie_height = int(shoulder_width * 2.0)

        tie_img_resized = tie_img.resize((tie_width, tie_height), Image.LANCZOS)
        tie_img_resized = np.array(tie_img_resized)

        y_offset = collar_y - int(tie_height * 0.1)
        x_offset = collar_x - tie_width // 2

        y_end = min(y_offset + tie_height, frame_height)
        x_end = min(x_offset + tie_width, frame_width)
        y_offset = max(y_offset, 0)
        x_offset = max(x_offset, 0)

        torso_bottom = max(left_shoulder.y, right_shoulder.y) * frame_height
        if torso_bottom < frame_height:
            y_end = min(y_offset + tie_height, frame_height)

        mask = tie_img_resized[:, :, 3] / 255.0
        tie_img_resized = tie_img_resized[:, :, :3]

        tie_visible_part = tie_img_resized[:y_end - y_offset, :, :]
        mask_visible_part = mask[:y_end - y_offset, :]

        for c in range(3):
            frame[y_offset:y_end, x_offset:x_end, c] = (
                frame[y_offset:y_end, x_offset:x_end, c] * (1 - mask_visible_part) +
                tie_visible_part[:, :, c] * mask_visible_part
            )

        return frame
    except Exception as e:
        logger.error(f"Error in overlay_tie: {e}")
        return frame

def overlay_hat(frame, landmarks, hat_img):
    try:
        frame_height, frame_width, _ = frame.shape

        left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
        right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
        nose = landmarks[mp_pose.PoseLandmark.NOSE]

        if left_shoulder.visibility > 0.5 and right_shoulder.visibility > 0.5:
            forehead_x = int(nose.x * frame_width)
            forehead_y = int(nose.y * frame_height) - int(frame_height * 0.2)
            shoulder_width = abs(right_shoulder.x - left_shoulder.x) * frame_width
        elif nose.visibility > 0.5:
            forehead_x = int(nose.x * frame_width)
            forehead_y = int(nose.y * frame_height) - int(frame_height * 0.1)
            shoulder_width = frame_width * 0.2
        else:
            return frame

        reference_width = frame_width * 0.25
        distance_factor = max(0.5, min(2.0, shoulder_width / reference_width))

        hat_width = int(frame_width * 0.26 * distance_factor)
        hat_height = int(frame_width * 0.25 * distance_factor)

        hat_img_resized = hat_img.resize((hat_width, hat_height), Image.LANCZOS)
        hat_img_resized = np.array(hat_img_resized)

        adjustment_factor = (1 / distance_factor) * hat_height * 0.4
        y_offset = int(forehead_y - hat_height * 0.65 + adjustment_factor)
        x_offset = int(forehead_x - hat_width // 2)

        y_end = min(y_offset + hat_height, frame_height)
        x_end = min(x_offset + hat_width, frame_width)
        y_offset = max(y_offset, 0)
        x_offset = max(x_offset, 0)

        mask = hat_img_resized[:, :, 3] / 255.0
        hat_img_resized = hat_img_resized[:, :, :3]

        for c in range(3):
            frame[y_offset:y_end, x_offset:x_end, c] = (
                frame[y_offset:y_end, x_offset:x_end, c] * (1 - mask) +
                hat_img_resized[:, :, c] * mask
            )

        return frame
    except Exception as e:
        logger.error(f"Error in overlay_hat: {e}")
        return frame

def calculate_distance(shoulder_width, waist_width):
    return 0.5 / (shoulder_width + waist_width)

def suggest_size(distance):
    if distance < 0.5:
        return "Size: XS"
    elif distance < 1.0:
        return "Size: S"
    elif distance < 1.5:
        return "Size: M"
    elif distance < 2:
        return "Size: L"
    else:
        return "Size: XL"

def process_frame(frame):
    try:
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)
        
        size_recommendation = None
        distance = None
        
        if results.pose_landmarks:
            landmarks = results.pose_landmarks.landmark
            
            left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
            right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
            left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
            right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]
            
            shoulder_width = abs(right_shoulder.x - left_shoulder.x)
            waist_width = abs(right_hip.x - left_hip.x)
            
            distance = calculate_distance(shoulder_width, waist_width)
            size_recommendation = suggest_size(distance)
            
            if active_clothing['shirt']:
                frame = overlay_cloth(frame, landmarks, clothing_images['shirt'], scale_factor=0.7)
            if active_clothing['jacket']:
                frame = overlay_cloth(frame, landmarks, clothing_images['jacket'], scale_factor=0.88)
            if active_clothing['tie']:
                frame = overlay_tie(frame, landmarks, clothing_images['tie'])
            if active_clothing['hat']:
                frame = overlay_hat(frame, landmarks, clothing_images['hat'])
        
        return frame, size_recommendation, distance
    except Exception as e:
        logger.error(f"Error processing frame: {e}")
        return frame, None, None

def encode_frame(frame):
    try:
        _, buffer = cv2.imencode('.jpg', frame, [cv2.IMWRITE_JPEG_QUALITY, 80])
        return base64.b64encode(buffer).decode('utf-8')
    except Exception as e:
        logger.error(f"Error encoding frame: {e}")
        return None

def camera_thread_function():
    global camera_active
    
    logger.info("Starting camera thread")
    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        logger.error("Failed to open camera")
        socketio.emit('camera_error', {'message': 'Failed to open camera'})
        return
    
    try:
        while camera_active:
            with camera_lock:
                if not camera_active:
                    break
                    
                ret, frame = cap.read()
                if not ret:
                    logger.error("Failed to capture frame")
                    socketio.emit('camera_error', {'message': 'Failed to capture frame'})
                    break
                
                processed_frame, size_recommendation, distance = process_frame(frame)
                encoded_frame = encode_frame(processed_frame)
                
                if encoded_frame:
                    socketio.emit('processed_frame', {
                        'image': encoded_frame,
                        'size_recommendation': size_recommendation,
                        'distance': distance,
                        'active_clothing': active_clothing
                    })
            
            time.sleep(0.033)
    except Exception as e:
        logger.error(f"Error in camera thread: {e}")
    finally:
        cap.release()
        logger.info("Camera thread stopped")

# Socket.IO event handlers
@socketio.on('connect')
def handle_connect():
    logger.info(f"Client connected: {request.sid}")
    emit('connection_status', {'status': 'connected'}, to=request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    logger.info(f"Client disconnected: {request.sid}")

@socketio.on('start_camera')
def handle_start_camera():
    global camera_thread, camera_active
    
    with camera_lock:
        if camera_thread and camera_thread.is_alive():
            logger.info("Camera already running")
            emit('camera_status', {'status': 'already_running'})
            return
        
        camera_active = True
        camera_thread = threading.Thread(target=camera_thread_function)
        camera_thread.daemon = True
        camera_thread.start()
        
        emit('camera_status', {'status': 'started'})
        logger.info("Camera started")

@socketio.on('stop_camera')
def handle_stop_camera():
    global camera_active
    
    with camera_lock:
        camera_active = False
    
    emit('camera_status', {'status': 'stopped'})
    logger.info("Camera stopped")

@socketio.on('toggle_clothing')
def handle_toggle_clothing(data):
    global active_clothing
    
    item = data.get('item')
    active = data.get('active')
    
    if item in active_clothing:
        active_clothing[item] = active
        logger.info(f"Toggled {item}: {active}")
        emit('clothing_status', {'item': item, 'active': active})
    else:
        logger.warning(f"Unknown clothing item: {item}")

# Routes
@app.route('/')
def index():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Virtual Try-On Test</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.5.0/socket.io.min.js"></script>
    </head>
    <body>
        <h1>Virtual Try-On Test</h1>
        <p id="status">Connecting to server...</p>
        <button onclick="startCamera()">Start Camera</button>
        <button onclick="stopCamera()">Stop Camera</button>
        <div>
            <label><input type="checkbox" id="shirt" onchange="toggleClothing('shirt')"> Shirt</label>
            <label><input type="checkbox" id="jacket" onchange="toggleClothing('jacket')"> Jacket</label>
            <label><input type="checkbox" id="tie" onchange="toggleClothing('tie')"> Tie</label>
            <label><input type="checkbox" id="hat" onchange="toggleClothing('hat')"> Hat</label>
        </div>
        <img id="videoFeed" style="max-width: 640px;" />
        <p id="sizeRecommendation"></p>
        <script>
            const socket = io('http://localhost:5000');
            
            socket.on('connect', () => {
                console.log('Connected to server');
                document.getElementById('status').innerText = 'Connected to server';
            });
            
            socket.on('connection_status', (data) => {
                console.log('Connection status:', data);
                document.getElementById('status').innerText = 'Connection status: ' + data.status;
            });
            
            socket.on('processed_frame', (data) => {
                document.getElementById('videoFeed').src = 'data:image/jpeg;base64,' + data.image;
                document.getElementById('sizeRecommendation').innerText = data.size_recommendation || 'No size recommendation';
            });
            
            socket.on('camera_status', (data) => {
                console.log('Camera status:', data.status);
            });
            
            socket.on('camera_error', (data) => {
                console.error('Camera error:', data.message);
                document.getElementById('status').innerText = 'Camera error: ' + data.message;
            });
            
            socket.on('clothing_status', (data) => {
                console.log('Clothing status:', data);
                document.getElementById(data.item).checked = data.active;
            });
            
            function startCamera() {
                socket.emit('start_camera');
            }
            
            function stopCamera() {
                socket.emit('stop_camera');
            }
            
            function toggleClothing(item) {
                const active = document.getElementById(item).checked;
                socket.emit('toggle_clothing', { item, active });
            }
        </script>
    </body>
    </html>
    """

@app.route('/status')
def status():
    return jsonify({
        'status': 'running',
        'active_clothing': active_clothing,
        'camera_active': camera_active and (camera_thread is not None and camera_thread.is_alive())
    })

if __name__ == '__main__':
    image_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
    os.makedirs(image_dir, exist_ok=True)
    
    initialize_clothing_images()
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)