"use client"

import { motion } from "framer-motion"
import { Activity, Zap, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 pt-20 pb-12">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-8"
      >
        <div className="relative">
          <Activity className="w-8 h-8 text-primary animate-pulse-glow" />
          <div className="absolute inset-0 bg-primary/30 blur-lg rounded-full" />
        </div>
        <span className="text-xl font-bold tracking-wider text-foreground">CHANCE</span>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center max-w-5xl leading-tight tracking-tight text-balance"
      >
        <span className="text-foreground">DOES YOUR TEAM</span>
        <br />
        <span className="text-foreground">STILL HAVE A </span>
        <span className="text-primary neon-glow">CHANCE</span>
        <span className="text-foreground">?</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 text-lg sm:text-xl md:text-2xl text-muted-foreground text-center max-w-2xl text-balance"
      >
        Explore millions of simulated IPL playoff universes.
      </motion.p>

      {/* Feature badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-10"
      >
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">Monte Carlo Simulations</span>
        </div>
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">Real-time Probabilities</span>
        </div>
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground">10,000+ Scenarios</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Select Your Team</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
