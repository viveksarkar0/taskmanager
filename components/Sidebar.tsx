import type React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter()

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Tasks", path: "/tasks" },
    { name: "Projects", path: "/projects" },
    { name: "Calendar", path: "/calendar" },
  ]

  return (
    <aside
      className={`
      bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:relative md:translate-x-0 transition duration-200 ease-in-out z-20
    `}
    >
      <nav>
        {navItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <a
              className={`block py-2.5 px-4 rounded transition duration-200 ${
                router.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => {
                if (window.innerWidth < 768) {
                  onClose()
                }
              }}
            >
              {item.name}
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

