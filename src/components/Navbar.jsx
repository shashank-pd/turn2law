"use client";
import { useState } from "react";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import {
  House,
  Users,
  MessageSquare,
  UserRound,
  UserPlus,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, handleLogout } = useAuth();

  const toggleIcon = () => setIsDark(!isDark);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex justify-between items-center h-16 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logot2l.png" alt="Turn2Law Logo" className="h-8 w-auto invert" />
          <span className="text-xl font-bold text-gray-800">Turn2Law</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link href="/" className="flex items-center text-sm font-medium hover:text-blue-600 transition">
            <House className="h-4 w-4 mr-1" /> Home
          </Link>
          <Link href="/consult" className="flex items-center text-sm font-medium hover:text-blue-600 transition">
            <Users className="h-4 w-4 mr-1" /> Consult
          </Link>
          <Link href="/chatbot" className="flex items-center text-sm font-medium hover:text-blue-600 transition">
            <MessageSquare className="h-4 w-4 mr-1" /> Legal AI Assistant
          </Link>

          {!user ? (
            <>
              <Link href="/login" className="flex items-center text-sm font-medium hover:text-blue-600 transition">
                <UserRound className="h-4 w-4 mr-1" /> Login
              </Link>
              <Link href="/signup" className="flex items-center px-3 py-1 text-sm font-medium border rounded-3xl hover:text-blue-600 transition">
                <UserPlus className="h-4 w-4 mr-1" /> Sign up
              </Link>
            </>
          ) : (
            <>
              <Link href="/userprofile" className="flex items-center text-sm font-medium hover:text-blue-600 transition">
                <UserRound className="h-4 w-4 mr-1" /> {user?.user_metadata?.username || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm font-medium border rounded-3xl hover:text-blue-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {/* Theme toggle */}
          <div className="cursor-pointer" onClick={toggleIcon}>
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden mx-4 my-2 p-4 space-y-3 rounded-2xl shadow-lg bg-white/95 backdrop-blur-md border border-gray-200 transition-all duration-300 ease-in-out">
          <Link href="/" className="flex items-center text-sm font-medium gap-2 hover:text-blue-600 transition">
            <House className="h-4 w-4" /> Home
          </Link>
          <Link href="/consult" className="flex items-center text-sm font-medium gap-2 hover:text-blue-600 transition">
            <Users className="h-4 w-4" /> Consult
          </Link>
          <Link href="/chatbot" className="flex items-center text-sm font-medium gap-2 hover:text-blue-600 transition">
            <MessageSquare className="h-4 w-4" /> Legal AI Assistant
          </Link>

          {!user ? (
            <>
              <Link href="/login" className="flex items-center text-sm font-medium gap-2 hover:text-blue-600 transition">
                <UserRound className="h-4 w-4" /> Login
              </Link>
              <Link href="/signup" className="flex items-center text-sm font-medium gap-2 hover:text-blue-600 transition">
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </>
          ) : (
            <>
              <Link href="/userprofile" className="flex items-center text-sm font-medium gap-2 hover:text-blue-600 transition">
                <UserRound className="h-4 w-4" /> {user?.user_metadata?.username || user.email}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm font-medium gap-2 hover:text-blue-600 transition w-full text-left"
              >
                <X className="h-4 w-4" /> Logout
              </button>
            </>
          )}

          {/* Theme Toggle */}
          <div className="pt-2 cursor-pointer flex items-center gap-2 text-sm font-medium hover:text-blue-600 transition" onClick={toggleIcon}>
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-600" />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </div>
        </div>
      )}
    </nav>
  );
}
