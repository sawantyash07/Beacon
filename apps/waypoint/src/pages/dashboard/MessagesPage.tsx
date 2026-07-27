import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Paperclip, Smile, Search } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/EmptyState'
import { conversations, messages } from '@/data/mockData'
import { formatRelativeTime } from '@/lib/utils'

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState(conversations[0]?.id || '')
  const [messageText, setMessageText] = useState('')
  const [isTyping] = useState(false)

  const activeConversation = conversations.find((c) => c.id === activeConv)
  const chatMessages = messages.filter(
    (m) => m.senderId === activeConv || m.senderId === 'me' || m.isOwn
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Messages</h1>
        <p className="text-muted text-sm mt-1">Chat with your travelers</p>
      </div>

      {conversations.length === 0 ? (
        <EmptyState
          icon={<Send className="w-8 h-8" />}
          title="No conversations yet"
          description="When travelers message you, conversations will appear here."
        />
      ) : (
        <Card className="p-0 overflow-hidden h-[calc(100vh-220px)] min-h-[500px]">
          <div className="flex h-full">
            {/* Conversation list */}
            <div className="w-full sm:w-80 border-r border-border flex flex-col">
              <div className="p-3 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    placeholder="Search conversations..."
                    className="w-full pl-9 pr-3 py-2 rounded-[10px] border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan/30"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <motion.button
                    key={conv.id}
                    whileHover={{ backgroundColor: 'rgba(240, 250, 251, 0.8)' }}
                    onClick={() => setActiveConv(conv.id)}
                    className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                      activeConv === conv.id ? 'bg-teal/5 border-r-2 border-teal' : ''
                    }`}
                  >
                    <div className="relative">
                      <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
                      {conv.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-navy text-sm truncate">{conv.name}</p>
                        <span className="text-xs text-muted">{formatRelativeTime(conv.timestamp)}</span>
                      </div>
                      <p className="text-xs text-muted truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-5 h-5 bg-teal text-white text-xs rounded-full flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Chat panel */}
            <div className="hidden sm:flex flex-1 flex-col">
              {activeConversation ? (
                <>
                  <div className="p-4 border-b border-border flex items-center gap-3">
                    <img src={activeConversation.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-navy text-sm">{activeConversation.name}</p>
                      <p className="text-xs text-muted">{activeConversation.online ? 'Online' : 'Offline'}</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-2.5 rounded-[14px] text-sm ${
                            msg.isOwn
                              ? 'bg-teal text-white rounded-br-[4px]'
                              : 'bg-page text-navy border border-border rounded-bl-[4px]'
                          }`}
                        >
                          {msg.text}
                          <p className={`text-[10px] mt-1 ${msg.isOwn ? 'text-white/60' : 'text-muted'}`}>
                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <span className="flex gap-0.5">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                              className="w-1.5 h-1.5 bg-muted rounded-full"
                            />
                          ))}
                        </span>
                        typing...
                      </div>
                    )}
                  </div>

                  <div className="p-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-[10px] hover:bg-page text-muted"><Paperclip className="w-4 h-4" /></button>
                      <button className="p-2 rounded-[10px] hover:bg-page text-muted"><Smile className="w-4 h-4" /></button>
                      <input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 rounded-[12px] border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan/30"
                        onKeyDown={(e) => e.key === 'Enter' && setMessageText('')}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMessageText('')}
                        className="p-2.5 rounded-[12px] bg-teal text-white"
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted text-sm">
                  Select a conversation to start chatting
                </div>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
