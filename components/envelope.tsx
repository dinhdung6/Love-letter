'use client'

import { useState, useEffect } from 'react'
import { Heart, Mail } from 'lucide-react'
import confetti from 'canvas-confetti'

interface EnvelopeProps {
  color: string
  content: string
  messageNumber: number
  onClose?: () => void
}

export function Envelope({ color, content, messageNumber, onClose }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Auto-open envelope with animation
    const timer = setTimeout(() => {
      setIsOpen(true)
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD1DC', '#A8E6CF', '#BDE0FE', '#FFDAB9', '#E6E6FA'],
        shapes: ['circle'],
      })
      // Show content after envelope opens
      setTimeout(() => {
        setShowContent(true)
      }, 500)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      {/* Envelope Container */}
      <div className="relative w-full perspective-1000">
        {/* Envelope Body */}
        <div
          className="relative w-full aspect-[4/3] rounded-lg shadow-2xl transition-all duration-500"
          style={{
            backgroundColor: color,
            boxShadow: `0 25px 50px -12px ${color}66`,
          }}
        >
          {/* Envelope Flap */}
          <div
            className={`absolute top-0 left-0 w-full h-1/2 origin-top transition-transform duration-700 ease-out ${
              isOpen ? '-rotate-x-180' : ''
            }`}
            style={{
              transformStyle: 'preserve-3d',
              zIndex: isOpen ? 0 : 10,
            }}
          >
            {/* Front of flap */}
            <div
              className="absolute inset-0 rounded-t-lg"
              style={{
                backgroundColor: color,
                backfaceVisibility: 'hidden',
                clipPath: isOpen 
                  ? 'polygon(0 100%, 100% 100%, 50% 0)'     // triangle pointing down when open
                  : 'polygon(0 0, 100% 0, 50% 100%)',      // triangle pointing up when closed
                filter: 'brightness(0.95)',
              }}
            />
            {/* Back of flap */}
            <div
              className="absolute inset-0 rounded-t-lg"
              style={{
                backgroundColor: color,
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
                clipPath: isOpen 
                  ? 'polygon(0 100%, 100% 100%, 50% 0)'     // same as front when open
                  : 'polygon(0 0, 100% 0, 50% 100%)',
                filter: 'brightness(1.05)',
              }}
            />
          </div>

          {/* Heart seal */}
          <div
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
              isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
          >
            <div className="w-12 h-12 bg-[#FFD1DC] rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            </div>
          </div>

          {/* Message number badge */}
          <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#A8E6CF] rounded-full flex items-center justify-center shadow-lg z-30">
            <span className="text-sm font-bold text-emerald-700">#{messageNumber}</span>
          </div>

          {/* Letter inside envelope */}
          <div
            className={`absolute inset-4 bg-white rounded-lg shadow-inner flex items-center justify-center p-6 transition-all duration-500 ${
              showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <p className="text-gray-700 text-center text-base md:text-lg leading-relaxed font-medium">
              {content}
            </p>
          </div>
        </div>
      </div>

      {/* Close button */}
      {onClose && showContent && (
        <button
          onClick={onClose}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-[#FFD1DC] to-[#BDE0FE] text-gray-700 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
        >
          <Mail className="w-4 h-4" />
          Pick Another Message
        </button>
      )}
    </div>
  )
}
