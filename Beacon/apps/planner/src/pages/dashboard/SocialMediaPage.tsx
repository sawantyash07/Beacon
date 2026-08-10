import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Share2, Link2, Unlink } from 'lucide-react'
import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { socialAccounts, sharedPosts } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

const BrandIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: FaInstagram,
  Facebook: FaFacebook,
  Youtube: FaYoutube,
  MessageCircle: FaWhatsapp,
}

export default function SocialMediaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Social Media</h1>
        <p className="text-muted text-sm mt-1">Connect accounts and auto-share published packages</p>
      </div>

      {/* Connected Accounts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialAccounts.map((account, i) => {
          const Icon = (BrandIcons[account.icon] || Icons[account.icon as keyof typeof Icons]) as React.ComponentType<{ className?: string }>
          return (
            <motion.div
              key={account.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[12px] bg-teal/10 flex items-center justify-center">
                      {Icon && <Icon className="w-5 h-5 text-teal" />}
                    </div>
                    <div>
                      <p className="font-medium text-navy">{account.platform}</p>
                      {account.connected ? (
                        <p className="text-xs text-muted">{account.handle}</p>
                      ) : (
                        <p className="text-xs text-muted">Not connected</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={account.connected ? 'success' : 'muted'}>
                      {account.connected ? 'Connected' : 'Disconnected'}
                    </Badge>
                    <Button size="sm" variant={account.connected ? 'ghost' : 'outline'}>
                      {account.connected ? <Unlink className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                      {account.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Auto-share toggle */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-navy">Auto-share new packages</h3>
            <p className="text-sm text-muted mt-1">Automatically post to connected accounts when you publish a package</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-border rounded-full peer peer-checked:bg-teal transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      </Card>

      {/* Recently shared */}
      <Card>
        <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-teal" /> Recently Shared
        </h2>
        <div className="space-y-3">
          {sharedPosts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-3 rounded-[12px] border border-border hover:border-teal/30 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-navy">{post.package}</p>
                <p className="text-xs text-muted">{post.platform} · {formatDate(post.date)}</p>
              </div>
              <span className="text-sm font-mono text-teal">{post.engagement} engagements</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
