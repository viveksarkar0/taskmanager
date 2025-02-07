import type React from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, Calendar, BarChart2 } from "lucide-react"

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Task Management System</h1>
          <nav className="space-x-4">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              Login
            </Link>
            <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Manage Your Tasks Efficiently</h2>
          <p className="text-xl mb-8">
            Stay organized and boost your productivity with our powerful task management system.
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg text-lg hover:bg-gray-100 transition duration-300 inline-flex items-center"
          >
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="w-12 h-12 text-blue-600" />}
              title="Task Organization"
              description="Easily create, categorize, and prioritize your tasks."
            />
            <FeatureCard
              icon={<Calendar className="w-12 h-12 text-blue-600" />}
              title="Project Management"
              description="Group related tasks into projects for better organization."
            />
            <FeatureCard
              icon={<BarChart2 className="w-12 h-12 text-blue-600" />}
              title="Progress Tracking"
              description="Monitor your progress with intuitive dashboards and reports."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-200 dark:bg-gray-800 py-20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8">Join thousands of users who have improved their productivity with our system.</p>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 inline-flex items-center"
          >
            Sign Up Now <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">What Our Users Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="This task management system has completely transformed how I organize my work. Highly recommended!"
              author="Jane Doe"
              role="Project Manager"
            />
            <TestimonialCard
              quote="I love how easy it is to track my progress and stay on top of deadlines. Great tool!"
              author="John Smith"
              role="Freelance Developer"
            />
            <TestimonialCard
              quote="The project management features are fantastic. It's helped our team collaborate much more effectively."
              author="Emily Brown"
              role="Team Lead"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Task Management System. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white mx-2">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-gray-400 hover:text-white mx-2">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
)

const TestimonialCard: React.FC<{ quote: string; author: string; role: string }> = ({ quote, author, role }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <p className="text-gray-600 dark:text-gray-300 mb-4">{quote}</p>
    <div className="font-semibold">{author}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
  </div>
)

export default LandingPage

