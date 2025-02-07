"use client"

import type React from "react"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Moon, Sun, Menu } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  toggleDarkMode: () => void
  isDarkMode: boolean
  toggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, isDarkMode, toggleSidebar }) => {
  const { data: session } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white dark:bg-dark-light shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 md:hidden">
            <Menu className="text-gray-700 dark:text-dark" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-dark">Task Management System</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {isDarkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-700" />}
          </button>
          <div className="hidden md:block">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-dark">Welcome, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login">
                <a className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign In</a>
              </Link>
            )}
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            <Menu className="text-gray-700 dark:text-dark" />
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="mt-4 md:hidden">
          {session ? (
            <div className="flex flex-col space-y-2">
              <span className="text-gray-600 dark:text-dark">Welcome, {session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login">
              <a className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-center">
                Sign In
              </a>
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Header

