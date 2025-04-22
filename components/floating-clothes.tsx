"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type ClothingItem = {
  id: number
  type: string
  x: number
  y: number
  rotation: number
  scale: number
}

export function FloatingClothes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Generate random clothing items
    const clothingItems: ClothingItem[] = []
    const types = ["tshirt", "jacket", "hat", "pants", "dress"]

    for (let i = 0; i < 12; i++) {
      clothingItems.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      })
    }

    // Create clothing elements
    clothingItems.forEach((item) => {
      const el = document.createElement("div")
      el.className = "absolute"
      el.style.left = `${item.x}%`
      el.style.top = `${item.y}%`

      const icon = document.createElement("div")
      icon.className = "text-cyan-400/30"

      // Add different clothing SVGs based on type
      if (item.type === "tshirt") {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`
      } else if (item.type === "jacket") {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2H8l-4 6h2.5l-2.5 7h5v5h6v-5h5l-2.5-7H20L16 2z"/><path d="M12 2v16"/></svg>`
      } else if (item.type === "hat") {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7C3 5.34315 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V7C21 8.65685 19.6569 10 18 10H6C4.34315 10 3 8.65685 3 7V7Z"/><path d="M6 10V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V10"/></svg>`
      } else if (item.type === "pants") {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2v20M18 2v20M6 7h12M6 12h12"/></svg>`
      } else {
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 19.5L19.5 19.5"/><path d="M12 19.5L12 13.5"/><path d="M10.2 13.5C7.2 12.3 4.5 10.6 4.5 7.5V4.5H19.5V7.5C19.5 10.6 16.8 12.3 13.8 13.5"/></svg>`
      }

      el.appendChild(icon)
      containerRef.current.appendChild(el)

      // Animate each item
      gsap.set(el, {
        rotation: item.rotation,
        scale: item.scale,
        opacity: 0,
      })

      gsap.to(el, {
        opacity: 1,
        duration: 1,
        delay: Math.random(),
      })

      // Floating animation
      gsap.to(el, {
        y: "-=30",
        x: "+=20",
        rotation: `+=${Math.random() * 40 - 20}`,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })

    // Mouse movement effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const xPos = clientX / window.innerWidth - 0.5
      const yPos = clientY / window.innerHeight - 0.5

      gsap.to(containerRef.current?.children, {
        x: xPos * 20,
        y: yPos * 20,
        duration: 1,
        ease: "power1.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full"></div>
}
