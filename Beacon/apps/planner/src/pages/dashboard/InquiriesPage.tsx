import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Reply, Filter, Send, Paperclip, Smile, Search, Users, FileText,
  CreditCard, CheckCircle2, Trash2, Clock, ClipboardList, UserPlus,
  Plus, X, ChevronRight, Phone, Mail, ArrowRight, UserCheck, Check
} from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { inquiries as defaultInquiries, packages, addMockBooking } from '@/data/mockData'
import { formatCurrency, formatRelativeTime } from '@/lib/utils'
import { fetchInquiries, updateInquiryStatus } from '@/services/api'
import { useAuth } from '@/context/AuthContext'

const INQUIRIES_STORAGE_KEY = 'beacon_planner_inquiries_store'
const NOTES_STORAGE_KEY = 'beacon_planner_inquiries_notes_store'
const TIMELINE_STORAGE_KEY = 'beacon_planner_inquiries_timeline_store'
const CHAT_STORAGE_KEY = 'beacon_planner_inquiries_chat_store'

const filters = ['all', 'new', 'replied', 'converted']

const TEAM_MEMBERS = [
  'Alex Wright (Senior Planner)',
  'Pooja Hegde (Assistant Planner)',
  'Kabir Kapoor (Operations Lead)',
  'Siddharth Roy (Senior Executive)'
]

