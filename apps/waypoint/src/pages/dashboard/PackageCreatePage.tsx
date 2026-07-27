import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, X, Upload, Save, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency } from '@/lib/utils'

interface PackageForm {
  title: string
  destination: string
  duration: string
  price: number
  discount: number
  hotel: string
  meals: string
  description: string
}

interface DayItinerary {
  day: number
  title: string
  activities: string
}

export default function PackageCreatePage() {
  const { register, handleSubmit, watch } = useForm<PackageForm>({
    defaultValues: { discount: 0, price: 0 },
  })
  const navigate = useNavigate()
  const [days, setDays] = useState<DayItinerary[]>([{ day: 1, title: '', activities: '' }])
  const [inclusions, setInclusions] = useState<string[]>(['Flights', 'Hotel'])
  const [exclusions, setExclusions] = useState<string[]>(['Personal expenses'])
  const [newInclusion, setNewInclusion] = useState('')
  const [newExclusion, setNewExclusion] = useState('')

  const price = watch('price') || 0
  const discount = watch('discount') || 0
  const finalPrice = price * (1 - discount / 100)

  const addDay = () => setDays([...days, { day: days.length + 1, title: '', activities: '' }])
  const addTag = (type: 'inclusion' | 'exclusion') => {
    if (type === 'inclusion' && newInclusion) {
      setInclusions([...inclusions, newInclusion])
      setNewInclusion('')
    }
    if (type === 'exclusion' && newExclusion) {
      setExclusions([...exclusions, newExclusion])
      setNewExclusion('')
    }
  }

  const onSubmit = (data: PackageForm, action: 'draft' | 'publish') => {
    console.log({ ...data, days, inclusions, exclusions, action })
    navigate('/dashboard/packages')
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link to="/dashboard/packages" className="p-2 rounded-[10px] hover:bg-border/50">
          <ArrowLeft className="w-5 h-5 text-navy" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-navy">Create Package</h1>
          <p className="text-muted text-sm">Build a detailed travel package with itinerary</p>
        </div>
      </div>

      <form className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Package Title" placeholder="Maldives Paradise Escape" {...register('title', { required: true })} />
            <Input label="Destination" placeholder="Maldives" {...register('destination', { required: true })} />
            <Input label="Duration" placeholder="7 days / 6 nights" {...register('duration')} />
            <Input label="Hotel" placeholder="Overwater Villa Resort" {...register('hotel')} />
            <Input label="Meals" placeholder="All inclusive" {...register('meals')} />
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Cover Image</label>
              <div className="border-2 border-dashed border-border rounded-[12px] p-8 text-center hover:border-teal/50 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                <p className="text-sm text-muted">Drop image or click to upload</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-navy mb-1.5">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2.5 rounded-[12px] border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-cyan/40 resize-none"
              placeholder="Describe the travel experience..."
            />
          </div>
        </Card>

        {/* Itinerary Builder */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy">Day-wise Itinerary</h2>
            <Button type="button" size="sm" variant="outline" onClick={addDay}>
              <Plus className="w-4 h-4" /> Add Day
            </Button>
          </div>
          <div className="space-y-4">
            {days.map((day, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 border border-border rounded-[12px]"
              >
                <p className="text-sm font-semibold text-teal mb-2">Day {day.day}</p>
                <div className="grid gap-3">
                  <input
                    placeholder="Day title (e.g., Arrival & Beach Sunset)"
                    className="w-full px-3 py-2 rounded-[10px] border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan/30"
                    onChange={(e) => {
                      const updated = [...days]
                      updated[i].title = e.target.value
                      setDays(updated)
                    }}
                  />
                  <textarea
                    placeholder="Activities for this day..."
                    rows={2}
                    className="w-full px-3 py-2 rounded-[10px] border border-border text-sm focus:outline-none focus:ring-2 focus:ring-cyan/30 resize-none"
                    onChange={(e) => {
                      const updated = [...days]
                      updated[i].activities = e.target.value
                      setDays(updated)
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Inclusions / Exclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-navy mb-3">Inclusions</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {inclusions.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-teal/10 text-teal text-xs rounded-full">
                  {tag}
                  <button type="button" onClick={() => setInclusions(inclusions.filter((t) => t !== tag))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newInclusion}
                onChange={(e) => setNewInclusion(e.target.value)}
                placeholder="Add inclusion"
                className="flex-1 px-3 py-1.5 rounded-[10px] border border-border text-sm"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('inclusion'))}
              />
              <Button type="button" size="sm" onClick={() => addTag('inclusion')}>Add</Button>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy mb-3">Exclusions</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {exclusions.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-600 text-xs rounded-full">
                  {tag}
                  <button type="button" onClick={() => setExclusions(exclusions.filter((t) => t !== tag))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                placeholder="Add exclusion"
                className="flex-1 px-3 py-1.5 rounded-[10px] border border-border text-sm"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag('exclusion'))}
              />
              <Button type="button" size="sm" onClick={() => addTag('exclusion')}>Add</Button>
            </div>
          </Card>
        </div>

        {/* Pricing */}
        <Card className="bg-teal-gradient text-white">
          <h2 className="text-lg font-semibold mb-4">Pricing Preview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Base Price ($)"
              type="number"
              {...register('price', { valueAsNumber: true })}
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              label="Discount (%)"
              type="number"
              {...register('discount', { valueAsNumber: true })}
              className="bg-white/10 border-white/20 text-white"
            />
            <div>
              <p className="text-sm text-white/70 mb-1">Final Price</p>
              <p className="text-3xl font-bold font-mono">{formatCurrency(finalPrice)}</p>
              {discount > 0 && (
                <p className="text-sm text-white/60 line-through font-mono">{formatCurrency(price)}</p>
              )}
            </div>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button type="button" variant="outline" onClick={handleSubmit((d) => onSubmit(d, 'draft'))}>
            <Save className="w-4 h-4" /> Save Draft
          </Button>
          <Button type="button" glow onClick={handleSubmit((d) => onSubmit(d, 'publish'))}>
            <Send className="w-4 h-4" /> Publish Package
          </Button>
        </div>
      </form>
    </div>
  )
}
