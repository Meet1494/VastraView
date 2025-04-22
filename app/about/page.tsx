import Link from "next/link"
import Image from "next/image"
import { RollerCoaster } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('/mesh-bg.svg')] bg-cover opacity-20 z-0"></div>

      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              VastraView
            </h1>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Home
          </Link>
          <Link href="/#features" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Features
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">
            About
          </Link>
        </nav>
        <div>
          <Link
            href="/auth"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">About VastraView</h1>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 text-lg mb-6">
              VastraView was created with a simple yet powerful mission: to revolutionize how people shop for clothes
              online. By leveraging cutting-edge AI and computer vision technology, we're eliminating the uncertainty of
              online shopping and reducing the environmental impact of clothing returns.
            </p>
            <p className="text-gray-300 text-lg">
              Our platform allows users to virtually try on clothes before purchasing, providing accurate size
              recommendations and a realistic preview of how garments will look on their body. We believe this
              technology will transform the fashion industry, making it more sustainable, accessible, and personalized.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">Meet Our Team</h2>
          <p className="text-gray-300 text-lg mb-8">
            VastraView was developed by a passionate team of students from the Information Technology department at SVKM's D.J. Sanghvi College of Engineering. Our diverse backgrounds and shared vision have allowed us to create a truly
            
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Meet Jain",
                role: "Team Lead & Developer",
                image: "/assets/meet1.jpg",
              },
              {
                name: "Riya Gala",
                role: "Developer",
                image: "/assets/riya.jpg",
              },
              {
                name: "Kaivan Shah",
                role: "Researcher",
                image: "/assets/kaivan.jpg",
              },
              {
                name: "Rahil Dabhi",
                role: "Researcher",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Prof. Neha Katre",
                role: "Mentor",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group"
              >
                <div className="h-64 overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-cyan-400 mb-3">{member.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900/70 backdrop-blur-md rounded-xl border border-gray-800 p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-300 text-lg mb-4">
              VastraView began as an IPD project in 2023, where our team of four students came together to solve the
              problem of online clothing returns. What started as an innovative idea evolved into a comprehensive
              platform that caught the attention of faculty and local businesses.
            </p>
            <p className="text-gray-300 text-lg mb-4">
              With support from mentorship from Prof, Neha Katre, we've
              refined our technology and expanded our vision.
            </p>
            <p className="text-gray-300 text-lg">
              Today, VastraView represents the intersection of fashion, technology, and sustainability. We're proud to
              be student innovators working on real-world solutions, and we're excited about the future of virtual
              fashion technology.
            </p>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Get In Touch</h2>
            <p className="text-gray-300 text-lg mb-8">
              Have questions or interested in collaborating with us? We'd love to hear from you!
            </p>
            <a
              href="mailto:team@vastraview.com"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 py-10 relative z-10 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} VastraView. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
