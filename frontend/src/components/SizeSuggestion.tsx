import type React from "react"
import "./SizeSuggestion.css"

interface SizeSuggestionProps {
  size: string
}

const SizeSuggestion: React.FC<SizeSuggestionProps> = ({ size }) => {
  // Extract just the size letter (XS, S, M, L, XL) from the string
  const sizeValue = size.includes(":") ? size.split(":")[1].trim() : size

  return (
    <div className="size-suggestion">
      <h3>Recommended Size</h3>
      <div className="size-display">
        <span className="size-value">{sizeValue}</span>
      </div>
      <p className="size-info">Based on your body measurements</p>
    </div>
  )
}

export default SizeSuggestion
