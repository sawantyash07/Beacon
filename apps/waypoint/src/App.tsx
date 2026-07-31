import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/context/AuthContext'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

const LandingPage = lazy(() => import('@/pages/LandingPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const SignUpPage = lazy(() => import('@/pages/SignUpPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'))

const DestinationsPage = lazy(() => import('@/pages/destinations/DestinationsPage'))
const DestinationDetailPage = lazy(() => import('@/pages/destinations/DestinationDetailPage'))
const PackagesExplorePage = lazy(() => import('@/pages/packages/PackagesExplorePage'))
const PackageDetailPage = lazy(() => import('@/pages/packages/PackageDetailPage'))
const BlogsPage = lazy(() => import('@/pages/blogs/BlogsPage'))
const BlogDetailPage = lazy(() => import('@/pages/blogs/BlogDetailPage'))
const AboutPage = lazy(() => import('@/pages/about/AboutPage'))
const ContactPage = lazy(() => import('@/pages/contact/ContactPage'))
const WishlistPage = lazy(() => import('@/pages/wishlist/WishlistPage'))
const BookingPage = lazy(() => import('@/pages/booking/BookingPage'))

const OverviewPage = lazy(() => import('@/pages/dashboard/OverviewPage'))
const InquiriesPage = lazy(() => import('@/pages/dashboard/InquiriesPage'))
const PackagesPage = lazy(() => import('@/pages/dashboard/PackagesPage'))
const PackageCreatePage = lazy(() => import('@/pages/dashboard/PackageCreatePage'))
const PackageEditPage = lazy(() => import('@/pages/dashboard/PackageEditPage'))
const BookingsPage = lazy(() => import('@/pages/dashboard/BookingsPage'))
const TripGroupsPage = lazy(() => import('@/pages/dashboard/TripGroupsPage'))
const SocialMediaPage = lazy(() => import('@/pages/dashboard/SocialMediaPage'))
const MessagesPage = lazy(() => import('@/pages/dashboard/MessagesPage'))
const PaymentsPage = lazy(() => import('@/pages/dashboard/PaymentsPage'))
const AnalyticsPage = lazy(() => import('@/pages/dashboard/AnalyticsPage'))
const OrganizerProfilePage = lazy(() => import('@/pages/dashboard/OrganizerProfilePage'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-page flex items-center justify-center">
      <div className="space-y-4 w-64">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPasswordPage /></PageTransition>} />
        
        <Route path="/destinations" element={<PageTransition><DestinationsPage /></PageTransition>} />
        <Route path="/destinations/:id" element={<PageTransition><DestinationDetailPage /></PageTransition>} />
        <Route path="/packages" element={<PageTransition><PackagesExplorePage /></PageTransition>} />
        <Route path="/packages/:id" element={<PageTransition><PackageDetailPage /></PageTransition>} />
        <Route path="/blogs" element={<PageTransition><BlogsPage /></PageTransition>} />
        <Route path="/blogs/:id" element={<PageTransition><BlogDetailPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />

        <Route path="/wishlist" element={<ProtectedRoute><PageTransition><WishlistPage /></PageTransition></ProtectedRoute>} />
        <Route path="/booking/:packageId" element={<ProtectedRoute><PageTransition><BookingPage /></PageTransition></ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <PageTransition>
                <DashboardLayout />
              </PageTransition>
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="inquiries" element={<InquiriesPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="packages/create" element={<PackageCreatePage />} />
          <Route path="packages/edit/:id" element={<PackageEditPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="trip-groups" element={<TripGroupsPage />} />
          <Route path="social" element={<SocialMediaPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="organizer-profile" element={<OrganizerProfilePage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <AnimatedRoutes />
          </Suspense>
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
