"use client";

import Link from "next/link";
import { MessageSquare, Users, House, UserRound, UserPlus, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false); // false = light (show Moon)

  const toggleIcon = () => {
    setIsDark(!isDark);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-16 px-6 bg-white shadow-md">
      <div className="flex items-center space-x-2">
        <Link href="/" className="flex items-center">
          <img src="/logot2l.png" alt="Turn2Law Logo" className="h-8 w-auto invert" />
          <span className="ml-2 text-xl font-bold text-gray-800">Turn2Law</span>
        </Link>
      </div>

      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition">
          <House className="h-4 w-4 mr-2" />
          Home
        </Link>
        <Link href="/consult" className="inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition">
          <Users className="h-4 w-4 mr-2" />
          Consult
        </Link>
        <Link href="/chat" className="inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition">
          <MessageSquare className="h-4 w-4 mr-2" />
          Legal AI Assistant
        </Link>
        <Link href="/chat" className="inline-flex items-center px-1 pt-1 text-sm font-medium hover:text-blue-600 transition">
          <UserRound className="h-4 w-4 mr-2" />
          Login
        </Link>

        <Link href="/chat" className="inline-flex items-center p-2 text-sm font-medium text-black border rounded-3xl hover:text-blue-600 transition">
          <UserPlus className="h-4 w-4 mr-2" />
          Sign up
        </Link>
        {/* Toggle Icon */}
        <div className="flex items-center space-x-2 ml-0 cursor-pointer" onClick={toggleIcon}>
          {isDark ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600" />
          )}
        </div>
      </div>
    </nav>
  );
}
