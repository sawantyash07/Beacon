import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Building2, Search, ExternalLink, Navigation, Copy, RefreshCw,
  ZoomIn, ZoomOut, Layers, Maximize2, Minimize2, Check, Loader2, Compass
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export interface LocationData {
  hotelName: string
  hotelAddress: string
  lat: number
  lng: number
}

interface InteractiveItineraryMapProps {
  dayNumber: number
  locationData: LocationData
  onChange: (data: LocationData) => void
  destinationContext?: string
}

export interface PlaceSuggestion {
  name: string
  address: string
  lat: number
  lng: number
  category: string
}

const POPULAR_PLACES: PlaceSuggestion[] = [
  { name: 'Soneva Jani Resort & Villas', address: 'Medhufaru Island, Noonu Atoll, Maldives', lat: 5.6881, lng: 73.3082, category: 'Maldives' },
  { name: 'The Ritz-Carlton Maldives', address: 'Fari Islands, North Malé Atoll, Maldives', lat: 4.3833, lng: 73.5500, category: 'Maldives' },
  { name: 'Conrad Maldives Rangali Island', address: 'Rangali Island, Alifu Dhaalu Atoll, Maldives', lat: 3.6186, lng: 72.7161, category: 'Maldives' },
  { name: 'Waldorf Astoria Maldives Ithaafushi', address: 'Ithaafushi Island, South Malé Atoll, Maldives', lat: 3.9531, lng: 73.3854, category: 'Maldives' },
  { name: 'The Chedi Andermatt', address: 'Gotthardstrasse 4, 6490 Andermatt, Switzerland', lat: 46.6348, lng: 8.5947, category: 'Switzerland' },
  { name: 'Badrutt\'s Palace Hotel', address: 'Via Serlas 27, 7500 St. Moritz, Switzerland', lat: 46.4967, lng: 9.8402, category: 'Switzerland' },
  { name: 'Park Hyatt Tokyo', address: '3-7-1-2 Nishi-Shinjuku, Shinjuku City, Tokyo, Japan', lat: 35.6853, lng: 139.6910, category: 'Japan' },
  { name: 'Aman Tokyo', address: 'The Otemachi Tower, 1-5-6 Otemachi, Chiyoda City, Tokyo, Japan', lat: 35.6868, lng: 139.7638, category: 'Japan' },
  { name: 'Four Seasons Resort Bora Bora', address: 'Motu Tehotu BP 547, 98730 Bora Bora, French Polynesia', lat: -16.4800, lng: -151.7000, category: 'Bora Bora' },
  { name: 'Belmond Sanctuary Lodge', address: 'Machu Picchu Citadel, 08680 Peru', lat: -13.1631, lng: -72.5450, category: 'Peru' },
  { name: 'Burj Al Arab Jumeirah', address: 'Jumeirah St, Dubai, United Arab Emirates', lat: 25.1412, lng: 55.1852, category: 'Dubai' },
  { name: 'Marina Bay Sands', address: '10 Bayfront Ave, Singapore 018956', lat: 1.2838, lng: 103.8591, category: 'Singapore' },
  { name: 'Hotel Plaza Athénée', address: '25 Avenue Montaigne, 75008 Paris, France', lat: 48.8659, lng: 2.3045, category: 'Paris' },
]

