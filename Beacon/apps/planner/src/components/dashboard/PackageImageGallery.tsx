import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'

interface PackageImageGalleryProps {
  images?: string[]
  fallbackImage?: string
  alt: string
  className?: string
}

export function PackageImageGallery({
  images,
  fallbackImage,
  alt,
  className = 'h-48',
}: PackageImageGalleryProps) {
  // Normalize image list
  const imageList: string[] = Array.isArray(images) && images.length > 0
    ? images.filter(Boolean)
    : fallbackImage
    ? [fallbackImage]
    : []

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [isLoading, setIsLoading] = useState(true)
  const touchStartX = useRef<number | null>(null)

  const hasMultiple = imageList.length > 1

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasMultiple) return
    setDirection(1)
    setIsLoading(true)
    setCurrentIndex((prev) => (prev + 1) % imageList.length)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasMultiple) return
    setDirection(-1)
    setIsLoading(true)
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))
  }

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    if (index === currentIndex) return
    setDirection(index > currentIndex ? 1 : -1)
    setIsLoading(true)
    setCurrentIndex(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe Left -> Next image
        setDirection(1)
        setIsLoading(true)
        setCurrentIndex((prev) => (prev + 1) % imageList.length)
      } else {
        // Swipe Right -> Prev image
        setDirection(-1)
        setIsLoading(true)
        setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1))
      }
    }
    touchStartX.current = null
  }

  // Placeholder when no images exist
  if (imageList.length === 0) {
    return (
      <div className={`w-full ${className} bg-gradient-to-br from-page to-border/40 flex flex-col items-center justify-center text-muted gap-2 relative border-b border-border`}>
        <ImageIcon className="w-8 h-8 text-muted/60" />
        <span className="text-xs font-medium">No package images</span>
      </div>
    )
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <div
      className={`relative w-full ${className} overflow-hidden bg-navy/10 group select-none`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Skeleton Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-border/50 via-page to-border/50 animate-pulse z-10" />
      )}

      {/* Image Carousel */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.img
          key={currentIndex}
          src={imageList[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </AnimatePresence>

      {/* Top Left Image Counter Badge */}
      {hasMultiple && (
        <div className="absolute top-3 left-3 bg-navy/70 backdrop-blur-md text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full shadow-md z-20 pointer-events-none flex items-center gap-1">
          <span>{currentIndex + 1}</span>
          <span className="text-white/60">/</span>
          <span>{imageList.length}</span>
        </div>
      )}

      {/* Left / Right Hover Navigation Arrows */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy/60 hover:bg-navy text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md z-20 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy/60 hover:bg-navy text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md z-20 cursor-pointer hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </>
      )}

      {/* Bottom Pagination Dots */}
      {hasMultiple && (
        <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5 z-20">
          {imageList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => handleDotClick(idx, e)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'w-5 bg-cyan shadow-sm'
                  : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
