import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, MessageCircle, Heart, AlertTriangle, Filter, Check, Award } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { toast } from 'sonner'

interface Review {
  id: string
  name: string
  trip: string
  rating: number
  comment: string
  date: string
  isFeatured: boolean
  reply?: string
  isAlert: boolean
}

const mockReviews: Review[] = [
  {
    id: 'rev-1',
    name: 'Karan Malhotra',
    trip: 'Goa Adventure Tour',
    rating: 5,
    comment: 'Exceptional service! The package planner organized everything from yacht bookings to dinner tables perfectly. Highly recommended for couples!',
    date: '1 day ago',
    isFeatured: true,
    isAlert: false
  },
  {
    id: 'rev-2',
    name: 'Ananya Goel',
    trip: 'Kashmir Paradise Stay',
    rating: 4.8,
    comment: 'Beautiful Gulmarg accommodation and private guide. The cab driver was a bit late on Day 2, but the concierge team solved it within 5 minutes.',
    date: '3 days ago',
    isFeatured: false,
    reply: 'Thank you Ananya! We have addressed the timing delay with the cab vendor to prevent future occurrences.',
    isAlert: false
  },
  {
    id: 'rev-3',
    name: 'Vikram Sethi',
    trip: 'Bali Volcano Trek',
    rating: 3,
    comment: 'The hotel was great but Mount Batur trek was extremely crowded. Wish we had been warned about the tourist volume.',
    date: '1 week ago',
    isFeatured: false,
    isAlert: true
  }
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [showReplyBox, setShowReplyBox] = useState<Record<string, boolean>>({})

  const handleToggleFeature = (id: string) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        const nextState = !rev.isFeatured
        toast.success(nextState ? 'Review featured on your public B2C profile!' : 'Review removed from featured list.')
        return { ...rev, isFeatured: nextState }
      }
      return rev
    }))
  }

  const handleSendReply = (id: string) => {
    const text = replyText[id]?.trim()
    if (!text) return

    setReviews(prev => prev.map(rev => 
      rev.id === id ? { ...rev, reply: text } : rev
    ))
    setReplyText(prev => ({ ...prev, [id]: '' }))
    setShowReplyBox(prev => ({ ...prev, [id]: false }))
    toast.success('Reply submitted successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Reviews</h1>
        <p className="text-muted text-sm mt-1">Manage traveler reviews, post public replies, and manage featured testimonials</p>
      </div>

      {/* Stats Summary Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex items-center justify-between p-6">
          <div>
            <span className="text-xs text-muted block uppercase tracking-wide font-bold">Average Rating</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-navy">4.9</span>
              <span className="text-sm text-muted">/5.0</span>
            </div>
            <div className="flex gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-teal text-teal" />)}
            </div>
          </div>
          <div className="w-12 h-12 rounded-[16px] bg-teal/10 flex items-center justify-center text-teal">
            <Star className="w-6 h-6 fill-teal" />
          </div>
        </Card>

        <Card className="p-6 md:col-span-2">
          <span className="text-xs text-muted block uppercase tracking-wide font-bold mb-3">Rating Distribution</span>
          <div className="space-y-2">
            {[
              { label: '5 Stars', percent: 88, count: 125 },
              { label: '4 Stars', percent: 10, count: 14 },
              { label: '3 Stars', percent: 2, count: 3 }
            ].map((dist) => (
              <div key={dist.label} className="flex items-center gap-4 text-xs">
                <span className="w-12 text-navy font-semibold">{dist.label}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-teal" style={{ width: `${dist.percent}%` }} />
                </div>
                <span className="w-12 text-right text-muted font-mono">{dist.count}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-navy flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-teal" /> Recent Traveler Reviews
        </h2>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className={`p-5 border ${rev.isAlert ? 'border-yellow-500/20' : 'border-border'}`}>
                <div className="space-y-4">
                  {/* Top block */}
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-navy text-sm">{rev.name}</span>
                        <Badge variant="muted" className="text-[10px] py-0.5 px-2 bg-white/5 font-medium">{rev.trip}</Badge>
                        {rev.isAlert && (
                          <Badge variant="outline" className="text-[10px] text-yellow-500 border-yellow-500/20 bg-yellow-500/5 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Action Required
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-0.5 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-teal text-teal' : 'text-border fill-transparent'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted font-mono">{rev.date}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-navy/80 leading-relaxed font-normal bg-white/[0.01] p-3 rounded-[10px] border border-border/20">
                    "{rev.comment}"
                  </p>

                  {/* Response reply block */}
                  {rev.reply && (
                    <div className="bg-teal/5 border-l-2 border-teal p-3.5 rounded-r-[10px] text-xs space-y-1">
                      <span className="font-bold text-teal flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Your Response</span>
                      <p className="text-muted leading-relaxed font-normal">"{rev.reply}"</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 justify-end pt-2 border-t border-border/5">
                    <Button 
                      size="sm" 
                      variant={rev.isFeatured ? 'outline' : 'ghost'} 
                      onClick={() => handleToggleFeature(rev.id)}
                      className={rev.isFeatured ? 'border-teal/30 text-teal hover:bg-teal/5' : ''}
                    >
                      <Award className="w-4 h-4 mr-1.5" />
                      {rev.isFeatured ? 'Featured' : 'Feature Review'}
                    </Button>
                    {!rev.reply && (
                      <Button size="sm" variant="outline" onClick={() => setShowReplyBox(prev => ({ ...prev, [rev.id]: !prev[rev.id] }))}>
                        Reply
                      </Button>
                    )}
                  </div>

                  {/* Quick Reply Form */}
                  {showReplyBox[rev.id] && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-3 pt-3 border-t border-border/5"
                    >
                      <textarea
                        rows={2}
                        placeholder="Write your public reply..."
                        value={replyText[rev.id] || ''}
                        onChange={(e) => setReplyText(prev => ({ ...prev, [rev.id]: e.target.value }))}
                        className="w-full p-3 bg-surface border border-border rounded-[12px] text-xs text-navy focus:outline-none focus:border-teal/50 transition-colors placeholder:text-muted"
                      />
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setShowReplyBox(prev => ({ ...prev, [rev.id]: false }))}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={() => handleSendReply(rev.id)}>
                          Post Reply
                        </Button>
                      </div>
                    </motion.div>
                  )}

                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
