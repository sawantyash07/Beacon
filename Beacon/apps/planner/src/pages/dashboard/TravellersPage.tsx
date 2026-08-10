import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, UserCheck, ShieldCheck, Mail, Phone, Calendar, Heart, Award } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { toast } from 'sonner'

interface Traveller {
  id: string
  name: string
  email: string
  phone: string
  completedTrips: number
  upcomingTrips: number
  mealPreference: string
  emergencyContact: string
  documents: string[]
  isRepeat: boolean
  rating: number
}

const mockTravellers: Traveller[] = [
  {
    id: 'tr-1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    completedTrips: 5,
    upcomingTrips: 1,
    mealPreference: 'Vegetarian',
    emergencyContact: 'Priya Sharma (Wife) · +91 98765 43211',
    documents: ['Passport_Aarav.pdf', 'Visa_Maldives.pdf'],
    isRepeat: true,
    rating: 4.8
  },
  {
    id: 'tr-2',
    name: 'Meera Nair',
    email: 'meera.nair@example.com',
    phone: '+91 98123 45678',
    completedTrips: 3,
    upcomingTrips: 0,
    mealPreference: 'Gluten-Free',
    emergencyContact: 'Vijay Nair (Father) · +91 98123 45670',
    documents: ['Passport_Meera.pdf'],
    isRepeat: true,
    rating: 4.9
  },
  {
    id: 'tr-3',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@example.com',
    phone: '+91 90000 12345',
    completedTrips: 1,
    upcomingTrips: 1,
    mealPreference: 'No Preference',
    emergencyContact: 'Anil Deshmukh (Brother) · +91 90000 12346',
    documents: ['Passport_Rohan.pdf'],
    isRepeat: false,
    rating: 4.5
  },
  {
    id: 'tr-4',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 321-7654',
    completedTrips: 8,
    upcomingTrips: 2,
    mealPreference: 'Vegan',
    emergencyContact: 'Robert Jenkins (Husband) · +1 (555) 321-7650',
    documents: ['Passport_Sarah.pdf', 'Visa_India.pdf', 'Travel_Ins.pdf'],
    isRepeat: true,
    rating: 5.0
  }
]

export default function TravellersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'repeat' | 'new'>('all')

  const filteredTravellers = mockTravellers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.email.toLowerCase().includes(searchQuery.toLowerCase())
    if (filterType === 'repeat') return matchesSearch && t.isRepeat
    if (filterType === 'new') return matchesSearch && !t.isRepeat
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Travellers</h1>
          <p className="text-muted text-sm mt-1">Planner CRM: Manage client records, documents, preferences and emergency contacts</p>
        </div>
        <Button glow onClick={() => toast.success('New Traveller record added successfully (mock)')}>
          <Users className="w-4 h-4 mr-2" /> Add Traveller
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-[12px] text-sm text-navy focus:outline-none focus:border-teal/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <Button 
            variant={filterType === 'all' ? 'outline' : 'ghost'} 
            size="sm" 
            onClick={() => setFilterType('all')}
          >
            All Clients
          </Button>
          <Button 
            variant={filterType === 'repeat' ? 'outline' : 'ghost'} 
            size="sm" 
            onClick={() => setFilterType('repeat')}
          >
            Repeat Clients
          </Button>
          <Button 
            variant={filterType === 'new' ? 'outline' : 'ghost'} 
            size="sm" 
            onClick={() => setFilterType('new')}
          >
            New Clients
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTravellers.map((traveller) => (
          <motion.div
            key={traveller.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card hover className="p-5 border border-border">
              <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
                
                {/* Profile Header Block */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal font-extrabold text-lg shrink-0">
                    {traveller.name[0]}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-navy text-base leading-none">{traveller.name}</h3>
                      {traveller.isRepeat && (
                        <Badge variant="success" className="flex items-center gap-1 py-0.5 px-2 bg-teal/10 text-teal border border-teal/20">
                          <Award className="w-3 h-3" /> Repeat
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                      <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {traveller.email}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {traveller.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Engagement stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-4 lg:py-0 border-y lg:border-none border-border">
                  <div>
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Completed Trips</span>
                    <p className="font-mono font-bold text-navy text-sm mt-0.5">{traveller.completedTrips}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Upcoming Trips</span>
                    <p className="font-mono font-bold text-teal text-sm mt-0.5">{traveller.upcomingTrips || 'None'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Meal Preference</span>
                    <p className="font-medium text-navy text-xs mt-0.5 truncate max-w-[120px]">{traveller.mealPreference}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted uppercase font-bold tracking-wider">Verified Files</span>
                    <p className="font-medium text-teal text-xs mt-0.5 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> {traveller.documents.length} Docs</p>
                  </div>
                </div>

                {/* Actions Block */}
                <div className="flex flex-wrap items-center gap-3 justify-end">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-muted block">Emergency Contact</span>
                    <span className="text-[11px] font-medium text-navy block max-w-[200px] truncate">{traveller.emergencyContact}</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => toast.info(`Viewing documents for ${traveller.name}: ${traveller.documents.join(', ')}`)}>
                    Vault
                  </Button>
                  <Button size="sm" onClick={() => toast.success(`Contacting ${traveller.name}...`)}>
                    Contact
                  </Button>
                </div>

              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
