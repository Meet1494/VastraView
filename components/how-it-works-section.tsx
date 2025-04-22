"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Image dimensions constants
const IMAGE_WIDTH = 600
const IMAGE_HEIGHT = 400
const IMAGE_ASPECT_RATIO = `${IMAGE_WIDTH}/${IMAGE_HEIGHT}`

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !stepsRef.current) return

    // Animation code remains the same...
    // ... (keep existing animation logic)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up and set up your profile with your preferences and measurements.",
      image: "/assets/account.avif",
    },
    {
      number: "02",
      title: "Select Your Avatar",
      description: "Choose your avatar type to get personalized clothing recommendations.",
      image: "/assets/avatar.jpg",
    },
    {
      number: "03",
      title: "Browse Clothing",
      description: "Explore our extensive catalog of virtual clothing items.",
      image: "/assets/browse_final.jpg",
    },
    {
      number: "04",
      title: "Try On Virtually",
      description: "See how clothes look on you in real-time with our camera technology.",
      image: "/assets/try-on.jpg",
    },
  ]

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          How It Works
        </span>
      </h2>

      <div ref={stepsRef} className="space-y-20">
        {steps.map((step, index) => (
          <div key={index} className="step grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`step-content ${index % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="step-number flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-cyan-500 to-transparent ml-4"></div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 text-lg">{step.description}</p>
            </div>
            <div className={`step-image ${index % 2 === 1 ? "md:order-1" : ""}`}>
              <div 
                className="rounded-xl overflow-hidden border border-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{
                  width: IMAGE_WIDTH,
                  height: IMAGE_HEIGHT,
                  aspectRatio: IMAGE_ASPECT_RATIO
                }}
              >
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}