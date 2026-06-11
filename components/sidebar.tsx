"use client"

import { useState } from "react" // Added for toggle
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, UploadCloud, History, Settings, ShieldCheck, LogOut, Menu, X } from "lucide-react"
import { supabase } from "@/utils/supabase"

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Upload Sales", href: "/upload", icon: UploadCloud },
  { name: "Compliance Archive", href: "/archive", icon: History },
  { name: "KRA Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if (pathname === "/" || pathname === "/login") return null

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <>
      {/* MOBILE HEADER (Visible only on small screens) */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center fixed top-0 w-full z-50 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-blue-500 w-6 h-6" />
          <span className="font-bold tracking-tight">BridgeSync</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* SIDEBAR (Hidden on mobile unless isOpen is true) */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out border-r border-slate-800
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">BridgeSync</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4 md:mt-0">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)} // Close on click for mobile
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "hover:bg-slate-800 hover:text-white text-slate-400"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY (Closes menu when clicking outside) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}