export function InteractiveItineraryMap({
  dayNumber,
  locationData,
  onChange,
  destinationContext = 'Maldives',
}: InteractiveItineraryMapProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap')
  const [zoomLevel, setZoomLevel] = useState(14)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const defaultLocation: LocationData = {
    hotelName: locationData.hotelName || 'Soneva Jani Resort & Villas',
    hotelAddress: locationData.hotelAddress || 'Medhufaru Island, Noonu Atoll, Maldives',
    lat: locationData.lat || 5.6881,
    lng: locationData.lng || 73.3082,
  }

  const [currentLoc, setCurrentLoc] = useState<LocationData>(defaultLocation)

  useEffect(() => {
    setCurrentLoc({
      hotelName: locationData.hotelName || defaultLocation.hotelName,
      hotelAddress: locationData.hotelAddress || defaultLocation.hotelAddress,
      lat: locationData.lat || defaultLocation.lat,
      lng: locationData.lng || defaultLocation.lng,
    })
  }, [locationData.hotelName, locationData.hotelAddress, locationData.lat, locationData.lng])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredPlaces = POPULAR_PLACES.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectPlace = (place: PlaceSuggestion) => {
    const updated: LocationData = {
      hotelName: place.name,
      hotelAddress: place.address,
      lat: place.lat,
      lng: place.lng,
    }
    setCurrentLoc(updated)
    onChange(updated)
    setSearchQuery('')
    setIsDropdownOpen(false)
    toast.success(`Selected ${place.name} for Day ${dayNumber}`)
  }

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return
    const rect = mapContainerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Calculate simulated lat/lng shift from center based on click percentage
    const deltaX = (x / rect.width - 0.5) * 0.02
    const deltaY = (0.5 - y / rect.height) * 0.02

    const newLat = Number((currentLoc.lat + deltaY).toFixed(5))
    const newLng = Number((currentLoc.lng + deltaX).toFixed(5))
    const newAddress = `Near ${currentLoc.hotelName || 'Pin Location'}, (${newLat.toFixed(3)}, ${newLng.toFixed(3)})`

    const updated: LocationData = {
      ...currentLoc,
      lat: newLat,
      lng: newLng,
      hotelAddress: newAddress,
    }

    setCurrentLoc(updated)
    onChange(updated)
    toast.info(`Updated Pin Marker to coordinates (${newLat}, ${newLng})`)
  }

  const handleCopyCoordinates = () => {
    const text = `${currentLoc.lat.toFixed(5)}, ${currentLoc.lng.toFixed(5)}`
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    toast.success(`Coordinates copied: ${text}`)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleResetLocation = () => {
    const reset = POPULAR_PLACES[0]
    const updated: LocationData = {
      hotelName: reset.name,
      hotelAddress: reset.address,
      lat: reset.lat,
      lng: reset.lng,
    }
    setCurrentLoc(updated)
    onChange(updated)
    setZoomLevel(14)
    toast.info(`Reset location to ${reset.name}`)
  }

  const encodedQuery = encodeURIComponent(
    currentLoc.hotelAddress || currentLoc.hotelName || destinationContext
  )

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=${
    mapType === 'satellite' ? 'k' : 'm'
  }&z=${zoomLevel}&ie=UTF8&iwloc=&output=embed`

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${currentLoc.hotelName} ${currentLoc.hotelAddress}`
  )}`

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${currentLoc.hotelName} ${currentLoc.hotelAddress}`
  )}`

  return (
    <div
      className={cn(
        "p-4 sm:p-5 rounded-[16px] bg-page/40 border border-border/80 space-y-4 transition-all duration-300 relative",
        isFullscreen && "fixed inset-4 z-50 bg-surface shadow-2xl space-y-4 overflow-hidden"
      )}
    >
      {/* Panel Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-teal/10 flex items-center justify-center text-teal">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-navy flex items-center gap-2">
              Hotel & Location Map
            </h4>
            <p className="text-[11px] text-muted leading-none">
              Day {dayNumber} Stay Location & Interactive Controls
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-[8px] border border-border bg-surface hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Location Search Input with Places Autocomplete */}
      <div className="relative z-30">
        <label className="block text-[11px] font-semibold text-navy/80 uppercase tracking-wider mb-1.5">
          Search Hotel, Landmark or Location
        </label>
        <div className="relative">
          <input
            value={searchQuery}
            onFocus={() => setIsDropdownOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setIsDropdownOpen(true)
            }}
            placeholder="Type hotel name, city, resort or landmark..."
            className="w-full pl-9 pr-9 py-2.5 rounded-[12px] border border-border bg-surface text-navy placeholder:text-muted/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan transition-all shadow-sm"
          />
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted hover:text-navy"
            >
              ×
            </button>
          )}
        </div>

        {/* Places Autocomplete Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-20 bg-transparent"
                onClick={() => setIsDropdownOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute left-0 right-0 top-full mt-1.5 z-40 max-h-56 overflow-y-auto bg-surface border border-border rounded-[14px] shadow-2xl p-1.5 space-y-1"
              >
                {filteredPlaces.length === 0 ? (
                  <div
                    onClick={() => {
                      if (searchQuery) {
                        const custom: LocationData = {
                          ...currentLoc,
                          hotelName: searchQuery,
                          hotelAddress: searchQuery,
                        }
                        setCurrentLoc(custom)
                        onChange(custom)
                        setIsDropdownOpen(false)
                      }
                    }}
                    className="p-3 text-xs text-navy font-medium hover:bg-teal/10 rounded-[10px] cursor-pointer flex items-center justify-between"
                  >
                    <span>Use "{searchQuery}" as custom location</span>
                    <Check className="w-3.5 h-3.5 text-teal" />
                  </div>
                ) : (
                  filteredPlaces.map((place, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectPlace(place)}
                      className="w-full text-left p-2.5 rounded-[10px] hover:bg-teal/10 flex items-start gap-2.5 transition-colors cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-[8px] bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal group-hover:text-white transition-colors">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs font-semibold text-navy truncate">{place.name}</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-page border border-border text-muted shrink-0">
                            {place.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted truncate mt-0.5">{place.address}</p>
                      </div>
                    </button>
                  ))
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Hotel & Address Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-navy/70 mb-1">Hotel / Resort Name</label>
          <input
            value={currentLoc.hotelName}
            onChange={(e) => {
              const updated = { ...currentLoc, hotelName: e.target.value }
              setCurrentLoc(updated)
              onChange(updated)
            }}
            placeholder="Selected Hotel Name"
            className="w-full px-3 py-2 rounded-[10px] border border-border bg-surface text-navy text-xs focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-navy/70 mb-1">Full Address</label>
          <input
            value={currentLoc.hotelAddress}
            onChange={(e) => {
              const updated = { ...currentLoc, hotelAddress: e.target.value }
              setCurrentLoc(updated)
              onChange(updated)
            }}
            placeholder="Full Hotel Address"
            className="w-full px-3 py-2 rounded-[10px] border border-border bg-surface text-navy text-xs focus:outline-none focus:ring-2 focus:ring-cyan/40 focus:border-cyan transition-all"
          />
        </div>
      </div>

      {/* Standard Responsive Interactive Map Container (height 350px) */}
      <div className="relative space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-navy/80 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan animate-pulse" /> Interactive Map View
          </span>
          <span className="font-mono text-[10px] text-teal font-medium bg-teal/10 px-2 py-0.5 rounded-full border border-teal/30">
            {currentLoc.lat.toFixed(4)}, {currentLoc.lng.toFixed(4)}
          </span>
        </div>

        <div
          ref={mapContainerRef}
          onClick={handleMapClick}
          className={cn(
            "relative w-full rounded-[16px] overflow-hidden border-2 border-border/80 bg-navy/90 shadow-inner group transition-all duration-300 cursor-crosshair",
            isFullscreen ? "h-[calc(100vh-250px)]" : "h-[350px]"
          )}
        >
          {/* Skeleton Loader while loading */}
          {isLoading && (
            <div className="absolute inset-0 z-20 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 text-teal animate-spin" />
              <p className="text-xs font-semibold text-navy">Initializing Interactive Map...</p>
            </div>
          )}

          {/* Embedded Live Google Map Layer */}
          <iframe
            title={`Interactive Map Day ${dayNumber}`}
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: 'none' }}
            loading="lazy"
            allowFullScreen
            src={mapEmbedUrl}
          />

          {/* Animated Pin Marker Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              key={`${currentLoc.lat}-${currentLoc.lng}`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col items-center -mt-8"
            >
              <div className="bg-navy text-white px-3 py-1.5 rounded-full text-[11px] font-bold shadow-xl border border-teal flex items-center gap-1.5 whitespace-nowrap mb-1">
                <Building2 className="w-3.5 h-3.5 text-cyan" />
                <span>{currentLoc.hotelName || 'Selected Location'}</span>
              </div>
              <div className="relative">
                <MapPin className="w-8 h-8 text-teal fill-teal stroke-white filter drop-shadow-md" />
                <div className="w-3 h-1.5 bg-black/40 rounded-full mx-auto -mt-1 blur-[1px]" />
              </div>
            </motion.div>
          </div>

          {/* Map Controls Floating Toolbar (Top Right) */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-auto">
            {/* Zoom In */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setZoomLevel(Math.min(18, zoomLevel + 1))
              }}
              className="p-2 rounded-[10px] bg-surface/95 text-navy border border-border shadow-md hover:bg-page transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Zoom Out */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setZoomLevel(Math.max(8, zoomLevel - 1))
              }}
              className="p-2 rounded-[10px] bg-surface/95 text-navy border border-border shadow-md hover:bg-page transition-all cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Roadmap / Satellite Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')
              }}
              className="p-2 rounded-[10px] bg-surface/95 text-navy border border-border shadow-md hover:bg-page transition-all cursor-pointer"
              title={`Switch to ${mapType === 'roadmap' ? 'Satellite' : 'Roadmap'} View`}
            >
              <Layers className="w-4 h-4 text-teal" />
            </button>
          </div>

          {/* Bottom Left Map Overlay Hint */}
          <div className="absolute bottom-3 left-3 z-10 bg-navy/80 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 pointer-events-none">
            <MapPin className="w-3 h-3 text-cyan" /> Click anywhere on map to reposition marker pin
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs border-t border-border/60">
        <div className="flex items-center gap-3 flex-wrap">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-teal font-semibold hover:text-cyan hover:underline transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open in Google Maps
          </a>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-teal font-semibold hover:text-cyan hover:underline transition-colors"
          >
            <Navigation className="w-3.5 h-3.5" /> View Directions
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCoordinates}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] border border-border bg-surface hover:bg-page text-muted hover:text-navy transition-colors text-[11px] font-medium cursor-pointer"
          >
            {isCopied ? <Check className="w-3 h-3 text-teal" /> : <Copy className="w-3 h-3" />}
            <span>{isCopied ? 'Copied!' : 'Copy Coordinates'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetLocation}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] border border-border bg-surface hover:bg-page text-muted hover:text-navy transition-colors text-[11px] font-medium cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Location</span>
          </button>
        </div>
      </div>
    </div>
  )
}
