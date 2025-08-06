import { useState, useEffect } from 'react'

interface WanderingDuckProps {
  containerBounds?: {
    width: number
    height: number
  }
  speed?: number
}

const WanderingDuck: React.FC<WanderingDuckProps> = ({ 
  containerBounds = { width: 800, height: 60 },
  speed = 30 
}) => {
  // Start at left, positioned on bottom border line
  const [position, setPosition] = useState({ x: 20, y: 45 })
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        const padding = 30
        let newX = prev.x + (direction * 1) // Move 1px at a time
        
        // Simple boundary bouncing - full width walking
        if (newX >= containerBounds.width - padding) {
          setDirection(-1)
          setIsFlipped(false) // Face left when going left
          newX = containerBounds.width - padding
        } else if (newX <= padding) {
          setDirection(1)
          setIsFlipped(true) // Face right when going right  
          newX = padding
        }
        
        // Change direction occasionally for more natural movement
        if (Math.random() < 0.005) { // 0.5% chance per frame
          setDirection(direction * -1)
          setIsFlipped(direction === 1 ? false : true) // Flip based on new direction
        }
        
        // Add subtle bobbing motion for walking effect
        const walkBob = Math.sin(newX / 20) * 0.5
        
        return {
          x: newX,
          y: 45 + walkBob // Stay on the bottom border line
        }
      })
    }, speed)

    return () => clearInterval(interval)
  }, [direction, speed, containerBounds])

  return (
    <div
      className="absolute pointer-events-none select-none z-40"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        fontSize: '18px',
        userSelect: 'none',
        transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
        transformOrigin: 'center',
        transition: 'left 0.03s linear, top 0.03s linear'
      }}
    >
      🦆
    </div>
  )
}

export default WanderingDuck