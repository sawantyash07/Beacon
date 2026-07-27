import { motion } from 'framer-motion'
import { Users, MessageCircle, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { tripGroups } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

export default function TripGroupsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Trip Groups</h1>
        <p className="text-muted text-sm mt-1">Organize group travel and manage members</p>
      </div>

      {tripGroups.length === 0 ? (
        <EmptyState
          icon={<Users className="w-8 h-8" />}
          title="No trip groups yet"
          description="Create a group when organizing travel for multiple people."
          actionLabel="Create Group"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tripGroups.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover className="p-0 overflow-hidden">
                <div className="relative">
                  <img src={group.image} alt={group.name} className="w-full h-40 object-cover" loading="lazy" />
                  {group.unread > 0 && (
                    <span className="absolute top-3 right-3 bg-teal text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                      {group.unread}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-navy mb-2">{group.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted mb-4">
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{group.members} members</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(group.departure)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="info">Group chat coming soon</Badge>
                    <button className="flex items-center gap-1 text-sm text-teal hover:text-cyan transition-colors">
                      <MessageCircle className="w-4 h-4" /> Messages
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
