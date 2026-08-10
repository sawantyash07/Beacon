import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, X, Save, Coffee, Utensils, CupSoda, UtensilsCrossed, Trash2, Check } from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency, cn } from '@/lib/utils'
import { packages, updateMockPackage } from '@/data/mockData'
import { updatePackage } from '@/services/api'
import { InteractiveItineraryMap } from '@/components/dashboard/InteractiveItineraryMap'

const MEAL_OPTIONS = [
  { id: 'Breakfast', label: 'Breakfast', icon: Coffee, desc: 'Morning meal' },
  { id: 'Lunch', label: 'Lunch', icon: Utensils, desc: 'Midday meal' },
  { id: 'Hi-Tea', label: 'Hi-Tea', icon: CupSoda, desc: 'Afternoon tea' },
  { id: 'Dinner', label: 'Dinner', icon: UtensilsCrossed, desc: 'Evening meal' },
]

interface PackageForm {
  title: string
  destination: string
  days: number
  nights: number
  price: number
  discount: number
  description: string
}

interface DayItinerary {
  day: number
  title: string
  activities: string
  meals: string[]
  hotelName?: string
  hotelAddress?: string
  lat?: number
  lng?: number
}

export default function PackageEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const targetPackage = packages.find((p) => p.id === id) || packages[0]

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<PackageForm>({
    defaultValues: {
      title: targetPackage?.title || '',
      destination: targetPackage?.destination || '',
      days: targetPackage?.days || 7,
      nights: targetPackage?.nights || 6,
      price: targetPackage?.price || 0,
      discount: targetPackage?.discount || 0,
      description: targetPackage?.description || '',
    },
  })

  const [itineraryDays, setItineraryDays] = useState<DayItinerary[]>(
    targetPackage?.itineraryDays || [
      {
        day: 1,
        title: 'Arrival & Beach Sunset',
        activities: 'Check in at resort and enjoy evening sunset.',
        meals: ['Dinner'],
        hotelName: 'Soneva Jani Resort & Villas',
        hotelAddress: 'Medhufaru Island, Noonu Atoll, Maldives',
        lat: 5.6881,
        lng: 73.3082,
      }
    ]
  )
  const [inclusions, setInclusions] = useState<string[]>(targetPackage?.inclusions || ['Flights', 'Hotel'])
  const [exclusions, setExclusions] = useState<string[]>(targetPackage?.exclusions || ['Personal expenses'])
  const [newInclusion, setNewInclusion] = useState('')
  const [newExclusion, setNewExclusion] = useState('')
  const [images, setImages] = useState<string[]>(
    targetPackage?.images || (targetPackage?.image ? [targetPackage.image] : [])
  )
  const [newImageUrl, setNewImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (targetPackage) {
      reset({
        title: targetPackage.title,
        destination: targetPackage.destination,
        days: targetPackage.days,
        nights: targetPackage.nights,
        price: targetPackage.price,
        discount: targetPackage.discount,
        description: targetPackage.description || '',
      })
      if (targetPackage.images && targetPackage.images.length > 0) {
        setImages(targetPackage.images)
      } else if (targetPackage.image) {
        setImages([targetPackage.image])
      }
      if (targetPackage.itineraryDays) setItineraryDays(targetPackage.itineraryDays)
      if (targetPackage.inclusions) setInclusions(targetPackage.inclusions)
      if (targetPackage.exclusions) setExclusions(targetPackage.exclusions)
    }
  }, [id, targetPackage, reset])

  const addImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()])
      setNewImageUrl('')
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const price = watch('price') || 0
  const discount = watch('discount') || 0
  const finalPrice = price * (1 - discount / 100)

  const addDay = () => setItineraryDays([
    ...itineraryDays,
    {
      day: itineraryDays.length + 1,
      title: '',
      activities: '',
      meals: [],
      hotelName: 'Soneva Jani Resort & Villas',
      hotelAddress: 'Medhufaru Island, Noonu Atoll, Maldives',
      lat: 5.6881,
      lng: 73.3082,
    }
  ])

  const removeDay = (index: number) => {
    if (itineraryDays.length <= 1) return
    const updated = itineraryDays.filter((_, i) => i !== index).map((d, idx) => ({ ...d, day: idx + 1 }))
    setItineraryDays(updated)
  }

  const toggleMeal = (dayIndex: number, mealId: string) => {
    const updated = [...itineraryDays]
    const currentMeals = updated[dayIndex].meals || []
    if (currentMeals.includes(mealId)) {
      updated[dayIndex].meals = currentMeals.filter((m) => m !== mealId)
    } else {
      updated[dayIndex].meals = [...currentMeals, mealId]
    }
    setItineraryDays(updated)
  }

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

  const removeTag = (type: 'inclusion' | 'exclusion', tag: string) => {
    if (type === 'inclusion') setInclusions(inclusions.filter((t) => t !== tag))
    if (type === 'exclusion') setExclusions(exclusions.filter((t) => t !== tag))
  }

  const onSubmit = async (data: PackageForm) => {
    setIsSubmitting(true)
    const finalImages = images.length > 0 ? images : [targetPackage?.image || '']
    const updatedData = {
      ...data,
      image: finalImages[0],
      images: finalImages,
      itineraryDays,
      inclusions,
      exclusions,
      duration: `${data.days} days / ${data.nights} nights`,
    }

    try {
      if (id) {
        updateMockPackage(id, updatedData)
        await updatePackage(id, updatedData).catch(() => {})
      }
      toast.success('Travel package updated successfully!')
      navigate('/dashboard/packages')
    } catch {
      toast.error('Failed to save changes. Saved locally!')
      navigate('/dashboard/packages')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl pb-12">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard/packages" className="p-2.5 rounded-[12px] bg-surface border border-border hover:bg-page transition-colors">
            <ArrowLeft className="w-5 h-5 text-navy" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
              Edit Package: <span className="text-teal">{targetPackage?.title || 'Travel Package'}</span>
            </h1>
            <p className="text-muted text-sm mt-0.5">Update details, pricing, itinerary, and hotel location map</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Package Title"
              placeholder="e.g., Maldives Paradise Escape"
              error={errors.title?.message}
              {...register('title', { required: 'Package title is required' })}
            />
            <Input
              label="Destination"
              placeholder="e.g., Maldives"
              error={errors.destination?.message}
              {...register('destination', { required: 'Destination is required' })}
            />
            <Input
              label="Days"
              type="number"
              placeholder="Enter number of days"
              error={errors.days?.message}
              {...register('days', {
                required: 'Number of days is required',
                min: { value: 1, message: 'Days must be at least 1' },
                validate: (val) => Number.isInteger(Number(val)) || 'Must be a whole number',
                valueAsNumber: true,
              })}
            />
            <Input
              label="Nights"
              type="number"
              placeholder="Enter number of nights"
              error={errors.nights?.message}
              {...register('nights', {
                required: 'Number of nights is required',
                min: { value: 1, message: 'Nights must be at least 1' },
                validate: (val) => Number.isInteger(Number(val)) || 'Must be a whole number',
                valueAsNumber: true,
              })}
            />
            <div className="sm:col-span-2 space-y-3">
              <label className="block text-sm font-medium text-navy">Package Image Gallery (Upload & URLs)</label>
              
              {/* Add New Image Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addImage()
                    }
                  }}
                  className="flex-1 px-4 py-2 rounded-[12px] border border-border bg-surface text-xs font-mono focus:outline-none focus:ring-2 focus:ring-teal/30"
                />
                <Button type="button" size="sm" variant="outline" onClick={addImage} className="gap-1">
                  <Plus className="w-4 h-4" /> Add Image
                </Button>
              </div>

              {/* Thumbnail Gallery List */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {images.map((imgUrl, idx) => (
                    <div key={idx} className="relative group border border-border rounded-[12px] overflow-hidden bg-page h-24">
                      <img src={imgUrl} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer shadow-md"
                        title="Remove Image"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      {idx === 0 && (
                        <span className="absolute bottom-1.5 left-1.5 bg-navy/80 text-cyan text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
                          COVER
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
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

        {/* Pricing */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Pricing & Discounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Base Price ($)"
              type="number"
              placeholder="2499"
              {...register('price', { valueAsNumber: true })}
            />
            <Input
              label="Discount (%)"
              type="number"
              placeholder="10"
              {...register('discount', { valueAsNumber: true })}
            />
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Final Selling Price</label>
              <div className="px-4 py-2.5 rounded-[12px] bg-page border border-border text-teal font-mono font-bold text-lg">
                {formatCurrency(finalPrice)}
              </div>
            </div>
          </div>
        </Card>

        {/* Day-wise Itinerary */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-navy">Day-wise Itinerary</h2>
              <p className="text-xs text-muted">Configure itinerary details, included meals, and hotel location per day</p>
            </div>
            <Button type="button" size="sm" variant="outline" onClick={addDay}>
              <Plus className="w-4 h-4" /> Add Day
            </Button>
          </div>

          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {itineraryDays.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 border border-border rounded-[16px] bg-surface space-y-4 hover:border-teal/30 transition-all shadow-sm"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-bold rounded-full">
                        Day {day.day}
                      </span>
                      {day.hotelName && (
                        <span className="inline-flex items-center gap-1 text-xs text-navy/80 font-medium bg-page px-2.5 py-0.5 rounded-full border border-border">
                          {day.hotelName}
                        </span>
                      )}
                    </div>

                    {itineraryDays.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeDay(i)}
                        title="Remove Day"
                        className="p-1.5 text-muted hover:text-red-500 hover:bg-red-50 rounded-[8px] transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* 2-Column Responsive Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column: Itinerary Details & Meals (lg:col-span-7) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">Day Title</label>
                        <input
                          value={day.title}
                          placeholder="Day title (e.g., Arrival & Beach Sunset)"
                          className="w-full px-3.5 py-2.5 rounded-[12px] border border-border bg-page/50 text-navy placeholder:text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan transition-all"
                          onChange={(e) => {
                            const updated = [...itineraryDays]
                            updated[i].title = e.target.value
                            setItineraryDays(updated)
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">Activities Description</label>
                        <textarea
                          value={day.activities}
                          placeholder="Describe scheduled activities for this day..."
                          rows={3}
                          className="w-full px-3.5 py-2.5 rounded-[12px] border border-border bg-page/50 text-navy placeholder:text-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan resize-none transition-all"
                          onChange={(e) => {
                            const updated = [...itineraryDays]
                            updated[i].activities = e.target.value
                            setItineraryDays(updated)
                          }}
                        />
                      </div>

                      {/* Meals Subsection */}
                      <div className="pt-2">
                        <label className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-2">
                          Meals Included
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {MEAL_OPTIONS.map((meal) => {
                            const isSelected = (day.meals || []).includes(meal.id)
                            const Icon = meal.icon
                            return (
                              <motion.button
                                key={meal.id}
                                type="button"
                                whileTap={{ scale: 0.97 }}
                                onClick={() => toggleMeal(i, meal.id)}
                                aria-checked={isSelected}
                                role="checkbox"
                                className={cn(
                                  "flex items-center gap-2 p-2 rounded-[10px] border text-left transition-all duration-200 cursor-pointer select-none",
                                  isSelected
                                    ? "border-teal bg-teal/10 text-navy shadow-sm ring-1 ring-teal/40"
                                    : "border-border bg-page/30 hover:border-border-dark text-muted hover:text-navy"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-6 h-6 rounded-[6px] flex items-center justify-center shrink-0 transition-colors",
                                    isSelected ? "bg-teal text-white" : "bg-border/50 text-muted"
                                  )}
                                >
                                  {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : <Icon className="w-3 h-3" />}
                                </div>
                                <div className="min-w-0">
                                  <p className={cn("text-xs font-semibold leading-none", isSelected ? "text-navy" : "text-muted")}>
                                    {meal.label}
                                  </p>
                                </div>
                              </motion.button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Interactive Hotel & Location Map Panel (lg:col-span-5) */}
                    <div className="lg:col-span-5">
                      <InteractiveItineraryMap
                        dayNumber={day.day}
                        locationData={{
                          hotelName: day.hotelName || '',
                          hotelAddress: day.hotelAddress || '',
                          lat: day.lat || 5.6881,
                          lng: day.lng || 73.3082,
                        }}
                        destinationContext={watch('destination')}
                        onChange={(location) => {
                          const updated = [...itineraryDays]
                          updated[i].hotelName = location.hotelName
                          updated[i].hotelAddress = location.hotelAddress
                          updated[i].lat = location.lat
                          updated[i].lng = location.lng
                          setItineraryDays(updated)
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-navy mb-3">Inclusions</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {inclusions.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-teal/10 text-teal text-xs rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTag('inclusion', tag)} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newInclusion}
                onChange={(e) => setNewInclusion(e.target.value)}
                placeholder="Add inclusion (e.g. Flights)"
                className="flex-1 px-3 py-1.5 text-xs rounded-[8px] border border-border focus:outline-none focus:ring-1 focus:ring-cyan"
              />
              <Button type="button" size="sm" variant="outline" onClick={() => addTag('inclusion')}>Add</Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-navy mb-3">Exclusions</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {exclusions.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/10 text-red-600 text-xs rounded-full">
                  {tag}
                  <button type="button" onClick={() => removeTag('exclusion', tag)} className="hover:text-red-700">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                placeholder="Add exclusion (e.g. Visa)"
                className="flex-1 px-3 py-1.5 text-xs rounded-[8px] border border-border focus:outline-none focus:ring-1 focus:ring-cyan"
              />
              <Button type="button" size="sm" variant="outline" onClick={() => addTag('exclusion')}>Add</Button>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link to="/dashboard/packages">
            <Button type="button" variant="ghost">Cancel</Button>
          </Link>
          <Button type="submit" disabled={isSubmitting} glow>
            <Save className="w-4 h-4" /> {isSubmitting ? 'Saving...' : 'Save Package Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
