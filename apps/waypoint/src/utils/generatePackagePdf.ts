import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { formatCurrency } from '@/lib/utils'

export interface DayItinerary {
  day: number
  title: string
  activities: string
  meals?: string[]
  hotelName?: string
  hotelAddress?: string
  lat?: number
  lng?: number
}

export interface PackageItem {
  id: string
  title: string
  destination: string
  duration?: string
  days: number
  nights: number
  price: number
  discount: number
  status: string
  image: string
  images?: string[]
  bookings?: number
  travelers?: number
  rating?: number
  description?: string
  inclusions?: string[]
  exclusions?: string[]
  itineraryDays?: DayItinerary[]
}

/**
 * Safely converts an image URL into a base64 Data URL.
 * Fallback gracefully if CORS or network issues occur.
 */
async function getImageBase64(src: string): Promise<string | null> {
  if (!src) return null
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.width || 800
        canvas.height = img.height || 500
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
          resolve(canvas.toDataURL('image/jpeg', 0.85))
          return
        }
      } catch (e) {
        console.warn('Canvas export failed for image', e)
      }
      resolve(null)
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}

/**
 * Generates and downloads a travel brochure PDF for the given package.
 */
export async function generatePackagePdf(pkg: PackageItem): Promise<void> {
  // Try loading image base64
  const imageBase64 = await getImageBase64(pkg.image)

  const daysCount = pkg.days || 7
  const nightsCount = pkg.nights || (daysCount > 1 ? daysCount - 1 : 1)
  const durationStr = pkg.duration || `${daysCount} Days / ${nightsCount} Nights`
  const discountAmount = (pkg.price * pkg.discount) / 100
  const finalPrice = pkg.price - discountAmount

  const inclusions = pkg.inclusions && pkg.inclusions.length > 0 
    ? pkg.inclusions 
    : ['Luxury Resort / Hotel Accommodation', 'Daily Buffet Breakfast & Dinner', 'Airport & Resort Transfers', 'Guided Island Tours & Activities', '24/7 Dedicated Concierge Support']

  const exclusions = pkg.exclusions && pkg.exclusions.length > 0 
    ? pkg.exclusions 
    : ['International Airfare & Visa Fees', 'Personal Expenses & Souvenirs', 'Optional Water Sports & Spa Packages', 'Travel Insurance']

  const itinerary = pkg.itineraryDays && pkg.itineraryDays.length > 0
    ? pkg.itineraryDays
    : Array.from({ length: daysCount }).map((_, i) => ({
        day: i + 1,
        title: i === 0 ? 'Arrival & Welcome Experience' : i === daysCount - 1 ? 'Farewell & Departure' : `Exploration & Leisure Day ${i}`,
        activities: i === 0 
          ? 'Arrive at destination. Private transfer to luxury resort. Evening welcome cocktail & sunset viewing.' 
          : i === daysCount - 1 
          ? 'Enjoy morning breakfast at leisure. Check-out and private transfer to airport for departure.' 
          : 'Full day excursion exploring coastal sights, local markets, and cultural landmarks. Refreshments provided.',
        meals: i === 0 ? ['Dinner'] : i === daysCount - 1 ? ['Breakfast'] : ['Breakfast', 'Lunch', 'Dinner'],
        hotelName: 'Soneva Jani Resort & Villas',
        hotelAddress: 'Medhufaru Island, Noonu Atoll, Maldives',
        lat: 5.6881,
        lng: 73.3082,
      }))

  // Create temporary container for PDF rendering
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '0'
  container.style.width = '800px'
  container.style.backgroundColor = '#FFFFFF'
  container.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif"
  container.style.color = '#002349'

  // Chunk itinerary into pages of 3 days max to ensure clean page breaks
  const itineraryChunks: DayItinerary[][] = []
  const chunkSize = 3
  for (let i = 0; i < itinerary.length; i += chunkSize) {
    itineraryChunks.push(itinerary.slice(i, i + chunkSize))
  }

  const dateToday = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Build Pages HTML
  let pagesHtml = ''

  // ---------------- PAGE 1: COVER & OVERVIEW ----------------
  pagesHtml += `
    <div class="pdf-page" style="width: 800px; height: 1130px; box-sizing: border-box; padding: 40px; background: #FFFFFF; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <!-- Brand Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #D6EEF1; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #0097A6, #00CBE0); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 22px; box-shadow: 0 4px 12px rgba(0,151,166,0.3);">
              W
            </div>
            <div>
              <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #002349; letter-spacing: -0.5px;">WAYPOINT</h1>
              <p style="margin: 0; font-size: 11px; font-weight: 600; color: #0097A6; letter-spacing: 1px; text-transform: uppercase;">Travel Management & Agency Dossier</p>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; background: #F0FAFB; border: 1px solid #D6EEF1; color: #0097A6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; font-family: monospace;">
              REF: ${pkg.id}
            </span>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #5C7A88;">Generated: ${dateToday}</p>
          </div>
        </div>

        <!-- Hero Title Banner -->
        <div style="background: linear-gradient(135deg, #002349 0%, #003D6B 60%, #0097A6 100%); border-radius: 18px; padding: 24px 28px; color: white; margin-bottom: 24px; box-shadow: 0 10px 25px rgba(0,35,73,0.15); position: relative; overflow: hidden;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="background: rgba(0, 203, 224, 0.25); border: 1px solid rgba(0, 203, 224, 0.5); color: #00CBE0; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 30px; text-transform: uppercase;">
              ${pkg.status.toUpperCase()} PACKAGE
            </span>
            <div style="font-size: 13px; color: #D6EEF1; font-weight: 600; display: flex; align-items: center; gap: 6px;">
              ★ <span style="color: white; font-weight: 700;">${pkg.rating || 4.9}</span> / 5.0 (${pkg.travelers || 48} Travelers)
            </div>
          </div>
          <h2 style="margin: 8px 0 12px 0; font-size: 28px; font-weight: 800; line-height: 1.2; color: #FFFFFF;">
            ${pkg.title}
          </h2>
          <div style="display: flex; align-items: center; gap: 20px; font-size: 13px; color: #E0F7FA; font-weight: 500;">
            <span>📍 <strong>Destination:</strong> ${pkg.destination}</span>
            <span>⏱ <strong>Duration:</strong> ${durationStr}</span>
          </div>
        </div>

        <!-- Cover Image -->
        ${
          imageBase64
            ? `<div style="margin-bottom: 24px; border-radius: 16px; overflow: hidden; height: 260px; border: 1px solid #D6EEF1; box-shadow: 0 6px 18px rgba(0,0,0,0.06);">
                <img src="${imageBase64}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
               </div>`
            : `<div style="margin-bottom: 24px; border-radius: 16px; height: 200px; background: linear-gradient(135deg, #F0FAFB 0%, #D6EEF1 100%); display: flex; align-items: center; justify-content: center; color: #0097A6; font-size: 18px; font-weight: 700; border: 1px dashed #0097A6;">
                🌴 ${pkg.destination} Travel Experience
               </div>`
        }

        <!-- Pricing Card & Executive Summary -->
        <div style="display: flex; gap: 20px; margin-bottom: 24px;">
          <!-- Price Box -->
          <div style="flex: 0 0 260px; background: #F0FAFB; border: 2px solid #0097A6; border-radius: 16px; padding: 20px; box-sizing: border-box;">
            <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; color: #5C7A88; text-transform: uppercase; letter-spacing: 0.5px;">Package Investment</p>
            ${
              pkg.discount > 0
                ? `<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                    <span style="font-size: 14px; text-decoration: line-through; color: #5C7A88; font-weight: 600;">${formatCurrency(pkg.price)}</span>
                    <span style="background: #00CBE0; color: #002349; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 6px;">-${pkg.discount}% OFF</span>
                   </div>`
                : ''
            }
            <div style="font-size: 28px; font-weight: 900; color: #0097A6; line-height: 1; font-family: monospace;">
              ${formatCurrency(finalPrice)}
            </div>
            <p style="margin: 6px 0 0 0; font-size: 11px; color: #5C7A88; font-weight: 500;">Per Traveler · Taxes Included</p>
          </div>

          <!-- Quick Specifications -->
          <div style="flex: 1; background: #FFFFFF; border: 1px solid #D6EEF1; border-radius: 16px; padding: 20px; box-sizing: border-box; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-content: center;">
            <div style="background: #F0FAFB; padding: 10px 14px; border-radius: 10px;">
              <span style="font-size: 10px; color: #5C7A88; font-weight: 700; display: block; text-transform: uppercase;">Duration</span>
              <strong style="font-size: 13px; color: #002349;">${daysCount} Days / ${nightsCount} Nights</strong>
            </div>
            <div style="background: #F0FAFB; padding: 10px 14px; border-radius: 10px;">
              <span style="font-size: 10px; color: #5C7A88; font-weight: 700; display: block; text-transform: uppercase;">Destination</span>
              <strong style="font-size: 13px; color: #002349;">${pkg.destination}</strong>
            </div>
            <div style="background: #F0FAFB; padding: 10px 14px; border-radius: 10px;">
              <span style="font-size: 10px; color: #5C7A88; font-weight: 700; display: block; text-transform: uppercase;">Status</span>
              <strong style="font-size: 13px; color: #0097A6;">${pkg.status.toUpperCase()}</strong>
            </div>
            <div style="background: #F0FAFB; padding: 10px 14px; border-radius: 10px;">
              <span style="font-size: 10px; color: #5C7A88; font-weight: 700; display: block; text-transform: uppercase;">Bookings</span>
              <strong style="font-size: 13px; color: #002349;">${pkg.bookings || 24} Confirmed</strong>
            </div>
          </div>
        </div>

        <!-- Description Block -->
        <div style="background: #FFFFFF; border: 1px solid #D6EEF1; border-radius: 16px; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #002349; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px;">
            <span style="width: 8px; height: 8px; background: #0097A6; border-radius: 50%;"></span>
            Package Overview & Experience
          </h3>
          <p style="margin: 0; font-size: 13px; color: #5C7A88; line-height: 1.6; font-weight: 400;">
            ${pkg.description || 'Embark on an unforgettable travel experience curated with premium stays, seamless transfers, and expert-guided itineraries designed to create lasting memories.'}
          </p>
        </div>
      </div>

      <!-- Page 1 Footer -->
      <div style="border-top: 1px solid #D6EEF1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #5C7A88;">
        <span>WAYPOINT TRAVEL PLATFORM · www.waypointtravel.com</span>
        <span>Page 1 of ${itineraryChunks.length + 2}</span>
      </div>
    </div>
  `

  // ---------------- ITINERARY PAGES ----------------
  itineraryChunks.forEach((chunk, chunkIdx) => {
    const pageNum = chunkIdx + 2
    pagesHtml += `
      <div class="pdf-page" style="width: 800px; height: 1130px; box-sizing: border-box; padding: 40px; background: #FFFFFF; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <!-- Header -->
          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #D6EEF1; padding-bottom: 16px; margin-bottom: 24px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 32px; height: 32px; background: #002349; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 16px;">
                W
              </div>
              <span style="font-size: 16px; font-weight: 800; color: #002349;">${pkg.title}</span>
            </div>
            <span style="background: #F0FAFB; border: 1px solid #D6EEF1; color: #0097A6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
              ITINERARY (Part ${chunkIdx + 1})
            </span>
          </div>

          <h3 style="margin: 0 0 18px 0; font-size: 18px; font-weight: 800; color: #002349; display: flex; align-items: center; gap: 10px;">
            <span style="background: #0097A6; color: white; font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 6px;">DAY-WISE</span>
            Detailed Travel Itinerary
          </h3>

          <div style="display: flex; flex-direction: column; gap: 20px;">
            ${chunk
              .map((day) => {
                const meals = day.meals || []
                return `
                  <div style="border: 1px solid #D6EEF1; border-radius: 16px; background: #FFFFFF; padding: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.02);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #D6EEF1; padding-bottom: 8px;">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="background: linear-gradient(135deg, #0097A6, #00CBE0); color: white; font-size: 12px; font-weight: 900; padding: 4px 12px; border-radius: 20px;">
                          DAY ${day.day}
                        </span>
                        <h4 style="margin: 0; font-size: 16px; font-weight: 700; color: #002349;">
                          ${day.title || `Day ${day.day} Activities`}
                        </h4>
                      </div>
                    </div>

                    <p style="margin: 0 0 14px 0; font-size: 12px; color: #5C7A88; line-height: 1.6;">
                      ${day.activities || 'Full day itinerary with guided sightseeing, cultural exploration, and local culinary experiences.'}
                    </p>

                    <!-- Included Meals -->
                    <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                      <span style="font-size: 11px; font-weight: 700; color: #002349; margin-right: 4px;">Meals Included:</span>
                      ${['Breakfast', 'Lunch', 'Hi-Tea', 'Dinner']
                        .map((meal) => {
                          const isSelected = meals.includes(meal)
                          return `
                            <span style="font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 12px; ${
                              isSelected
                                ? 'background: #0097A6; color: #FFFFFF;'
                                : 'background: #F0FAFB; color: #5C7A88; border: 1px solid #D6EEF1;'
                            }">
                              ${isSelected ? '✓ ' : ''}${meal}
                            </span>
                          `
                        })
                        .join('')}
                    </div>

                    <!-- Hotel & Map Location -->
                    ${
                      day.hotelName
                        ? `<div style="background: #F0FAFB; border: 1px solid #D6EEF1; border-radius: 12px; padding: 12px; display: flex; align-items: flex-start; justify-content: space-between; gap: 12px;">
                            <div>
                              <div style="font-size: 12px; font-weight: 700; color: #002349; margin-bottom: 2px; display: flex; align-items: center; gap: 6px;">
                                🏨 ${day.hotelName}
                              </div>
                              <div style="font-size: 11px; color: #5C7A88;">
                                📍 ${day.hotelAddress || pkg.destination}
                              </div>
                            </div>
                            ${
                              day.lat && day.lng
                                ? `<a href="https://maps.google.com/?q=${day.lat},${day.lng}" target="_blank" style="background: #FFFFFF; border: 1px solid #0097A6; color: #0097A6; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 6px; text-decoration: none; shrink: 0;">
                                    🗺️ Lat: ${day.lat.toFixed(2)}, Lng: ${day.lng.toFixed(2)}
                                   </a>`
                                : ''
                            }
                           </div>`
                        : ''
                    }
                  </div>
                `
              })
              .join('')}
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #D6EEF1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #5C7A88;">
          <span>WAYPOINT TRAVEL PLATFORM · ${pkg.title}</span>
          <span>Page ${pageNum} of ${itineraryChunks.length + 2}</span>
        </div>
      </div>
    `
  })

  // ---------------- PAGE FINAL: INCLUSIONS, EXCLUSIONS & POLICIES ----------------
  const finalPageNum = itineraryChunks.length + 2
  pagesHtml += `
    <div class="pdf-page" style="width: 800px; height: 1130px; box-sizing: border-box; padding: 40px; background: #FFFFFF; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #D6EEF1; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; background: #002349; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 16px;">
              W
            </div>
            <span style="font-size: 16px; font-weight: 800; color: #002349;">${pkg.title}</span>
          </div>
          <span style="background: #F0FAFB; border: 1px solid #D6EEF1; color: #0097A6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
            TERMS & POLICIES
          </span>
        </div>

        <!-- Inclusions & Exclusions Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">
          <!-- Inclusions -->
          <div style="border: 1px solid #A7F3D0; background: #F0FDF4; border-radius: 16px; padding: 20px; box-sizing: border-box;">
            <h3 style="margin: 0 0 14px 0; font-size: 15px; font-weight: 800; color: #065F46; display: flex; align-items: center; gap: 8px;">
              <span style="width: 22px; height: 22px; background: #10B981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;">✓</span>
              Package Inclusions
            </h3>
            <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px;">
              ${inclusions
                .map(
                  (inc) => `
                <li style="font-size: 12px; color: #064E3B; font-weight: 500; display: flex; align-items: flex-start; gap: 8px; line-height: 1.4;">
                  <span style="color: #10B981; font-weight: 800;">•</span>
                  <span>${inc}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>

          <!-- Exclusions -->
          <div style="border: 1px solid #FECACA; background: #FEF2F2; border-radius: 16px; padding: 20px; box-sizing: border-box;">
            <h3 style="margin: 0 0 14px 0; font-size: 15px; font-weight: 800; color: #991B1B; display: flex; align-items: center; gap: 8px;">
              <span style="width: 22px; height: 22px; background: #EF4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;">✕</span>
              Package Exclusions
            </h3>
            <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px;">
              ${exclusions
                .map(
                  (exc) => `
                <li style="font-size: 12px; color: #7F1D1D; font-weight: 500; display: flex; align-items: flex-start; gap: 8px; line-height: 1.4;">
                  <span style="color: #EF4444; font-weight: 800;">•</span>
                  <span>${exc}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>

        <!-- Pricing Summary Table -->
        <div style="border: 1px solid #D6EEF1; border-radius: 16px; padding: 20px; background: #FFFFFF; margin-bottom: 24px;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 800; color: #002349; text-transform: uppercase;">
            Investment Breakdown
          </h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
              <tr style="background: #F0FAFB; text-align: left; color: #5C7A88; font-weight: 700;">
                <th style="padding: 8px 12px; border-radius: 6px 0 0 6px;">Description</th>
                <th style="padding: 8px 12px;">Duration</th>
                <th style="padding: 8px 12px;">Base Rate</th>
                <th style="padding: 8px 12px;">Discount</th>
                <th style="padding: 8px 12px; text-align: right; border-radius: 0 6px 6px 0;">Final Price</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #F0FAFB;">
                <td style="padding: 10px 12px; font-weight: 700; color: #002349;">${pkg.title}</td>
                <td style="padding: 10px 12px; color: #5C7A88;">${durationStr}</td>
                <td style="padding: 10px 12px; color: #5C7A88;">${formatCurrency(pkg.price)}</td>
                <td style="padding: 10px 12px; color: #0097A6; font-weight: 700;">${pkg.discount}% OFF</td>
                <td style="padding: 10px 12px; text-align: right; font-weight: 800; color: #002349; font-family: monospace;">${formatCurrency(finalPrice)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Terms & Policies -->
        <div style="background: #F0FAFB; border: 1px solid #D6EEF1; border-radius: 16px; padding: 20px;">
          <h3 style="margin: 0 0 10px 0; font-size: 14px; font-weight: 800; color: #002349; text-transform: uppercase;">
            Booking Terms & Cancellation Policies
          </h3>
          <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px; color: #5C7A88; line-height: 1.5;">
            <div>• <strong>Payment Schedule:</strong> 30% advance deposit required upon reservation. Balance due 14 days prior to travel.</div>
            <div>• <strong>Cancellation Terms:</strong> 100% refund up to 30 days prior; 50% refund between 15-29 days; non-refundable within 14 days of departure.</div>
            <div>• <strong>Travel Documents:</strong> Passport valid for at least 6 months from travel date is mandatory. Visa assistance available upon request.</div>
            <div>• <strong>Support Contact:</strong> For modifications or special arrangements, contact <strong>concierge@waypointtravel.com</strong> or call <strong>+1 (800) 555-WAYPOINT</strong>.</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #D6EEF1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #5C7A88;">
        <span>WAYPOINT TRAVEL PLATFORM · www.waypointtravel.com</span>
        <span>Page ${finalPageNum} of ${finalPageNum}</span>
      </div>
    </div>
  `

  container.innerHTML = pagesHtml
  document.body.appendChild(container)

  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageElements = container.querySelectorAll<HTMLElement>('.pdf-page')
    for (let i = 0; i < pageElements.length; i++) {
      const pageEl = pageElements[i]
      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
      })

      const imgData = canvas.toDataURL('image/jpeg', 0.95)
      if (i > 0) {
        pdf.addPage()
      }

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297)
    }

    // Generate filename format: <PackageName>_Package_Details.pdf
    const sanitizedTitle = pkg.title.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_')
    const fileName = `${sanitizedTitle}_Package_Details.pdf`

    pdf.save(fileName)
  } finally {
    // Cleanup temporary DOM element
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
  }
}
