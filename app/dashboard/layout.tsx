import { SidebarNav } from "@/components/sidebar-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import type React from "react" // Added import for React
import { Providers } from "@/components/provide-theme"


interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  return (
    <Providers>
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 md:block md:w-64">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4">
            <span className="font-bold">Task Manager</span>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <SidebarNav />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex flex-1 items-center gap-4">
            <h1 className="font-semibold">👋 Welcome, {session.user.name}!</h1>
          </div>
          <div className="flex items-center gap-4">
         
            <ModeToggle />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
      
          {children}
    

        </main>
      </div>
    </div>
    </Providers>
  )
}

