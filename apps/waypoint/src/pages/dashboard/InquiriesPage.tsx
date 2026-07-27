import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reply, Filter } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { inquiries } from '@/data/mockData'
import { formatRelativeTime } from '@/lib/utils'

const filters = ['all', 'new', 'replied', 'converted']

export default function InquiriesPage() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? inquiries
    : inquiries.filter((i) => i.status === activeFilter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Inquiries</h1>
          <p className="text-muted text-sm mt-1">Manage and respond to traveler leads</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted" />
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                activeFilter === f ? 'bg-teal text-white' : 'bg-surface border border-border text-muted hover:border-teal/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Reply className="w-8 h-8" />}
          title="No inquiries found"
          description="When travelers reach out, their inquiries will appear here."
          actionLabel="Share a Package"
          onAction={() => {}}
        />
      ) : (
        <div className="grid gap-4">
          {filtered.map((inquiry, i) => (
            <motion.div
              key={inquiry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card hover>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <img src={inquiry.avatar} alt={inquiry.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-navy">{inquiry.name}</h3>
                      <StatusBadge status={inquiry.status} />
                      <span className="text-xs text-muted font-mono">{inquiry.id}</span>
                    </div>
                    <p className="text-sm text-muted mt-1">{inquiry.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                      <span>{inquiry.destination}</span>
                      <span>·</span>
                      <span>{formatRelativeTime(inquiry.timestamp)}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Reply className="w-4 h-4" /> Reply
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
