import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MetaMas - Ignite Your Future with Intelligent Data",
  description:
    "MetaMas helps businesses transform complex data landscapes into clear, actionable intelligence, sparking innovation and fueling sustainable growth.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'