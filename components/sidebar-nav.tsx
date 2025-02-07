"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutGrid, Clock, Calendar, Settings, BarChart2 } from "lucide-react"

const items = [
  {
    title: "Dashboard",
    icon: LayoutGrid,
    href: "/dashboard",
  },
  {
    title: "Recent",
    icon: Clock,
    href: "/recent",
  },
  {
    title: "Calendar",
    icon: Calendar,
    href: "/calendar",
  },
  {
    title: "Analytics",
    icon: BarChart2,
    href: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-2 px-2">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
              pathname === item.href && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden md:inline-block">{item.title}</span>
          </Link>
        )
      })}
    </nav>
  )
}

