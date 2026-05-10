"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity } from "lucide-react"

const loadingPhrases = [
  "Simulating playoff universes...",
  "Calculating qualification paths...",
  "Analyzing critical fixtures...",
  "Processing match outcomes...",
  "Computing probability matrices...",
]

interface LoadingExperienceProps {
  teamId: string | null
}

export function LoadingExperience({ teamId }: LoadingExperienceProps) {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [simulationCount, setSimulationCount] = useState(0)

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % loadingPhrases.length)
    }, 1200)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 8 + 2
      })
    }, 100)

    const countInterval = setInterval(() => {
      setSimulationCount((prev) => {
        if (prev >= 10000) return 10000
        return prev + Math.floor(Math.random() * 500) + 100
      })
    }, 50)

    return () => {
      clearInterval(phraseInterval)
      clearInterval(progressInterval)
      clearInterval(countInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Pulsing logo */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative mb-8"
        >
          <Activity className="w-16 h-16 text-primary" />
          <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 border-2 border-transparent border-t-primary/50 rounded-full absolute -inset-2" />
          </motion.div>
        </motion.div>

        {/* Simulation counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center"
        >
          <span className="text-4xl sm:text-5xl font-black tabular-nums text-primary neon-glow">
            {simulationCount.toLocaleString()}
          </span>
          <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wider">Simulations Complete</p>
        </motion.div>

        {/* Loading phrases */}
        <div className="h-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhrase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-lg text-foreground font-medium text-center"
            >
              {loadingPhrases[currentPhrase]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-64 sm:w-80 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 animate-shimmer" />
          </motion.div>
        </div>

        {/* Team indicator */}
        {teamId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-muted-foreground uppercase tracking-widest"
          >
            Analyzing {teamId.toUpperCase()} scenarios
          </motion.p>
        )}
      </div>
    </div>
  )
}
