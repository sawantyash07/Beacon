export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '');

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

export async function fetchStats() {
  const res = await fetch(`${API_URL}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}
