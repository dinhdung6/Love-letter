'use client'

import { useState, useCallback } from 'react'

export interface OpenedMessageInfo {
  message_id: number
  envelope_color: string
  opened_at: string
}

export interface MessageContent {
  id: string
  message_id: number
  content: string
  envelope_color: string
  already_opened?: boolean
}

export function useMessages(userId: string | null) {
  const [openedMessages, setOpenedMessages] = useState<OpenedMessageInfo[]>([])
  const [currentMessage, setCurrentMessage] = useState<MessageContent | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOpenedMessages = useCallback(async () => {
    if (!userId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/messages/status?user_id=${userId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch opened messages')
      }

      setOpenedMessages(data.opened)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  const openMessage = useCallback(async (messageId: number): Promise<MessageContent | null> => {
    if (!userId) return null

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/open-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          message_id: messageId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open message')
      }

      const messageContent: MessageContent = {
        id: data.id,
        message_id: data.message_id,
        content: data.content,
        envelope_color: data.envelope_color,
        already_opened: data.already_opened,
      }

      setCurrentMessage(messageContent)

      // Update opened messages list if it's a new message
      if (!data.already_opened) {
        setOpenedMessages((prev) => [
          ...prev,
          {
            message_id: data.message_id,
            envelope_color: data.envelope_color,
            opened_at: new Date().toISOString(),
          },
        ])
      }

      return messageContent
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  const getMessage = useCallback(async (messageId: number): Promise<MessageContent | null> => {
    if (!userId) return null

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/message/${messageId}?user_id=${userId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get message')
      }

      const messageContent: MessageContent = {
        id: data.id,
        message_id: data.message_id,
        content: data.content,
        envelope_color: data.envelope_color,
      }

      setCurrentMessage(messageContent)
      return messageContent
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  const getRandomAvailableMessage = useCallback((): number | null => {
    const allMessageIds = Array.from({ length: 100 }, (_, i) => i + 1)
    const openedIds = new Set(openedMessages.map((m) => m.message_id))
    const availableIds = allMessageIds.filter((id) => !openedIds.has(id))

    if (availableIds.length === 0) return null

    const randomIndex = Math.floor(Math.random() * availableIds.length)
    return availableIds[randomIndex]
  }, [openedMessages])

  const clearCurrentMessage = useCallback(() => {
    setCurrentMessage(null)
  }, [])

  return {
    openedMessages,
    currentMessage,
    isLoading,
    error,
    fetchOpenedMessages,
    openMessage,
    getMessage,
    getRandomAvailableMessage,
    clearCurrentMessage,
  }
}
