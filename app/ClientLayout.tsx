"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>MetaMas - Ignite Your Future with Intelligent Data</title>
        <meta
          name="description"
          content="MetaMas helps businesses transform complex data landscapes into clear, actionable intelligence, sparking innovation and fueling sustainable growth."
        />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>{mounted ? children : null}</body>
    </html>
  )
}
