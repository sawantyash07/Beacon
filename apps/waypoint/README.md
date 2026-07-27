# Waypoint — AI-Powered Travel Planner

A premium, ocean-inspired travel management SaaS platform built with React, Tailwind CSS, Framer Motion, and Firebase Authentication.

## Features

- **Landing Page**: Immersive ocean hero with animated beacon, destination gallery, world map, features, testimonials, pricing, FAQ
- **Authentication**: Email/password, Google Sign-In, forgot password, password strength indicator, profile photo upload
- **Dashboard**: Overview, Inquiries, Packages, Bookings, Trip Groups, Social Media, Messages, Payments, Analytics
- **Design System**: Navy/Teal/Cyan ocean palette, glassmorphism, Space Grotesk + Inter + IBM Plex Mono

## Quick Start

```bash
cd apps/waypoint
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Demo Mode

Without Firebase configured, the app runs in **demo mode**. Any email/password will sign you in.

## Firebase Setup

1. Copy `.env.example` to `.env`
2. Add your Firebase project credentials
3. Enable Email/Password and Google Sign-In in Firebase Console

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 4
- Framer Motion
- React Router 7
- React Hook Form
- Recharts
- Lucide React
- Firebase Authentication

## Future Roadmap

Architecture supports: AI itinerary generation, AI travel assistants, real-time tracking, group chat, payment gateways, multilingual/multi-currency, dark mode, admin panel.
