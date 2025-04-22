"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { initializeLocalStorage } from "@/lib/auth-utils"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Initialize demo data in localStorage
    initializeLocalStorage()

    // Check if user is already logged in
    const currentUser = localStorage.getItem("vvCurrentUser")
    if (currentUser) {
      router.push("/dashboard")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/mesh-bg.svg')] bg-cover opacity-20 z-0"></div>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-2">
            VastraView
          </h1>
          <p className="text-gray-300">Your AI-Powered Virtual Wardrobe</p>
        </div>

        <AuthForm />
      </div>
    </div>
  )
}
