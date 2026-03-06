'use client'

import { useEffect, useRef } from 'react'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    // Floating orbs
    const orbs = [
      { x: 0.2, y: 0.3, radius: 300, color: 'rgba(255, 182, 193, 0.4)', speed: 0.0003 },
      { x: 0.8, y: 0.2, radius: 250, color: 'rgba(173, 216, 230, 0.4)', speed: 0.0004 },
      { x: 0.5, y: 0.7, radius: 350, color: 'rgba(221, 160, 221, 0.3)', speed: 0.0002 },
      { x: 0.1, y: 0.8, radius: 200, color: 'rgba(144, 238, 144, 0.3)', speed: 0.0005 },
      { x: 0.9, y: 0.6, radius: 280, color: 'rgba(255, 218, 185, 0.35)', speed: 0.00035 },
    ]

    const animate = () => {
      time += 1

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#fdf2f8')
      gradient.addColorStop(0.5, '#faf5ff')
      gradient.addColorStop(1, '#f0f9ff')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw floating orbs with glow
      orbs.forEach((orb, index) => {
        const offsetX = Math.sin(time * orb.speed + index) * 100
        const offsetY = Math.cos(time * orb.speed * 1.5 + index) * 80
        
        const x = orb.x * canvas.width + offsetX
        const y = orb.y * canvas.height + offsetY

        // Create radial gradient for glow effect
        const glow = ctx.createRadialGradient(x, y, 0, x, y, orb.radius)
        glow.addColorStop(0, orb.color)
        glow.addColorStop(0.5, orb.color.replace('0.', '0.1'))
        glow.addColorStop(1, 'transparent')

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Add subtle sparkles
      const sparkleCount = 15
      for (let i = 0; i < sparkleCount; i++) {
        const sparkleTime = (time * 0.02 + i * 100) % 1000
        const alpha = Math.sin(sparkleTime * 0.01) * 0.3 + 0.2
        
        if (alpha > 0) {
          const sx = (Math.sin(i * 567.8) * 0.5 + 0.5) * canvas.width
          const sy = (Math.cos(i * 234.5) * 0.5 + 0.5) * canvas.height
          
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`
          ctx.beginPath()
          ctx.arc(sx, sy, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        background: 'linear-gradient(135deg, #fdf2f8 0%, #faf5ff 50%, #f0f9ff 100%)',
      }}
    />
  )
}
