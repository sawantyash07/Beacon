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

// BEACON MASTER CONTROL (SUPER ADMIN PORTAL) PAGES
const MasterLoginPage = lazy(() => import('@/pages/master/MasterLoginPage'))
const MissionControlOverviewPage = lazy(() => import('@/pages/master/MissionControlOverviewPage'))
const VerificationCenterPage = lazy(() => import('@/pages/master/VerificationCenterPage'))
const UserManagementPage = lazy(() => import('@/pages/master/UserManagementPage'))
const LiveTripOperationsPage = lazy(() => import('@/pages/master/LiveTripOperationsPage'))
const PackageManagementPage = lazy(() => import('@/pages/master/PackageManagementPage'))
const BookingManagementPage = lazy(() => import('@/pages/master/BookingManagementPage'))
const PaymentCenterPage = lazy(() => import('@/pages/master/PaymentCenterPage'))
const CustomerCareCenterPage = lazy(() => import('@/pages/master/CustomerCareCenterPage'))
const DisputesReportsPage = lazy(() => import('@/pages/master/DisputesReportsPage'))
const ReviewModerationPage = lazy(() => import('@/pages/master/ReviewModerationPage'))
const MarketingAnnouncementsPage = lazy(() => import('@/pages/master/MarketingAnnouncementsPage'))
const PlatformAnalyticsPage = lazy(() => import('@/pages/master/PlatformAnalyticsPage'))
const FraudAuditLogPage = lazy(() => import('@/pages/master/FraudAuditLogPage'))
const PlatformSettingsPage = lazy(() => import('@/pages/master/PlatformSettingsPage'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#001731] flex items-center justify-center">
      <div className="space-y-4 w-64 text-center">
        <Skeleton className="h-8 w-full bg-cyan/15" />
        <Skeleton className="h-32 w-full bg-cyan/10" />
        <div className="text-xs font-mono text-cyan animate-pulse">Initializing Beacon Master Hub...</div>
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
