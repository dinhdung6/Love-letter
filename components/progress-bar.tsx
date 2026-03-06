'use client'

import { Heart } from 'lucide-react'

interface ProgressBarProps {
  opened: number
  total: number
}

export function ProgressBar({ opened, total }: ProgressBarProps) {
  const percentage = Math.round((opened / total) * 100)

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Heart className="w-4 h-4 text-[#FFD1DC] fill-[#FFD1DC]" />
          <span className="text-sm font-medium">Progress</span>
        </div>
        <span className="text-sm font-semibold text-gray-700">
          {opened} / {total} messages
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-[#FFD1DC] via-[#A8E6CF] to-[#BDE0FE] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {opened === total && (
        <p className="text-center mt-2 text-sm text-[#A8E6CF] font-medium animate-pulse">
          🎉 Princessa have unlocked all messages! 🎉
        </p>
      )}
    </div>
  )
}
