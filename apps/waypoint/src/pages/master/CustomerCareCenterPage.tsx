import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Headphones,
  Search,
  MessageSquare,
  Clock,
  Send,
} from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'
import { type SupportTicket } from '@/data/masterAdminData'

export default function CustomerCareCenterPage() {
  const { tickets, updateTicketStatus, addTicketMessage } = useMasterAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [replyText, setReplyText] = useState('')

  const filteredTickets = tickets.filter((t) => {
    const q = searchQuery.toLowerCase()
    return (
      t.ticketCode.toLowerCase().includes(q) ||
      t.customerName.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    )
  })

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTicket || !replyText) return
    addTicketMessage(selectedTicket.id, replyText)
    setReplyText('')
  }

  return (
    <div className="space-y-8 font-body">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-1">
            <Headphones className="w-4 h-4 text-cyan" />
            <span>Enterprise Support & Relationship Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            CUSTOMER <span className="text-gradient">CARE</span> CENTER
          </h1>
          <p className="text-xs text-cyan-200/70 font-mono mt-1">
            Centralized support desk, live SLA tracking, dual customer-planner communication & ticket escalation
          </p>
        </div>
      </div>

      {/* SUPPORT PERFORMANCE DASHBOARD METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs text-cyan-300/70">Customer Satisfaction (CSAT)</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">4.8 / 5.0</div>
          <div className="text-[10px] text-emerald-400 mt-1">Based on 1,420 ratings</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs text-cyan-300/70">Average Response Time</div>
          <div className="text-2xl font-extrabold text-white mt-1">12 Minutes</div>
          <div className="text-[10px] text-emerald-400 mt-1">Target &lt; 15 mins</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs text-cyan-300/70">SLA Compliance Rate</div>
          <div className="text-2xl font-extrabold text-cyan mt-1">98.4%</div>
          <div className="text-[10px] text-cyan mt-1">0 breached SLA tickets today</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-red-500/30 bg-red-500/5">
          <div className="text-xs text-red-300">Escalated Critical Tickets</div>
          <div className="text-2xl font-extrabold text-red-400 mt-1">
            {tickets.filter((t) => t.priority === 'Critical').length} Critical
          </div>
          <div className="text-[10px] text-red-400 mt-1">Requires senior care officer</div>
        </div>
      </div>

      {/* SEARCH & TICKETS DESK TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4 font-mono">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search ticket code, customer, category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan"
          />
          <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-2.5" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Ticket Code / Category</th>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Assigned Agent</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">SLA Countdown</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-cyan/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div className="text-cyan">{t.ticketCode}</div>
                    <div className="text-[11px] text-slate-300 font-normal">{t.category}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>{t.customerName}</div>
                    <div className="text-[11px] text-cyan-300/70">{t.customerPhone}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">{t.assignedExecutive}</td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      t.priority === 'Critical'
                        ? 'bg-red-600 text-white animate-pulse'
                        : t.priority === 'High'
                        ? 'bg-amber-500 text-navy'
                        : 'bg-cyan/20 text-cyan'
                    }`}>
                      {t.priority}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-amber-300">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{t.slaTimeRemaining}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-navy border border-cyan/30 text-cyan-200">
                      {t.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedTicket(t)}
                      className="px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs font-bold flex items-center gap-1 ml-auto"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open Desk</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DUAL CHANNEL CHAT & TICKET DESK MODAL */}
      <AnimatePresence>
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono text-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-3xl glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Support Desk #{selectedTicket.ticketCode} - {selectedTicket.category}
                  </h3>
                  <p className="text-xs text-cyan">Customer: {selectedTicket.customerName} ({selectedTicket.customerPhone})</p>
                </div>
                <button onClick={() => setSelectedTicket(null)} className="px-3 py-1 bg-navy text-slate-300 rounded">
                  Close Desk
                </button>
              </div>

              {/* TIMELINE MESSAGES */}
              <div className="space-y-3 p-4 bg-navy/70 rounded-xl border border-cyan/20 max-h-60 overflow-y-auto scrollbar-thin">
                {selectedTicket.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-3 rounded-xl border ${
                      m.sender === 'customer'
                        ? 'bg-cyan/10 border-cyan/30 text-white'
                        : m.sender === 'planner'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                        : 'bg-teal/20 border-teal/40 text-cyan-100'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-[11px] mb-1">
                      <span>{m.senderName}</span>
                      <span className="text-cyan-300/60 font-normal">{m.timestamp}</span>
                    </div>
                    <p className="text-xs leading-relaxed">{m.text}</p>
                  </div>
                ))}
              </div>

              {/* REPLY FORM */}
              <form onSubmit={handleSendReply} className="space-y-3">
                <textarea
                  rows={3}
                  placeholder="Type official response to customer & planner..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-[#001736] border border-cyan/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan"
                />

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateTicketStatus(selectedTicket.id, 'Resolved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold"
                    >
                      Mark Resolved
                    </button>
                    <button
                      type="button"
                      onClick={() => updateTicketStatus(selectedTicket.id, 'Escalated')}
                      className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-300 border border-red-500/30 font-bold"
                    >
                      Escalate Ticket
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-cyan text-navy font-bold flex items-center gap-1.5 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
