interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  originalX: number
  originalY: number
}

interface ParticleConfig {
  count: number
  maxSpeed: number
  connectionDistance: number
  particleSize: number
}

interface CanvasSize {
  width: number
  height: number
  pixelRatio: number
}

// Export types for use in other files
export type { Particle, ParticleConfig, CanvasSize }

export const DEFAULT_CONFIG: ParticleConfig = {
  count: 100,
  maxSpeed: 1.5,
  connectionDistance: 120,
  particleSize: 2
}

export const createParticle = (id: number, canvasWidth: number, canvasHeight: number): Particle => {
  const x = Math.random() * canvasWidth
  const y = Math.random() * canvasHeight
  
  return {
    id,
    x,
    y,
    vx: (Math.random() - 0.5) * DEFAULT_CONFIG.maxSpeed,
    vy: (Math.random() - 0.5) * DEFAULT_CONFIG.maxSpeed,
    size: DEFAULT_CONFIG.particleSize + Math.random() * 1,
    opacity: 0.6 + Math.random() * 0.4,
    originalX: x,
    originalY: y
  }
}

export const updateParticle = (
  particle: Particle,
  canvasSize: CanvasSize
): Particle => {
  let { x, y, vx, vy } = particle
  
  // Add slight random movement to keep particles active
  vx += (Math.random() - 0.5) * 0.02
  vy += (Math.random() - 0.5) * 0.02
  
  // Limit max speed
  const speed = Math.sqrt(vx * vx + vy * vy)
  if (speed > DEFAULT_CONFIG.maxSpeed) {
    vx = (vx / speed) * DEFAULT_CONFIG.maxSpeed
    vy = (vy / speed) * DEFAULT_CONFIG.maxSpeed
  }
  
  // Apply velocity for autonomous movement
  x += vx
  y += vy
  
  // Boundary bouncing with energy preservation
  if (x <= 0 || x >= canvasSize.width) {
    vx *= -0.8
    x = Math.max(0, Math.min(canvasSize.width, x))
  }
  if (y <= 0 || y >= canvasSize.height) {
    vy *= -0.8
    y = Math.max(0, Math.min(canvasSize.height, y))
  }
  
  // Very light friction to keep movement continuous
  vx *= 0.995
  vy *= 0.995
  
  // Minimum speed threshold - add energy if too slow
  const currentSpeed = Math.sqrt(vx * vx + vy * vy)
  if (currentSpeed < 0.1) {
    vx += (Math.random() - 0.5) * 0.5
    vy += (Math.random() - 0.5) * 0.5
  }
  
  return {
    ...particle,
    x,
    y,
    vx,
    vy
  }
}

export const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x2 - x1
  const dy = y2 - y1
  return Math.sqrt(dx * dx + dy * dy)
}

export const getCanvasSize = (canvas: HTMLCanvasElement): CanvasSize => {
  const rect = canvas.getBoundingClientRect()
  const pixelRatio = window.devicePixelRatio || 1
  
  return {
    width: rect.width,
    height: rect.height,
    pixelRatio
  }
}
