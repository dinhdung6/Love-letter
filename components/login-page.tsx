'use client'

import { useState } from 'react'
import { Heart, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatedBackground } from '@/components/animated-background'

interface LoginPageProps {
  onLogin: (username: string, password: string) => { success: boolean; error?: string }
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    const result = onLogin(username, password)
    if (!result.success) {
      setError(result.error || 'Dang nhap that bai')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <AnimatedBackground />
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg mb-4">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              100 Ly Do Anh Yeu Em
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Dang nhap de xem tin nhan yeu thuong
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">
                Ten dang nhap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhap ten dang nhap"
                  className="pl-10 h-12 bg-white/50 border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Mat khau
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhap mat khau"
                  className="pl-10 h-12 bg-white/50 border-gray-200 focus:border-pink-400 focus:ring-pink-400"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium rounded-xl shadow-lg shadow-pink-500/25 transition-all duration-300"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Dang dang nhap...
                </div>
              ) : (
                'Dang nhap'
              )}
            </Button>
          </form>

          {/* Decorative hearts */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-4 h-4 text-pink-300 fill-pink-300"
                style={{ opacity: 0.4 + i * 0.15 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
