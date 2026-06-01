"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Search, Cpu, RefreshCcw, 
  Ghost, AlertTriangle, Zap, Coffee
} from 'lucide-react';

export default function NotFound() {
  const [isConfused, setIsConfused] = useState(false);

  return (
    <div className="min-h-screen grid-pattern flex items-center justify-center p-4 md:p-10 overflow-hidden selection:bg-yellow-200">
      
      {/* --- LAPTOP VIEW (Wide Ledger Look) --- */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="hidden md:flex paper-sheet bg-white border-4 border-black paper-shadow w-full max-w-5xl min-h-[500px] overflow-hidden relative"
      >
        {/* Left Side: Character Art */}
        <div className="w-1/2 border-r-4 border-black flex flex-col items-center justify-center p-12 bg-slate-50 relative group">
          <motion.div 
            animate={isConfused ? { rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] } : {}}
            className="text-blue-600 mb-8 cursor-pointer"
            onMouseEnter={() => setIsConfused(true)}
            onMouseLeave={() => setIsConfused(false)}
          >
            <pre className="text-[10px] leading-none font-bold">
              {`
          .-.       .-.
         /   \\     /   \\
        \\     \\   /     /
         \\     \\ /     /
          '-.   '   .-'
             \\     /
              )   (
             /     \\
            '._   _.'
               ' '
              `}
            </pre>
            <p className="handwritten text-center text-xl mt-4 font-black"># 404_Butterfly_Lost</p>
          </motion.div>
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase opacity-40 mb-2">Location: Nagpur_Kernel</p>
            <p className="font-mono text-xs font-bold bg-black text-white px-2 py-1 italic shadow-[4px_4px_0px_0px_#ef4444]">Error: Brain_Not_Found.exe</p>
          </div>
          {/* Subtle Doodle Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
        </div>

        {/* Right Side: Navigation & Sarcasm */}
        <div className="w-1/2 p-12 flex flex-col justify-between">
          <div>
            <h1 className="text-9xl font-bold handwritten tracking-tighter text-slate-900 leading-none mb-4">404</h1>
            <h2 className="text-2xl font-mono font-black uppercase border-b-4 border-black inline-block pb-2 mb-6">Entry_Deleted_By_Intern</h2>
            <p className="text-slate-600 font-medium italic leading-relaxed mb-10">
              "The good news? The butterfly terminal still works. The bad news? I have no idea where this page went. Probably moved to production too early."
            </p>
          </div>

          <div className="space-y-4">
            <Link href="/" className="w-full bg-black text-white py-4 font-mono font-black uppercase text-xs flex items-center justify-center gap-3 hover:bg-blue-600 transition-all paper-shadow active:translate-y-1">
              <ArrowLeft size={16} /> REBOOT_PORTFOLIO
            </Link>
          </div>
        </div>
      </motion.div>

      {/* --- MOBILE VIEW (Vertical Card Look) --- */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="md:hidden flex flex-col w-full max-w-sm paper-sheet bg-white border-4 border-black paper-shadow p-8 relative overflow-hidden"
      >
        <div className="flex justify-between items-start mb-10">
          <div className="bg-red-500 text-white px-3 py-1 font-mono font-black italic shadow-[4px_4px_0px_0px_black]">CRITICAL</div>
          <Zap size={24} className="text-yellow-500 fill-current" />
        </div>

        <div className="text-center mb-10">
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mb-6"
          >
            <Ghost size={80} strokeWidth={1.5} className="text-slate-300" />
          </motion.div>
          <h1 className="text-8xl font-bold handwritten leading-none mb-2">404</h1>
          <p className="font-mono text-[10px] uppercase font-black tracking-[0.3em] opacity-40">Ink Spilled Everywhere!</p>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-sm font-medium italic text-slate-500 text-center leading-relaxed">
            "Stop shaking the phone! This page is truly gone into the Amravati Void."
          </p>
          <Link href="/" className="w-full bg-black text-white py-5 font-mono font-black uppercase text-sm flex items-center justify-center gap-3 active:translate-y-1 shadow-[4px_4px_0px_0px_#3b82f6]">
            GO_HOME_OM <RefreshCcw size={18} />
          </Link>
        </div>

        <div className="flex justify-center gap-4 opacity-20 border-t-2 border-dashed border-slate-200 pt-6">
          <Cpu size={16} /> <Coffee size={16} /> <Ghost size={16} />
        </div>
      </motion.div>

      {/* Background Sub-text */}
      <p className="fixed bottom-6 font-mono text-[8px] uppercase opacity-20 tracking-[0.8em] pointer-events-none text-center w-full">
        SYSTEM_DIAGNOSTICS: 550K_USERS_REACHED // PAGE_NOT_FOUND
      </p>
    </div>
  );
}