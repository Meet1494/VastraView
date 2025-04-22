"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Quote } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !testimonialsRef.current) return

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

    // Animate each testimonial
    const testimonials = testimonialsRef.current.querySelectorAll(".testimonial")
    testimonials.forEach((testimonial, index) => {
      gsap.from(testimonial, {
        scrollTrigger: {
          trigger: testimonial,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.15,
        ease: "power3.out",
      })
    })

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Fashion Blogger",
      quote:
        "VastraView has completely changed how I shop for clothes online. The virtual try-on is incredibly accurate!",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Samantha Lee",
      role: "Student",
      quote:
        "As someone who hates returning clothes, this app is a game-changer. The size recommendations are spot on!",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Marcus Chen",
      role: "Software Developer",
      quote:
        "The technology behind VastraView is impressive. I can quickly see how different outfits look without trying them on physically.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          What Our Users Say
        </span>
      </h2>

      <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="mb-6 text-cyan-500/30">
              <Quote size={40} />
            </div>
            <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-white font-medium">{testimonial.name}</h4>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
