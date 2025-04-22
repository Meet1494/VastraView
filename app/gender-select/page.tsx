"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { updateUserGender, getCurrentUser } from "@/lib/auth-utils"
import { GenderAvatar } from "@/components/gender-avatar"

export default function GenderSelectPage() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Check if user is logged in
    try {
      const user = getCurrentUser()
      if (!user) {
        router.push("/auth")
        return
      }

      // If user already has gender selected, use that as default
      if (user.gender) {
        setSelectedGender(user.gender)
      }
    } catch (error) {
      console.error("Error checking user:", error)
    } finally {
      setIsLoading(false)
    }
  }, [router, isMounted])

  const handleContinue = () => {
    if (!selectedGender) return

    try {
      updateUserGender(selectedGender)
      router.push("/dashboard")
    } catch (error) {
      console.error("Error updating gender:", error)
    }
  }

  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/mesh-bg.svg')] bg-cover opacity-20 z-0"></div>

      <div className="w-full max-w-4xl z-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Choose Your Avatar</h1>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
          Select your avatar type to get personalized clothing recommendations and accurate size suggestions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <GenderAvatar type="male" isSelected={selectedGender === "male"} onSelect={() => setSelectedGender("male")} />
          <GenderAvatar
            type="female"
            isSelected={selectedGender === "female"}
            onSelect={() => setSelectedGender("female")}
          />
          <GenderAvatar
            type="non-binary"
            isSelected={selectedGender === "non-binary"}
            onSelect={() => setSelectedGender("non-binary")}
          />
        </div>

        <Button
          onClick={handleContinue}
          disabled={!selectedGender}
          className="px-8 py-6 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
        >
          Continue to Dashboard
        </Button>
      </div>
    </div>
  )
}
