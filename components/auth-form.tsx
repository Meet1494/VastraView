"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleLogin, handleSignUp } from "@/lib/auth-utils"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [error, setError] = useState("")
  const formRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Password strength calculation
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }, [password])

  // Animation for form toggle
  useEffect(() => {
    gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
  }, [isLogin])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      if (isLogin) {
        const success = handleLogin(email, password)
        if (success) {
          router.push("/gender-select")
        } else {
          setError("Invalid email or password")
        }
      } else {
        const success = handleSignUp(email, password)
        if (success) {
          router.push("/gender-select")
        } else {
          setError("Email already exists")
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div ref={formRef} className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800 p-6 shadow-xl">
      <div className="flex mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 text-center transition-all ${
            isLogin ? "text-white border-b-2 border-cyan-500" : "text-gray-400 border-b border-gray-700"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 text-center transition-all ${
            !isLogin ? "text-white border-b-2 border-cyan-500" : "text-gray-400 border-b border-gray-700"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 focus:ring focus:ring-cyan-500/20 text-white"
              placeholder="your@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-800/50 border-gray-700 focus:border-cyan-500 focus:ring focus:ring-cyan-500/20 text-white"
              placeholder="••••••••"
            />

            {!isLogin && password.length > 0 && (
              <div className="mt-2">
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden flex">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-full w-1/4 ${
                        i < passwordStrength
                          ? passwordStrength === 1
                            ? "bg-red-500"
                            : passwordStrength === 2
                              ? "bg-yellow-500"
                              : passwordStrength === 3
                                ? "bg-green-500"
                                : "bg-cyan-500"
                          : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {passwordStrength === 0 && "Enter a password"}
                  {passwordStrength === 1 && "Weak password"}
                  {passwordStrength === 2 && "Medium password"}
                  {passwordStrength === 3 && "Strong password"}
                  {passwordStrength === 4 && "Very strong password"}
                </p>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-200 text-sm">{error}</div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white py-2 rounded-md transition-all duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>

          {isLogin && (
            <p className="text-center text-sm text-gray-400 mt-2">Demo account: demo@vastraview.com / demo123</p>
          )}
        </div>
      </form>
    </div>
  )
}
