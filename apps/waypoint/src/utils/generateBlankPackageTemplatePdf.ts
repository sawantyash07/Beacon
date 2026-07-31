import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Generates and downloads a blank printable travel package form template PDF.
 */
export async function generateBlankPackageTemplatePdf(): Promise<void> {
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '0'
  container.style.width = '800px'
  container.style.backgroundColor = '#FFFFFF'
  container.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif"
  container.style.color = '#002349'

  const dateToday = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Helper for generating blank itinerary days
  const renderBlankDay = (dayNum: number) => `
    <div style="border: 1px solid #D6EEF1; border-radius: 14px; background: #FFFFFF; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px dashed #D6EEF1; padding-bottom: 8px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="background: linear-gradient(135deg, #0097A6, #00CBE0); color: white; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 16px;">
            DAY ${dayNum}
          </span>
          <span style="font-size: 12px; font-weight: 700; color: #002349;">Day Title:</span>
          <span style="font-size: 12px; color: #5C7A88;">____________________________________________________</span>
        </div>
      </div>

      <!-- Activities Description -->
      <div style="margin-bottom: 12px;">
        <span style="font-size: 11px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Activities & Description:</span>
        <div style="border: 1px solid #E2E8F0; border-radius: 8px; background: #F8FAFC; height: 64px; padding: 6px 10px; font-size: 11px; color: #94A3B8; line-height: 1.8;">
          <div style="border-bottom: 1px dashed #E2E8F0; height: 20px;"></div>
          <div style="border-bottom: 1px dashed #E2E8F0; height: 20px;"></div>
        </div>
      </div>

      <!-- Hotel / Resort Details -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
        <div style="background: #F0FAFB; border: 1px solid #D6EEF1; border-radius: 8px; padding: 8px 10px;">
          <span style="font-size: 10px; font-weight: 700; color: #002349; display: block;">🏨 Hotel / Resort Name:</span>
          <span style="font-size: 11px; color: #5C7A88;">____________________________________</span>
        </div>
        <div style="background: #F0FAFB; border: 1px solid #D6EEF1; border-radius: 8px; padding: 8px 10px;">
          <span style="font-size: 10px; font-weight: 700; color: #002349; display: block;">📍 Hotel Address:</span>
          <span style="font-size: 11px; color: #5C7A88;">____________________________________</span>
        </div>
      </div>

      <!-- Map & Meals -->
      <div style="display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; padding: 8px 12px;">
        <div style="font-size: 11px;">
          <span style="font-weight: 700; color: #002349;">🗺️ Google Map Location / Coordinates:</span>
          <span style="color: #5C7A88; margin-left: 6px;">______________________________</span>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; font-size: 11px; font-weight: 600; color: #002349;">
          <span style="font-size: 10px; font-weight: 700; color: #0097A6; text-transform: uppercase;">Meals Included:</span>
          <span>☐ Breakfast</span>
          <span>☐ Lunch</span>
          <span>☐ Hi-Tea</span>
          <span>☐ Dinner</span>
        </div>
      </div>
    </div>
  `

  let pagesHtml = ''

  // ---------------- PAGE 1: BASIC INFORMATION & PRICING ----------------
  pagesHtml += `
    <div class="pdf-page" style="width: 800px; height: 1130px; box-sizing: border-box; padding: 40px; background: #FFFFFF; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <!-- Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #D6EEF1; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #0097A6, #00CBE0); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 22px; box-shadow: 0 4px 12px rgba(0,151,166,0.3);">
              W
            </div>
            <div>
              <h1 style="margin: 0; font-size: 20px; font-weight: 800; color: #002349; letter-spacing: -0.5px;">WAYPOINT</h1>
              <p style="margin: 0; font-size: 11px; font-weight: 600; color: #0097A6; letter-spacing: 1px; text-transform: uppercase;">Printable Package Creation Form Template</p>
            </div>
          </div>
          <div style="text-align: right;">
            <span style="display: inline-block; background: #F0FAFB; border: 1px solid #D6EEF1; color: #0097A6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px; font-family: monospace;">
              FORM-TEMPLATE-01
            </span>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #5C7A88;">Issued: ${dateToday}</p>
          </div>
        </div>

        <!-- Banner Title -->
        <div style="background: linear-gradient(135deg, #002349 0%, #003D6B 60%, #0097A6 100%); border-radius: 16px; padding: 20px 24px; color: white; margin-bottom: 24px;">
          <h2 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 800;">TRAVEL PACKAGE FORM</h2>
          <p style="margin: 0; font-size: 12px; color: #D6EEF1;">Offline printable worksheet for creating and structuring travel packages.</p>
        </div>

        <!-- Section 1: Basic Information -->
        <div style="border: 2px solid #0097A6; border-radius: 16px; padding: 20px; background: #FFFFFF; margin-bottom: 24px;">
          <h3 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 800; color: #002349; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #D6EEF1; padding-bottom: 8px;">
            1. Basic Information
          </h3>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <span style="font-size: 12px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Package Title:</span>
                <div style="border-bottom: 1px solid #0097A6; padding-bottom: 4px; font-size: 13px; color: #5C7A88;">
                  ____________________________________________________
                </div>
              </div>

              <div>
                <span style="font-size: 12px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Destination:</span>
                <div style="border-bottom: 1px solid #0097A6; padding-bottom: 4px; font-size: 13px; color: #5C7A88;">
                  ____________________________________________________
                </div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <span style="font-size: 12px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Days:</span>
                <div style="border-bottom: 1px solid #0097A6; padding-bottom: 4px; font-size: 13px; color: #5C7A88;">
                  _________________________
                </div>
              </div>

              <div>
                <span style="font-size: 12px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Nights:</span>
                <div style="border-bottom: 1px solid #0097A6; padding-bottom: 4px; font-size: 13px; color: #5C7A88;">
                  _________________________
                </div>
              </div>
            </div>

            <div>
              <span style="font-size: 12px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Cover Image URL / Photo Reference:</span>
              <div style="border-bottom: 1px solid #0097A6; padding-bottom: 4px; font-size: 13px; color: #5C7A88;">
                ____________________________________________________________________________________
              </div>
            </div>

            <div>
              <span style="font-size: 12px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Description:</span>
              <div style="border: 1px solid #D6EEF1; border-radius: 12px; background: #F0FAFB; height: 110px; padding: 10px; font-size: 12px; color: #94A3B8; line-height: 1.8;">
                <div style="border-bottom: 1px dashed #D6EEF1; height: 24px;"></div>
                <div style="border-bottom: 1px dashed #D6EEF1; height: 24px;"></div>
                <div style="border-bottom: 1px dashed #D6EEF1; height: 24px;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 2: Pricing Structure -->
        <div style="border: 2px solid #0097A6; border-radius: 16px; padding: 20px; background: #FFFFFF;">
          <h3 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 800; color: #002349; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #D6EEF1; padding-bottom: 8px;">
            2. Pricing & Commercials
          </h3>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
            <div style="background: #F0FAFB; border: 1px solid #D6EEF1; border-radius: 12px; padding: 12px;">
              <span style="font-size: 11px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Base Price:</span>
              <div style="font-size: 14px; font-weight: 700; color: #0097A6;">____________________</div>
            </div>

            <div style="background: #F0FAFB; border: 1px solid #D6EEF1; border-radius: 12px; padding: 12px;">
              <span style="font-size: 11px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Discount (%):</span>
              <div style="font-size: 14px; font-weight: 700; color: #0097A6;">____________________</div>
            </div>

            <div style="background: #F0FAFB; border: 1px solid #0097A6; border-radius: 12px; padding: 12px;">
              <span style="font-size: 11px; font-weight: 700; color: #002349; display: block; margin-bottom: 4px;">Final Price:</span>
              <div style="font-size: 14px; font-weight: 800; color: #0097A6;">____________________</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div style="border-top: 1px solid #D6EEF1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #5C7A88;">
        <span>WAYPOINT TRAVEL PLATFORM · www.waypointtravel.com</span>
        <span>Page 1 of 5</span>
      </div>
    </div>
  `

  // ---------------- PAGE 2: DAY-WISE ITINERARY (DAYS 1 TO 3) ----------------
  pagesHtml += `
    <div class="pdf-page" style="width: 800px; height: 1130px; box-sizing: border-box; padding: 40px; background: #FFFFFF; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #D6EEF1; padding-bottom: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; background: #002349; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 16px;">
              W
            </div>
            <span style="font-size: 16px; font-weight: 800; color: #002349;">DAY-WISE ITINERARY FORM</span>
          </div>
          <span style="background: #F0FAFB; border: 1px solid #D6EEF1; color: #0097A6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
            DAYS 1 - 3
          </span>
        </div>

        <h3 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 800; color: #002349; text-transform: uppercase;">
          3. Day-wise Itinerary (Days 1 to 3)
        </h3>

        ${renderBlankDay(1)}
        ${renderBlankDay(2)}
        ${renderBlankDay(3)}
      </div>

      <div style="border-top: 1px solid #D6EEF1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #5C7A88;">
        <span>WAYPOINT TRAVEL PLATFORM · Blank Package Form</span>
        <span>Page 2 of 5</span>
      </div>
    </div>
  `

  // ---------------- PAGE 3: DAY-WISE ITINERARY (DAYS 4 TO 6) ----------------
  pagesHtml += `
    <div class="pdf-page" style="width: 800px; height: 1130px; box-sizing: border-box; padding: 40px; background: #FFFFFF; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #D6EEF1; padding-bottom: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; background: #002349; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 16px;">
              W
            </div>
            <span style="font-size: 16px; font-weight: 800; color: #002349;">DAY-WISE ITINERARY FORM</span>
          </div>
          <span style="background: #F0FAFB; border: 1px solid #D6EEF1; color: #0097A6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
            DAYS 4 - 6
          </span>
        </div>

        <h3 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 800; color: #002349; text-transform: uppercase;">
          3. Day-wise Itinerary (Days 4 to 6)
        </h3>

        ${renderBlankDay(4)}
        ${renderBlankDay(5)}
        ${renderBlankDay(6)}
      </div>

      <div style="border-top: 1px solid #D6EEF1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #5C7A88;">
        <span>WAYPOINT TRAVEL PLATFORM · Blank Package Form</span>
        <span>Page 3 of 5</span>
      </div>
    </div>
  `

  // ---------------- PAGE 4: DAY-WISE ITINERARY (DAYS 7 TO 10) ----------------
  pagesHtml += `
    <div class="pdf-page" style="width: 800px; height: 1130px; box-sizing: border-box; padding: 40px; background: #FFFFFF; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #D6EEF1; padding-bottom: 16px; margin-bottom: 20px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; background: #002349; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 16px;">
              W
            </div>
            <span style="font-size: 16px; font-weight: 800; color: #002349;">DAY-WISE ITINERARY FORM</span>
          </div>
          <span style="background: #F0FAFB; border: 1px solid #D6EEF1; color: #0097A6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
            DAYS 7 - 10
          </span>
        </div>

        <h3 style="margin: 0 0 16px 0; font-size: 15px; font-weight: 800; color: #002349; text-transform: uppercase;">
          3. Day-wise Itinerary (Days 7 to 10)
        </h3>

        ${renderBlankDay(7)}
        ${renderBlankDay(8)}
        ${renderBlankDay(9)}
        ${renderBlankDay(10)}
      </div>

      <div style="border-top: 1px solid #D6EEF1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #5C7A88;">
        <span>WAYPOINT TRAVEL PLATFORM · Blank Package Form</span>
        <span>Page 4 of 5</span>
      </div>
    </div>
  `

  // ---------------- PAGE 5: INCLUSIONS & EXCLUSIONS ----------------
  const renderBlankBullets = (count: number) => {
    return Array.from({ length: count })
      .map(
        (_, i) => `
          <li style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #5C7A88;">
            <span style="font-weight: 800; color: #0097A6;">${i + 1}.</span>
            <span style="flex: 1; border-bottom: 1px dashed #CBD5E1; height: 18px;"></span>
          </li>
        `
      )
      .join('')
  }

  pagesHtml += `
    <div class="pdf-page" style="width: 800px; height: 1130px; box-sizing: border-box; padding: 40px; background: #FFFFFF; position: relative; display: flex; flex-direction: column; justify-content: space-between;">
      <div>
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #D6EEF1; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; background: #002349; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 16px;">
              W
            </div>
            <span style="font-size: 16px; font-weight: 800; color: #002349;">PACKAGE INCLUSIONS & EXCLUSIONS</span>
          </div>
          <span style="background: #F0FAFB; border: 1px solid #D6EEF1; color: #0097A6; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
            INCLUSIONS & EXCLUSIONS
          </span>
        </div>

        <!-- Inclusions -->
        <div style="border: 2px solid #10B981; border-radius: 16px; padding: 20px; background: #F0FDF4; margin-bottom: 24px;">
          <h3 style="margin: 0 0 14px 0; font-size: 15px; font-weight: 800; color: #065F46; display: flex; align-items: center; gap: 8px;">
            <span style="width: 22px; height: 22px; background: #10B981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;">✓</span>
            4. Inclusions (12 Lines)
          </h3>
          <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px;">
            ${renderBlankBullets(12)}
          </ul>
        </div>

        <!-- Exclusions -->
        <div style="border: 2px solid #EF4444; border-radius: 16px; padding: 20px; background: #FEF2F2; margin-bottom: 24px;">
          <h3 style="margin: 0 0 14px 0; font-size: 15px; font-weight: 800; color: #991B1B; display: flex; align-items: center; gap: 8px;">
            <span style="width: 22px; height: 22px; background: #EF4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900;">✕</span>
            5. Exclusions (12 Lines)
          </h3>
          <ul style="margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 10px;">
            ${renderBlankBullets(12)}
          </ul>
        </div>

        <!-- Signature Verification Box -->
        <div style="border: 1px solid #D6EEF1; border-radius: 12px; padding: 14px 20px; background: #F0FAFB; display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 11px; color: #002349;">
            <strong>Planner Signature:</strong> ___________________________
          </div>
          <div style="font-size: 11px; color: #002349;">
            <strong>Approval Date:</strong> ___________________________
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid #D6EEF1; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #5C7A88;">
        <span>WAYPOINT TRAVEL PLATFORM · www.waypointtravel.com</span>
        <span>Page 5 of 5</span>
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

    // Exact filename format specified: Travel_Package_Blank_Template.pdf
    pdf.save('Travel_Package_Blank_Template.pdf')
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container)
    }
  }
}