export default function InquiriesPage() {
  const { user } = useAuth()
  
  // State variables
  const [inquiryList, setInquiryList] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null)
  
  // Tab control inside Workspace
  const [activeTab, setActiveTab] = useState<'chat' | 'ops' | 'notes' | 'timeline'>('chat')
  
  // Sub-states
  const [chats, setChats] = useState<Record<string, any[]>>({})
  const [notes, setNotes] = useState<Record<string, any[]>>({})
  const [timelines, setTimelines] = useState<Record<string, any[]>>({})
  
  // Inputs
  const [chatMessageText, setChatMessageText] = useState('')
  const [newNoteText, setNewNoteText] = useState('')
  
  // Quotation form
  const [selectedPkgId, setSelectedPkgId] = useState(packages[0]?.id || '')
  const [quotePrice, setQuotePrice] = useState(packages[0]?.price || 0)
  const [quoteValidity, setQuoteValidity] = useState('7 Days')
  
  // Payment Request form
  const [reqPayAmount, setReqPayAmount] = useState(15000)
  const [reqPayDesc, setReqPayDesc] = useState('Reservation Deposit')
  
  // Team assignment
  const [assignedPlanner, setAssignedPlanner] = useState('Alex Wright (Senior Planner)')
  
  // Confirmation Dialog
  const [showConvertConfirm, setShowConvertConfirm] = useState(false)

  const chatEndRef = useRef<HTMLDivElement>(null)

  // 1. Initial State Loading from database API
  useEffect(() => {
    const loadInquiries = async () => {
      try {
        const data = await fetchInquiries(user?.id);
        const formatted = data.map((inq: any) => ({
          id: inq.id,
          traveler: inq.travelerName,
          email: inq.email,
          phone: inq.phone || '+91 99999 88888',
          package: inq.packageName,
          message: inq.message,
          status: inq.status, // new, replied, converted
          date: inq.createdAt.slice(0, 10),
          _raw: inq
        }));
        setInquiryList(formatted);
      } catch (err) {
        console.error(err);
        setInquiryList([]);
      }
    };
    if (user?.id) {
      loadInquiries();
    }
  }, [user?.id]);

  // Load chats, notes, timelines from storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedInqs = localStorage.getItem(INQUIRIES_STORAGE_KEY)
      if (storedInqs) {
        setInquiryList(JSON.parse(storedInqs))
      } else {
        setInquiryList(defaultInquiries)
        localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(defaultInquiries))
      }

      // Load chats
      const storedChats = localStorage.getItem(CHAT_STORAGE_KEY)
      if (storedChats) {
        setChats(JSON.parse(storedChats))
      } else {
        const initialChats: Record<string, any[]> = {
          'INQ-001': [
            { id: 'm-1', sender: 'Alice Johnson', text: 'Hi! I saw your Maldives package and I am very interested.', timestamp: '2026-07-26T10:00:00', isOwn: false },
            { id: 'm-2', sender: 'me', text: 'Hello Alice! Thank you for reaching out. I can customize this trip details for you. When are you planning to travel?', timestamp: '2026-07-26T10:15:00', isOwn: true },
            { id: 'm-3', sender: 'Alice Johnson', text: 'We are planning a honeymoon around September 15. Can we add an extra day to the overwater resort?', timestamp: '2026-07-26T10:30:00', isOwn: false }
          ],
          'INQ-002': [
            { id: 'm-4', sender: 'Bob Smith', text: 'Looking for a family ski trip in December. Do you offer group discounts for a batch of 8?', timestamp: '2026-07-25T14:20:00', isOwn: false }
          ]
        }
        setChats(initialChats)
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(initialChats))
      }

      // Load notes
      const storedNotes = localStorage.getItem(NOTES_STORAGE_KEY)
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes))
      } else {
        const initialNotes: Record<string, any[]> = {
          'INQ-001': [
            { id: 'n-1', text: 'Customer is looking for private cruise extension. Honeymoon couple, request priority services.', author: 'Alex Wright', date: '2026-07-26T10:35:00' }
          ]
        }
        setNotes(initialNotes)
        localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(initialNotes))
      }

      // Load timelines
      const storedTimelines = localStorage.getItem(TIMELINE_STORAGE_KEY)
      if (storedTimelines) {
        setTimelines(JSON.parse(storedTimelines))
      } else {
        const initialTimelines: Record<string, any[]> = {
          'INQ-001': [
            { id: 't-1', text: 'Enquiry received for Maldives Paradise Escape', date: '2026-07-26T10:30:00', type: 'system' }
          ],
          'INQ-002': [
            { id: 't-2', text: 'Enquiry received for Swiss Alps Tour', date: '2026-07-25T14:20:00', type: 'system' }
          ]
        }
        setTimelines(initialTimelines)
        localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(initialTimelines))
      }
    }
  }, [])

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, selectedInquiryId, activeTab])

  // Sync state helpers
  const saveInquiries = async (list: any[]) => {
    const prevList = [...inquiryList]
    setInquiryList(list)
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(list))
    
    // Sync status change to database
    if (selectedInquiryId) {
      const activeItem = list.find((inq) => inq.id === selectedInquiryId);
      const prevItem = prevList.find((inq) => inq.id === selectedInquiryId);
      if (activeItem && prevItem && activeItem.status !== prevItem.status) {
        try {
          await updateInquiryStatus(activeItem.id, activeItem.status);
        } catch (err) {
          console.error('Failed to sync inquiry status to database:', err);
        }
      }
    }
  }

  const saveChats = (data: Record<string, any[]>) => {
    setChats(data)
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(data))
  }

  const saveNotes = (data: Record<string, any[]>) => {
    setNotes(data)
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(data))
  }

  const saveTimelines = (data: Record<string, any[]>) => {
    setTimelines(data)
    localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(data))
  }

  // Active Selected Enquiry Details
  const activeInquiry = inquiryList.find(i => i.id === selectedInquiryId)

  // Sync form inputs when active package changes
  useEffect(() => {
    const pkg = packages.find(p => p.id === selectedPkgId)
    if (pkg) {
      setQuotePrice(pkg.price * (1 - pkg.discount / 100))
    }
  }, [selectedPkgId])

  // 2. Filtration Logic
  const filteredInquiries = inquiryList.filter(inq => {
    const matchesSearch = inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inq.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (activeFilter === 'all') return matchesSearch
    return matchesSearch && inq.status === activeFilter
  })

  // 3. User Action Handlers
  const handleSendChatMessage = () => {
    if (!selectedInquiryId || !chatMessageText.trim()) return

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'me',
      text: chatMessageText.trim(),
      timestamp: new Date().toISOString(),
      isOwn: true
    }

    const currentChats = { ...chats }
    currentChats[selectedInquiryId] = [...(currentChats[selectedInquiryId] || []), newMsg]
    saveChats(currentChats)
    setChatMessageText('')

    // Update status to 'replied' if it was new
    if (activeInquiry && activeInquiry.status === 'new') {
      const updated = inquiryList.map(inq => {
        if (inq.id === selectedInquiryId) {
          return { ...inq, status: 'replied' }
        }
        return inq
      })
      saveInquiries(updated)

      // Timeline log
      addTimelineEvent(selectedInquiryId, 'Replied to client message')
    }
  }

  const addTimelineEvent = (inqId: string, text: string, type: 'user' | 'system' = 'user') => {
    const newEvent = {
      id: `t-${Date.now()}`,
      text,
      date: new Date().toISOString(),
      type
    }
    const currentTimelines = { ...timelines }
    currentTimelines[inqId] = [newEvent, ...(currentTimelines[inqId] || [])]
    saveTimelines(currentTimelines)
  }

  const handleAddNote = () => {
    if (!selectedInquiryId || !newNoteText.trim()) return

    const newNote = {
      id: `n-${Date.now()}`,
      text: newNoteText.trim(),
      author: 'Alex Wright',
      date: new Date().toISOString()
    }

    const currentNotes = { ...notes }
    currentNotes[selectedInquiryId] = [newNote, ...(currentNotes[selectedInquiryId] || [])]
    saveNotes(currentNotes)
    setNewNoteText('')
    toast.success('Internal notes saved successfully!')
    addTimelineEvent(selectedInquiryId, 'Internal operational note added')
  }

  const handleAssignTeam = (member: string) => {
    if (!selectedInquiryId) return
    
    const updated = inquiryList.map(inq => {
      if (inq.id === selectedInquiryId) {
        return { ...inq, assignedTo: member }
      }
      return inq
    })
    saveInquiries(updated)
    setAssignedPlanner(member)
    toast.success(`Enquiry assigned to ${member.split(' ')[0]} successfully!`)
    addTimelineEvent(selectedInquiryId, `Assigned to team member: ${member}`)
  }

  const handleSendQuotation = () => {
    if (!selectedInquiryId) return

    const pkg = packages.find(p => p.id === selectedPkgId)
    const packageName = pkg ? pkg.title : 'Custom Package'

    addTimelineEvent(selectedInquiryId, `Quotation of ${formatCurrency(quotePrice)} sent for package: "${packageName}" (Validity: ${quoteValidity})`)
    
    // Change status to replied
    const updated = inquiryList.map(inq => {
      if (inq.id === selectedInquiryId && inq.status === 'new') {
        return { ...inq, status: 'replied' }
      }
      return inq
    })
    saveInquiries(updated)

    toast.success(`Quotation sent to ${activeInquiry.name} via Email & WhatsApp!`)
  }

  const handleSendPaymentRequest = () => {
    if (!selectedInquiryId) return

    addTimelineEvent(selectedInquiryId, `Payment request of ${formatCurrency(reqPayAmount)} sent: "${reqPayDesc}"`)
    
    toast.success(`Payment request voucher of ${formatCurrency(reqPayAmount)} dispatched successfully!`)
  }

  const handleCloseEnquiry = () => {
    if (!selectedInquiryId) return

    const updated = inquiryList.map(inq => {
      if (inq.id === selectedInquiryId) {
        return { ...inq, status: 'converted' }
      }
      return inq
    })
    saveInquiries(updated)
    toast.info('Enquiry closed and archived.')
    addTimelineEvent(selectedInquiryId, 'Enquiry marked as closed / resolved')
  }

  const handleConvertBooking = () => {
    if (!selectedInquiryId || !activeInquiry) return

    const pkg = packages.find(p => p.id === selectedPkgId) || packages[0]

    // Create a new mock booking record
    const newBkg = {
      id: `BKG-${Math.floor(1000 + Math.random() * 9000)}`,
      traveler: activeInquiry.name,
      email: activeInquiry.email,
      package: pkg.title,
      packageId: pkg.id,
      amount: quotePrice,
      amountPaid: 0,
      remainingBalance: quotePrice,
      status: 'pending',
      paymentStatus: 'unpaid',
      travelDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0], // travel in 15 days
      travelersCount: 2,
      phone: activeInquiry.phone || '+91 98765 43210',
      bookingDate: new Date().toISOString().split('T')[0]
    }

    try {
      addMockBooking(newBkg)
      
      // Update inquiry status
      const updated = inquiryList.map(inq => {
        if (inq.id === selectedInquiryId) {
          return { ...inq, status: 'converted' }
        }
        return inq
      })
      saveInquiries(updated)

      addTimelineEvent(selectedInquiryId, `Converted to booking reservation: ${newBkg.id}`, 'system')
      toast.success(`Booking ${newBkg.id} created successfully for ${activeInquiry.name}!`)
      setShowConvertConfirm(false)
    } catch (err) {
      toast.error('Booking conversion failed.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Enquiries Workspace</h1>
        <p className="text-muted text-sm mt-1">Lead manager & direct client conversation console</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 h-[calc(100vh-210px)] min-h-[550px]">
        
        {/* Left Side: Master Inquiry List Pane */}
        <div className={`w-full xl:w-96 flex flex-col gap-4 shrink-0 h-full ${selectedInquiryId ? 'hidden xl:flex' : 'flex'}`}>
          {/* Controls toolbar */}
          <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search by name, ID or place..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-surface border border-border rounded-[10px] text-sm text-navy focus:outline-none focus:ring-2 focus:ring-cyan/30"
              />
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-border pb-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                    activeFilter === f ? 'bg-teal text-white shadow-sm' : 'bg-surface border border-border text-muted hover:border-teal/30'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable list */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {filteredInquiries.length === 0 ? (
              <EmptyState
                icon={<Reply className="w-8 h-8 text-slate-300" />}
                title="No inquiries found"
                description="Use other filters or update your search query."
              />
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = inq.id === selectedInquiryId
                return (
                  <motion.div
                    key={inq.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => {
                      setSelectedInquiryId(inq.id)
                      setAssignedPlanner(inq.assignedTo || TEAM_MEMBERS[0])
                    }}
                    className={`p-4 rounded-[16px] border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#EAF8FD] border-cyan/40 shadow-sm'
                        : 'bg-white border-border hover:border-teal/20'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-3">
                        <img src={inq.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-100" />
                        <div>
                          <h4 className="font-bold text-navy text-xs sm:text-sm">{inq.name}</h4>
                          <span className="text-[10px] font-medium text-muted block">{inq.id}</span>
                        </div>
                      </div>
                      <StatusBadge status={inq.status} />
                    </div>

                    <p className="text-xs text-muted mt-2.5 line-clamp-2 leading-relaxed">
                      {inq.message}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border/40 text-[10px] text-muted">
                      <span className="font-semibold text-navy">{inq.destination}</span>
                      <span>{formatRelativeTime(inq.timestamp || new Date().toISOString())}</span>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Side: Detail Detail Panel / Workspace */}
        <div className={`flex-1 h-full flex flex-col bg-white border border-border rounded-[20px] overflow-hidden ${!selectedInquiryId ? 'hidden xl:flex items-center justify-center p-8 text-center' : 'flex'}`}>
          
          {activeInquiry ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
              
              {/* Workspace Mobile Header Back Button */}
              <div className="p-4 border-b border-border flex items-center justify-between gap-4 shrink-0 bg-slate-50/40">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedInquiryId(null)}
                    className="xl:hidden p-1.5 rounded-full hover:bg-page/60 text-navy cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <img src={activeInquiry.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0 border border-slate-200" />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-navy text-sm leading-none">{activeInquiry.name}</h3>
                      <StatusBadge status={activeInquiry.status} />
                    </div>
                    <span className="text-[10px] text-muted font-medium block mt-1">
                      Dest: {activeInquiry.destination} · Assigned to: <strong className="text-teal font-semibold">{activeInquiry.assignedTo || 'Unassigned'}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="hidden md:flex text-[10px] font-medium text-muted bg-page px-2 py-1 rounded border border-border">
                    ID: {activeInquiry.id}
                  </span>
                </div>
              </div>

              {/* Detail Workspace Navigation Tabs */}
              <div className="flex border-b border-border shrink-0 bg-white z-10 px-4 text-xs font-bold text-muted">
                {[
                  { id: 'chat', label: 'Client Conversation', icon: Reply },
                  { id: 'ops', label: 'Command & Ops', icon: ClipboardList },
                  { id: 'notes', label: 'Planner Notes', icon: Users },
                  { id: 'timeline', label: 'Enquiry Timeline', icon: Clock }
                ].map(tab => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 py-3 px-3 transition-colors relative cursor-pointer ${
                        isActive ? 'text-teal font-extrabold' : 'hover:text-navy'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal"
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Workspace Content Panels */}
              <div className="flex-1 overflow-y-auto p-5 min-h-0 bg-slate-50/20">
                
                {/* 1. CHAT WORKSPACE PANEL */}
                {activeTab === 'chat' && (
                  <div className="h-full flex flex-col">
                    {/* Chat log scroll window */}
                    <div className="flex-1 overflow-y-auto space-y-3.5 mb-4 pr-1 min-h-[220px]">
                      {(!chats[activeInquiry.id] || chats[activeInquiry.id].length === 0) ? (
                        <div className="h-full flex items-center justify-center text-muted italic text-xs text-center p-8">
                          No messages. Start conversation by replying.
                        </div>
                      ) : (
                        chats[activeInquiry.id].map((msg) => (
                          <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                            <div className="max-w-[75%] space-y-1">
                              <div className={`p-3.5 rounded-[16px] text-xs leading-relaxed ${
                                msg.isOwn
                                  ? 'bg-teal text-white rounded-br-sm shadow-sm'
                                  : 'bg-white border border-border text-navy rounded-bl-sm shadow-sm'
                              }`}>
                                {msg.text}
                              </div>
                              <span className={`text-[9px] text-muted block ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Chat Text Input Section */}
                    <div className="border border-border rounded-[14px] bg-white p-2.5 flex items-center gap-2 shadow-sm shrink-0">
                      <button className="p-2 text-muted hover:bg-page hover:text-navy rounded-lg transition-colors cursor-pointer"><Paperclip className="w-4 h-4" /></button>
                      <button className="p-2 text-muted hover:bg-page hover:text-navy rounded-lg transition-colors cursor-pointer"><Smile className="w-4 h-4" /></button>
                      
                      <input
                        value={chatMessageText}
                        onChange={(e) => setChatMessageText(e.target.value)}
                        placeholder={`Reply to ${activeInquiry.name.split(' ')[0]}...`}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                        className="flex-1 px-3 py-1.5 border border-transparent rounded-[10px] text-xs text-navy focus:outline-none"
                      />

                      <Button
                        size="sm"
                        onClick={handleSendChatMessage}
                        className="bg-teal hover:bg-teal/90 text-white rounded-[10px] font-bold text-xs"
                      >
                        <Send className="w-3.5 h-3.5 mr-1" /> Send
                      </Button>
                    </div>
                  </div>
                )}

                {/* 2. INTERNAL PLANNER NOTES PANEL */}
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {/* Add note textbox */}
                    <Card className="p-4 border border-border bg-white space-y-3 shadow-sm">
                      <h4 className="text-xs font-bold text-navy uppercase tracking-wide">Write Sticky Note</h4>
                      <textarea
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder="Add internal operational note (dietary preferences, customizations, reminders)..."
                        className="w-full min-h-[60px] p-2.5 border border-border rounded-[12px] text-xs text-navy focus:outline-none focus:border-teal"
                      />
                      <div className="flex justify-end">
                        <Button size="sm" onClick={handleAddNote} className="font-bold text-xs py-1.5">
                          <Plus className="w-3.5 h-3.5 mr-1" /> Add Note
                        </Button>
                      </div>
                    </Card>

                    {/* Note list */}
                    <div className="space-y-2.5">
                      {(!notes[activeInquiry.id] || notes[activeInquiry.id].length === 0) ? (
                        <div className="text-center py-6 text-xs text-muted italic">
                          No notes captured for this enquiry.
                        </div>
                      ) : (
                        notes[activeInquiry.id].map((note) => (
                          <div key={note.id} className="p-4 rounded-[16px] bg-yellow-50/50 border border-yellow-200/50 shadow-sm relative space-y-2">
                            <p className="text-xs text-navy leading-relaxed">{note.text}</p>
                            <div className="flex justify-between items-center text-[10px] text-muted border-t border-yellow-200/20 pt-1.5">
                              <span>By: <strong>{note.author}</strong></span>
                              <span>{new Date(note.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 3. ENQUIRY TIMELINE PANEL */}
                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-navy uppercase tracking-wide">Activity Logs Feed</h4>
                    
                    <div className="relative pl-6 border-l border-border space-y-5 py-2">
                      {(!timelines[activeInquiry.id] || timelines[activeInquiry.id].length === 0) ? (
                        <div className="text-xs text-muted italic text-center py-4">No events logged.</div>
                      ) : (
                        timelines[activeInquiry.id].map((item) => (
                          <div key={item.id} className="relative">
                            {/* Dot indicator */}
                            <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-teal ring-4 ring-white" />
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-navy">{item.text}</p>
                              <span className="text-[9px] text-muted font-medium block">
                                {new Date(item.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 4. COMMAND & OPS (ACTIONS) PANEL */}
                {activeTab === 'ops' && (
                  <div className="space-y-6">
                    
                    {/* Action A: Team Assignment */}
                    <Card className="p-5 border border-border bg-white shadow-sm space-y-3.5">
                      <div>
                        <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-1.5">
                          <UserPlus className="w-4 h-4 text-teal" /> Team Assignee
                        </h4>
                        <p className="text-[10px] text-muted mt-0.5">Delegate coordination client responses to another agent.</p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <select
                          value={assignedPlanner}
                          onChange={(e) => handleAssignTeam(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-[10px] border border-border text-xs text-navy focus:outline-none focus:border-teal cursor-pointer"
                        >
                          {TEAM_MEMBERS.map(member => (
                            <option key={member} value={member}>{member}</option>
                          ))}
                        </select>
                      </div>
                    </Card>

                    {/* Action B: Quotation Form */}
                    <Card className="p-5 border border-border bg-white shadow-sm space-y-4">
                      <div>
                        <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-teal" /> Send Quotation Quote
                        </h4>
                        <p className="text-[10px] text-muted mt-0.5">Deliver customizable pricing options to the client.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-navy">Target Package</label>
                          <select
                            value={selectedPkgId}
                            onChange={(e) => setSelectedPkgId(e.target.value)}
                            className="w-full px-3 py-2 rounded-[10px] border border-border text-xs text-navy focus:outline-none focus:border-teal cursor-pointer"
                          >
                            {packages.map(pkg => (
                              <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-navy">Quotation Price (₹)</label>
                          <input
                            type="number"
                            value={quotePrice}
                            onChange={(e) => setQuotePrice(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-[10px] border border-border text-xs text-navy focus:outline-none focus:border-teal font-medium font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-navy">Validity period</label>
                          <input
                            type="text"
                            value={quoteValidity}
                            onChange={(e) => setQuoteValidity(e.target.value)}
                            className="w-full px-3 py-2 rounded-[10px] border border-border text-xs text-navy focus:outline-none focus:border-teal"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <Button size="sm" onClick={handleSendQuotation} className="font-bold text-xs py-1.5">
                          <Send className="w-3.5 h-3.5 mr-1" /> Dispatch Quotation
                        </Button>
                      </div>
                    </Card>

                    {/* Action C: Payment Request */}
                    <Card className="p-5 border border-border bg-white shadow-sm space-y-4">
                      <div>
                        <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-teal" /> Dispatch Payment Request
                        </h4>
                        <p className="text-[10px] text-muted mt-0.5">Request deposits, booking fees or reservation payments.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-navy">Request Amount (₹)</label>
                          <input
                            type="number"
                            value={reqPayAmount}
                            onChange={(e) => setReqPayAmount(Number(e.target.value))}
                            className="w-full px-3 py-2 rounded-[10px] border border-border text-xs text-navy focus:outline-none focus:border-teal font-medium font-bold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-navy">Payment Description</label>
                          <input
                            type="text"
                            value={reqPayDesc}
                            onChange={(e) => setReqPayDesc(e.target.value)}
                            className="w-full px-3 py-2 rounded-[10px] border border-border text-xs text-navy focus:outline-none focus:border-teal"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <Button size="sm" onClick={handleSendPaymentRequest} className="font-bold text-xs py-1.5">
                          <Send className="w-3.5 h-3.5 mr-1" /> Send Payment Link
                        </Button>
                      </div>
                    </Card>

                    {/* Action D: Status Controls */}
                    <Card className="p-5 border border-border bg-white shadow-sm space-y-4">
                      <div>
                        <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-teal" /> Status & Conversions
                        </h4>
                        <p className="text-[10px] text-muted mt-0.5">Change lifecycle phase of inquiry from potential lead to confirmed customer.</p>
                      </div>

                      <div className="flex flex-wrap gap-2.5">
                        <button
                          type="button"
                          onClick={() => setShowConvertConfirm(true)}
                          disabled={activeInquiry.status === 'converted'}
                          className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold text-xs py-2 px-3 rounded-lg shadow transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{activeInquiry.status === 'converted' ? 'Converted' : 'Convert to Booking'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleCloseEnquiry}
                          disabled={activeInquiry.status === 'converted'}
                          className="flex-1 min-w-[120px] bg-slate-800 hover:bg-slate-900 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold text-xs py-2 px-3 rounded-lg shadow transition-colors cursor-pointer text-center"
                        >
                          Close Enquiry
                        </button>
                      </div>
                    </Card>

                  </div>
                )}

              </div>

              {/* 5. CONVERSION CONFIRMATION MODAL OVERLAY */}
              <AnimatePresence>
                {showConvertConfirm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-navy/40 z-30 flex items-center justify-center p-4 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white rounded-[24px] border border-border max-w-sm w-full p-6 space-y-4 shadow-2xl relative"
                    >
                      <button
                        onClick={() => setShowConvertConfirm(false)}
                        className="absolute top-4 right-4 text-muted hover:text-navy p-1 rounded-full hover:bg-page"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                          <Check className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-navy text-base">Convert to Booking?</h3>
                        <p className="text-xs text-muted leading-relaxed">
                          This will finalize the lead, mark the inquiry as **Converted**, and auto-create a confirmed booking reservation for **{activeInquiry.name}**.
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setShowConvertConfirm(false)}
                          className="flex-1 font-bold text-xs py-2 rounded-lg"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleConvertBooking}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold text-xs py-2 rounded-lg"
                        >
                          Confirm Convert
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          ) : (
            <div className="p-8 text-center text-muted text-xs space-y-2">
              <Reply className="w-10 h-10 mx-auto text-slate-300" />
              <p>Select an inquiry from the master list to open conversation logs & operational actions.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
