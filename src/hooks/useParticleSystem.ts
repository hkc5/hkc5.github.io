import { useState, useEffect, useRef, useCallback } from 'react'
import { createParticle, updateParticle, getDistance, getCanvasSize, DEFAULT_CONFIG } from '../utils/particles'
import type { Particle, ParticleConfig, CanvasSize } from '../utils/particles'

export const useParticleSystem = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  isDark: boolean
) => {
  const [particles, setParticles] = useState<Particle[]>([])
  const animationRef = useRef<number | undefined>(undefined)
  const configRef = useRef<ParticleConfig>(DEFAULT_CONFIG)
  
  // Initialize particles
  const initializeParticles = useCallback((canvas: HTMLCanvasElement) => {
    const canvasSize = getCanvasSize(canvas)
    const newParticles = Array.from({ length: configRef.current.count }, (_, i) =>
      createParticle(i, canvasSize.width, canvasSize.height)
    )
    setParticles(newParticles)
  }, [])
  
  // Render function
  const render = useCallback((
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    canvasSize: CanvasSize,
    isDark: boolean
  ) => {
    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
    
    const particleColor = isDark ? '#3b82f6' : '#1e40af'
    const connectionColor = isDark ? '#3b82f650' : '#1e40af30'
    
    // Draw connections
    ctx.strokeStyle = connectionColor
    ctx.lineWidth = 1
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const distance = getDistance(
          particles[i].x,
          particles[i].y,
          particles[j].x,
          particles[j].y
        )
        
        if (distance < configRef.current.connectionDistance) {
          const opacity = 1 - distance / configRef.current.connectionDistance
          ctx.globalAlpha = opacity * 0.5
          
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    
    // Draw particles
    ctx.fillStyle = particleColor
    ctx.globalAlpha = 1
    
    particles.forEach(particle => {
      ctx.globalAlpha = particle.opacity
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    })
    
    ctx.globalAlpha = 1
  }, [])
  
  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (!canvas || !ctx) return
    
    const canvasSize = getCanvasSize(canvas)
    
    // Update particles with autonomous movement
    setParticles(prevParticles =>
      prevParticles.map(particle =>
        updateParticle(particle, canvasSize)
      )
    )
    
    animationRef.current = requestAnimationFrame(animate)
  }, [canvasRef])
  
  // Start animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    initializeParticles(canvas)
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [canvasRef, initializeParticles, animate])
  
  // Render particles
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (!canvas || !ctx || particles.length === 0) return
    
    const canvasSize = getCanvasSize(canvas)
    render(ctx, particles, canvasSize, isDark)
  }, [particles, isDark, render, canvasRef])
  
  // Initial setup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const canvasSize = getCanvasSize(canvas)
    canvas.width = canvasSize.width * canvasSize.pixelRatio
    canvas.height = canvasSize.height * canvasSize.pixelRatio
    canvas.style.width = `${canvasSize.width}px`
    canvas.style.height = `${canvasSize.height}px`
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(canvasSize.pixelRatio, canvasSize.pixelRatio)
    }
    
    initializeParticles(canvas)
  }, [canvasRef, initializeParticles])
  
  return {
    particles,
    config: configRef.current
  }
}