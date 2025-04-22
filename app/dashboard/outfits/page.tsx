"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth-utils"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function OutfitsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = getCurrentUser()
    if (!userData) {
      router.push("/auth")
      return
    }

    setUser(userData)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  return (
    <DashboardLayout user={user}>
      <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800 p-6">
        <h1 className="text-2xl font-bold text-white mb-6">My Saved Outfits</h1>

        {user.outfits && user.outfits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.outfits.map((outfit: any, index: number) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="h-48 bg-gray-800 relative">
                  {/* Display outfit preview */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {outfit.top && (
                      <img
                        src={outfit.top.imageUrl || "/placeholder.svg"}
                        alt={outfit.top.name}
                        className="absolute w-1/2 top-4 left-1/2 transform -translate-x-1/2"
                      />
                    )}

                    {outfit.bottom && (
                      <img
                        src={outfit.bottom.imageUrl || "/placeholder.svg"}
                        alt={outfit.bottom.name}
                        className="absolute w-1/2 bottom-4 left-1/2 transform -translate-x-1/2"
                      />
                    )}

                    {outfit.accessories &&
                      outfit.accessories.map((acc: any, i: number) => (
                        <img
                          key={i}
                          src={acc.imageUrl || "/placeholder.svg"}
                          alt={acc.name}
                          className="absolute w-1/4"
                          style={{
                            top: `${20 + i * 15}%`,
                            left: `${20 + i * 10}%`,
                          }}
                        />
                      ))}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-medium mb-2">Outfit #{index + 1}</h3>

                  <div className="text-sm text-gray-400">
                    {outfit.top && <p>Top: {outfit.top.name}</p>}
                    {outfit.bottom && <p>Bottom: {outfit.bottom.name}</p>}
                    {outfit.accessories && outfit.accessories.length > 0 && (
                      <p>Accessories: {outfit.accessories.length}</p>
                    )}
                  </div>

                  <button className="mt-3 w-full py-2 bg-cyan-500/20 border border-cyan-500/50 rounded text-cyan-300 hover:bg-cyan-500/30 transition-colors">
                    Try Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No outfits saved yet</h3>
            <p className="text-gray-400 mb-6">Try on some clothes and save your favorite combinations</p>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-md text-white"
            >
              Start Creating Outfits
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
