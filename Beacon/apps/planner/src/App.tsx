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
const PlannerOnboardingPage = lazy(() => import('@/pages/onboarding/PlannerOnboardingPage'))

const OverviewPage = lazy(() => import('@/pages/dashboard/OverviewPage'))
const InquiriesPage = lazy(() => import('@/pages/dashboard/InquiriesPage'))
const PackagesPage = lazy(() => import('@/pages/dashboard/PackagesPage'))
const PackageCreatePage = lazy(() => import('@/pages/dashboard/PackageCreatePage'))
const PackageEditPage = lazy(() => import('@/pages/dashboard/PackageEditPage'))
const BookingsPage = lazy(() => import('@/pages/dashboard/BookingsPage'))
const PaymentsPage = lazy(() => import('@/pages/dashboard/PaymentsPage'))
const TravellersPage = lazy(() => import('@/pages/dashboard/TravellersPage'))
const TripGroupsPage = lazy(() => import('@/pages/dashboard/TripGroupsPage'))
const AnalyticsPage = lazy(() => import('@/pages/dashboard/AnalyticsPage'))
const ReviewsPage = lazy(() => import('@/pages/dashboard/ReviewsPage'))
const MarketingHubPage = lazy(() => import('@/pages/dashboard/MarketingHubPage'))
const BusinessProfilePage = lazy(() => import('@/pages/dashboard/BusinessProfilePage'))
const SettingsPage = lazy(() => import('@/pages/dashboard/SettingsPage'))
const TeamManagementPage = lazy(() => import('@/pages/dashboard/TeamManagementPage'))
const SupportCenterPage = lazy(() => import('@/pages/dashboard/SupportCenterPage'))

// Master Admin Portal Pages
import { MasterAdminProvider } from '@/data/masterAdminData'
const MasterLoginPage = lazy(() => import('@/pages/master/MasterLoginPage'))
const MasterControlLayout = lazy(() => import('@/components/master/MasterControlLayout'))
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
  return null
}

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/destinations/:id" element={<DestinationDetailPage />} />
      <Route path="/packages" element={<PackagesExplorePage />} />
      <Route path="/packages/:id" element={<PackageDetailPage />} />
      <Route path="/blogs" element={<BlogsPage />} />
      <Route path="/blogs/:id" element={<BlogDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
      <Route path="/booking/:packageId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
      <Route path="/onboarding" element={<ProtectedRoute><PlannerOnboardingPage /></ProtectedRoute>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OverviewPage />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="packages" element={<PackagesPage />} />
        <Route path="packages/create" element={<PackageCreatePage />} />
        <Route path="packages/edit/:id" element={<PackageEditPage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="trip-operations" element={<TripGroupsPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="travellers" element={<TravellersPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="marketing" element={<MarketingHubPage />} />
        <Route path="business-profile" element={<BusinessProfilePage />} />
        <Route path="team" element={<TeamManagementPage />} />
        <Route path="support" element={<SupportCenterPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Master Admin Portal Routing */}
      <Route path="/master-login" element={<MasterLoginPage />} />
      <Route
        path="/master-control"
        element={
          <MasterControlLayout />
        }
      >
        <Route index element={<MissionControlOverviewPage />} />
        <Route path="overview" element={<MissionControlOverviewPage />} />
        <Route path="verifications" element={<VerificationCenterPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="live-trips" element={<LiveTripOperationsPage />} />
        <Route path="packages" element={<PackageManagementPage />} />
        <Route path="bookings" element={<BookingManagementPage />} />
        <Route path="payments" element={<PaymentCenterPage />} />
        <Route path="customer-care" element={<CustomerCareCenterPage />} />
        <Route path="disputes" element={<DisputesReportsPage />} />
        <Route path="reviews" element={<ReviewModerationPage />} />
        <Route path="marketing" element={<MarketingAnnouncementsPage />} />
        <Route path="analytics" element={<PlatformAnalyticsPage />} />
        <Route path="fraud-audit" element={<FraudAuditLogPage />} />
        <Route path="settings" element={<PlatformSettingsPage />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/planner">
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
