"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth-utils"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CameraFeed } from "@/components/camera-feed"
import { ClothingCatalog } from "@/components/clothing-catalog"
import { OutfitSaver } from "@/components/outfit-saver"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItems, setSelectedItems] = useState<any>({
    top: null,
    bottom: null,
    accessories: [],
  })
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = getCurrentUser()
    if (!userData) {
      router.push("/auth")
      return
    }

    // Check if gender is selected
    if (!userData.gender) {
      router.push("/gender-select")
      return
    }

    setUser(userData)
    setIsLoading(false)

    // Simulate size recommendation after a delay
    const timer = setTimeout(() => {
      const sizes = ["XS", "S", "M", "L", "XL"]
      setRecommendedSize(sizes[Math.floor(Math.random() * sizes.length)])
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  const handleItemSelect = (category: string, item: any) => {
    if (category === "accessories") {
      // Toggle accessory selection
      setSelectedItems((prev) => {
        const accessories = [...prev.accessories]
        const index = accessories.findIndex((acc) => acc.id === item.id)

        if (index >= 0) {
          accessories.splice(index, 1)
        } else {
          accessories.push(item)
        }

        return { ...prev, accessories }
      })
    } else {
      // Replace top or bottom
      setSelectedItems((prev) => ({
        ...prev,
        [category]: prev[category]?.id === item.id ? null : item,
      }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  return (
    <DashboardLayout user={user}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800 p-4 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4">Virtual Try-On</h2>

          <div className="flex-1 relative">
            <CameraFeed selectedItems={selectedItems} gender={user.gender} />

            {recommendedSize && (
              <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-md border border-cyan-500/50 rounded-lg px-4 py-2 text-cyan-300 font-medium">
                Recommended Size: {recommendedSize}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800 p-4 flex flex-col">
          <h2 className="text-xl font-bold text-white mb-4">Clothing Catalog</h2>

          <div className="flex-1 overflow-y-auto">
            <ClothingCatalog gender={user.gender} selectedItems={selectedItems} onItemSelect={handleItemSelect} />
          </div>

          <OutfitSaver
            selectedItems={selectedItems}
            disabled={!selectedItems.top && !selectedItems.bottom && selectedItems.accessories.length === 0}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
