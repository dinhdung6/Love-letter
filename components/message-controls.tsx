'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shuffle, Send, Loader2 } from 'lucide-react'

interface MessageControlsProps {
  onPickRandom: () => void
  onSelectNumber: (num: number) => void
  isLoading: boolean
  allOpened: boolean
}

export function MessageControls({
  onPickRandom,
  onSelectNumber,
  isLoading,
  allOpened,
}: MessageControlsProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = parseInt(inputValue, 10)
    if (num >= 1 && num <= 100) {
      onSelectNumber(num)
      setInputValue('')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto">
      {/* Random button */}
      <Button
        onClick={onPickRandom}
        disabled={isLoading || allOpened}
        className="w-full sm:w-auto bg-gradient-to-r from-[#FFD1DC] to-[#BDE0FE] text-gray-700 hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Shuffle className="w-4 h-4 mr-2" />
        )}
        {allOpened ? 'All Opened!' : 'Pick Random'}
      </Button>

      {/* Divider */}
      <div className="hidden sm:block w-px h-8 bg-gray-200" />
      <span className="text-gray-400 text-sm">or</span>
      <div className="hidden sm:block w-px h-8 bg-gray-200" />

      {/* Manual selection */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto">
        <Input
          type="number"
          min={1}
          max={100}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="1-100"
          className="w-24 text-center border-[#BDE0FE] focus:ring-[#A8E6CF]"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !inputValue}
          variant="outline"
          className="border-[#A8E6CF] text-gray-700 hover:bg-[#A8E6CF]/20"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  )
}
