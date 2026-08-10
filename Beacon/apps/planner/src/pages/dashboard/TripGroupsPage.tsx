import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Calendar, ChevronRight, Mail, CheckCircle2, UserCheck, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { tripGroups } from '@/data/mockData'
import { formatDate } from '@/lib/utils'
import { TripGroupWorkspace } from '@/components/dashboard/TripGroupWorkspace'

export default function TripGroupsPage() {
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null)
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null)

  // If a Trip Group workspace is opened
  if (selectedGroup) {
    return (
      <TripGroupWorkspace
        group={selectedGroup}
        onBack={() => setSelectedGroup(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Trip Groups Workspace</h1>
          <p className="text-muted text-sm mt-1">
            Collaboration hub for group travel planners, document sharing, and member chat
          </p>
        </div>
      </div>

      {tripGroups.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="No trip groups yet"
          description="Trip groups will automatically be created when bookings are confirmed."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tripGroups.map((group, i) => {
            const isExpanded = expandedGroupId === group.id
            const bookings = group.bookingsList || []
            const totalTravelers = bookings.reduce((acc: number, b: any) => acc + (b.travelersCount || 1), 0) || group.members

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card hover className="p-0 overflow-hidden border border-border shadow-sm rounded-[18px] group">
                  <div className="relative">
                    <img src={group.image} alt={group.name} className="w-full h-40 object-cover" loading="lazy" />
                    <div className="absolute top-3 left-3 bg-navy/80 backdrop-blur-sm text-cyan text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full z-10">
                      {group.id}
                    </div>
                    {group.unread > 0 && (
                      <span className="absolute top-3 right-3 bg-teal text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md z-10">
                        {group.unread}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-4">
                    <div>
                      <span className="text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                        {group.packageName || 'Travel Package'}
                      </span>
                      <h3 className="font-bold text-navy text-base line-clamp-1 group-hover:text-teal transition-colors">
                        {group.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-page border border-border p-2.5 rounded-[12px]">
                      <div>
                        <span className="text-[10px] text-muted uppercase font-bold block">Members & Seats</span>
                        <strong className="text-navy flex items-center gap-1 font-mono">
                          <Users className="w-3.5 h-3.5 text-teal" />
                          {group.members} Bookings ({totalTravelers} Seats)
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted uppercase font-bold block">Departure</span>
                        <strong className="text-navy flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-teal" />
                          {formatDate(group.departure)}
                        </strong>
                      </div>
                    </div>

                    {/* Action Buttons: Open Workspace */}
                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        size="sm"
                        onClick={() => setSelectedGroup(group)}
                        className="w-full bg-navy hover:bg-navy/90 text-white font-bold gap-2 text-xs py-2 shadow-md cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-cyan" />
                        <span>Open Workspace</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-border/40">
                      <button
                        type="button"
                        onClick={() => setExpandedGroupId(isExpanded ? null : group.id)}
                        className="text-xs font-bold text-teal hover:text-navy flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Quick List' : `Quick List (${bookings.length})`}</span>
                      </button>

                      <Badge variant="info">Active Workspace</Badge>
                    </div>

                    {/* Expandable Member List */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 pt-2 border-t border-border/60 overflow-hidden"
                        >
                          <h4 className="text-[11px] font-bold text-muted uppercase tracking-wider">Confirmed Members</h4>
                          {bookings.length === 0 ? (
                            <p className="text-xs text-muted italic">No specific booking records attached.</p>
                          ) : (
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                              {bookings.map((b: any) => (
                                <div
                                  key={b.id}
                                  className="p-2.5 rounded-[12px] bg-page border border-border flex items-center justify-between text-xs"
                                >
                                  <div>
                                    <div className="flex items-center gap-1.5 font-bold text-navy">
                                      <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                                      <span>{b.traveler}</span>
                                      <span className="text-[10px] font-mono text-muted">({b.id})</span>
                                    </div>
                                    <div className="text-[10px] text-muted flex items-center gap-2 mt-0.5">
                                      <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-teal" />{b.email}</span>
                                    </div>
                                  </div>

                                  <div className="text-right">
                                    <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                      {b.travelersCount || 1} Seats
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
