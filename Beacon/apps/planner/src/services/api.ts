export const API_URL = import.meta.env.VITE_API_URL || '/api';

export async function fetchDestinations(search?: string) {
  const url = search ? `${API_URL}/destinations?search=${encodeURIComponent(search)}` : `${API_URL}/destinations`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
}

export async function fetchPackages(search?: string) {
  const url = search ? `${API_URL}/packages?search=${encodeURIComponent(search)}` : `${API_URL}/packages`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch packages');
  return res.json();
}

export async function fetchPackageById(id: string) {
  const res = await fetch(`${API_URL}/packages/${id}`);
  if (!res.ok) throw new Error('Failed to fetch package');
  return res.json();
}

export async function createPackage(data: any) {
  const res = await fetch(`${API_URL}/packages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create package');
  return res.json();
}

export async function updatePackage(id: string, data: any) {
  const res = await fetch(`${API_URL}/packages/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update package');
  return res.json();
}

export async function deletePackage(id: string) {
  const res = await fetch(`${API_URL}/packages/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete package');
  return res.json();
}

export async function fetchReviews() {
  const res = await fetch(`${API_URL}/reviews`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function fetchStats(plannerId?: string) {
  const url = plannerId ? `${API_URL}/stats?plannerId=${plannerId}` : `${API_URL}/stats`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchInquiries(plannerId?: string) {
  const url = plannerId ? `${API_URL}/inquiries?plannerId=${plannerId}` : `${API_URL}/inquiries`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch inquiries');
  return res.json();
}

export async function createInquiry(data: any) {
  const res = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create inquiry');
  return res.json();
}

export async function updateInquiryStatus(id: string, status: string) {
  const res = await fetch(`${API_URL}/inquiries/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update inquiry');
  return res.json();
}

export async function fetchBookings(params?: { plannerId?: string; travelerId?: string }) {
  let query = '';
  if (params?.plannerId) query = `?plannerId=${params.plannerId}`;
  else if (params?.travelerId) query = `?travelerId=${params.travelerId}`;
  
  const res = await fetch(`${API_URL}/bookings${query}`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

export async function createBooking(data: any) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create booking');
  return res.json();
}

export async function updateBookingStatus(id: string, status: string) {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update booking status');
  return res.json();
}

export async function uploadUtrCode(bookingId: string, utr: string) {
  const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ utr }),
  });
  if (!res.ok) throw new Error('Failed to submit UTR');
  return res.json();
}

export async function fetchSupportTickets(params?: { plannerId?: string; customerId?: string }) {
  let query = '';
  if (params?.plannerId) query = `?plannerId=${params.plannerId}`;
  else if (params?.customerId) query = `?customerId=${params.customerId}`;

  const res = await fetch(`${API_URL}/support${query}`);
  if (!res.ok) throw new Error('Failed to fetch support tickets');
  return res.json();
}

export async function createSupportTicket(data: any) {
  const res = await fetch(`${API_URL}/support`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create support ticket');
  return res.json();
}

export async function fetchOrganizerProfile() {
  const res = await fetch(`${API_URL}/organizer-profile/me`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Failed to fetch organizer profile');
  return res.json();
}

export async function updateOrganizerProfileSection(sectionKey: string, data: any) {
  const res = await fetch(`${API_URL}/organizer-profile/me/section/${sectionKey}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update organizer profile section');
  return res.json();
}
