import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, Info, X } from 'lucide-react'
import WebGLFluid from '../components/WebGLFluid'
import SEO from '../components/SEO'
import type { FluidConfig } from '../components/WebGLFluid'

// ─── Presets ─────────────────────────────────────────────────────────────────

interface Preset {
  name: string
  desc: string
  config: Partial<FluidConfig>
}

const PRESETS: Preset[] = [
  {
    name: 'Persistent',
    desc: 'Slow, long-lasting waves that barely fade',
    config: {
      DENSITY_DISSIPATION: 0.05,
      VELOCITY_DISSIPATION: 0.01,
      CURL: 4,
      SPLAT_FORCE: 4000,
      SPLAT_RADIUS: 0.35,
      COLOR_INTENSITY: 0.07,
      COLOR_SATURATION: 0.4,
      COLOR_UPDATE_SPEED: 8,
      BLOOM_INTENSITY: 0.2,
      AUTO_SPLAT_INTERVAL: 4000,
    },
  },
  {
    name: 'Ocean',
    desc: 'Deep blues and greens, calm rolling waves',
    config: {
      DENSITY_DISSIPATION: 0.08,
      VELOCITY_DISSIPATION: 0.02,
      CURL: 3,
      SPLAT_FORCE: 3000,
      SPLAT_RADIUS: 0.4,
      COLOR_INTENSITY: 0.06,
      COLOR_SATURATION: 0.45,
      COLOR_UPDATE_SPEED: 4,
      BLOOM_INTENSITY: 0.2,
      AUTO_SPLAT_INTERVAL: 5000,
    },
  },
  {
    name: 'Neon',
    desc: 'Pastel tones, gentle color cycling',
    config: {
      DENSITY_DISSIPATION: 0.15,
      VELOCITY_DISSIPATION: 0.05,
      CURL: 6,
      SPLAT_FORCE: 5000,
      SPLAT_RADIUS: 0.25,
      COLOR_INTENSITY: 0.08,
      COLOR_SATURATION: 0.35,
      COLOR_UPDATE_SPEED: 20,
      BLOOM_INTENSITY: 0.25,
      AUTO_SPLAT_INTERVAL: 2000,
    },
  },
  {
    name: 'Lava',
    desc: 'Warm reds/oranges, slow churning flow',
    config: {
      DENSITY_DISSIPATION: 0.06,
      VELOCITY_DISSIPATION: 0.02,
      CURL: 8,
      SPLAT_FORCE: 5000,
      SPLAT_RADIUS: 0.3,
      COLOR_INTENSITY: 0.09,
      COLOR_SATURATION: 0.5,
      COLOR_UPDATE_SPEED: 3,
      BLOOM_INTENSITY: 0.3,
      AUTO_SPLAT_INTERVAL: 3500,
    },
  },
  {
    name: 'Storm',
    desc: 'High energy, aggressive swirls and bursts',
    config: {
      DENSITY_DISSIPATION: 0.3,
      VELOCITY_DISSIPATION: 0.08,
      CURL: 12,
      SPLAT_FORCE: 8000,
      SPLAT_RADIUS: 0.2,
      COLOR_INTENSITY: 0.1,
      COLOR_SATURATION: 0.45,
      COLOR_UPDATE_SPEED: 15,
      BLOOM_INTENSITY: 0.2,
      AUTO_SPLAT_INTERVAL: 1500,
    },
  },
  {
    name: 'Aurora',
    desc: 'Ethereal curtain-like waves, slow drift',
    config: {
      DENSITY_DISSIPATION: 0.03,
      VELOCITY_DISSIPATION: 0.005,
      CURL: 2,
      SPLAT_FORCE: 2500,
      SPLAT_RADIUS: 0.45,
      COLOR_INTENSITY: 0.05,
      COLOR_SATURATION: 0.35,
      COLOR_UPDATE_SPEED: 6,
      BLOOM_INTENSITY: 0.35,
      AUTO_SPLAT_INTERVAL: 6000,
    },
  },
  {
    name: 'Vivid',
    desc: 'Bold pastel colors, moderate persistence',
    config: {
      DENSITY_DISSIPATION: 0.12,
      VELOCITY_DISSIPATION: 0.04,
      CURL: 5,
      SPLAT_FORCE: 5000,
      SPLAT_RADIUS: 0.3,
      COLOR_INTENSITY: 0.12,
      COLOR_SATURATION: 0.5,
      COLOR_UPDATE_SPEED: 12,
      BLOOM_INTENSITY: 0.25,
      AUTO_SPLAT_INTERVAL: 2500,
    },
  },
  {
    name: 'Smoke',
    desc: 'Subtle wisps, very low dissipation',
    config: {
      DENSITY_DISSIPATION: 0.01,
      VELOCITY_DISSIPATION: 0.003,
      CURL: 1,
      SPLAT_FORCE: 1500,
      SPLAT_RADIUS: 0.5,
      COLOR_INTENSITY: 0.04,
      COLOR_SATURATION: 0.25,
      COLOR_UPDATE_SPEED: 2,
      BLOOM_INTENSITY: 0.15,
      AUTO_SPLAT_INTERVAL: 8000,
    },
  },
  {
    name: 'Galaxy',
    desc: 'Deep space colors, swirling nebula effect',
    config: {
      DENSITY_DISSIPATION: 0.07,
      VELOCITY_DISSIPATION: 0.015,
      CURL: 10,
      SPLAT_FORCE: 4500,
      SPLAT_RADIUS: 0.35,
      COLOR_INTENSITY: 0.07,
      COLOR_SATURATION: 0.4,
      COLOR_UPDATE_SPEED: 5,
      BLOOM_INTENSITY: 0.35,
      AUTO_SPLAT_INTERVAL: 3000,
    },
  },
  {
    name: 'Chaos',
    desc: 'Everything cranked — pure mayhem',
    config: {
      DENSITY_DISSIPATION: 0.5,
      VELOCITY_DISSIPATION: 0.15,
      CURL: 50,
      SPLAT_FORCE: 12000,
      SPLAT_RADIUS: 0.15,
      COLOR_INTENSITY: 0.15,
      COLOR_SATURATION: 0.55,
      COLOR_UPDATE_SPEED: 25,
      BLOOM_INTENSITY: 0.15,
      AUTO_SPLAT_INTERVAL: 800,
    },
  },
]

