'use client'

import { useState, useEffect, useCallback } from 'react'

const AUTH_KEY = 'love_messages_auth'

// Hardcoded accounts
const ACCOUNTS = [
  { username: 'dinhdung', password: '16052005' },
  { username: 'thienan', password: '28082005' },
]

interface AuthState {
  username: string
  isLoggedIn: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthState
        if (parsed.isLoggedIn) {
          setAuthState(parsed)
        }
      } catch {
        localStorage.removeItem(AUTH_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = useCallback((username: string, password: string): { success: boolean; error?: string } => {
    const account = ACCOUNTS.find(
      (acc) => acc.username === username && acc.password === password
    )

    if (account) {
      const newState: AuthState = {
        username: account.username,
        isLoggedIn: true,
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(newState))
      setAuthState(newState)
      return { success: true }
    }

    return { success: false, error: 'Sai tên đăng nhập hoặc mật khẩu' }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    setAuthState(null)
  }, [])

  return {
    isLoggedIn: authState?.isLoggedIn ?? false,
    username: authState?.username ?? null,
    isLoading,
    login,
    logout,
  }
}
