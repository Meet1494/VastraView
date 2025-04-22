"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    })

    tl.from(sectionRef.current.querySelector(".cta-content"), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }).from(
      sectionRef.current.querySelector(".cta-button"),
      {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    )

    // Pulse animation for CTA button
    gsap.to(sectionRef.current.querySelector(".pulse"), {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut",
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 container mx-auto px-4 my-10 rounded-3xl bg-gradient-to-r from-gray-900 via-purple-900/50 to-gray-900 border border-gray-800"
    >
      <div className="max-w-3xl mx-auto text-center">
        <div className="cta-content">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Fashion Experience?
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Join thousands of users who are already enjoying the future of virtual try-on technology. Sign up today and
            start building your digital wardrobe!
          </p>
        </div>

        <div className="cta-button relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-md opacity-70 pulse"></div>
          <Link
            href="/auth"
            className="relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 inline-block"
          >
            Start Your Style Journey
          </Link>
        </div>
      </div>
    </section>
  )
}
