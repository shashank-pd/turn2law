'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from "next/navigation";
import { useRef } from 'react';
import { ChevronsDown } from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import { features } from "../components/features";

export default function HomePage() {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Framer Motion scroll-based animations
  const y = useTransform(scrollY, [0, 300], [0, -250]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const background = useTransform(scrollY, [0, 50], ['rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0)']);
  const hideArrow = useTransform(scrollY, [0, 150], [1, 0]);
  const showButtons = useTransform(scrollY, [90, 150], [0, 1]);
  const color = useTransform(scrollY, [0, 100], ['#ffffff', '#000000']);

  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            y,
            opacity,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        />

        {/* Foreground Text */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl">
          <motion.h1
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 150, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ color, backgroundColor: background }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Legal Solutions Made Simple
          </motion.h1>

          <motion.p
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 150, opacity: 1 }}
            className="text-base sm:text-lg lg:text-xl"
            style={{ color, backgroundColor: background }}
          >
            Fast and affordable AI-powered legal services — because your rights matter the most.
          </motion.p>

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 20 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            style={{ opacity: hideArrow }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          >
            <ChevronsDown className="h-8 w-8 sm:h-10 sm:w-10 text-white opacity-80" />
          </motion.div>

          <motion.div
            style={{ opacity: showButtons }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-7 justify-center mt-48"
          >
            <button
              onClick={() => router.push("/consult")}
              className="bg-indigo-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition cursor-pointer">
              Get Legal Consultation
            </button>
            <button
              onClick={() => router.push("/chatbot")}
              className="bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:shadow-md transition border border-gray-800 cursor-pointer">
              Chat with AI Assistant
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-8 py-12 sm:py-16 bg-gray-50">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-center mb-10">Features</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 sm:px-8 py-16 bg-white">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-center mb-12">
          What's <span className="text-yellow-400">Turn2Law?</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* About Text */}
          <div className="flex-1 bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-justify">
              <span className="font-semibold text-gray-800 ">Turn2Law</span> is a next-generation legal platform designed to simplify
              access to legal services for everyone. Whether you're facing an emergency, sorting critical documents, or seeking
              legal advice, Turn2Law connects you to trusted professionals instantly. Through our innovative approach to document
              handling, lawyer matching, and a comprehensive resource library, we bridge the gap between legal expertise and
              accessibility—making legal services more <span className="text-yellow-500 font-medium">affordable, efficient, and effective</span> for all.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="flex-1 bg-gray-100 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-8">
              {[
                { title: "10,000+", subtitle: "Consultations Done" },
                { title: "95%", subtitle: "Client Satisfaction" },
                { title: "24/7", subtitle: "Legal Support" },
                { title: "20+ Cities", subtitle: "Across India" },
              ].map((stat, index) => (
                <div key={index} className="text-center hover:scale-105 transition-transform duration-300">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-yellow-500">{stat.title}</h3>
                  <p className="text-sm sm:text-base text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
