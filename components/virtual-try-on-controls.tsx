"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Camera, RefreshCw, Sliders, Download, Share2 } from "lucide-react"

type VirtualTryOnControlsProps = {
  onMirrorToggle: () => void
  onCaptureSnapshot: () => void
  onDevModeToggle?: () => void
  isMobile: boolean
  isDevMode: boolean
}

export function VirtualTryOnControls({
  onMirrorToggle,
  onCaptureSnapshot,
  onDevModeToggle,
  isMobile,
  isDevMode,
}: VirtualTryOnControlsProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [clothingOpacity, setClothingOpacity] = useState(90)
  const [enableShadows, setEnableShadows] = useState(true)
  const [enableAutoFit, setEnableAutoFit] = useState(true)

  return (
    <div className="flex flex-col space-y-4">
      {/* Basic controls */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={onMirrorToggle}
          className="bg-gray-900/80 backdrop-blur-sm text-cyan-400 p-2 rounded-full hover:bg-gray-800 transition-colors"
          size="icon"
          variant="ghost"
          title="Mirror view"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>

        <Button
          onClick={onCaptureSnapshot}
          className="bg-gray-900/80 backdrop-blur-sm text-cyan-400 p-2 rounded-full hover:bg-gray-800 transition-colors"
          size="icon"
          variant="ghost"
          title="Take snapshot"
        >
          <Camera className="h-5 w-5" />
        </Button>

        <Button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="bg-gray-900/80 backdrop-blur-sm text-cyan-400 p-2 rounded-full hover:bg-gray-800 transition-colors"
          size="icon"
          variant="ghost"
          title="Advanced settings"
        >
          <Sliders className="h-5 w-5" />
        </Button>

        {!isMobile && onDevModeToggle && (
          <Button
            onClick={onDevModeToggle}
            className="bg-gray-900/80 backdrop-blur-sm text-cyan-400 p-2 rounded-full hover:bg-gray-800 transition-colors"
            size="icon"
            variant="ghost"
            title="Toggle dev mode"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M3 7v4a1 1 0 0 0 1 1h3" />
              <path d="M7 12a2 2 0 0 1-2 2H4a1 1 0 0 0-1 1v2" />
              <path d="M14 12a2 2 0 0 0 2 2h1a1 1 0 0 1 1 1v2" />
              <path d="M21 7v4a1 1 0 0 1-1 1h-3" />
              <path d="M12 3C8 3 5.5 5.5 5.5 9l-2 1 2 1" />
              <path d="M18.5 9c0-3.5-2.5-6-6.5-6" />
            </svg>
          </Button>
        )}
      </div>

      {/* Advanced controls */}
      {showAdvanced && (
        <div className="bg-gray-900/80 backdrop-blur-md rounded-lg p-4 space-y-4 border border-gray-800">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="opacity" className="text-sm text-gray-300">
                Clothing Opacity: {clothingOpacity}%
              </Label>
            </div>
            <Slider
              id="opacity"
              min={10}
              max={100}
              step={5}
              value={[clothingOpacity]}
              onValueChange={(value) => setClothingOpacity(value[0])}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="shadows" className="text-sm text-gray-300">
              Enable Shadows
            </Label>
            <Switch id="shadows" checked={enableShadows} onCheckedChange={setEnableShadows} />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="autofit" className="text-sm text-gray-300">
              Auto-fit Clothing
            </Label>
            <Switch id="autofit" checked={enableAutoFit} onCheckedChange={setEnableAutoFit} />
          </div>

          <div className="pt-2 flex justify-between">
            <Button size="sm" variant="outline" className="text-xs">
              <Download className="h-3 w-3 mr-1" />
              Save Look
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
