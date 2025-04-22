"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import "./VideoFeed.css"

interface VideoFeedProps {
  videoStream: string | null
}

const VideoFeed: React.FC<VideoFeedProps> = ({ videoStream }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!videoStream || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create an image from the base64 data
    const img = new Image()
    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw the image to fit the canvas while maintaining aspect ratio
      const canvasRatio = canvas.width / canvas.height
      const imgRatio = img.width / img.height

      let drawWidth,
        drawHeight,
        offsetX = 0,
        offsetY = 0

      if (canvasRatio > imgRatio) {
        // Canvas is wider than image
        drawHeight = canvas.height
        drawWidth = img.width * (canvas.height / img.height)
        offsetX = (canvas.width - drawWidth) / 2
      } else {
        // Canvas is taller than image
        drawWidth = canvas.width
        drawHeight = img.height * (canvas.width / img.width)
        offsetY = (canvas.height - drawHeight) / 2
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }

    img.src = `data:image/jpeg;base64,${videoStream}`
  }, [videoStream])

  return (
    <div className="video-feed-container">
      {!videoStream ? (
        <div className="no-video-message">
          <p>Camera feed not available</p>
        </div>
      ) : (
        <canvas ref={canvasRef} width={640} height={480} className="video-canvas" />
      )}
    </div>
  )
}

export default VideoFeed
