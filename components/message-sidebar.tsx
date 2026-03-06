'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Heart, Inbox } from 'lucide-react'
import type { OpenedMessageInfo } from '@/hooks/use-messages'

interface MessageSidebarProps {
  openedMessages: OpenedMessageInfo[]
  onSelectMessage: (messageId: number) => void
  currentMessageId?: number
}

export function MessageSidebar({
  openedMessages,
  onSelectMessage,
  currentMessageId,
}: MessageSidebarProps) {
  return (
    <div className="h-full max-h-screen bg-white/80 backdrop-blur-sm border-r border-[#BDE0FE]/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#BDE0FE]/50 flex-shrink-0">
        <div className="flex items-center gap-2 text-gray-700">
          <Heart className="w-5 h-5 text-[#FFD1DC] fill-[#FFD1DC]" />
          <h2 className="font-semibold">Opened Messages</h2>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {openedMessages.length} / 100 messages
        </p>
      </div>

      {/* Message list - scrollable area with explicit height */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="p-2 max-h-[calc(100vh-120px)] md:max-h-none">
          {openedMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Inbox className="w-8 h-8 mb-2" />
              <p className="text-sm text-center">
                No messages opened yet.
                <br />
                Pick a random message to start!
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {openedMessages.map((msg) => (
                <button
                  key={msg.message_id}
                  onClick={() => onSelectMessage(msg.message_id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] ${
                    currentMessageId === msg.message_id
                      ? 'bg-[#BDE0FE]/50 shadow-sm'
                      : 'hover:bg-[#A8E6CF]/20'
                  }`}
                >
                  {/* Mini envelope */}
                  <div
                    className="w-8 h-6 rounded shadow-sm flex-shrink-0"
                    style={{ backgroundColor: msg.envelope_color }}
                  />
                  <span className="font-medium text-gray-700">
                    Message #{msg.message_id}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
