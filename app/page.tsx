"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Brain, ChevronDown, Database, Globe, Menu, X, ArrowUpRight, Mail, Phone } from "lucide-react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const aboutRef = useRef(null)
  const teamRef = useRef(null)
  const contactRef = useRef(null)

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(heroScrollProgress, [0, 1], [1, 0])
  const scale = useTransform(heroScrollProgress, [0, 1], [1, 0.8])
  const y = useTransform(heroScrollProgress, [0, 1], [0, 100])

  const [mounted, setMounted] = useState(false)

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = [
        { id: "hero", ref: heroRef },
        { id: "services", ref: servicesRef },
        { id: "about", ref: aboutRef },
        { id: "team", ref: teamRef },
        { id: "contact", ref: contactRef },
      ]

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.ref.current) {
          const offsetTop = section.ref.current.offsetTop
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-sm bg-black/30 border-b border-white/5">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative overflow-hidden rounded-lg transition-all duration-300 group-hover:glow-cyan">
                <Image
                  src="/logo_without_text.png"
                  alt="MetaMas Logo"
                  width={40}
                  height={40}
                  className="h-10 w-auto transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-gradient-full transition-all duration-300">
                MetaMas
              </span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  href="#services"
                  className={`text-sm font-medium transition-all duration-300 ${activeSection === "services" ? "text-brand-orange" : "text-white/80 hover:text-brand-orange"}`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className={`text-sm font-medium transition-all duration-300 ${activeSection === "about" ? "text-brand-red" : "text-white/80 hover:text-brand-red"}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className={`text-sm font-medium transition-all duration-300 ${activeSection === "team" ? "text-brand-blue" : "text-white/80 hover:text-brand-blue"}`}
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className={`text-sm font-medium transition-all duration-300 ${activeSection === "contact" ? "text-brand-cyan" : "text-white/80 hover:text-brand-cyan"}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="hidden md:block">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-brand-blue text-white shadow-lg shadow-brand-blue/25 transition-all duration-200 hover:bg-brand-blue-dark hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-black"
            >
              <span>Get Started</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <button
            className="rounded-full p-2 text-white/80 transition hover:bg-white/10 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-16 items-center justify-end px-4">
              <button
                className="rounded-full p-2 text-white/80 transition hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="px-4 py-8">
              <ul className="flex flex-col space-y-6">
                <li>
                  <Link
                    href="#services"
                    className="group flex items-center text-2xl font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent transition-all duration-300 group-hover:translate-x-2">
                      Services
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 text-brand-orange" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="group flex items-center text-2xl font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="bg-gradient-to-r from-brand-red to-brand-red-light bg-clip-text text-transparent transition-all duration-300 group-hover:translate-x-2">
                      About
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 text-brand-red" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#team"
                    className="group flex items-center text-2xl font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="bg-gradient-to-r from-brand-blue to-brand-blue-light bg-clip-text text-transparent transition-all duration-300 group-hover:translate-x-2">
                      Team
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 text-brand-blue" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="group flex items-center text-2xl font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="bg-gradient-to-r from-brand-cyan to-brand-cyan-light bg-clip-text text-transparent transition-all duration-300 group-hover:translate-x-2">
                      Contact
                    </span>
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 text-brand-cyan" />
                  </Link>
                </li>
                <li className="pt-6">
                  <Link
                    href="#contact"
                    className="inline-flex items-center rounded-full bg-brand-gradient-animate px-6 py-3 text-lg font-medium shadow-lg shadow-brand-blue/20 transition-all duration-300 hover:shadow-brand-red/30 hover:scale-105"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Get Started</span>
                    <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section - DARK THEME */}
      <section ref={heroRef} id="hero" className="relative flex min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80 z-10"></div>
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/forest_road_aerial.jpeg"
              alt="Aerial view of road through autumn forest"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Animated particles/dots in background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-brand-orange animate-pulse"></div>
          <div className="absolute top-1/3 left-1/2 h-2 w-2 rounded-full bg-brand-red animate-pulse-slow"></div>
          <div className="absolute top-2/3 left-1/3 h-2 w-2 rounded-full bg-brand-blue animate-pulse"></div>
          <div className="absolute top-1/2 left-3/4 h-2 w-2 rounded-full bg-brand-cyan animate-pulse-slow"></div>
          <div className="absolute top-3/4 left-1/5 h-2 w-2 rounded-full bg-brand-orange animate-pulse"></div>
        </div>

        <motion.div
          style={{ opacity, y, scale }}
          className="absolute bottom-0 left-0 right-0 z-10 mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 text-right"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="ml-auto max-w-xl"
          >
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl lg:text-5xl">
              <span className="block">Ignite Your Future with</span>
              <span className="mt-2 block text-gradient-full">Intelligent Data</span>
            </h1>
            <p className="mt-6 text-sm text-white/80 sm:text-base md:text-lg">
              Imagine your organization powered by data that doesn't just inform—it actively{" "}
              <strong className="text-brand-orange">propels</strong> your success. We transform complex data landscapes
              into clear, actionable intelligence, <strong className="text-brand-cyan">sparking</strong> innovation and
              fueling sustainable growth.
            </p>
            <div className="mt-8 flex flex-col items-end space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 sm:justify-end">
              <Link href="#services" className="btn-primary group">
                <span>Explore Solutions</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="#about" className="btn-secondary group">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/50" />
        </div>

        {/* Transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0c1631] to-transparent"></div>
      </section>

      {/* Data visualization section - BRIGHT THEME */}
      <section
        ref={servicesRef}
        id="services"
        className="section-padding relative bg-gradient-to-b from-[#0c1631] to-[#1a2b5c]"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,102,0.2),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(0,204,255,0.2),transparent_40%)]"></div>
          <Image
            src="/database_visualization.jpeg"
            alt="Data visualization"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl container-padding">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="text-gradient-full">Our Services: Tailored for Data-Driven Success</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
                We see data as the vital force <strong className="text-brand-red">driving</strong> your business
                forward, not just residing in databases.
              </p>
            </motion.div>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card card-hover-orange group"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 blur-3xl transition group-hover:opacity-100 opacity-50"></div>
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-brand-orange/10 to-brand-orange/5 p-3 transition-all duration-300 group-hover:glow-orange">
                  <Database className="h-6 w-6 text-brand-orange" />
                </div>
                <h3 className="mb-4 text-xl font-bold group-hover:text-brand-orange transition-colors duration-300">
                  Intelligent Data Management & Governance
                </h3>
                <p className="text-white/70">
                  Take decisive control of your data ecosystem with structured management that ensures unwavering
                  reliability, strict compliance, and effortless accessibility.
                </p>
                <div className="mt-6 flex items-center text-brand-orange/70 group-hover:text-brand-orange transition-colors duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card card-hover-red group"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-red/20 to-brand-red/5 blur-3xl transition group-hover:opacity-100 opacity-50"></div>
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-brand-red/10 to-brand-red/5 p-3 transition-all duration-300 group-hover:glow-red">
                  <Brain className="h-6 w-6 text-brand-red" />
                </div>
                <h3 className="mb-4 text-xl font-bold group-hover:text-brand-red transition-colors duration-300">
                  Data Analytics & Insight Engineering
                </h3>
                <p className="text-white/70">
                  Transform raw data into compelling insights that not only inform but actively drive strategic actions
                  and deliver tangible business outcomes.
                </p>
                <div className="mt-6 flex items-center text-brand-red/70 group-hover:text-brand-red transition-colors duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card card-hover-blue group"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-blue/5 blur-3xl transition group-hover:opacity-100 opacity-50"></div>
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 p-3 transition-all duration-300 group-hover:glow-blue">
                  <Globe className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="mb-4 text-xl font-bold group-hover:text-brand-blue transition-colors duration-300">
                  Artificial Intelligence & Machine Learning
                </h3>
                <p className="text-white/70">
                  Integrate intelligence seamlessly into every facet of your workflows, with solutions tailored
                  specifically to your unique business needs.
                </p>
                <div className="mt-6 flex items-center text-brand-blue/70 group-hover:text-brand-blue transition-colors duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card card-hover-cyan group"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-cyan/5 blur-3xl transition group-hover:opacity-100 opacity-50"></div>
              <div className="relative">
                <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-cyan/5 p-3 transition-all duration-300 group-hover:glow-cyan">
                  <svg className="h-6 w-6 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold group-hover:text-brand-cyan transition-colors duration-300">
                  Cloud Data Transformation
                </h3>
                <p className="text-white/70">
                  Strategically embrace cloud technology, ensuring your infrastructure is not just modern, but a dynamic
                  foundation that supports agility and innovation.
                </p>
                <div className="mt-6 flex items-center text-brand-cyan/70 group-hover:text-brand-cyan transition-colors duration-300">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 flex justify-center"
          >
            <Link
              href="#about"
              className="group flex items-center space-x-2 text-lg font-medium text-brand-blue transition-all duration-300 hover:text-brand-cyan"
            >
              <span>Learn more about our approach</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>

        {/* Transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Success stories section - DARK THEME */}
      <section ref={aboutRef} id="about" className="section-padding relative bg-black">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
        </div>
        <div className="mx-auto max-w-7xl container-padding relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="text-gradient-full">Our Mission: Transform Data into Your Strategic Advantage</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
                From establishing robust governance frameworks to extracting profound analytics and implementing
                intelligent automation, we meticulously engineer solutions that maximize your data's inherent value.
              </p>
            </motion.div>
          </div>

          <div className="mt-20">
            <div className="grid gap-16 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative overflow-hidden rounded-2xl aspect-video bg-gradient-to-b from-brand-orange/20 to-black/40 transition-all duration-500 hover:scale-[1.02] shadow-lg shadow-brand-orange/5 hover:shadow-brand-orange/20"
              >
                <Image
                  src="/farmer_field.jpeg"
                  alt="Agricultural transformation"
                  fill
                  className="object-cover object-bottom transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-8">
                  <h3 className="text-2xl font-bold">Agricultural Revolution</h3>
                  <p className="mt-2 text-white/80">
                    How predictive analytics is transforming crop management and increasing yields by 40%
                  </p>
                  <Link
                    href="#"
                    className="mt-4 inline-flex items-center text-brand-orange transition-all duration-300 hover:text-brand-orange-light group"
                  >
                    <span>Read case study</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group relative overflow-hidden rounded-2xl aspect-video bg-gradient-to-b from-brand-cyan/20 to-black/40 transition-all duration-500 hover:scale-[1.02] shadow-lg shadow-brand-cyan/5 hover:shadow-brand-cyan/20"
              >
                <Image
                  src="/train_station.jpeg"
                  alt="Logistics optimization"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-8">
                  <h3 className="text-2xl font-bold">Logistics Optimization</h3>
                  <p className="mt-2 text-white/80">
                    AI-powered route optimization reducing fuel consumption by 30% and delivery times by 25%
                  </p>
                  <Link
                    href="#"
                    className="mt-4 inline-flex items-center text-brand-cyan transition-all duration-300 hover:text-brand-cyan-light group"
                  >
                    <span>Read case study</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a1a3d] to-transparent"></div>
      </section>

      {/* Team section - BRIGHT THEME */}
      <section
        ref={teamRef}
        id="team"
        className="section-padding relative bg-gradient-to-b from-[#0a1a3d] to-[#1a2b5c]"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,0,102,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(0,204,255,0.15),transparent_50%)]"></div>
        </div>
        <div className="mx-auto max-w-7xl container-padding relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="text-gradient-full">Why Choose Metamas?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
                Our approach combines deep expertise, tailored solutions, and a relentless focus on innovation
              </p>
            </motion.div>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-video bg-gradient-to-b from-brand-orange/20 to-black/40 transition-all duration-500 group-hover:scale-[1.02] shadow-lg shadow-brand-orange/5 group-hover:shadow-brand-orange/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent bg-brand-orange/5"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="h-20 w-20 text-brand-orange opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 glow-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-brand-orange transition-colors duration-300">
                Deep Expertise, Measurable Impact
              </h3>
              <p className="text-white/70">
                Our seasoned professionals deliver decades of combined experience, translating technical excellence into
                tangible business results that you can see and measure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-video bg-gradient-to-b from-brand-red/20 to-black/40 transition-all duration-500 group-hover:scale-[1.02] shadow-lg shadow-brand-red/5 group-hover:shadow-brand-red/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent bg-brand-red/5"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="h-20 w-20 text-brand-red opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 glow-red"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-brand-red transition-colors duration-300">
                Precisely Tailored Solutions
              </h3>
              <p className="text-white/70">
                We collaborate closely with your team, immersing ourselves in your unique challenges to ensure our
                solutions perfectly fit your industry and strategic objectives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-video bg-gradient-to-b from-brand-blue/20 to-black/40 transition-all duration-500 group-hover:scale-[1.02] shadow-lg shadow-brand-blue/5 group-hover:shadow-brand-blue/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent bg-brand-blue/5"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="h-20 w-20 text-brand-blue opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 glow-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold group-hover:text-brand-blue transition-colors duration-300">
                Focused on Innovation
              </h3>
              <p className="text-white/70">
                We continuously leverage the latest advancements in AI, machine learning, and generative technologies,
                ensuring your digital capabilities remain not just current, but a step ahead of the curve.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Testimonial section - DARK THEME */}
      <section className="section-padding relative bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(25,25,25,1),transparent_70%)]"></div>
        </div>
        <div className="mx-auto max-w-7xl container-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-gradient-to-br from-[#0c1631]/80 to-[#1a2b5c]/60 p-8 md:p-12 lg:p-16 backdrop-blur shadow-[0_0_50px_rgba(0,102,255,0.1)]"
          >
            <div className="absolute -top-6 left-10 text-6xl text-brand-red opacity-50">"</div>
            <div className="relative">
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-light italic text-white/90 md:text-center">
                MetaMas has revolutionized our operational processes with their AI solutions. By leveraging a
                customer-centric approach, they have helped us in delivering a unique value proposition to our customers
                and partners.
              </blockquote>
              <div className="mt-8 flex items-center justify-center">
                <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-brand-gradient-warm">
                  <Image
                    src="/michael_anderson.jpeg"
                    alt="Client"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium">Michael Anderson</p>
                  <p className="text-sm text-white/70">CTO, Fortune 500 Company</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a1a3d] to-transparent"></div>
      </section>

      {/* Contact section - BRIGHT THEME */}
      <section
        ref={contactRef}
        id="contact"
        className="section-padding relative bg-gradient-to-b from-[#0a1a3d] to-[#1a2b5c]"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,0,102,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(0,204,255,0.15),transparent_40%)]"></div>
        </div>
        <div className="mx-auto max-w-7xl container-padding relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                <span className="text-gradient-full">Ready to Turn Your Data into Your Greatest Asset?</span>
              </h2>
              <p className="mt-4 text-lg text-white/70">
                At Metamas, we believe intelligently managed data becomes your strongest competitive advantage, driving
                not just insights but tangible growth, profound intelligence, and enduring resilience in a dynamic
                market. Let's partner together to build your AI-driven future, starting today.
              </p>
              <p className="mt-4 text-lg font-semibold text-white/90">
                Contact us today to explore how Metamas can elevate your data and AI capabilities and ignite your
                organization's full potential.
              </p>
              <div className="mt-8">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-red/20 transition-all duration-300 hover:glow-orange">
                    <Mail className="h-5 w-5 text-brand-orange" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Email</p>
                    <p className="text-lg">info@metamas.ai</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue/20 to-brand-cyan/20 transition-all duration-300 hover:glow-cyan">
                    <Phone className="h-5 w-5 text-brand-cyan" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Phone</p>
                    <p className="text-lg">703-782-4567</p>
                  </div>
                </div>
                <div className="mt-4 flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-cyan/20 transition-all duration-300 hover:glow-orange mt-1">
                    <svg className="h-5 w-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Address</p>
                    <p className="text-lg">MetaMas INC</p>
                    <p className="text-white/70">6026 Myers CT,</p>
                    <p className="text-white/70">Providence Village,</p>
                    <p className="text-white/70">Aubrey, Texas 76227</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/70">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur transition-all duration-300 focus:border-brand-orange focus:ring-brand-cyan focus:shadow-lg focus:shadow-brand-orange/10"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/70">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur transition-all duration-300 focus:border-brand-orange focus:ring-brand-cyan focus:shadow-lg focus:shadow-brand-orange/10"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white/70">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur transition-all duration-300 focus:border-brand-orange focus:ring-brand-cyan focus:shadow-lg focus:shadow-brand-orange/10"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 backdrop-blur transition-all duration-300 focus:border-brand-orange focus:ring-brand-cyan focus:shadow-lg focus:shadow-brand-orange/10"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-brand-gradient-animate px-6 py-3 text-lg font-medium text-white shadow-lg shadow-brand-blue/25 transition-all duration-300 hover:shadow-brand-orange/30 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-[#1a2b5c]"
                  >
                    <span className="flex items-center justify-center">
                      <span>Send Message</span>
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Footer - DARK THEME */}
      <footer className="relative bg-black border-t border-white/10 py-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(25,25,25,1),transparent_70%)]"></div>
        </div>
        <div className="mx-auto max-w-7xl container-padding relative z-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center group">
                <Image
                  src="/logo_without_text.png"
                  alt="MetaMas Logo"
                  width={30}
                  height={30}
                  className="h-8 w-auto mr-2 transition-transform duration-500 group-hover:scale-110"
                />
                <span className="text-xl font-bold text-white group-hover:text-gradient-full transition-all duration-300">
                  MetaMas
                </span>
              </div>
              <p className="mt-4 text-sm text-white/70">
                Transforming businesses through intelligent data solutions and AI innovation.
              </p>
              <p className="mt-2 text-sm text-white/70">
                <strong>Email:</strong> info@metamas.ai
              </p>
              <p className="text-sm text-white/70">
                <strong>Phone:</strong> 703-782-4567
              </p>
              <p className="text-sm text-white/70">
                <strong>Address:</strong> 6026 Myers CT, Providence Village, Aubrey, TX 76227
              </p>
              <div className="mt-6 flex space-x-4">
                <a href="#" className="text-white/50 hover:text-brand-orange transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-white/50 hover:text-brand-red transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="text-white/50 hover:text-brand-blue transition-colors duration-300">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Solutions</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-orange hover:translate-x-1 inline-block"
                  >
                    AI & Machine Learning
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-red hover:translate-x-1 inline-block"
                  >
                    Data Analytics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-blue hover:translate-x-1 inline-block"
                  >
                    Cloud Transformation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-cyan hover:translate-x-1 inline-block"
                  >
                    MLOps
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-orange hover:translate-x-1 inline-block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-red hover:translate-x-1 inline-block"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-blue hover:translate-x-1 inline-block"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-cyan hover:translate-x-1 inline-block"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-orange hover:translate-x-1 inline-block"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-red hover:translate-x-1 inline-block"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-blue hover:translate-x-1 inline-block"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-white/70 transition-all duration-300 hover:text-brand-cyan hover:translate-x-1 inline-block"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-center text-sm text-white/70">
              © {new Date().getFullYear()} MetaMas. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
