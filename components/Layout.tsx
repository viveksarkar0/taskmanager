"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import useDarkMode from "@/hooks/useDarkMode"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-dark p-6">{children}</main>
      </div>
    </div>
  )
}

export default Layout

