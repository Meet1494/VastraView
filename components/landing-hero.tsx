"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"

export function LandingHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Animate the title
    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    // Animate the description
    tl.from(
      containerRef.current?.querySelector(".description") ? containerRef.current.querySelector(".description") : undefined,
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )

    // Animate the CTA button
    tl.from(
      ctaRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4",
    )

    // Setup pulse animation for CTA
    const pulseElement = ctaRef.current?.querySelector(".pulse");
    if (pulseElement) {
      gsap.to(pulseElement, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
      });
    }

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Virtual Try-On
        </span>
        <span className="text-white">Reimagined</span>
      </h1>

      <p className="description text-xl text-gray-300 max-w-2xl mb-10">
        Experience the future of fashion with VastraView. Try on clothes virtually, get perfect size recommendations,
        and build your digital wardrobe.
      </p>

      <div ref={ctaRef} className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-md opacity-70 pulse"></div>
        <Link
          href="/auth"
          className="relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 inline-block"
        >
          Start Your Style Journey
        </Link>
      </div>
    </div>
  )
}
