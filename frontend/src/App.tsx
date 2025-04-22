"use client"

import { useState, useEffect } from "react"
import { io, type Socket } from "socket.io-client"
import "./App.css"
import VideoFeed from "./components/VideoFeed"
import ClothingControls from "./components/ClothingControls"
import SizeSuggestion from "./components/SizeSuggestion"
import LoadingSpinner from "./components/LoadingSpinner"
import ErrorMessage from "./components/ErrorMessage"

// Define clothing item types
export interface ClothingItem {
  id: string
  name: string
  active: boolean
  color: string
}

function App() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [videoStream, setVideoStream] = useState<string | null>(null)
  const [sizeRecommendation, setSizeRecommendation] = useState<string | null>(null)

  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([
    { id: "shirt", name: "Shirt", active: false, color: "#4CAF50" },
    { id: "jacket", name: "Jacket", active: false, color: "#F44336" },
    { id: "tie", name: "Tie", active: false, color: "#2196F3" },
    { id: "hat", name: "Hat", active: false, color: "#FFEB3B" },
  ])

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    setSocket(newSocket)

    // Socket event handlers
    newSocket.on("connect", () => {
      console.log("Connected to server")
      setIsConnected(true)
      setIsLoading(false)
    })

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server")
      setIsConnected(false)
    })

    newSocket.on("connect_error", (err) => {
      console.error("Connection error:", err)
      setError("Failed to connect to the server. Please try again later.")
      setIsLoading(false)
    })

    newSocket.on("processed_frame", (data) => {
      setVideoStream(data.image)
      if (data.size_recommendation) {
        setSizeRecommendation(data.size_recommendation)
      }
    })

    // Clean up on unmount
    return () => {
      newSocket.disconnect()
    }
  }, [])

  const toggleClothingItem = (itemId: string) => {
    // Update local state
    const updatedItems = clothingItems.map((item) => (item.id === itemId ? { ...item, active: !item.active } : item))
    setClothingItems(updatedItems)

    // Send update to server
    if (socket && isConnected) {
      const toggledItem = updatedItems.find((item) => item.id === itemId)
      socket.emit("toggle_clothing", {
        item: itemId,
        active: toggledItem?.active,
      })
    }
  }

  const startCamera = () => {
    if (socket && isConnected) {
      setIsLoading(true)
      socket.emit("start_camera", {}, (response: { success: boolean; error?: string }) => {
        if (!response.success) {
          setError(response.error || "Failed to start camera")
        }
        setIsLoading(false)
      })
    }
  }

  useEffect(() => {
    if (isConnected) {
      startCamera()
    }
  }, [isConnected])

  return (
    <div className="app-container">
      <header>
        <h1>Virtual Wardrobe</h1>
        <p>Try on clothes virtually with real-time size recommendations</p>
      </header>

      <main>
        {isLoading ? (
          <LoadingSpinner message="Initializing camera..." />
        ) : error ? (
          <ErrorMessage message={error} onRetry={startCamera} />
        ) : (
          <div className="content-container">
            <VideoFeed videoStream={videoStream} />

            <div className="controls-container">
              <ClothingControls clothingItems={clothingItems} onToggle={toggleClothingItem} />

              {sizeRecommendation && <SizeSuggestion size={sizeRecommendation} />}
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      </footer>
    </div>
  )
}

export default App