// Shared defaults
const BASE_CONFIG = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 768,
  SHADING: true,
  COLORFUL: true,
  BLOOM: true,
  BLOOM_THRESHOLD: 0.6,
  BLOOM_RESOLUTION: 192,
  BLOOM_ITERATIONS: 6,
}

// ─── Component ───────────────────────────────────────────────────────────────

const Fluid = () => {
  const [showInfo, setShowInfo] = useState(false)
  const [presetIdx, setPresetIdx] = useState(0)

  const preset = PRESETS[presetIdx]
  const mergedConfig = { ...BASE_CONFIG, ...preset.config }

  // Auto-show info on first visit (session only)
  useEffect(() => {
    const seen = sessionStorage.getItem('fluid-info-seen')
    if (!seen) {
      setShowInfo(true)
      sessionStorage.setItem('fluid-info-seen', 'true')
    }
  }, [])

  return (
    <>
      <SEO
        title="WebGL Fluid Simulation"
        description="Interactive WebGL fluid dynamics simulation. Click and drag to create colorful fluid currents."
      />

      {/* Full-screen Fluid Canvas */}
      <WebGLFluid key={presetIdx} config={mergedConfig} />

      {/* Top-left back link */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 text-white hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200 text-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Home
      </Link>

      {/* Top-right info toggle */}
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="fixed top-6 right-6 z-30 p-2.5 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 text-white hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-200"
        title="Controls"
      >
        {showInfo ? <X size={18} /> : <Info size={18} />}
      </button>

      {/* Preset selector - left side */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2">
        {PRESETS.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setPresetIdx(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap backdrop-blur-md border ${
              i === presetIdx
                ? 'bg-white/20 border-white/40 text-white shadow-lg scale-110'
                : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/15 hover:text-white/80 hover:border-white/25'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Bottom-center info */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <div className="flex items-center gap-2 justify-center mb-2">
          <Droplets size={16} className="text-white/60" />
          <span className="text-xs font-medium uppercase tracking-widest text-white/40">
            {preset.name}
          </span>
        </div>
        <p className="text-xs text-white/25 mb-1">{preset.desc}</p>
        <p className="text-xs text-white/20">
          Click & drag · <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/30 font-mono">Space</kbd> splats · <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/30 font-mono">P</kbd> pause
        </p>
      </div>

      {/* Info panel */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-6 z-30 w-72 p-5 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Droplets size={14} className="text-blue-400" />
              Controls
            </h3>

            <div className="space-y-3 text-xs text-white/60">
              <div>
                <span className="text-white/80 font-medium">Click & Drag</span>
                <p>Create fluid currents that follow your cursor</p>
              </div>
              <div>
                <span className="text-white/80 font-medium">Presets</span>
                <p>Pick a mood on the left sidebar</p>
              </div>
              <div>
                <span className="text-white/80 font-medium">Press Space</span>
                <p>Trigger random bursts of splats</p>
              </div>
              <div>
                <span className="text-white/80 font-medium">Press P</span>
                <p>Pause / resume the simulation</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Fluid
