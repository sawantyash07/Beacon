import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/context/AuthContext'
import { MasterAdminProvider } from '@/context/MasterAdminContext'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { DashboardLayout } from '@/components/dashboard/DashboardLayout'
import { MasterControlLayout } from '@/components/master/MasterControlLayout'
import { Skeleton } from '@/components/ui/Skeleton'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

// CORE PRIMARY PAGES (Eagerly Loaded to Prevent Dynamic Chunk Import Failures)
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import SignUpPage from '@/pages/SignUpPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'

// MASTER CONTROL CORE PAGES
import MasterLoginPage from '@/pages/master/MasterLoginPage'
import MissionControlOverviewPage from '@/pages/master/MissionControlOverviewPage'

// Helper for dynamic lazy imports with retry mechanism
function lazyRetry<T extends React.ComponentType<any>>(componentImport: () => Promise<{ default: T }>) {
  return lazy(async () => {
    try {
      return await componentImport()
    } catch (error: any) {
      console.warn('Dynamic import failed, retrying page reload...', error)
      const reloaded = sessionStorage.getItem('lazy_retry_reload')
      if (!reloaded) {
        sessionStorage.setItem('lazy_retry_reload', 'true')
        window.location.reload()
      }
      throw error
    }
  })
}

// LAZY LOADED SECONDARY PAGES
const DestinationsPage = lazyRetry(() => import('@/pages/destinations/DestinationsPage'))
const DestinationDetailPage = lazyRetry(() => import('@/pages/destinations/DestinationDetailPage'))
const PackagesExplorePage = lazyRetry(() => import('@/pages/packages/PackagesExplorePage'))
const PackageDetailPage = lazyRetry(() => import('@/pages/packages/PackageDetailPage'))
const BlogsPage = lazyRetry(() => import('@/pages/blogs/BlogsPage'))
const BlogDetailPage = lazyRetry(() => import('@/pages/blogs/BlogDetailPage'))
const AboutPage = lazyRetry(() => import('@/pages/about/AboutPage'))
const ContactPage = lazyRetry(() => import('@/pages/contact/ContactPage'))
const WishlistPage = lazyRetry(() => import('@/pages/wishlist/WishlistPage'))
const BookingPage = lazyRetry(() => import('@/pages/booking/BookingPage'))

const OverviewPage = lazyRetry(() => import('@/pages/dashboard/OverviewPage'))
const InquiriesPage = lazyRetry(() => import('@/pages/dashboard/InquiriesPage'))
const PackagesPage = lazyRetry(() => import('@/pages/dashboard/PackagesPage'))
const PackageCreatePage = lazyRetry(() => import('@/pages/dashboard/PackageCreatePage'))
const PackageEditPage = lazyRetry(() => import('@/pages/dashboard/PackageEditPage'))
const BookingsPage = lazyRetry(() => import('@/pages/dashboard/BookingsPage'))
const TripGroupsPage = lazyRetry(() => import('@/pages/dashboard/TripGroupsPage'))
const SocialMediaPage = lazyRetry(() => import('@/pages/dashboard/SocialMediaPage'))
const MessagesPage = lazyRetry(() => import('@/pages/dashboard/MessagesPage'))
const PaymentsPage = lazyRetry(() => import('@/pages/dashboard/PaymentsPage'))
const AnalyticsPage = lazyRetry(() => import('@/pages/dashboard/AnalyticsPage'))
const OrganizerProfilePage = lazyRetry(() => import('@/pages/dashboard/OrganizerProfilePage'))

// BEACON MASTER CONTROL MODULES
const VerificationCenterPage = lazyRetry(() => import('@/pages/master/VerificationCenterPage'))
const UserManagementPage = lazyRetry(() => import('@/pages/master/UserManagementPage'))
const LiveTripOperationsPage = lazyRetry(() => import('@/pages/master/LiveTripOperationsPage'))
const PackageManagementPage = lazyRetry(() => import('@/pages/master/PackageManagementPage'))
const BookingManagementPage = lazyRetry(() => import('@/pages/master/BookingManagementPage'))
const PaymentCenterPage = lazyRetry(() => import('@/pages/master/PaymentCenterPage'))
const CustomerCareCenterPage = lazyRetry(() => import('@/pages/master/CustomerCareCenterPage'))
const DisputesReportsPage = lazyRetry(() => import('@/pages/master/DisputesReportsPage'))
const ReviewModerationPage = lazyRetry(() => import('@/pages/master/ReviewModerationPage'))
const MarketingAnnouncementsPage = lazyRetry(() => import('@/pages/master/MarketingAnnouncementsPage'))
const PlatformAnalyticsPage = lazyRetry(() => import('@/pages/master/PlatformAnalyticsPage'))
const FraudAuditLogPage = lazyRetry(() => import('@/pages/master/FraudAuditLogPage'))
const PlatformSettingsPage = lazyRetry(() => import('@/pages/master/PlatformSettingsPage'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#001731] flex items-center justify-center">
      <div className="space-y-4 w-64 text-center">
        <Skeleton className="h-8 w-full bg-cyan/15" />
        <Skeleton className="h-32 w-full bg-cyan/10" />
        <div className="text-xs font-mono text-cyan animate-pulse">Initializing Beacon Platform...</div>
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
        
        {/* PLANNER DASHBOARD */}
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

        {/* BEACON MASTER LOGIN & CONTROL HUB (SUPER ADMIN PORTAL) */}
        <Route path="/master-login" element={<PageTransition><MasterLoginPage /></PageTransition>} />
        <Route
          path="/master-control"
          element={
            <PageTransition>
              <MasterControlLayout />
            </PageTransition>
          }
        >
          <Route index element={<MissionControlOverviewPage />} />
          <Route path="verification" element={<VerificationCenterPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="trips" element={<LiveTripOperationsPage />} />
          <Route path="packages" element={<PackageManagementPage />} />
          <Route path="bookings" element={<BookingManagementPage />} />
          <Route path="payments" element={<PaymentCenterPage />} />
          <Route path="support" element={<CustomerCareCenterPage />} />
          <Route path="disputes" element={<DisputesReportsPage />} />
          <Route path="reviews" element={<ReviewModerationPage />} />
          <Route path="marketing" element={<MarketingAnnouncementsPage />} />
          <Route path="analytics" element={<PlatformAnalyticsPage />} />
          <Route path="fraud-audit" element={<FraudAuditLogPage />} />
          <Route path="settings" element={<PlatformSettingsPage />} />
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
          <MasterAdminProvider>
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
            <Toaster position="top-right" richColors />
          </MasterAdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}
