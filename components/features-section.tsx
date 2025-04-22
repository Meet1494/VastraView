"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Camera, Ruler, Bookmark, Zap, Palette, Users } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !featuresRef.current) return

    // Animate section title
    gsap.from(sectionRef.current.querySelector("h2"), {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Animate each feature card
    const featureCards = featuresRef.current.querySelectorAll(".feature-card")
    featureCards.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
      })
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const features = [
    {
      title: "Virtual Try-On",
      description: "See clothes on yourself in real-time with our advanced camera technology",
      icon: <Camera className="text-white" size={24} />,
    },
    {
      title: "Size Recommendation",
      description: "Get accurate size suggestions based on your body measurements",
      icon: <Ruler className="text-white" size={24} />,
    },
    {
      title: "Save Outfits",
      description: "Create and save your favorite outfit combinations for later",
      icon: <Bookmark className="text-white" size={24} />,
    },
    {
      title: "Real-time Rendering",
      description: "Experience ultra-fast clothing visualization with our optimized engine",
      icon: <Zap className="text-white" size={24} />,
    },
    {
      title: "Style Matching",
      description: "Get AI-powered suggestions for complementary clothing items",
      icon: <Palette className="text-white" size={24} />,
    },
    {
      title: "Share with Friends",
      description: "Share your virtual outfits with friends and get their opinions",
      icon: <Users className="text-white" size={24} />,
    },
  ]

  return (
    <section ref={sectionRef} id="features" className="py-20 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Future of Fashion
        </span>
      </h2>

      <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
