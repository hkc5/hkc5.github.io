import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, Info, X } from 'lucide-react'
import WebGLFluid from '../components/WebGLFluid'
import SEO from '../components/SEO'

const Fluid = () => {
  const [showInfo, setShowInfo] = useState(false)

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
        description="Interactive WebGL fluid dynamics simulation. Click and drag to create colorful fluid currents, or sit back and watch the auto-generated splats."
      />

      {/* Full-screen Fluid Canvas */}
      <WebGLFluid
        config={{
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 768,
          CURL: 6,
          SPLAT_FORCE: 5000,
          SPLAT_RADIUS: 0.25,
          DENSITY_DISSIPATION: 0.5,
          VELOCITY_DISSIPATION: 0.1,
          BLOOM: true,
          BLOOM_INTENSITY: 0.5,
          BLOOM_THRESHOLD: 0.6,
          BLOOM_RESOLUTION: 192,
          BLOOM_ITERATIONS: 6,
          SHADING: true,
          COLORFUL: true,
          COLOR_UPDATE_SPEED: 10,
          AUTO_SPLAT_INTERVAL: 2000,
        }}
      />

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

      {/* Bottom-center title */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <div className="flex items-center gap-2 justify-center mb-2">
          <Droplets size={16} className="text-white/60" />
          <span className="text-xs font-medium uppercase tracking-widest text-white/40">
            WebGL Fluid Simulation
          </span>
        </div>
        <p className="text-xs text-white/25">
          Click & drag · Scroll · Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/40 font-mono">Space</kbd> for splats
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
              Fluid Simulation
            </h3>

            <div className="space-y-3 text-xs text-white/60">
              <div>
                <span className="text-white/80 font-medium">Click & Drag</span>
                <p>Create colorful fluid currents that follow your cursor</p>
              </div>
              <div>
                <span className="text-white/80 font-medium">Press Space</span>
                <p>Trigger random bursts of colorful splats</p>
              </div>
              <div>
                <span className="text-white/80 font-medium">Press P</span>
                <p>Pause / resume the simulation</p>
              </div>
              <div>
                <span className="text-white/80 font-medium">Auto-Splats</span>
                <p>New colorful bursts appear every few seconds automatically</p>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Fluid
