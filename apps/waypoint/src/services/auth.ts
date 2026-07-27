export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthResponse {
  message: string;
  user?: User;
}

export const authService = {
  async register(data: Record<string, string>): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Registration failed');
    }
    return res.json();
  },

  async login(data: Record<string, string>): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Login failed');
    }
    return res.json();
  },

  async logout(): Promise<void> {
    await fetch(`${API_URL}/auth/logout`, { method: 'POST', credentials: 'include' }).catch(console.error);
  },

  async getProfile(): Promise<{ user: User }> {
    const res = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error('Unauthorized');
    }
    return res.json();
  },
};
