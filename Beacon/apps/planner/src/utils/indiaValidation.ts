// Verhoeff algorithm multiplication table d
const VERHOEFF_D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
]

// Verhoeff algorithm permutation table p
const VERHOEFF_P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
]

/**
 * Validates 12-digit Indian Aadhaar number using UIDAI's Verhoeff checksum algorithm.
 */
export function validateAadhaar(aadhaar: string): { isValid: boolean; message?: string } {
  const clean = aadhaar.replace(/\s|-/g, '')
  if (!/^\d{12}$/.test(clean)) {
    return { isValid: false, message: 'Aadhaar must be exactly 12 numeric digits.' }
  }

  // Reject repeating or trivial sequences (e.g. 000000000000, 111111111111)
  if (/^(\d)\1{11}$/.test(clean)) {
    return { isValid: false, message: 'Aadhaar cannot be repeating digits.' }
  }

  let c = 0
  const reversedArray = clean.split('').map(Number).reverse()

  for (let i = 0; i < reversedArray.length; i++) {
    c = VERHOEFF_D[c][VERHOEFF_P[i % 8][reversedArray[i]]]
  }

  if (c !== 0) {
    return { isValid: false, message: 'Invalid Aadhaar number. Verhoeff checksum failed.' }
  }

  return { isValid: true }
}

/**
 * Validates 10-char Indian PAN card.
 * @param pan - 10-character alphanumeric PAN
 * @param expectedType - 'INDIVIDUAL' ('P') or 'COMPANY' ('C', 'F', 'A', 'T', 'B', 'L', 'J', 'G')
 */
export function validatePAN(pan: string, expectedType?: 'INDIVIDUAL' | 'COMPANY'): { isValid: boolean; message?: string } {
  const upper = pan.trim().toUpperCase()
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/

  if (!panRegex.test(upper)) {
    return { isValid: false, message: 'PAN must be 10 characters (e.g. ABCDE1234F).' }
  }

  const fourthChar = upper[3]
  if (expectedType === 'INDIVIDUAL' && fourthChar !== 'P') {
    return { isValid: false, message: 'Individual PAN must have "P" as the 4th letter (e.g. ABCP...)' }
  }

  if (expectedType === 'COMPANY' && !['C', 'F', 'A', 'T', 'B', 'L', 'J', 'G'].includes(fourthChar)) {
    return { isValid: false, message: 'Company PAN 4th letter must indicate a firm/company (e.g. C, F, L).' }
  }

  return { isValid: true }
}

/**
 * Validates 15-char Indian GSTIN and cross-checks embedded PAN.
 */
export function validateGSTIN(gstin: string, pan?: string): { isValid: boolean; message?: string } {
  const upper = gstin.trim().toUpperCase()
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/

  if (!gstinRegex.test(upper)) {
    return { isValid: false, message: 'Invalid GSTIN format (15 characters, e.g. 29ABCDE1234F1Z5).' }
  }

  const stateCode = parseInt(upper.substring(0, 2), 10)
  if (stateCode < 1 || stateCode > 38) {
    return { isValid: false, message: 'Invalid State Code in GSTIN (must be between 01 and 38).' }
  }

  if (pan) {
    const cleanPan = pan.trim().toUpperCase()
    const embeddedPan = upper.substring(2, 12)
    if (cleanPan && embeddedPan !== cleanPan) {
      return { isValid: false, message: `GSTIN does not match entered PAN (${cleanPan}). Embedded: ${embeddedPan}` }
    }
  }

  return { isValid: true }
}

/**
 * Validates Indian Voter ID (EPIC) format (3 letters + 7 digits).
 */
export function validateVoterID(epic: string): { isValid: boolean; message?: string } {
  const upper = epic.trim().toUpperCase()
  if (!/^[A-Z]{3}[0-9]{7}$/.test(upper)) {
    return { isValid: false, message: 'Voter ID (EPIC) must be 3 uppercase letters followed by 7 digits (e.g. ABC1234567).' }
  }
  return { isValid: true }
}

/**
 * Validates CIN (Company Identification Number) or LLPIN.
 */
export function validateCINorLLPIN(val: string): { isValid: boolean; message?: string } {
  const upper = val.trim().toUpperCase()
  const cinRegex = /^[LUF]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/
  const llpinRegex = /^[A-Z]{3}-[0-9]{4}$/

  if (cinRegex.test(upper) || llpinRegex.test(upper) || /^[A-Z0-9\-/]{5,25}$/.test(upper)) {
    return { isValid: true }
  }
  return { isValid: false, message: 'Invalid CIN / LLPIN or Firm Registration Number.' }
}

/**
 * Validates Indian IFSC Code (11 chars, 5th char always 0).
 */
export function validateIFSC(ifsc: string): { isValid: boolean; message?: string } {
  const upper = ifsc.trim().toUpperCase()
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(upper)) {
    return { isValid: false, message: 'IFSC must be 11 characters (4 letters, "0", 6 alphanumeric chars, e.g. HDFC0001234).' }
  }
  return { isValid: true }
}

/**
 * Validates Indian Bank Account Number (9 to 18 digits).
 */
export function validateBankAccount(accountNumber: string): { isValid: boolean; message?: string } {
  const clean = accountNumber.replace(/\s/g, '')
  if (!/^\d{9,18}$/.test(clean)) {
    return { isValid: false, message: 'Bank Account Number must be between 9 and 18 numeric digits.' }
  }
  if (/^(\d)\1+$/.test(clean)) {
    return { isValid: false, message: 'Invalid Account Number. Cannot be all identical digits.' }
  }
  return { isValid: true }
}

/**
 * Validates UPI ID format (e.g. name@bank, phone@paytm).
 */
export function validateUPI(upi: string): { isValid: boolean; message?: string } {
  const clean = upi.trim().toLowerCase()
  if (!/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/.test(clean)) {
    return { isValid: false, message: 'Invalid UPI ID format (e.g. business@okaxis, 9876543210@paytm).' }
  }
  return { isValid: true }
}

/**
 * Validates 10-digit Indian Mobile Number.
 */
export function validateIndianMobile(phone: string): { isValid: boolean; message?: string } {
  const clean = phone.replace(/[\s+()-]/g, '')
  // strip 91 prefix if present
  const number = clean.startsWith('91') && clean.length === 12 ? clean.substring(2) : clean
  if (!/^[6-9]\d{9}$/.test(number)) {
    return { isValid: false, message: 'Mobile number must be a valid 10-digit Indian number starting with 6, 7, 8, or 9.' }
  }
  return { isValid: true }
}

/**
 * Validates 6-digit Indian Postal PIN Code.
 */
export function validatePINCode(pin: string): { isValid: boolean; message?: string } {
  const clean = pin.trim()
  if (!/^[1-9][0-9]{5}$/.test(clean)) {
    return { isValid: false, message: 'PIN Code must be exactly 6 digits starting with 1-9.' }
  }
  return { isValid: true }
}

/**
 * Mask sensitive Aadhaar to show only last 4 digits (e.g. XXXX-XXXX-1234)
 */
export function maskAadhaar(aadhaar: string): string {
  const clean = aadhaar.replace(/\s|-/g, '')
  if (clean.length !== 12) return aadhaar
  return `XXXX-XXXX-${clean.slice(-4)}`
}
