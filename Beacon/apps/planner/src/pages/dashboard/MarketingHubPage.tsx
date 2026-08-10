import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Share2, Link2, Unlink, QrCode, Copy, Check, MessageSquare, 
  Send, Download, Image as ImageIcon, Sparkles
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { socialAccounts, sharedPosts } from '@/data/mockData'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'

export default function MarketingHubPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const [showQR, setShowQR] = useState(false)

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link)
    setCopied(id)
    toast.success('Link copied to clipboard!')
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Marketing Hub</h1>
        <p className="text-muted text-sm mt-1">Promote travel packages, generate QR codes, share on social, and track campaigns</p>
      </div>

      {/* Quick Promotion Assets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hover className="flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[12px] bg-teal/10 flex items-center justify-center text-teal">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-navy mt-2">QR Code Generator</h3>
            <p className="text-xs text-muted">Generate instant QR codes for your trip catalog or specific packages for print flyers & stickers.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-[10px] text-muted">Format: PNG, SVG</span>
            <Button size="sm" variant="outline" onClick={() => setShowQR(!showQR)}>
              {showQR ? 'Hide Code' : 'Generate QR'}
            </Button>
          </div>
          {showQR && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="mt-4 p-4 bg-white border border-border rounded-[16px] flex flex-col items-center justify-center gap-2"
            >
              <div className="w-32 h-32 bg-slate-100 flex items-center justify-center rounded-[8px] border-2 border-dashed border-teal/20">
                {/* Mock QR Code visual representation */}
                <div className="grid grid-cols-4 gap-1 w-24 h-24 p-1 bg-white">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={`w-full h-full ${i % 3 === 0 || i % 7 === 0 ? 'bg-navy' : 'bg-transparent'}`} />
                  ))}
                </div>
              </div>
              <Button size="sm" className="w-full mt-2" variant="ghost">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download QR Code
              </Button>
            </motion.div>
          )}
        </Card>

        <Card hover className="flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[12px] bg-teal/10 flex items-center justify-center text-teal">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-navy mt-2">Instagram Story Poster</h3>
            <p className="text-xs text-muted">Auto-generate 9:16 portrait story images pre-populated with package details, pricing, and QR codes.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-[10px] text-muted">Premium Layout Templates</span>
            <Button size="sm" variant="outline" onClick={() => toast.info('Story templates loading...')}>
              Preview Templates
            </Button>
          </div>
        </Card>

        <Card hover className="flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-[12px] bg-teal/10 flex items-center justify-center text-teal">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-navy mt-2">WhatsApp Marketing</h3>
            <p className="text-xs text-muted">Export clean broadcast templates with CTA links to instantly blast to your traveller groups.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-[10px] text-muted">Ready to broadcast</span>
            <Button size="sm" variant="outline" onClick={() => handleCopyLink('https://beaconplanner.com/planner/catalog', 'broadcast')}>
              {copied === 'broadcast' ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              Copy Share Link
            </Button>
          </div>
        </Card>
      </div>

      {/* Connected Accounts */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-navy">Connected Channels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialAccounts.map((account, i) => {
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
                      <div className="w-10 h-10 rounded-[12px] bg-teal/10 flex items-center justify-center text-teal font-extrabold text-sm">
                        {account.platform[0]}
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
                        {account.connected ? 'Active' : 'Disconnected'}
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
      </div>

      {/* Auto-share setting */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-navy">Auto-sync promotions</h3>
            <p className="text-sm text-muted mt-1">Automatically notify connected groups and update bio links when new departures are listed.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-border rounded-full peer peer-checked:bg-teal transition-colors after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
      </Card>

      {/* Promotion Logs */}
      <Card>
        <h2 className="text-lg font-semibold text-navy mb-4 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-teal" /> Share History & Engagement Logs
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
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted">{post.engagement} views</span>
                <Button size="sm" variant="ghost" onClick={() => toast.info('Exporting report...')}>Report</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
