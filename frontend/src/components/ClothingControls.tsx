"use client"

import type React from "react"
import type { ClothingItem } from "../App"
import "./ClothingControls.css"

interface ClothingControlsProps {
  clothingItems: ClothingItem[]
  onToggle: (itemId: string) => void
}

const ClothingControls: React.FC<ClothingControlsProps> = ({ clothingItems, onToggle }) => {
  return (
    <div className="clothing-controls">
      <h2>Clothing Items</h2>
      <div className="clothing-buttons">
        {clothingItems.map((item) => (
          <button
            key={item.id}
            className={`clothing-button ${item.active ? "active" : ""}`}
            style={{
              backgroundColor: item.active ? item.color : "transparent",
              borderColor: item.color,
            }}
            onClick={() => onToggle(item.id)}
          >
            <span className="clothing-icon">{getClothingIcon(item.id)}</span>
            <span className="clothing-name">{item.name}</span>
          </button>
        ))}
      </div>
      <p className="controls-help">Click on an item to toggle it on/off</p>
    </div>
  )
}

// Helper function to get appropriate icon for each clothing type
function getClothingIcon(itemId: string): React.ReactNode {
  switch (itemId) {
    case "shirt":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
        </svg>
      )
    case "jacket":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18" />
          <path d="M10 3v7" />
          <path d="M14 3v7" />
        </svg>
      )
    case "tie":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22l4-9V4H8v9l4 9z" />
          <path d="M8 4h8" />
        </svg>
      )
    case "hat":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7C3 5.34315 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V7C21 8.65685 19.6569 10 18 10H6C4.34315 10 3 8.65685 3 7V7Z" />
          <path d="M6 10V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V10" />
        </svg>
      )
    default:
      return null
  }
}

export default ClothingControls
