import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, MessageSquare, Megaphone, Image as ImageIcon, Calendar, CheckSquare,
  ArrowLeft, Send, Pin, Plus, Upload, Phone, Heart, ChevronLeft,
  ChevronRight, X, Edit3, Trash2, Search, MapPin
} from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

interface TripGroupWorkspaceProps {
  group: any
  onBack: () => void
}

type WorkspaceTab =
  | 'overview'
  | 'chat'
  | 'announcements'
  | 'gallery'
  | 'itinerary'
  | 'tasks'
  | 'members'

interface ChatMessage {
  id: string
  sender: string
  avatar: string
  text: string
  timestamp: string
  isLead: boolean
  pinned: boolean
  reactions: Record<string, number>
}

interface PhotoItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  location?: string
  uploader: string
  uploaderAvatar?: string
  date: string
  pinned?: boolean
  likes: number
  isLiked?: boolean
}

export function TripGroupWorkspace({ group, onBack }: TripGroupWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('overview')

  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'Sarah Chen (Lead Planner)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
      text: 'Welcome everyone to the Trip Workspace! Check out our group announcements, itinerary, and Photo Gallery.',
      timestamp: '10:30 AM',
      isLead: true,
      pinned: true,
      reactions: { '👍': 4, '❤️': 2 },
    },
    {
      id: 'm2',
      sender: 'John Doe',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
      text: 'Thanks Sarah! Excited for the trip. What time is the welcome cocktail at the resort?',
      timestamp: '10:34 AM',
      isLead: false,
      pinned: false,
      reactions: { '👍': 1 },
    },
    {
      id: 'm3',
      sender: 'Sarah Chen (Lead Planner)',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
      text: 'The welcome cocktail starts at 6:30 PM at the Sunset Bar. Speedboat transfers from Malé marina are 100% arranged!',
      timestamp: '10:36 AM',
      isLead: true,
      pinned: false,
      reactions: { '🎉': 5 },
    },
  ])
  const [newMessageText, setNewMessageText] = useState('')

  // Announcements State
  const [announcements, setAnnouncements] = useState([
    {
      id: 'a1',
      title: 'Pre-Departure Briefing & Zoom Q&A',
      category: 'Meeting',
      date: '2026-08-01',
      author: 'Sarah Chen',
      content: 'We will host a 30-minute Zoom orientation call on August 1st at 6 PM EST to cover luggage allowances, resort dress codes, and island customs.',
      pinned: true,
    },
    {
      id: 'a2',
      title: 'Resort Check-In Time & Welcome Cocktail',
      category: 'Hotel',
      date: '2026-08-10',
      author: 'Waypoint Admin',
      content: 'Official check-in at Soneva Jani starts at 2:00 PM. A private welcome cocktail reception will take place at the Overwater Sunset Bar at 6:30 PM.',
      pinned: true,
    },
  ])
  const [newAnnounceTitle, setNewAnnounceTitle] = useState('')
  const [newAnnounceContent, setNewAnnounceContent] = useState('')
  const [newAnnounceCategory, setNewAnnounceCategory] = useState('General')
  const [showAddAnnounceModal, setShowAddAnnounceModal] = useState(false)

  // Photo Gallery State
  const [photos, setPhotos] = useState<PhotoItem[]>([
    {
      id: 'p1',
      title: 'Welcome Resort Lobby & Lounge',
      description: 'This is our main meeting point before the city tour and sunset cruise start at 6:30 PM.',
      imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80',
      category: 'Hotel & Resort',
      location: 'Soneva Jani Resort, Maldives',
      uploader: 'Sarah Chen (Lead Planner)',
      uploaderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
      date: '2026-07-25',
      pinned: true,
      likes: 12,
      isLiked: true,
    },
    {
      id: 'p2',
      title: 'Sunset Overwater Villa Deck',
      description: 'Private infinity pool deck where evening group cocktails and stargazing sessions take place.',
      imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80',
      category: 'Scenery & Views',
      location: 'Medhufaru Island Lagoon',
      uploader: 'Waypoint Admin',
      uploaderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
      date: '2026-07-26',
      pinned: true,
      likes: 18,
      isLiked: false,
    },
    {
      id: 'p3',
      title: 'Coral Reef Snorkeling Expedition',
      description: 'Certified marine biologist leading our morning reef exploration with sea turtles and spotted rays.',
      imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=80',
      category: 'Activities & Tours',
      location: 'Noonu Atoll Outer Reef',
      uploader: 'John Doe',
      uploaderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
      date: '2026-07-27',
      pinned: false,
      likes: 9,
      isLiked: true,
    },
  ])

  const [photoSearch, setPhotoSearch] = useState('')
  const [photoCategoryFilter, setPhotoCategoryFilter] = useState('All')
  const [photoSortBy, setPhotoSortBy] = useState<'newest' | 'oldest' | 'likes'>('newest')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [showUploadPhotoModal, setShowUploadPhotoModal] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<PhotoItem | null>(null)

  const [photoTitleInput, setPhotoTitleInput] = useState('')
  const [photoDescInput, setPhotoDescInput] = useState('')
  const [photoUrlInput, setPhotoUrlInput] = useState('')
  const [photoLocationInput, setPhotoLocationInput] = useState('')
  const [photoCategoryInput, setPhotoCategoryInput] = useState('Hotel & Resort')
  const [isUploading, setIsUploading] = useState(false)

  const filteredPhotos = useMemo(() => {
    let list = [...photos]
    if (photoSearch.trim()) {
      const q = photoSearch.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.location && p.location.toLowerCase().includes(q)) ||
          p.uploader.toLowerCase().includes(q)
      )
    }
    if (photoCategoryFilter !== 'All') list = list.filter((p) => p.category === photoCategoryFilter)
    list.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      if (photoSortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime()
      if (photoSortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime()
      if (photoSortBy === 'likes') return b.likes - a.likes
      return 0
    })
    return list
  }, [photos, photoSearch, photoCategoryFilter, photoSortBy])

  // Tasks State
  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Collect passport copies from all 8 group members', assignee: 'Sarah Chen', due: '2026-08-05', priority: 'High', completed: true },
    { id: 't2', title: 'Finalize overwater villa room allocations', assignee: 'Marcus Rivera', due: '2026-08-10', priority: 'High', completed: false },
    { id: 't3', title: 'Confirm private speedboat transfer times with Malé marina', assignee: 'Sarah Chen', due: '2026-08-12', priority: 'Medium', completed: false },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskAssignee, setNewTaskAssignee] = useState('Sarah Chen')
  const [newTaskPriority, setNewTaskPriority] = useState('Medium')
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)

  // Handlers for Photo Gallery
  const handleLikePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p))
    )
  }

  const handleTogglePinPhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextPinned = !p.pinned
          toast.success(nextPinned ? `Pinned "${p.title}" to top of gallery!` : `Unpinned "${p.title}".`)
          return { ...p, pinned: nextPinned }
        }
        return p
      })
    )
  }

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotos((prev) => prev.filter((p) => p.id !== id))
    toast.success('Photo removed from group gallery.')
  }

  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!photoUrlInput.trim()) {
      toast.error('Please provide an image URL.')
      return
    }

    setIsUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    if (editingPhoto) {
      setPhotos((prev) =>
        prev.map((p) =>
          p.id === editingPhoto.id
            ? {
                ...p,
                title: photoTitleInput.trim() || 'Trip Photo',
                description: photoDescInput.trim() || 'Shared with trip group.',
                imageUrl: photoUrlInput.trim(),
                location: photoLocationInput.trim() || 'Resort',
                category: photoCategoryInput,
              }
            : p
        )
      )
      toast.success('Photo details updated successfully!')
      setEditingPhoto(null)
    } else {
      const newPhoto: PhotoItem = {
        id: `p_${Date.now()}`,
        title: photoTitleInput.trim() || 'Trip Photo',
        description: photoDescInput.trim() || 'Shared with trip group.',
        imageUrl: photoUrlInput.trim(),
        category: photoCategoryInput,
        location: photoLocationInput.trim() || 'Resort',
        uploader: 'Planner Admin',
        uploaderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
        date: new Date().toISOString().slice(0, 10),
        pinned: false,
        likes: 1,
        isLiked: true,
      }
      setPhotos([newPhoto, ...photos])
      toast.success('Photo uploaded to Trip Gallery!')
    }

    setIsUploading(false)
    setShowUploadPhotoModal(false)
    setPhotoTitleInput('')
    setPhotoDescInput('')
    setPhotoUrlInput('')
    setPhotoLocationInput('')
  }

  const handleOpenEditPhotoModal = (photo: PhotoItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingPhoto(photo)
    setPhotoTitleInput(photo.title)
    setPhotoDescInput(photo.description)
    setPhotoUrlInput(photo.imageUrl)
    setPhotoLocationInput(photo.location || '')
    setPhotoCategoryInput(photo.category)
    setShowUploadPhotoModal(true)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessageText.trim()) return
    const msg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'Planner Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
      text: newMessageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLead: true,
      pinned: false,
      reactions: {},
    }
    setChatMessages([...chatMessages, msg])
    setNewMessageText('')
    toast.success('Message sent to group chat')
  }

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAnnounceTitle.trim() || !newAnnounceContent.trim()) return
    const ann = {
      id: `a_${Date.now()}`,
      title: newAnnounceTitle.trim(),
      category: newAnnounceCategory,
      date: new Date().toISOString().slice(0, 10),
      author: 'Planner Admin',
      content: newAnnounceContent.trim(),
      pinned: true,
    }
    setAnnouncements([ann, ...announcements])
    setNewAnnounceTitle('')
    setNewAnnounceContent('')
    setShowAddAnnounceModal(false)
    toast.success('New announcement posted to workspace!')
  }

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    const task = {
      id: `t_${Date.now()}`,
      title: newTaskTitle.trim(),
      assignee: newTaskAssignee,
      due: '2026-08-12',
      priority: newTaskPriority,
      completed: false,
    }
    setTasks([...tasks, task])
    setNewTaskTitle('')
    setShowAddTaskModal(false)
    toast.success('Task created and assigned!')
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
    toast.success('Task status updated!')
  }

  const bookingsList = group.bookingsList || []
  const totalTravelers = bookingsList.reduce((acc: number, b: any) => acc + (b.travelersCount || 1), 0) || group.members

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Back Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-teal hover:bg-teal/10 font-semibold gap-2 border border-teal/20"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Trip Groups</span>
        </Button>

        <span className="text-xs font-mono text-muted bg-page px-3 py-1 rounded-full border border-border">
          Workspace ID: {group.id}
        </span>
      </div>

      {/* Group Hero Banner */}
      <Card className="p-6 bg-gradient-to-r from-navy via-navy/95 to-teal text-white border-0 shadow-xl rounded-[24px] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={group.image}
              alt={group.name}
              className="w-20 h-20 rounded-[16px] object-cover border-2 border-white/20 shadow-md shrink-0"
            />
            <div>
              <span className="bg-cyan/20 border border-cyan/40 text-cyan text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase">
                {group.packageName || 'Group Workspace'}
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">{group.name}</h2>
              <p className="text-xs text-cyan/90 mt-0.5">
                Departure: <strong>{formatDate(group.departure)}</strong> · {group.members} Bookings ({totalTravelers} Travelers)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setActiveTab('gallery')}
              className="bg-cyan hover:bg-cyan/90 text-navy font-bold gap-2 shadow-md"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photo Gallery ({photos.length})</span>
            </Button>
          </div>
        </div>
      </Card>

      {/* Navigation Workspace Tabs (Traveler-focused: Overview, Chat, Announcements, Gallery, Itinerary, Tasks, Members) */}
      <div className="flex items-center gap-1.5 overflow-x-auto border-b border-border pb-3 scrollbar-none">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Users className="w-4 h-4" />} label="Overview" />
        <TabButton active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageSquare className="w-4 h-4" />} label="Group Chat" badge={chatMessages.length} />
        <TabButton active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} icon={<Megaphone className="w-4 h-4" />} label="Announcements" badge={announcements.length} />
        <TabButton active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} icon={<ImageIcon className="w-4 h-4" />} label="Photo Gallery" badge={photos.length} />
        <TabButton active={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')} icon={<Calendar className="w-4 h-4" />} label="Itinerary" />
        <TabButton active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} icon={<CheckSquare className="w-4 h-4" />} label="Tasks" badge={tasks.filter((t) => !t.completed).length} />
        <TabButton active={activeTab === 'members'} onClick={() => setActiveTab('members')} icon={<Users className="w-4 h-4" />} label="Members" badge={bookingsList.length || group.members} />
      </div>

      {/* ---------------- TAB 1: OVERVIEW ---------------- */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5 border border-border shadow-sm space-y-4">
              <h3 className="text-base font-bold text-navy flex items-center gap-2">
                <Users className="w-5 h-5 text-teal" /> Group Capacity & Travel Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-page border border-border p-3.5 rounded-[14px]">
                  <span className="text-[10px] uppercase font-bold text-muted block">Bookings</span>
                  <strong className="text-xl font-bold text-navy font-mono">{group.members}</strong>
                </div>
                <div className="bg-page border border-border p-3.5 rounded-[14px]">
                  <span className="text-[10px] uppercase font-bold text-muted block">Total Seats</span>
                  <strong className="text-xl font-bold text-teal font-mono">{totalTravelers}</strong>
                </div>
                <div className="bg-page border border-border p-3.5 rounded-[14px]">
                  <span className="text-[10px] uppercase font-bold text-muted block">Departure Date</span>
                  <strong className="text-sm font-bold text-navy">{formatDate(group.departure)}</strong>
                </div>
              </div>
            </Card>

            {/* Pinned Announcements Preview */}
            <Card className="p-5 border border-border shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-navy flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-teal" /> Latest Pinned Notice
                </h3>
                <Button size="sm" variant="ghost" onClick={() => setActiveTab('announcements')} className="text-xs text-teal font-bold">
                  View All
                </Button>
              </div>

              {announcements.slice(0, 1).map((ann) => (
                <div key={ann.id} className="p-4 bg-teal/10 border border-teal/30 rounded-[16px] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-teal uppercase bg-surface px-2.5 py-0.5 rounded-full border border-teal/30">
                      {ann.category}
                    </span>
                    <span className="text-xs text-muted">{formatDate(ann.date)}</span>
                  </div>
                  <h4 className="font-bold text-navy text-base">{ann.title}</h4>
                  <p className="text-xs text-navy/80 leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </Card>
          </div>

          {/* Right Sidebar Contacts & Tasks */}
          <div className="space-y-6">
            <Card className="p-5 border border-border shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal" /> Emergency Contacts
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-page border border-border rounded-[10px] flex justify-between">
                  <div>
                    <strong className="text-navy block">Trip Emergency Concierge</strong>
                    <span className="text-muted">+1 (555) 019-2831</span>
                  </div>
                  <a href="tel:+15550192831" className="text-teal font-bold hover:underline">Call</a>
                </div>
                <div className="p-2.5 bg-page border border-border rounded-[10px] flex justify-between">
                  <div>
                    <strong className="text-navy block">Resort Desk Concierge</strong>
                    <span className="text-muted">+960 660-0000</span>
                  </div>
                  <a href="tel:+9606600000" className="text-teal font-bold hover:underline">Call</a>
                </div>
              </div>
            </Card>

            <Card className="p-5 border border-border shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-teal" /> Pending Prep Tasks
              </h3>
              <div className="space-y-2 text-xs">
                {tasks.filter((t) => !t.completed).map((t) => (
                  <div key={t.id} className="p-2.5 bg-page border border-border rounded-[10px] flex items-center justify-between">
                    <span className="font-medium text-navy line-clamp-1">{t.title}</span>
                    <button
                      onClick={() => handleToggleTask(t.id)}
                      className="w-5 h-5 rounded-md border border-teal/40 hover:bg-teal/20 text-teal flex items-center justify-center shrink-0 cursor-pointer"
                    >
                      ✓
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: GROUP CHAT ---------------- */}
      {activeTab === 'chat' && (
        <Card className="p-0 overflow-hidden border border-border shadow-md rounded-[24px] flex flex-col h-[580px]">
          <div className="p-4 bg-page border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h3 className="font-bold text-navy text-sm">{group.name} Chat Workspace</h3>
                <p className="text-[11px] text-muted">8 members active · Real-time planner channel</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-surface">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 group">
                <img src={msg.avatar} alt={msg.sender} className="w-9 h-9 rounded-full object-cover border border-border shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-navy text-xs">{msg.sender}</span>
                    {msg.isLead && (
                      <span className="text-[9px] font-extrabold bg-teal/10 text-teal px-2 py-0.2 rounded-full border border-teal/20 uppercase">
                        Lead Planner
                      </span>
                    )}
                    <span className="text-[10px] text-muted">{msg.timestamp}</span>
                    {msg.pinned && <Pin className="w-3 h-3 text-amber-500 fill-amber-500" />}
                  </div>

                  <div className="p-3 rounded-[16px] bg-page border border-border text-xs text-navy max-w-xl leading-relaxed">
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-1.5 pt-0.5">
                    {Object.entries(msg.reactions).map(([emoji, count]) => (
                      <span key={emoji} className="text-[10px] bg-page border border-border px-2 py-0.5 rounded-full font-bold text-navy">
                        {emoji} {count}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-3 bg-page border-t border-border flex items-center gap-2">
            <input
              type="text"
              placeholder="Type message, mention members with @..."
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-[14px] border border-border bg-surface text-xs text-navy focus:outline-none focus:ring-2 focus:ring-teal/30"
            />
            <Button type="submit" size="sm" className="bg-teal hover:bg-teal/90 text-white font-bold gap-1.5">
              <Send className="w-3.5 h-3.5" /> Send
            </Button>
          </form>
        </Card>
      )}

      {/* ---------------- TAB 3: ANNOUNCEMENTS ---------------- */}
      {activeTab === 'announcements' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-navy">Group Announcements</h3>
              <p className="text-xs text-muted">Pinned Notices & Travel Updates</p>
            </div>
            <Button size="sm" onClick={() => setShowAddAnnounceModal(true)} className="bg-teal hover:bg-teal/90 text-white font-bold gap-1.5">
              <Plus className="w-4 h-4" /> Post Announcement
            </Button>
          </div>

          <div className="space-y-4">
            {announcements.map((ann) => (
              <Card key={ann.id} className="p-5 border border-border shadow-sm rounded-[18px] space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-teal bg-teal/10 px-3 py-0.5 rounded-full border border-teal/20">
                      {ann.category}
                    </span>
                    {ann.pinned && (
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                        <Pin className="w-3 h-3 text-amber-500 fill-amber-500" /> Pinned Notice
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted">Posted: {formatDate(ann.date)} by {ann.author}</span>
                </div>
                <h4 className="text-lg font-bold text-navy">{ann.title}</h4>
                <p className="text-xs text-navy/80 leading-relaxed">{ann.content}</p>
              </Card>
            ))}
          </div>

          <AnimatePresence>
            {showAddAnnounceModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddAnnounceModal(false)} className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-surface border border-border rounded-[24px] p-6 shadow-2xl space-y-4 z-10">
                  <h3 className="font-bold text-navy text-lg">Post New Announcement</h3>
                  <form onSubmit={handleAddAnnouncement} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-navy block mb-1">Title</label>
                      <input type="text" placeholder="Title (e.g. Flight Departure Update)" value={newAnnounceTitle} onChange={(e) => setNewAnnounceTitle(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy" required />
                    </div>
                    <div>
                      <label className="font-bold text-navy block mb-1">Category</label>
                      <select value={newAnnounceCategory} onChange={(e) => setNewAnnounceCategory(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy">
                        <option value="Meeting">Meeting</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Flight">Flight</option>
                        <option value="Weather">Weather Alert</option>
                        <option value="Emergency">Emergency Notice</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-navy block mb-1">Notice Content</label>
                      <textarea rows={3} placeholder="Provide details..." value={newAnnounceContent} onChange={(e) => setNewAnnounceContent(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy resize-none" required />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="ghost" size="sm" type="button" onClick={() => setShowAddAnnounceModal(false)}>Cancel</Button>
                      <Button variant="primary" size="sm" type="submit">Post Announcement</Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ---------------- TAB 4: ENHANCED PHOTO GALLERY ---------------- */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 border border-border rounded-[20px] shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search trip photos by title, caption, location, or uploader..."
                value={photoSearch}
                onChange={(e) => setPhotoSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-border bg-page text-xs focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={photoCategoryFilter}
                onChange={(e) => setPhotoCategoryFilter(e.target.value)}
                className="px-3 py-2 rounded-[10px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
              >
                <option value="All">All Categories</option>
                <option value="Hotel & Resort">Hotel & Resort</option>
                <option value="Activities & Tours">Activities & Tours</option>
                <option value="Scenery & Views">Scenery & Views</option>
              </select>

              <select
                value={photoSortBy}
                onChange={(e) => setPhotoSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-[10px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="likes">Sort: Most Liked</option>
              </select>

              <Button
                size="sm"
                onClick={() => {
                  setEditingPhoto(null)
                  setPhotoTitleInput('')
                  setPhotoDescInput('')
                  setPhotoUrlInput('')
                  setPhotoLocationInput('')
                  setShowUploadPhotoModal(true)
                }}
                className="bg-teal hover:bg-teal/90 text-white font-bold gap-1.5"
              >
                <Upload className="w-4 h-4" /> Add Photos
              </Button>
            </div>
          </div>

          {filteredPhotos.length === 0 ? (
            <Card className="p-12 text-center border-2 border-dashed border-border rounded-[20px] space-y-3">
              <ImageIcon className="w-12 h-12 text-muted mx-auto" />
              <h4 className="text-base font-bold text-navy">No photos found in gallery</h4>
              <p className="text-xs text-muted max-w-sm mx-auto">Upload photos to build a visual trip album.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Card
                    hover
                    onClick={() => setLightboxIndex(index)}
                    className="p-0 overflow-hidden cursor-pointer group border border-border hover:border-teal hover:shadow-xl transition-all rounded-[20px] relative flex flex-col justify-between"
                  >
                    <div className="relative h-64 overflow-hidden bg-page">
                      <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      {photo.pinned && (
                        <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
                          <Pin className="w-3 h-3 fill-white" /> Pinned Photo
                        </div>
                      )}
                      <span className="absolute top-3 right-3 bg-navy/80 text-cyan backdrop-blur-md text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                        {photo.category}
                      </span>

                      <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button type="button" onClick={(e) => handleTogglePinPhoto(photo.id, e)} className={`p-2 rounded-full backdrop-blur-md text-white transition-transform hover:scale-110 shadow-md ${photo.pinned ? 'bg-amber-500' : 'bg-navy/70 hover:bg-navy'}`} title="Pin Photo">
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={(e) => handleOpenEditPhotoModal(photo, e)} className="p-2 rounded-full bg-navy/70 hover:bg-navy text-white backdrop-blur-md transition-transform hover:scale-110 shadow-md" title="Edit Caption">
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={(e) => handleDeletePhoto(photo.id, e)} className="p-2 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white backdrop-blur-md transition-transform hover:scale-110 shadow-md" title="Delete Photo">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-bold text-navy text-base group-hover:text-teal transition-colors line-clamp-1">{photo.title}</h4>
                          <button type="button" onClick={(e) => handleLikePhoto(photo.id, e)} className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full border border-border bg-page hover:bg-rose-50 text-rose-500 transition-colors">
                            <Heart className={`w-3.5 h-3.5 ${photo.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                            <span>{photo.likes}</span>
                          </button>
                        </div>
                        <p className="text-xs text-muted leading-relaxed line-clamp-2">{photo.description}</p>
                      </div>

                      {photo.location && (
                        <div className="text-[11px] font-semibold text-teal flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-teal" />
                          <span>{photo.location}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* LIGHTBOX MODAL */}
          <AnimatePresence>
            {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxIndex(null)} className="absolute inset-0 bg-navy/90 backdrop-blur-md" />
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-4xl bg-surface border border-border rounded-[24px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
                  <div className="p-4 bg-page border-b border-border flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-full">
                      Photo {lightboxIndex + 1} of {filteredPhotos.length}
                    </span>
                    <button type="button" onClick={() => setLightboxIndex(null)} className="p-2 rounded-full hover:bg-page text-muted hover:text-navy">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="relative flex-1 bg-black/90 flex items-center justify-center min-h-[360px] max-h-[500px]">
                    <img src={filteredPhotos[lightboxIndex].imageUrl} alt={filteredPhotos[lightboxIndex].title} className="max-w-full max-h-[500px] object-contain" />
                    {lightboxIndex > 0 && (
                      <button type="button" onClick={() => setLightboxIndex(lightboxIndex - 1)} className="absolute left-4 p-3 rounded-full bg-navy/70 hover:bg-navy text-white shadow-lg">
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                    )}
                    {lightboxIndex < filteredPhotos.length - 1 && (
                      <button type="button" onClick={() => setLightboxIndex(lightboxIndex + 1)} className="absolute right-4 p-3 rounded-full bg-navy/70 hover:bg-navy text-white shadow-lg">
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                  <div className="p-5 bg-surface space-y-2">
                    <h4 className="font-bold text-navy text-base">{filteredPhotos[lightboxIndex].title}</h4>
                    <p className="text-xs text-navy/80 leading-relaxed">{filteredPhotos[lightboxIndex].description}</p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* UPLOAD PHOTO MODAL */}
          <AnimatePresence>
            {showUploadPhotoModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowUploadPhotoModal(false)} className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-surface border border-border rounded-[24px] p-6 shadow-2xl space-y-4 z-10">
                  <h3 className="font-bold text-navy text-lg">{editingPhoto ? 'Edit Photo Caption' : 'Upload New Photo'}</h3>
                  <form onSubmit={handleUploadPhoto} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-navy block mb-1">Image URL</label>
                      <input type="text" value={photoUrlInput} onChange={(e) => setPhotoUrlInput(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy" required />
                    </div>
                    <div>
                      <label className="font-bold text-navy block mb-1">Title</label>
                      <input type="text" value={photoTitleInput} onChange={(e) => setPhotoTitleInput(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy" required />
                    </div>
                    <div>
                      <label className="font-bold text-navy block mb-1">Caption / Description</label>
                      <textarea rows={3} value={photoDescInput} onChange={(e) => setPhotoDescInput(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy resize-none" required />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="ghost" size="sm" type="button" onClick={() => setShowUploadPhotoModal(false)}>Cancel</Button>
                      <Button variant="primary" size="sm" type="submit" disabled={isUploading}>{isUploading ? 'Uploading...' : 'Save Photo'}</Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ---------------- TAB 5: ITINERARY ---------------- */}
      {activeTab === 'itinerary' && (
        <Card className="p-6 border border-border shadow-sm rounded-[20px] space-y-4">
          <h3 className="text-lg font-bold text-navy">Shared Group Itinerary & Schedule</h3>
          <div className="space-y-4">
            <div className="p-4 bg-page border border-border rounded-[14px] space-y-1">
              <span className="text-xs font-bold text-teal font-mono">Day 1 · Arrival & Sunset Reception</span>
              <h4 className="font-bold text-navy text-sm">Resort Arrival & Maldives Sunset Dinner</h4>
              <p className="text-xs text-muted">Arrive at Malé Marina for speedboat transfer to Soneva Jani Resort. Welcome drink & evening dinner at beach.</p>
            </div>
            <div className="p-4 bg-page border border-border rounded-[14px] space-y-1">
              <span className="text-xs font-bold text-teal font-mono">Day 2 · Coral Reef Snorkeling</span>
              <h4 className="font-bold text-navy text-sm">Guided Atoll Snorkeling Excursion</h4>
              <p className="text-xs text-muted">Morning snorkeling tour with certified marine biologist. Afternoon free time at villa lagoon.</p>
            </div>
          </div>
        </Card>
      )}

      {/* ---------------- TAB 6: TASKS ---------------- */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-navy">Group Preparation Tasks Checklist</h3>
              <p className="text-xs text-muted">Assign and track trip tasks</p>
            </div>
            <Button size="sm" onClick={() => setShowAddTaskModal(true)} className="bg-teal hover:bg-teal/90 text-white font-bold gap-1.5">
              <Plus className="w-4 h-4" /> Create Task
            </Button>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <Card key={task.id} className="p-4 border border-border shadow-sm rounded-[14px] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={task.completed} onChange={() => handleToggleTask(task.id)} className="w-4 h-4 accent-teal rounded cursor-pointer" />
                  <div>
                    <h4 className={`font-bold text-xs ${task.completed ? 'line-through text-muted' : 'text-navy'}`}>{task.title}</h4>
                    <p className="text-[10px] text-muted">Assignee: {task.assignee} · Priority: {task.priority}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${task.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </Card>
            ))}
          </div>

          <AnimatePresence>
            {showAddTaskModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAddTaskModal(false)} className="absolute inset-0 bg-navy/60 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-md bg-surface border border-border rounded-[24px] p-6 shadow-2xl space-y-4 z-10">
                  <h3 className="font-bold text-navy text-lg">Create Trip Task</h3>
                  <form onSubmit={handleAddTask} className="space-y-3 text-xs">
                    <div>
                      <label className="font-bold text-navy block mb-1">Task Title</label>
                      <input type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy" required />
                    </div>
                    <div>
                      <label className="font-bold text-navy block mb-1">Assignee</label>
                      <input type="text" value={newTaskAssignee} onChange={(e) => setNewTaskAssignee(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy" />
                    </div>
                    <div>
                      <label className="font-bold text-navy block mb-1">Priority</label>
                      <select value={newTaskPriority} onChange={(e) => setNewTaskPriority(e.target.value)} className="w-full px-3 py-2 rounded-[10px] border border-border bg-page text-navy">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="ghost" size="sm" type="button" onClick={() => setShowAddTaskModal(false)}>Cancel</Button>
                      <Button variant="primary" size="sm" type="submit">Create Task</Button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ---------------- TAB 7: MEMBERS ---------------- */}
      {activeTab === 'members' && (
        <Card className="p-6 border border-border shadow-sm rounded-[20px] space-y-4">
          <h3 className="text-lg font-bold text-navy">Confirmed Group Members & Allocations</h3>
          <div className="space-y-3">
            {bookingsList.map((b: any) => (
              <div key={b.id} className="p-3.5 bg-page border border-border rounded-[14px] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-teal/10 text-teal font-bold flex items-center justify-center">
                    {b.traveler.slice(0, 1)}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-xs">{b.traveler} ({b.id})</h4>
                    <p className="text-[10px] text-muted">{b.email} · {b.phone || '+1 (555) 000-0000'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-teal block">{b.travelersCount || 1} Travelers</span>
                  <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Villa #102 Allocated
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

function TabButton({ active, onClick, icon, label, badge }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string; badge?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-[12px] text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
        active ? 'bg-navy text-white shadow-md' : 'bg-page border border-border text-muted hover:text-navy hover:bg-surface'
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${active ? 'bg-cyan text-navy' : 'bg-teal/10 text-teal'}`}>
          {badge}
        </span>
      )}
    </button>
  )
}
