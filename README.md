# Virtual Wardrobe - Try-On Application

A web application that allows users to virtually try on clothing items using computer vision.

## Features

- Real-time webcam feed with clothing overlay
- Toggle different clothing items (shirt, jacket, tie, hat)
- Automatic size recommendations based on body measurements
- Responsive design for desktop and mobile

## Technology Stack

- **Backend**: Flask, Flask-SocketIO, OpenCV, MediaPipe
- **Frontend**: React, TypeScript, Socket.IO client
- **Communication**: WebSockets for real-time video streaming

## Project Structure

\`\`\`
virtual-wardrobe/
├── backend/
│   ├── app.py                 # Flask server with WebSocket support
│   ├── requirements.txt       # Python dependencies
│   └── images/                # Directory for clothing images
│       ├── shirt.png
│       ├── jacket.png
│       ├── tie.png
│       └── hat.png
└── frontend/
    ├── public/                # Static assets
    ├── src/                   # React source code
    │   ├── components/        # React components
    │   │   ├── VideoFeed.tsx  # Video display component
    │   │   ├── ClothingControls.tsx  # Clothing toggle buttons
    │   │   ├── SizeSuggestion.tsx    # Size recommendation display
    │   │   ├── LoadingSpinner.tsx    # Loading indicator
    │   │   └── ErrorMessage.tsx      # Error display
    │   ├── App.tsx            # Main application component
    │   └── index.tsx          # Application entry point
    ├── package.json           # Node.js dependencies
    └── tsconfig.json          # TypeScript configuration
\`\`\`

## Setup and Installation

### Prerequisites

- Python 3.8+ with pip
- Node.js 14+ with npm
- Webcam

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/Meet1494/VastraView.git
   cd virtual-wardrobe
   \`\`\`

2. Run the setup script:
   \`\`\`
   chmod +x run.sh
   ./run.sh
   \`\`\`

   This script will:
   - Download the clothing images
   - Set up the Python virtual environment
   - Install backend dependencies
   - Start the Flask server
   - Install frontend dependencies
   - Start the React development server

3. Alternatively, you can set up the backend and frontend manually:

   **Backend:**
   \`\`\`
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   \`\`\`

   **Frontend:**
   \`\`\`
   cd frontend
   npm install
   npm start
   \`\`\`

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Allow camera access when prompted
2. Wait for the camera feed to initialize
3. Click on the clothing buttons to toggle different items on/off
4. Your recommended size will be displayed based on your body measurements
5. For best results, stand about 2-3 meters from the camera with your full body visible

## Troubleshooting

- **Camera not working**: Ensure your browser has permission to access your camera
- **Backend connection issues**: Make sure the Flask server is running on port 5000
- **Missing clothing items**: Verify that the image files are in the `backend/images` directory

## License

MIT
