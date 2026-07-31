export const destinations = [
  { id: 1, name: 'Maldives', category: 'Honeymoon Destinations', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', price: 2499, rating: 4.9 },
  { id: 2, name: 'Swiss Alps', category: 'Mountains', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', price: 1899, rating: 4.8 },
  { id: 3, name: 'Kyoto Heritage', category: 'Cultural Tours', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', price: 1599, rating: 4.7 },
  { id: 4, name: 'Amazon Rainforest', category: 'Wildlife', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80', price: 1299, rating: 4.6 },
  { id: 5, name: 'Bora Bora Resort', category: 'Luxury Escapes', image: 'https://images.unsplash.com/photo-1580541831926-783a941dd276?w=600&q=80', price: 4999, rating: 5.0 },
  { id: 6, name: 'Patagonia', category: 'Adventure', image: 'https://images.unsplash.com/photo-1516738901171-8eb4ec13bd3a?w=600&q=80', price: 2299, rating: 4.9 },
  { id: 7, name: 'Santorini', category: 'Beaches', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80', price: 1999, rating: 4.8 },
  { id: 8, name: 'Serengeti Safari', category: 'Wildlife', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80', price: 3200, rating: 4.9 },
  { id: 9, name: 'Machu Picchu', category: 'Cultural Tours', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&q=80', price: 1450, rating: 4.8 },
  { id: 10, name: 'Banff National Park', category: 'Mountains', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80', price: 1699, rating: 4.7 },
  { id: 11, name: 'Maui, Hawaii', category: 'Beaches', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', price: 1399, rating: 4.6 },
  { id: 12, name: 'Dubai', category: 'Luxury Escapes', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', price: 2899, rating: 4.5 },
]

export const mapLocations = [
  { id: 1, name: 'Paris', x: 48, y: 35, routes: [2, 3] },
  { id: 2, name: 'Tokyo', x: 82, y: 38, routes: [4] },
  { id: 3, name: 'New York', x: 28, y: 38, routes: [4] },
  { id: 4, name: 'Sydney', x: 85, y: 72, routes: [] },
  { id: 5, name: 'Cairo', x: 55, y: 45, routes: [1] },
  { id: 6, name: 'Rio', x: 35, y: 68, routes: [3] },
]

export const features = [
  { icon: 'Cpu', title: 'AI-Powered Trip Planning', description: 'Generate personalized itineraries instantly with intelligent routing and recommendations.' },
  { icon: 'CheckCircle', title: 'Verified Travel Planners', description: 'Connect with expert planners who have been vetted for quality and reliability.' },
  { icon: 'ShieldCheck', title: 'Secure Online Booking', description: 'Book flights, hotels, and tours seamlessly within our protected platform.' },
  { icon: 'Map', title: 'Personalized Itineraries', description: 'Tailor every aspect of your journey with drag-and-drop flexibility.' },
  { icon: 'BellRing', title: 'Real-Time Trip Updates', description: 'Receive instant notifications for gate changes, delays, and schedule adjustments.' },
  { icon: 'MessageCircle', title: 'Integrated Messaging', description: 'Chat directly with your planner or travel group without leaving the app.' },
  { icon: 'Share2', title: 'Social Media Sharing', description: 'Automatically publish stunning package cards to your social networks.' },
  { icon: 'CreditCard', title: 'Secure Payment Management', description: 'Handle multi-currency transactions and installments with bank-grade security.' },
]

export const testimonials = [
  { id: 1, name: 'Sarah Chen', role: 'Travel Agency Owner', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: 'Waypoint transformed how we manage our travel business. The dashboard is intuitive and our clients love the experience.', rating: 5 },
  { id: 2, name: 'Marcus Rivera', role: 'Tour Operator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: 'The package builder alone saved us 20 hours per week. Publishing to social media automatically is a game changer.', rating: 5 },
  { id: 3, name: 'Emily Watson', role: 'Independent Planner', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: 'Beautiful design meets powerful functionality. My travelers feel like they are using a premium product.', rating: 5 },
  { id: 4, name: 'James Okonkwo', role: 'Adventure Travel Co.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80', text: 'From inquiries to payments, everything flows seamlessly. The analytics help us make smarter business decisions.', rating: 5 },
]

export const pricingPlans = [
  { name: 'Starter', price: 29, description: 'Perfect for solo travel planners', features: ['Up to 10 packages', 'Basic analytics', 'Email support', '1 social account', '100 inquiries/month'], popular: false },
  { name: 'Professional', price: 79, description: 'For growing travel agencies', features: ['Unlimited packages', 'Advanced analytics', 'Priority support', '4 social accounts', 'Unlimited inquiries', 'Trip groups', 'Payment tracking'], popular: true },
  { name: 'Enterprise', price: 199, description: 'For large travel organizations', features: ['Everything in Pro', 'Multi-user access', 'Custom branding', 'API access', 'Dedicated manager', 'AI assistant (coming soon)', 'Multi-currency support'], popular: false },
]

export const faqs = [
  { question: 'What is Waypoint?', answer: 'Waypoint is an AI-powered travel management platform that helps travel planners create packages, manage bookings, communicate with travelers, and grow their business.' },
  { question: 'Do I need technical skills to use Waypoint?', answer: 'Not at all. Waypoint is designed for travel professionals with an intuitive interface. You can create and publish packages in minutes.' },
  { question: 'Can I connect my social media accounts?', answer: 'Yes! Waypoint supports Instagram, Facebook, YouTube, and WhatsApp Business. New packages can be automatically shared to connected accounts.' },
  { question: 'Is there a free trial?', answer: 'We offer a 14-day free trial on all plans. No credit card required to get started.' },
  { question: 'Will AI features be available soon?', answer: 'AI itinerary generation and travel assistant features are on our roadmap and will be available in upcoming releases.' },
  { question: 'Can I manage group trips?', answer: 'Absolutely. Trip Groups let you organize members, track departures, and prepare for future group chat functionality.' },
]

export const stats = [
  { label: 'Total Revenue', value: 128450, change: 12.5, icon: 'DollarSign' },
  { label: 'Active Bookings', value: 342, change: 8.2, icon: 'Calendar' },
  { label: 'Published Packages', value: 48, change: 15.3, icon: 'Package' },
  { label: 'New Inquiries', value: 127, change: -3.1, icon: 'MessageSquare' },
]

export const revenueData = [
  { month: 'Jan', revenue: 12400, bookings: 28 },
  { month: 'Feb', revenue: 15800, bookings: 35 },
  { month: 'Mar', revenue: 18200, bookings: 42 },
  { month: 'Apr', revenue: 22100, bookings: 51 },
  { month: 'May', revenue: 19500, bookings: 45 },
  { month: 'Jun', revenue: 26400, bookings: 58 },
  { month: 'Jul', revenue: 31200, bookings: 67 },
  { month: 'Aug', revenue: 28900, bookings: 62 },
]

export const inquiries = [
  { id: 'INQ-001', name: 'Alice Johnson', email: 'alice@email.com', destination: 'Maldives', status: 'new', message: 'Interested in a 7-day honeymoon package', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80', timestamp: '2026-07-26T10:30:00' },
  { id: 'INQ-002', name: 'Bob Smith', email: 'bob@email.com', destination: 'Swiss Alps', status: 'replied', message: 'Looking for family ski trip in December', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', timestamp: '2026-07-25T14:20:00' },
  { id: 'INQ-003', name: 'Carol Davis', email: 'carol@email.com', destination: 'Tokyo', status: 'converted', message: 'Corporate retreat for 15 people', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80', timestamp: '2026-07-24T09:15:00' },
  { id: 'INQ-004', name: 'David Lee', email: 'david@email.com', destination: 'Patagonia', status: 'new', message: 'Adventure hiking tour for 4', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80', timestamp: '2026-07-26T08:45:00' },
  { id: 'INQ-005', name: 'Eva Martinez', email: 'eva@email.com', destination: 'Bali', status: 'replied', message: 'Wellness retreat package inquiry', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80', timestamp: '2026-07-23T16:30:00' },
]

export let packages = [
  {
    id: 'PKG-001',
    title: 'Maldives Paradise Escape',
    destination: 'Maldives',
    duration: '7 days',
    price: 2499,
    discount: 10,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&q=80',
    ],
    bookings: 24,
    travelers: 48,
    capacity: 50,
    rating: 4.9,
    days: 7,
    nights: 6,
    description: 'Luxurious 7-day tropical getaway in the Maldives with overwater villas and pristine turquoise lagoons.',
    inclusions: ['Flights', 'Hotel', 'Breakfast', 'Transfer'],
    exclusions: ['Personal expenses', 'Visa fees'],
    itineraryDays: [{ day: 1, title: 'Arrival & Beach Sunset', activities: 'Check in at resort and enjoy evening cocktail at the sunset beach.', meals: ['Dinner'], hotelName: 'Soneva Jani Resort & Villas', hotelAddress: 'Medhufaru Island, Noonu Atoll, Maldives', lat: 5.6881, lng: 73.3082 }]
  },
  {
    id: 'PKG-002',
    title: 'Alpine Adventure',
    destination: 'Swiss Alps',
    duration: '5 days',
    price: 1899,
    discount: 0,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
      'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=600&q=80',
    ],
    bookings: 18,
    travelers: 36,
    capacity: 40,
    rating: 4.7,
    days: 5,
    nights: 4,
    description: 'Explore scenic mountain trails and luxury chalet stays in Switzerland.',
    inclusions: ['Hotel', 'Breakfast', 'Ski Pass'],
    exclusions: ['Flights', 'Equipment rental'],
    itineraryDays: [{ day: 1, title: 'Check-in & Mountain View', activities: 'Arrive at Andermatt and relax at chalet.', meals: ['Dinner'], hotelName: 'The Chedi Andermatt', hotelAddress: 'Gotthardstrasse 4, 6490 Andermatt, Switzerland', lat: 46.6348, lng: 8.5947 }]
  },
  {
    id: 'PKG-003',
    title: 'Tokyo Cultural Journey',
    destination: 'Tokyo',
    duration: '10 days',
    price: 2199,
    discount: 15,
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80',
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80',
      'https://images.unsplash.com/photo-1540959733336-eab4deabeeaf?w=600&q=80',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80',
    ],
    bookings: 0,
    travelers: 0,
    capacity: 30,
    rating: 0,
    days: 10,
    nights: 9,
    description: 'Immerse in ancient heritage and modern wonders across Tokyo and Kyoto.',
    inclusions: ['Hotel', 'JR Pass', 'Guided Tours'],
    exclusions: ['Flights', 'Personal meals'],
    itineraryDays: [{ day: 1, title: 'Arrive in Tokyo', activities: 'Airport transfer to Shinjuku and welcome dinner.', meals: ['Dinner'], hotelName: 'Park Hyatt Tokyo', hotelAddress: '3-7-1-2 Nishi-Shinjuku, Shinjuku City, Tokyo, Japan', lat: 35.6853, lng: 139.6910 }]
  },
  {
    id: 'PKG-004',
    title: 'Sahara Desert Expedition',
    destination: 'Morocco',
    duration: '6 days',
    price: 1799,
    discount: 5,
    status: 'published',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80',
      'https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=600&q=80',
      'https://images.unsplash.com/photo-1517824806704-9040b037703b?w=600&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
    ],
    bookings: 12,
    travelers: 24,
    capacity: 25,
    rating: 4.8,
    days: 6,
    nights: 5,
    description: 'Camel trekking and luxury desert glamping under the Saharan night sky.',
    inclusions: ['Hotel', 'Camel Trekking', 'All Meals'],
    exclusions: ['International flights'],
    itineraryDays: [{ day: 1, title: 'Marrakech Arrival', activities: 'Explore Jemaa el-Fnaa square.', meals: ['Dinner'], hotelName: 'Royal Mansour Marrakech', hotelAddress: 'Rue Abou Abbas El Sebti, Marrakech, Morocco', lat: 31.6225, lng: -7.9961 }]
  },
]

export function deleteMockPackage(id: string) {
  packages = packages.filter((p) => p.id !== id)
}

export function updateMockPackage(id: string, updatedData: any) {
  const index = packages.findIndex((p) => p.id === id)
  if (index !== -1) {
    packages[index] = { ...packages[index], ...updatedData }
  }
}

export function addMockPackage(newPkg: any) {
  const newId = `PKG-00${packages.length + 1}`
  const created = {
    id: newId,
    bookings: 0,
    travelers: 0,
    capacity: 20,
    rating: 5.0,
    ...newPkg
  }
  packages.unshift(created)
  return created
}

export function duplicateMockPackage(id: string) {
  const original = packages.find((p) => p.id === id)
  if (!original) return null

  const newId = `PKG-00${packages.length + 1}`
  const duplicated = {
    ...JSON.parse(JSON.stringify(original)),
    id: newId,
    title: `${original.title} (Copy)`,
  }
  packages.unshift(duplicated)
  return duplicated
}

export let bookings = [
  {
    id: 'BKG-7821',
    packageId: 'PKG-001',
    package: 'Maldives Paradise Escape',
    packageImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80',
    destination: 'Maldives',
    traveler: 'John Doe',
    email: 'john@email.com',
    phone: '+1 (555) 234-5678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    travelersCount: 2,
    travelDate: '2026-08-15',
    bookingDate: '2026-07-20',
    amount: 2499,
    amountPaid: 2499,
    remainingBalance: 0,
    status: 'confirmed',
    paymentStatus: 'paid',
    assignedAgent: 'Sarah Chen'
  },
  {
    id: 'BKG-7822',
    packageId: 'PKG-002',
    package: 'Alpine Adventure',
    packageImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    destination: 'Swiss Alps',
    traveler: 'Jane Smith',
    email: 'jane@email.com',
    phone: '+1 (555) 345-6789',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    travelersCount: 4,
    travelDate: '2026-12-10',
    bookingDate: '2026-07-22',
    amount: 1899,
    amountPaid: 1000,
    remainingBalance: 899,
    status: 'pending',
    paymentStatus: 'partial',
    assignedAgent: 'Marcus Rivera'
  },
  {
    id: 'BKG-7823',
    packageId: 'PKG-004',
    package: 'Sahara Desert Expedition',
    packageImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
    destination: 'Morocco',
    traveler: 'Mike Wilson',
    email: 'mike@email.com',
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    travelersCount: 2,
    travelDate: '2026-09-05',
    bookingDate: '2026-07-23',
    amount: 1799,
    amountPaid: 1799,
    remainingBalance: 0,
    status: 'confirmed',
    paymentStatus: 'paid',
    assignedAgent: 'Sarah Chen'
  },
  {
    id: 'BKG-7824',
    packageId: 'PKG-001',
    package: 'Maldives Paradise Escape',
    packageImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80',
    destination: 'Maldives',
    traveler: 'Lisa Brown',
    email: 'lisa@email.com',
    phone: '+1 (555) 567-8901',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    travelersCount: 2,
    travelDate: '2026-08-20',
    bookingDate: '2026-07-24',
    amount: 2249,
    amountPaid: 0,
    remainingBalance: 0,
    status: 'cancelled',
    paymentStatus: 'refunded',
    assignedAgent: 'Emily Watson'
  },
  {
    id: 'BKG-7825',
    packageId: 'PKG-002',
    package: 'Alpine Adventure',
    packageImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    destination: 'Swiss Alps',
    traveler: 'Tom Garcia',
    email: 'tom@email.com',
    phone: '+1 (555) 678-9012',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    travelersCount: 2,
    travelDate: '2026-11-15',
    bookingDate: '2026-07-25',
    amount: 1899,
    amountPaid: 1899,
    remainingBalance: 0,
    status: 'confirmed',
    paymentStatus: 'paid',
    assignedAgent: 'Marcus Rivera'
  },
  {
    id: 'BKG-7826',
    packageId: 'PKG-003',
    package: 'Tokyo Cultural Journey',
    packageImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80',
    destination: 'Tokyo',
    traveler: 'Sarah Connor',
    email: 'sarah.c@email.com',
    phone: '+1 (555) 789-0123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
    travelersCount: 3,
    travelDate: '2026-10-01',
    bookingDate: '2026-07-26',
    amount: 2199,
    amountPaid: 2199,
    remainingBalance: 0,
    status: 'confirmed',
    paymentStatus: 'paid',
    assignedAgent: 'Emily Watson'
  },
  {
    id: 'BKG-7827',
    packageId: 'PKG-001',
    package: 'Maldives Paradise Escape',
    packageImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&q=80',
    destination: 'Maldives',
    traveler: 'Robert Chen',
    email: 'robert@email.com',
    phone: '+1 (555) 890-1234',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&q=80',
    travelersCount: 2,
    travelDate: '2026-09-12',
    bookingDate: '2026-07-27',
    amount: 2499,
    amountPaid: 1250,
    remainingBalance: 1249,
    status: 'pending',
    paymentStatus: 'partial',
    assignedAgent: 'Sarah Chen'
  },
  {
    id: 'BKG-7828',
    packageId: 'PKG-003',
    package: 'Tokyo Cultural Journey',
    packageImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80',
    destination: 'Tokyo',
    traveler: 'Emily Davis',
    email: 'emily.d@email.com',
    phone: '+1 (555) 901-2345',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80',
    travelersCount: 2,
    travelDate: '2026-10-15',
    bookingDate: '2026-07-27',
    amount: 2199,
    amountPaid: 0,
    remainingBalance: 2199,
    status: 'pending',
    paymentStatus: 'pending',
    assignedAgent: 'Emily Watson'
  },
  {
    id: 'BKG-7829',
    packageId: 'PKG-004',
    package: 'Sahara Desert Expedition',
    packageImage: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80',
    destination: 'Morocco',
    traveler: 'Alex Turner',
    email: 'alex@email.com',
    phone: '+1 (555) 012-3456',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&q=80',
    travelersCount: 4,
    travelDate: '2026-10-20',
    bookingDate: '2026-07-28',
    amount: 1799,
    amountPaid: 1799,
    remainingBalance: 0,
    status: 'confirmed',
    paymentStatus: 'paid',
    assignedAgent: 'Marcus Rivera'
  }
]

export function updateMockBookingStatus(id: string, newStatus: string, newPaymentStatus?: string) {
  const b = bookings.find((item) => item.id === id)
  if (b) {
    b.status = newStatus
    if (newPaymentStatus) b.paymentStatus = newPaymentStatus
    if (newStatus === 'confirmed') {
      addBookingToTripGroup(b)
    }
  }
}

export function addBookingToTripGroup(booking: any) {
  let group = tripGroups.find(
    (g) =>
      g.packageId === booking.packageId ||
      g.packageName?.toLowerCase() === booking.package?.toLowerCase() ||
      g.name.toLowerCase().includes(booking.package?.toLowerCase() || '')
  )

  if (group) {
    if (!group.bookingsList) group.bookingsList = []
    const exists = group.bookingsList.some((b: any) => b.id === booking.id)
    if (!exists) {
      group.bookingsList.push(booking)
      group.members += 1
      if ((group as any).travelersCount !== undefined) {
        ;(group as any).travelersCount += booking.travelersCount || 1
      }
    }
  } else {
    const newGroupId = `GRP-00${tripGroups.length + 1}`
    const newGroup = {
      id: newGroupId,
      name: `${booking.package} Group`,
      packageName: booking.package,
      packageId: booking.packageId || 'PKG-001',
      departure: booking.travelDate || '2026-09-01',
      members: 1,
      travelersCount: booking.travelersCount || 1,
      unread: 0,
      image: booking.packageImage || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200&q=80',
      bookingsList: [booking],
    }
    tripGroups.unshift(newGroup)
  }
}

export function confirmMockBooking(id: string) {
  const b = bookings.find((item) => item.id === id)
  if (b) {
    b.status = 'confirmed'
    if (b.paymentStatus === 'pending') b.paymentStatus = 'paid'
    addBookingToTripGroup(b)
    return b
  }
  return null
}

export let tripGroups = [
  {
    id: 'GRP-001',
    name: 'Maldives Paradise Escape Group',
    packageName: 'Maldives Paradise Escape',
    packageId: 'PKG-001',
    departure: '2026-08-15',
    members: 2,
    travelersCount: 2,
    unread: 3,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200&q=80',
    bookingsList: [
      {
        id: 'BKG-7821',
        traveler: 'John Doe',
        email: 'john@email.com',
        phone: '+1 (555) 234-5678',
        package: 'Maldives Paradise Escape',
        packageId: 'PKG-001',
        travelDate: '2026-08-15',
        travelersCount: 2,
        paymentStatus: 'paid',
        status: 'confirmed',
        amountPaid: 2499,
        remainingBalance: 0,
      },
    ],
  },
  {
    id: 'GRP-002',
    name: 'Alpine Adventure Group',
    packageName: 'Alpine Adventure',
    packageId: 'PKG-002',
    departure: '2026-11-15',
    members: 2,
    travelersCount: 2,
    unread: 0,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80',
    bookingsList: [
      {
        id: 'BKG-7825',
        traveler: 'Tom Garcia',
        email: 'tom@email.com',
        phone: '+1 (555) 678-9012',
        package: 'Alpine Adventure',
        packageId: 'PKG-002',
        travelDate: '2026-11-15',
        travelersCount: 2,
        paymentStatus: 'paid',
        status: 'confirmed',
        amountPaid: 1899,
        remainingBalance: 0,
      },
    ],
  },
  {
    id: 'GRP-003',
    name: 'Sahara Desert Expedition Group',
    packageName: 'Sahara Desert Expedition',
    packageId: 'PKG-004',
    departure: '2026-09-05',
    members: 6,
    travelersCount: 6,
    unread: 12,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=200&q=80',
    bookingsList: [
      {
        id: 'BKG-7823',
        traveler: 'Mike Wilson',
        email: 'mike@email.com',
        phone: '+1 (555) 456-7890',
        package: 'Sahara Desert Expedition',
        packageId: 'PKG-004',
        travelDate: '2026-09-05',
        travelersCount: 2,
        paymentStatus: 'paid',
        status: 'confirmed',
        amountPaid: 1799,
        remainingBalance: 0,
      },
      {
        id: 'BKG-7829',
        traveler: 'Alex Turner',
        email: 'alex@email.com',
        phone: '+1 (555) 012-3456',
        package: 'Sahara Desert Expedition',
        packageId: 'PKG-004',
        travelDate: '2026-10-20',
        travelersCount: 4,
        paymentStatus: 'paid',
        status: 'confirmed',
        amountPaid: 1799,
        remainingBalance: 0,
      },
    ],
  },
]

export const conversations = [
  { id: 'conv-1', name: 'Alice Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80', lastMessage: 'Can we add an extra day?', timestamp: '2026-07-26T11:00:00', unread: 2, online: true },
  { id: 'conv-2', name: 'Bob Smith', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80', lastMessage: 'Thanks for the itinerary!', timestamp: '2026-07-25T16:30:00', unread: 0, online: false },
  { id: 'conv-3', name: 'Carol Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80', lastMessage: 'Payment sent via wire transfer', timestamp: '2026-07-24T10:15:00', unread: 0, online: true },
]

export const messages = [
  { id: 'msg-1', senderId: 'conv-1', text: 'Hi! I saw your Maldives package and I am very interested.', timestamp: '2026-07-26T10:00:00', isOwn: false },
  { id: 'msg-2', senderId: 'me', text: 'Hello Alice! Thank you for your interest. I would be happy to customize it for your honeymoon.', timestamp: '2026-07-26T10:05:00', isOwn: true },
  { id: 'msg-3', senderId: 'conv-1', text: 'That would be wonderful! Can we add an extra day?', timestamp: '2026-07-26T11:00:00', isOwn: false },
]

export const transactions = [
  { id: 'TXN-9012', description: 'Booking BKG-7821', amount: 2499, type: 'credit', date: '2026-07-20' },
  { id: 'TXN-9013', description: 'Withdrawal to bank', amount: -5000, type: 'debit', date: '2026-07-21' },
  { id: 'TXN-9014', description: 'Booking BKG-7823', amount: 1799, type: 'credit', date: '2026-07-23' },
  { id: 'TXN-9015', description: 'Booking BKG-7825', amount: 1899, type: 'credit', date: '2026-07-25' },
  { id: 'TXN-9016', description: 'Refund BKG-7824', amount: -2249, type: 'debit', date: '2026-07-24' },
]

export const socialAccounts = [
  { platform: 'Instagram', connected: true, handle: '@waypoint_travel', icon: 'Instagram' },
  { platform: 'Facebook', connected: true, handle: 'Waypoint Travel', icon: 'Facebook' },
  { platform: 'YouTube', connected: false, handle: '', icon: 'Youtube' },
  { platform: 'WhatsApp Business', connected: true, handle: '+1 555-0123', icon: 'MessageCircle' },
]

export const sharedPosts = [
  { id: 1, platform: 'Instagram', package: 'Maldives Paradise Escape', date: '2026-07-24', engagement: 342 },
  { id: 2, platform: 'Facebook', package: 'Alpine Adventure', date: '2026-07-22', engagement: 128 },
  { id: 3, platform: 'WhatsApp', package: 'Sahara Desert Expedition', date: '2026-07-20', engagement: 56 },
]

export const activityFeed = [
  { id: 1, type: 'booking', text: 'New booking for Maldives Paradise Escape', time: '2026-07-26T10:30:00' },
  { id: 2, type: 'inquiry', text: 'New inquiry from David Lee', time: '2026-07-26T08:45:00' },
  { id: 3, type: 'payment', text: 'Payment received: $1,899', time: '2026-07-25T14:20:00' },
  { id: 4, type: 'package', text: 'Package "Tokyo Cultural Journey" saved as draft', time: '2026-07-24T16:00:00' },
  { id: 5, type: 'social', text: 'Shared Alpine Adventure on Instagram', time: '2026-07-23T11:30:00' },
]

export const upcomingTrips = [
  { id: 1, destination: 'Maldives', date: '2026-08-15', travelers: 8, package: 'Maldives Paradise Escape' },
  { id: 2, destination: 'Tokyo', date: '2026-09-01', travelers: 15, package: 'Tokyo Cultural Journey' },
  { id: 3, destination: 'Patagonia', date: '2026-10-10', travelers: 6, package: 'Patagonia Adventure' },
]

export const packagePerformance = [
  { name: 'Maldives', bookings: 24, revenue: 59976 },
  { name: 'Alps', bookings: 18, revenue: 34182 },
  { name: 'Tokyo', bookings: 0, revenue: 0 },
  { name: 'Sahara', bookings: 12, revenue: 21588 },
  { name: 'Bali', bookings: 8, revenue: 11192 },
]

export const genderDistribution = [
  { name: 'Male', value: 45 },
  { name: 'Female', value: 52 },
  { name: 'Other', value: 3 },
]

export const navItems = [
  { label: 'Overview', path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'Analytics', path: '/dashboard/analytics', icon: 'BarChart3' },
  { label: 'Organizer Profile', path: '/dashboard/organizer-profile', icon: 'UserCheck' },
  { label: 'Packages', path: '/dashboard/packages', icon: 'Package' },
  { label: 'Bookings', path: '/dashboard/bookings', icon: 'Calendar' },
  { label: 'Trip Groups', path: '/dashboard/trip-groups', icon: 'Users' },
  { label: 'Inquiries', path: '/dashboard/inquiries', icon: 'MessageSquare' },
  { label: 'Social Media', path: '/dashboard/social', icon: 'Share2' },
  { label: 'Messages', path: '/dashboard/messages', icon: 'Mail' },
  { label: 'Payments', path: '/dashboard/payments', icon: 'CreditCard' },
]

export const blogs = [
  { id: 1, title: '10 Hidden Gems in Southeast Asia', category: 'Travel Guides', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80', readTime: '5 min read', date: 'Jul 24, 2026' },
  { id: 2, title: 'How to Pack Light for a 2-Week Trip', category: 'Tips & Tricks', image: 'https://images.unsplash.com/photo-1472806426350-603610d85659?w=600&q=80', readTime: '4 min read', date: 'Jul 21, 2026' },
  { id: 3, title: 'The Ultimate Guide to Sustainable Travel', category: 'Eco Tourism', image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80', readTime: '7 min read', date: 'Jul 18, 2026' },
]

export const partners = [
  { name: 'Emirates', logo: 'Plane' },
  { name: 'Marriott', logo: 'Hotel' },
  { name: 'Hertz', logo: 'Car' },
  { name: 'Expedia', logo: 'Globe2' },
  { name: 'Delta', logo: 'PlaneTakeoff' },
  { name: 'Hilton', logo: 'Building' },
]
