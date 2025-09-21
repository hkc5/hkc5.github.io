import React, { useRef, useEffect, useState } from 'react'
import { useParticleSystem } from '../hooks/useParticleSystem'

interface ParticleBackgroundProps {
  className?: string
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(false)
  
  // Initialize particle system without mouse tracking
  useParticleSystem(canvasRef, isDark)
  
  // Check for dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    // Initial check
    checkDarkMode()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])
  
  return (
    <div
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}

export default ParticleBackground