import Link from "next/link";
import { Mail, Phone, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-white via-gray-50 to-gray-100 border-t shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-700">
        
        {/* Brand Section */}
        <div className="space-y-4 text-center md:text-left">
          <div className="flex justify-center md:justify-start items-center space-x-2">
            <div>
            <img src="/logot2l.png" alt="Turn2Law Logo" className="h-8 w-auto invert" />
            </div>
            <span className="text-xl font-bold text-black">Turn2Law</span>
          </div>
          <p className="text-gray-600">
            Your trusted partner for instant legal support, lawyer matching, and secure consultations.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="font-semibold text-black text-lg">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="flex items-center hover:text-blue-600 transition"><ChevronRight className="w-4 h-4 mr-2" /> Home</Link></li>
            <li><Link href="/consult" className="flex items-center hover:text-blue-600 transition"><ChevronRight className="w-4 h-4 mr-2" /> Consult a Lawyer</Link></li>
            <li><Link href="/chat" className="flex items-center hover:text-blue-600 transition"><ChevronRight className="w-4 h-4 mr-2" /> Legal AI Assistant</Link></li>
            <li><Link href="/privacy" className="flex items-center hover:text-blue-600 transition"><ChevronRight className="w-4 h-4 mr-2" /> Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-center md:text-left">
          <h4 className="font-semibold text-black text-lg">Contact Us</h4>
          <a href="mailto:support@turn2law.com" className="flex justify-center md:justify-start items-center hover:text-blue-600 transition">
            <Mail className="w-4 h-4 mr-2" /> support@turn2law.com
          </a>
          <a href="tel:+919876543210" className="flex justify-center md:justify-start items-center hover:text-blue-600 transition">
            <Phone className="w-4 h-4 mr-2" /> +91 9876543210
          </a>
          <p className="text-gray-500 text-xs pt-4">© {new Date().getFullYear()} Turn2Law. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
