'use client'

import { useState, useEffect } from 'react'

const USER_ID_KEY = 'love_messages_user_id'

function generateUserId(): string {
  const randomNum = Math.floor(Math.random() * 1000000000)
  return `user_${randomNum}`
}

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let storedUserId = localStorage.getItem(USER_ID_KEY)
    
    if (!storedUserId) {
      storedUserId = generateUserId()
      localStorage.setItem(USER_ID_KEY, storedUserId)
    }
    
    setUserId(storedUserId)
    setIsLoading(false)
  }, [])

  return { userId, isLoading }
}
