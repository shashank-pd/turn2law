'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronsDown } from "lucide-react";
import FeatureCard from "../components/FeatureCard";
import { features } from "../components/features";


export default function HomePage() {
  const ref = useRef(null);
  const { scrollY } = useScroll();


  // Parallax and opacity
  const y = useTransform(scrollY, [0, 300], [0, -250]);
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const background = useTransform(scrollY, [0, 50], ['rgba(0, 0, 0, 0.15)', 'rgba(0, 0, 0, 0)']);
  const hideArrow = useTransform(scrollY, [0, 150], [1, 0]);
  const showButtons = useTransform(scrollY, [90, 150], [0, 1]);
  // Text color transition (white to black)
  const color = useTransform(scrollY, [0, 100], ['#ffffff', '#000000']);


  return (
    <div ref={ref} className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <motion.h1
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 150, opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ color, backgroundColor: background }}
            className="text-4xl font-bold tracking-tight sm:text-6xl mb-6"
          >
            Legal Solutions Made Simple
          </motion.h1>

          <motion.p
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 150, opacity: 1 }}
            className="text-xl"
            style={{ color, backgroundColor: background }}
          >
            Access expert legal services instantly. Connect with qualified lawyers
            and get the legal support you need, when you need it.

          </motion.p>

          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 20 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1,
            }}
            style={{ opacity: hideArrow }}
            className="absolute bottom-30 left-1/2 transform -translate-x-1/2 z-20"
          >
            <ChevronsDown className="h-10 w-10 text-white opacity-80" />
          </motion.div>


          <motion.div

            style={{ opacity: showButtons }}
            className="flex gap-7 justify-center mt-56 mb-0"
          >
            <button className="bg-black text-white px-6 py-2 rounded-lg hover:shadow-[-25px_10px_50px_rgba(0,0,0,0.5)] transition cursor-pointer">
              Get Legal Consultation
            </button>
            <button className="bg-white text-black px-6 py-2 rounded-lg shadow-[0_10px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition cursor-pointer">
              Chat with AI Assistant
            </button>
          </motion.div>
        </div>
      </section >

      <section className="px-4 py-8">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-10 text-center">Features</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
    </div >
  );
}