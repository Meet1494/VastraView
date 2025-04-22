"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Loader2, Camera, RefreshCw } from "lucide-react"
import io from "socket.io-client"

type CameraFeedProps = {
  selectedItems: any
  gender: string
}

export function CameraFeed({ selectedItems, gender }: CameraFeedProps) {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isMirrorMode, setIsMirrorMode] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<any>(null)
  const [activeClothing, setActiveClothing] = useState({
    shirt: false,
    jacket: false,
    tie: false,
    hat: false
  })
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket", "polling"], // Prefer WebSocket, fallback to polling
      reconnectionAttempts: 5,
    })
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  // Set up socket event listeners
  useEffect(() => {
    if (!socket) return

    const handleConnectionStatus = (data: any) => {
      if (data.status === 'connected') {
        console.log("Connected to server")
        setIsInitializing(false)
        setError(null)
      }
    }

    const handleConnectError = (err: any) => {
      console.error("Socket connection error:", err)
      setIsInitializing(false)
      setError("Failed to connect to server. Please try again.")
    }

    const handleProcessedFrame = (data: any) => {
      if (data.image && imageRef.current) {
        imageRef.current.src = `data:image/jpeg;base64,${data.image}`
        setRecommendedSize(data.size_recommendation)
        setActiveClothing(data.active_clothing || {
          shirt: false,
          jacket: false,
          tie: false,
          hat: false
        })
        setIsProcessing(false)
      }
    }

    const handleCameraStatus = (data: any) => {
      const isActive = data.status === 'started' || data.status === 'already_running'
      setIsCameraActive(isActive)
      if (isActive) {
        setIsProcessing(true)
      }
    }

    const handleCameraError = (data: any) => {
      console.error("Camera error:", data.message)
      setError(`Camera error: ${data.message}`)
      setIsCameraActive(false)
      setIsProcessing(false)
    }

    socket.on('connection_status', handleConnectionStatus)
    socket.on('connect_error', handleConnectError)
    socket.on('processed_frame', handleProcessedFrame)
    socket.on('camera_status', handleCameraStatus)
    socket.on('camera_error', handleCameraError)

    return () => {
      socket.off('connection_status', handleConnectionStatus)
      socket.off('connect_error', handleConnectError)
      socket.off('processed_frame', handleProcessedFrame)
      socket.off('camera_status', handleCameraStatus)
      socket.off('camera_error', handleCameraError)
    }
  }, [socket])

  // Start/stop camera based on connection status
  useEffect(() => {
    if (!socket) return

    if (isCameraActive) {
      socket.emit('start_camera')
    } else {
      socket.emit('stop_camera')
    }
  }, [isCameraActive, socket])

  // Toggle clothing items
  const toggleClothing = (item: string, active: boolean) => {
    if (!socket) return
    
    socket.emit('toggle_clothing', { item, active })
    setActiveClothing(prev => ({ ...prev, [item]: active }))
  }

  // Handle client-side clothing overlay (only for selectedItems not handled by backend)
  useEffect(() => {
    if (!overlayRef.current) return

    const overlay = overlayRef.current
    overlay.innerHTML = ""

    // Add selected items to overlay (only if not handled by backend)
    const addClothingItem = (item: any, type: string) => {
      if (!item || !item.imageUrl) return

      // Skip items handled by backend
      if (['shirt', 'jacket', 'tie', 'hat'].includes(item.id)) return

      const itemEl = document.createElement("div")
      itemEl.className = "absolute transition-all duration-500"

      // Position based on type
      if (type === "top") {
        itemEl.style.top = "20%"
        itemEl.style.left = "50%"
        itemEl.style.transform = "translateX(-50%)"
        itemEl.style.width = "60%"
      } else if (type === "bottom") {
        itemEl.style.bottom = "20%"
        itemEl.style.left = "50%"
        itemEl.style.transform = "translateX(-50%)"
        itemEl.style.width = "50%"
      } else if (type === "accessory") {
        const positions = [
          { top: "10%", left: "20%" },
          { top: "15%", right: "20%" },
          { bottom: "30%", left: "15%" },
        ]
        const pos = positions[Math.floor(Math.random() * positions.length)]
        Object.assign(itemEl.style, pos)
        itemEl.style.width = "20%"
      }

      const img = document.createElement("img")
      img.src = item.imageUrl
      img.className = "w-full h-auto"
      img.style.opacity = "0"

      itemEl.appendChild(img)
      overlay.appendChild(itemEl)

      gsap.to(img, {
        opacity: 0.9,
        duration: 0.5,
        delay: Math.random() * 0.3,
      })
    }

    // Add custom items not handled by backend
    if (selectedItems.top) {
      setTimeout(() => addClothingItem(selectedItems.top, "top"), 100)
    }
    if (selectedItems.bottom) {
      setTimeout(() => addClothingItem(selectedItems.bottom, "bottom"), 200)
    }
    selectedItems.accessories.forEach((acc: any, index: number) => {
      setTimeout(() => addClothingItem(acc, "accessory"), 300 + index * 100)
    })
  }, [selectedItems])

  // Function to capture a snapshot
  const captureSnapshot = () => {
    if (!canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    if (!ctx) return

    // Set canvas dimensions to match image
    canvas.width = imageRef.current.naturalWidth || 640
    canvas.height = imageRef.current.naturalHeight || 480

    // Draw current frame to canvas
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height)

    console.log("Snapshot captured")
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-800">
      {/* Loading or Error state */}
      {(isInitializing || error) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-20">
          <div className="flex flex-col items-center">
            {isInitializing && !error && (
              <>
                <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-4" />
                <p className="text-white text-lg">Connecting to server...</p>
              </>
            )}
            {error && (
              <p className="text-red-500 text-lg">{error}</p>
            )}
          </div>
        </div>
      )}

      {/* Camera Feed */}
      <img
        ref={imageRef}
        className={`w-full h-full object-cover ${isMirrorMode ? "scale-x-[-1]" : ""}`}
        alt="Camera feed"
      />

      {/* Canvas for snapshot capture (hidden) */}
      <canvas ref={canvasRef} className="hidden absolute top-0 left-0 w-full h-full" />

      {/* Clothing overlay */}
      <div ref={overlayRef} className={`absolute inset-0 pointer-events-none ${isMirrorMode ? "scale-x-[-1]" : ""}`} />

      {/* Processing indicator */}
      {isProcessing && (
        <div className="absolute top-2 right-2 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 rounded-lg px-3 py-1 text-cyan-300 text-sm flex items-center">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </div>
      )}

      {/* Size recommendation */}
      {recommendedSize && (
        <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 rounded-lg px-4 py-2 text-cyan-300 font-medium">
          {recommendedSize}
        </div>
      )}

      {/* Clothing controls */}
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <Button
          variant={activeClothing.shirt ? "default" : "outline"}
          onClick={() => toggleClothing('shirt', !activeClothing.shirt)}
          size="sm"
        >
          Shirt
        </Button>
        <Button
          variant={activeClothing.jacket ? "default" : "outline"}
          onClick={() => toggleClothing('jacket', !activeClothing.jacket)}
          size="sm"
        >
          Jacket
        </Button>
        <Button
          variant={activeClothing.tie ? "default" : "outline"}
          onClick={() => toggleClothing('tie', !activeClothing.tie)}
          size="sm"
        >
          Tie
        </Button>
        <Button
          variant={activeClothing.hat ? "default" : "outline"}
          onClick={() => toggleClothing('hat', !activeClothing.hat)}
          size="sm"
        >
          Hat
        </Button>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <Button
          onClick={() => setIsMirrorMode(!isMirrorMode)}
          className="bg-gray-900/80 backdrop-blur-sm text-cyan-400 p-2 rounded-full hover:bg-gray-800 transition-colors"
          size="icon"
          variant="ghost"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>

        <Button
          onClick={captureSnapshot}
          className="bg-gray-900/80 backdrop-blur-sm text-cyan-400 p-2 rounded-full hover:bg-gray-800 transition-colors"
          size="icon"
          variant="ghost"
        >
          <Camera className="h-5 w-5" />
        </Button>

        <Button
          onClick={() => setIsCameraActive(!isCameraActive)}
          className="bg-gray-900/80 backdrop-blur-sm text-cyan-400 p-2 rounded-full hover:bg-gray-800 transition-colors"
          size="icon"
          variant="ghost"
        >
          {isCameraActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <line x1="2" y1="12" x2="4" y2="12"></line>
              <line x1="20" y1="12" x2="22" y2="12"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="20" height="12" rx="2" ry="2"></rect>
              <line x1="2" y1="6" x2="22" y2="6"></line>
              <line x1="2" y1="18" x2="22" y2="18"></line>
            </svg>
          )}
        </Button>
      </div>
    </div>
  )
}