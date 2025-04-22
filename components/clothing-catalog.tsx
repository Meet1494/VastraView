"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { getClothingItems } from "@/lib/clothing-data"
import { Badge } from "@/components/ui/badge"

type ClothingCatalogProps = {
  gender: string
  selectedItems: any
  onItemSelect: (category: string, item: any) => void
}

export function ClothingCatalog({ gender, selectedItems, onItemSelect }: ClothingCatalogProps) {
  const [activeTab, setActiveTab] = useState("tops")
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const tops = getClothingItems("tops", gender)
  const bottoms = getClothingItems("bottoms", gender)
  const accessories = getClothingItems("accessories", gender)

  return (
    <Tabs defaultValue="tops" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-3 mb-6 bg-gray-800/50">
        <TabsTrigger value="tops" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
          Tops
        </TabsTrigger>
        <TabsTrigger value="bottoms" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
          Bottoms
        </TabsTrigger>
        <TabsTrigger value="accessories" className="data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
          Accessories
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tops" className="mt-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tops.map((item) => (
            <ClothingCard
              key={item.id}
              item={item}
              isSelected={selectedItems.top?.id === item.id}
              onSelect={() => onItemSelect("top", item)}
              onHover={(id) => setHoveredItem(id)}
              isHovered={hoveredItem === item.id}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="bottoms" className="mt-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {bottoms.map((item) => (
            <ClothingCard
              key={item.id}
              item={item}
              isSelected={selectedItems.bottom?.id === item.id}
              onSelect={() => onItemSelect("bottom", item)}
              onHover={(id) => setHoveredItem(id)}
              isHovered={hoveredItem === item.id}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="accessories" className="mt-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {accessories.map((item) => (
            <ClothingCard
              key={item.id}
              item={item}
              isSelected={selectedItems.accessories.some((acc: any) => acc.id === item.id)}
              onSelect={() => onItemSelect("accessories", item)}
              onHover={(id) => setHoveredItem(id)}
              isHovered={hoveredItem === item.id}
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

type ClothingCardProps = {
  item: any
  isSelected: boolean
  isHovered: boolean
  onSelect: () => void
  onHover: (id: string | null) => void
}

function ClothingCard({ item, isSelected, isHovered, onSelect, onHover }: ClothingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className={`
        relative h-48 perspective-1000 cursor-pointer
        ${isSelected ? "ring-2 ring-cyan-500 ring-offset-2 ring-offset-gray-900" : ""}
      `}
      onMouseEnter={() => {
        setIsFlipped(true)
        onHover(item.id)
      }}
      onMouseLeave={() => {
        setIsFlipped(false)
        onHover(null)
      }}
      onClick={onSelect}
    >
      <div
        className={`
          absolute inset-0 transition-all duration-500 transform-style-3d
          ${isFlipped ? "rotate-y-180" : ""}
        `}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-gray-800 rounded-lg overflow-hidden">
          <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-2">
            <p className="text-white font-medium">{item.name}</p>
            {isHovered && !isFlipped && (
              <Badge className="mt-1 bg-cyan-500/30 text-cyan-300 border-cyan-500/50">Click to try on</Badge>
            )}
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-bold">{item.name}</h3>
            <p className="text-gray-300 text-sm mt-1">{item.description}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-2">Available sizes: {item.sizes.join(", ")}</p>

            <Button
              variant="outline"
              size="sm"
              className="w-full bg-cyan-500/20 border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/30"
            >
              Try On
            </Button>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-2 right-2 z-10 bg-cyan-500 text-white rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      )}
    </div>
  )
}
