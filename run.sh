#!/bin/bash

# Create necessary directories
mkdir -p backend/images

# Download clothing images
echo "Downloading clothing images..."
curl -o backend/images/shirt.png https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shirt-FcC0roDWuBwBmsysdI8jXg3jeiYeq7.png
curl -o backend/images/jacket.png https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jacket-ciL6lOKf8AFfngP2yzlTewwGTT6Qny.png
curl -o backend/images/tie.png https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tie-DrAN5H8BU7RmS9d4ghl9XYw07VZihJ.png
curl -o backend/images/hat.png https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hat-x9csBLgaoo4u0oy7sKqV1rp3b96kbI.png

# Set up Python backend
echo "Setting up Python backend..."
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Start backend server in background
echo "Starting backend server..."
python app.py &
BACKEND_PID=$!

# Go back to root directory
cd ..

# Set up React frontend
echo "Setting up React frontend..."
cd frontend
npm install

# Start frontend development server
echo "Starting frontend server..."
npm start

# Cleanup function
cleanup() {
  echo "Shutting down servers..."
  kill $BACKEND_PID
  exit 0
}

# Register cleanup function to run on exit
trap cleanup INT TERM

# Wait for user to terminate
wait
