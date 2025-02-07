"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useAnimation, useScroll, useTransform } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, CheckCircle, Calendar, BarChart2, Zap } from "lucide-react"

const LandingPage: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const backgroundColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#f0f9ff", "#e0f2fe", "#bae6fd"])

  return (
    <motion.div className="min-h-screen" style={{ backgroundColor }}>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <DashboardShowcase />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      <FloatingActionButton />
    </motion.div>
  )
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`py-4 px-6 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.h1 className="text-2xl font-bold text-blue-600" whileHover={{ scale: 1.05 }}>
          TaskMaster
        </motion.h1>
        <nav className="space-x-4 flex">
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 transition duration-300">
            Login
          </Link>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/auth/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300"
            >
              Sign Up
            </Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  )
}

const HeroSection: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="container mx-auto text-center relative">
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-4 text-blue-800"
        >
          Manage Tasks Like a <span className="text-blue-600">Pro</span>
        </motion.h2>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-8 text-gray-600"
        >
          Boost your productivity with our intuitive task management system.
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/auth/register"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300 inline-flex items-center"
          >
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </motion.div>
        <motion.div
          className="absolute -z-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <Image
            src="/placeholder.svg?height=600&width=600"
            width={600}
            height={600}
            alt="Abstract Background"
            className="opacity-20"
          />
        </motion.div>
      </div>
    </section>
  )
}

const FeaturesSection: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-blue-800">Powerful Features</h3>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <FeatureCard
            icon={<CheckCircle className="w-12 h-12 text-blue-600" />}
            title="Smart Task Organization"
            description="Effortlessly create, categorize, and prioritize your tasks with AI-powered suggestions."
          />
          <FeatureCard
            icon={<Calendar className="w-12 h-12 text-blue-600" />}
            title="Intelligent Scheduling"
            description="Let our AI optimize your schedule for maximum productivity and work-life balance."
          />
          <FeatureCard
            icon={<BarChart2 className="w-12 h-12 text-blue-600" />}
            title="Insightful Analytics"
            description="Gain deep insights into your productivity patterns with interactive charts and reports."
          />
        </motion.div>
      </div>
    </section>
  )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition duration-300 border border-blue-100"
  >
    <motion.div className="flex justify-center mb-4" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
      {icon}
    </motion.div>
    <h4 className="text-xl font-semibold mb-2 text-blue-800">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const DashboardShowcase: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-2xl overflow-hidden border border-blue-200"
        >
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Image
              src="/dashboard.png"
              width={1200}
              height={600}
              alt="TaskMaster Dashboard"
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const TestimonialsSection: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12 text-blue-800">What Our Users Say</h3>
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <TestimonialCard
            quote="TaskMaster has revolutionized how I manage my projects. It's like having a personal assistant!"
            author="Jane Doe"
            role="Project Manager"
          />
          <TestimonialCard
            quote="The AI-powered scheduling is a game-changer. I've never been more productive!"
            author="John Smith"
            role="Freelance Developer"
          />
          <TestimonialCard
            quote="The analytics feature helps me understand my work patterns and optimize my time like never before."
            author="Emily Brown"
            role="Team Lead"
          />
        </motion.div>
      </div>
    </section>
  )
}

const TestimonialCard: React.FC<{ quote: string; author: string; role: string }> = ({ quote, author, role }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-blue-100"
  >
    <p className="text-gray-600 mb-4 italic">&ldquo;{quote}&rdquo;</p>
    <div className="font-semibold text-blue-800">{author}</div>
    <div className="text-sm text-gray-500">{role}</div>
  </motion.div>
)

const CTASection: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section ref={ref} className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto text-center">
        <motion.h3
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          className="text-3xl font-bold mb-4"
        >
          Ready to Supercharge Your Productivity?
        </motion.h3>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.2 }}
          className="text-xl mb-8"
        >
          Join thousands of users who have transformed their task management with TaskMaster.
        </motion.p>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/auth/register"
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300 inline-flex items-center"
          >
            Start Your Free Trial <ArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto text-center">
      <p>&copy; 2023 TaskMaster. All rights reserved.</p>
      <div className="mt-4">
        <Link href="/privacy" className="text-gray-400 hover:text-white mx-2 transition duration-300">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-gray-400 hover:text-white mx-2 transition duration-300">
          Terms of Service
        </Link>
        <Link href="/contact" className="text-gray-400 hover:text-white mx-2 transition duration-300">
          Contact Us
        </Link>
      </div>
    </div>
  </footer>
)

const FloatingActionButton: React.FC = () => (
  <motion.div className="fixed bottom-8 right-8 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
    <Link
      href="/auth/register"
      className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
    >
      <Zap size={24} />
    </Link>
  </motion.div>
)

export default LandingPage

