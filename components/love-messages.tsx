'use client'

import { useEffect, useState } from 'react'
import { useUserId } from '@/hooks/use-user-id'
import { useMessages } from '@/hooks/use-messages'
import { MessageSidebar } from '@/components/message-sidebar'
import { Envelope } from '@/components/envelope'
import { ProgressBar } from '@/components/progress-bar'
import { MessageControls } from '@/components/message-controls'
import { AnimatedBackground } from '@/components/animated-background'
import { Heart, Sparkles, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LoveMessages() {
  const { userId, isLoading: userLoading } = useUserId()
  const {
    openedMessages,
    currentMessage,
    isLoading,
    fetchOpenedMessages,
    openMessage,
    getMessage,
    getRandomAvailableMessage,
    clearCurrentMessage,
  } = useMessages(userId)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Fetch opened messages on mount
  useEffect(() => {
    if (userId && !initialized) {
      fetchOpenedMessages().then(() => setInitialized(true))
    }
  }, [userId, initialized, fetchOpenedMessages])

  const handlePickRandom = async () => {
    const randomId = getRandomAvailableMessage()
    if (randomId) {
      await openMessage(randomId)
    }
  }

  const handleSelectNumber = async (num: number) => {
    // Check if message is already opened
    const isOpened = openedMessages.some((m) => m.message_id === num)
    if (isOpened) {
      await getMessage(num)
    } else {
      await openMessage(num)
    }
  }

  const handleSidebarSelect = async (messageId: number) => {
    await getMessage(messageId)
    setSidebarOpen(false)
  }

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <AnimatedBackground />
        <div className="flex flex-col items-center gap-4">
          <Heart className="w-12 h-12 text-pink-400 fill-pink-400 animate-pulse" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  const allOpened = openedMessages.length >= 100

  return (
    <div className="min-h-screen flex relative">
      <AnimatedBackground />
      
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-white/70 backdrop-blur-md shadow-lg border border-white/50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 w-64 h-screen transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <MessageSidebar
          openedMessages={openedMessages}
          onSelectMessage={handleSidebarSelect}
          currentMessageId={currentMessage?.message_id}
        />
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen p-4 md:p-8 relative z-10">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-block bg-white/60 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg border border-white/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                100 Lý do anh yêu em
              </h1>
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              Mỗi tin nhắn là một lý do tại sao anh yêu em. <br /> Hãy mở từng tin nhắn để khám phá nhé! <br /> Mở size màn hình 80% cho hiệu quả đẹp nhất nha!
            </p>
          </div>
        </header>

        {/* Progress bar */}
        <div className="mb-8 max-w-md mx-auto w-full">
          <div className="bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/50">
            <ProgressBar opened={openedMessages.length} total={100} />
          </div>
        </div>

        {/* Envelope viewer */}
        <div className="flex-1 flex items-center justify-center mb-8">
          {currentMessage ? (
            <Envelope
              key={currentMessage.id}
              color={currentMessage.envelope_color}
              content={currentMessage.content}
              messageNumber={currentMessage.message_id}
              onClose={clearCurrentMessage}
            />
          ) : (
            <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50">
              <div className="relative inline-block">
                {/* Decorative envelope stack */}
                <div className="relative w-48 h-36 mx-auto mb-6">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-lg shadow-lg"
                      style={{
                        backgroundColor: ['#FFB6C1', '#98D8C8', '#87CEEB'][i],
                        transform: `rotate(${(i - 1) * 5}deg) translateY(${i * 4}px)`,
                        zIndex: 3 - i,
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Heart className="w-12 h-12 text-white fill-white/80 drop-shadow-lg" />
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-2 font-medium">
                {allOpened
                  ? 'Úi mở hết tin nhắn mất rùi công chúa ơi! Nếu em thấy hay và muốn thêm, hãy bảo anh nhé! Anh sẽ viết thêm cho em nhiều lý do hơn nữa <3'
                  : 'Chọn một tin nhắn ngẫu nhiên hoặc nhập số từ 1-100'}
              </p>
              <p className="text-gray-500 text-sm">
                {!allOpened && `Còn ${100 - openedMessages.length} tin nhắn chưa mở`}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="mt-auto">
          <MessageControls
            onPickRandom={handlePickRandom}
            onSelectNumber={handleSelectNumber}
            isLoading={isLoading}
            allOpened={allOpened}
          />
        </div>
      </main>
    </div>
  )
}
