'use client'

import { useAuth } from './use-auth'

// This hook now uses the authenticated username as the user ID
export function useUserId() {
  const { username, isLoading, isLoggedIn } = useAuth()

  return { 
    userId: isLoggedIn ? username : null, 
    isLoading 
  }
}
