# Requirements Document

## Introduction

Waypoint is a premium, AI-powered travel planner web application built on top of the existing Beacon platform (Next.js 16 App Router + NestJS + MongoDB/Prisma monorepo). This feature replaces the current basic `/planner/dashboard` scaffold with a visually immersive management suite using a navy-teal-cyan ocean palette, glassmorphism surfaces, and Framer Motion animations. It covers two high-level areas: (1) a fully redesigned landing page with animated ocean hero, interactive destination gallery, world-map pins, and social proof sections; and (2) a nine-section planner dashboard (Overview, Inquiries, Packages, Bookings, Trip Groups, Social Media, Messages, Payments, Analytics) housed in a persistent shell with a collapsible dark-navy sidebar and sticky header. Firebase Authentication is added for Google Sign-In on the client side while the existing cookie-based JWT on the NestJS backend remains the authoritative session.

---

## Glossary

- **Landing_Page**: The public-facing root route (`/`) of the Waypoint application.
- **OceanHeroCanvas**: The animated canvas component that renders sine-wave ocean layers, floating particles, and a rotating beacon/compass icon in the hero section.
- **DestinationGallery**: The masonry-grid / mobile-carousel component showing destination images with hover tilt effects.
- **WorldMapPins**: The SVG world-map component with animated destination pins.
- **DashboardShell**: The persistent layout wrapper (`/planner/dashboard/layout.tsx`) rendering the sidebar and sticky header for all dashboard routes.
- **NavItem**: A single navigation link entry inside the DashboardShell sidebar.
- **Overview_Page**: The `/planner/dashboard` route showing at-a-glance business metrics, revenue chart, recent messages, and live packages.
- **StatCard**: A glassmorphism card displaying a single key metric with icon, trend badge, and animated counter.
- **BoardingPassCard**: A styled card displaying a travel package with gradient header, price, duration, and spot count.
- **RevenueAreaChart**: A Recharts `AreaChart` component showing monthly revenue with gradient fill.
- **Inquiries_Page**: The `/planner/dashboard/inquiries` route for managing traveler inquiries.
- **InquiryCard**: A card component showing inquiry details, status pill, and reply CTA.
- **StatusPill**: A small rounded badge indicating the status of an inquiry, booking, or package.
- **Packages_Page**: The `/planner/dashboard/packages` route for listing, creating, editing, and viewing travel packages.
- **Package_Form**: The React Hook Form + Zod validated form for creating and editing packages (`packages/create` and `packages/[id]/edit`).
- **ItineraryDayCard**: A dynamic form card representing one day of a trip itinerary, generated per day count.
- **Bookings_Page**: The `/planner/dashboard/bookings` route showing a data table of all bookings.
- **Trip_Groups_Page**: The `/planner/dashboard/trip-groups` route for managing trip group chats.
- **GroupCard**: A card displaying a trip group with icon badge, member count, departure date, and unread count.
- **Social_Page**: The `/planner/dashboard/social` route for managing social media platform connections.
- **Social_System**: The backend and frontend logic handling social media connections and auto-sharing of packages.
- **Messages_Page**: The `/planner/dashboard/messages` route with a two-panel conversation interface.
- **Payments_Page**: The `/planner/dashboard/payments` route showing balance card and transaction history.
- **Analytics_Page**: The `/planner/dashboard/analytics` route showing bookings and revenue charts.
- **Auth_System**: The combined Firebase client-side auth + NestJS JWT cookie-based auth flow.
- **Middleware**: The Next.js `src/middleware.ts` route guard enforcing role-based access to `/planner/dashboard/*`.
- **Design_System**: The shared set of CSS tokens, typography fonts, and reusable component primitives (GlassCard, StatCard, BoardingPassCard, StatusPill, NavItem).
- **Prisma_Schema**: The MongoDB schema managed by Prisma ORM at `@beacon/database`.
- **INR**: Indian Rupee — the currency used throughout the Payments and Analytics sections.
- **PLANNER**: A user role granted access to the planner dashboard.
- **TRAVELER**: A user role redirected to the traveler dashboard after login.

---

## Requirements

### Requirement 1: Animated Landing Page

**User Story:** As a prospective traveler, I want to experience a visually stunning landing page, so that I understand the Waypoint brand and am compelled to explore travel packages.

#### Acceptance Criteria

1. THE Landing_Page SHALL render the OceanHeroCanvas with animated sine-wave ocean layers (minimum 3 layers), floating particles, and a rotating beacon/compass icon.
2. WHEN a user moves their mouse over the hero section, THE OceanHeroCanvas SHALL interpolate the icon position toward the cursor using lerp smoothing with a configurable strength parameter between 0 and 1.
3. THE Landing_Page SHALL render the DestinationGallery as a masonry grid on desktop, a 2-column grid on tablet, and a horizontally draggable carousel on mobile.
4. THE Landing_Page SHALL render the WorldMapPins component with pulsing cyan pins at a minimum of 6 destination locations and destination name tooltip on hover.
5. THE Landing_Page SHALL render a Why Waypoint section with 6 feature cards with glowing Lucide icons.
6. THE Landing_Page SHALL render a Testimonials carousel that auto-advances every 5 seconds and supports Framer Motion drag gestures.
7. THE Landing_Page SHALL render a Pricing section with 3 tier cards.
8. THE Landing_Page SHALL render an FAQ accordion section.
9. THE Landing_Page SHALL render a Footer with an animated ocean wave SVG.

---

### Requirement 2: Dashboard Shell

**User Story:** As a planner, I want a persistent navigation shell around all dashboard sections, so that I can switch between sections without losing context.

#### Acceptance Criteria

1. THE DashboardShell SHALL render a dark-navy sidebar (256px wide on desktop) with two NavGroup sections: "Workspace" (Overview, Inquiries, Packages, Bookings, Trip Groups) and "Grow" (Social Media, Messages, Payments, Analytics).
2. WHEN a user navigates to a dashboard route, THE DashboardShell SHALL apply the active NavItem style (`bg-wp-teal/10 text-wp-teal`) to the NavItem whose `href` matches the current pathname via prefix matching.
3. WHEN the viewport is below the `lg` breakpoint, THE DashboardShell SHALL render the sidebar as a slide-in drawer overlay toggled by a menu button.
4. THE DashboardShell SHALL render a sticky header containing a global search input and a notification bell icon with an unread-count dot.
5. THE DashboardShell SHALL render a planner profile chip at the bottom of the sidebar displaying name and avatar.
6. WHEN a planner triggers the logout action, THE DashboardShell SHALL invoke the server action that clears the `access_token` cookie and redirects to `/`.

---

### Requirement 3: Overview Dashboard Section

**User Story:** As a planner, I want an at-a-glance overview of my business metrics, so that I can quickly assess performance without navigating to individual sections.

#### Acceptance Criteria

1. THE Overview_Page SHALL fetch and display four StatCard components: Active Bookings, New Inquiries, Packages Live, and Traveler Rating (0–5 scale with one decimal place).
2. THE Overview_Page SHALL render a RevenueAreaChart using Recharts `AreaChart` with a gradient fill using the `wp-teal` color token and INR currency in tooltips.
3. THE Overview_Page SHALL render a RecentMessagesPanel showing the 4 most recent conversations with traveler avatar, name, message preview, timestamp, and unread indicator.
4. THE Overview_Page SHALL render a LivePackagesGrid displaying up to 4 published packages as BoardingPassCard components.
5. THE Overview_Page SHALL fetch stats, revenue series, recent messages, and live packages in parallel using React Server Components and `Promise.all`.
6. WHEN data is loading, THE Overview_Page SHALL display Skeleton placeholder components matching the shape of each content section.

---

### Requirement 4: Firebase + NestJS Hybrid Authentication

**User Story:** As a planner, I want to sign in with Google or email/password, so that I can access my dashboard securely.

#### Acceptance Criteria

1. WHEN a user submits valid email and password credentials, THE Auth_System SHALL POST to `/auth/login`, receive the JWT, set an HttpOnly `access_token` cookie, and redirect to `/planner/dashboard` for PLANNER-role users.
2. WHEN a user clicks "Continue with Google", THE Auth_System SHALL trigger Firebase `signInWithPopup` with `GoogleAuthProvider` to obtain a Firebase `idToken`.
3. WHEN a valid Firebase `idToken` is submitted to `POST /auth/firebase`, THE Auth_System SHALL verify the token using the Firebase Admin SDK, find or create the user record, issue a JWT, and set the HttpOnly `access_token` cookie.
4. IF Firebase Sign-In is cancelled or fails, THE Auth_System SHALL display a descriptive error message beneath the Google button and re-enable the button without redirecting.
5. WHEN a login call completes, THE Auth_System SHALL either set the `access_token` cookie AND redirect, or return an error and set no cookie — never a partial state.
6. THE Login_Page SHALL render with an animated gradient background (navy-to-teal left panel, white right panel), email/password form, "Continue with Google" button, password strength indicator, Remember Me checkbox, and Forgot Password link.
7. THE Register_Page SHALL render with the same split layout, name/email/password fields, role selector (TRAVELER / PLANNER), password confirmation with strength bar, profile photo upload, and terms checkbox.
8. WHEN a user clicks Forgot Password, THE Auth_System SHALL call Firebase `sendPasswordResetEmail` with the provided email address.

---

### Requirement 5: Route Protection Middleware

**User Story:** As a platform operator, I want unauthorized users blocked from the planner dashboard, so that planner data remains protected.

#### Acceptance Criteria

1. WHEN an unauthenticated user requests any route under `/planner/dashboard/*`, THE Middleware SHALL redirect to `/login?redirect=<original_path>`.
2. WHEN a user with the TRAVELER role requests any route under `/planner/dashboard/*`, THE Middleware SHALL redirect to `/login?redirect=<original_path>`.
3. WHEN a user with the PLANNER role successfully logs in from a redirect URL, THE Auth_System SHALL redirect back to the original URL stored in the `redirect` query parameter.

---

### Requirement 6: Package Management

**User Story:** As a planner, I want to create, edit, and publish travel packages with day-wise itineraries, so that I can offer structured trips to travelers.

#### Acceptance Criteria

1. THE Packages_Page SHALL render a grid of BoardingPassCard components for existing packages and a "New Package" button.
2. THE Package_Form SHALL include fields for destination, duration, itinerary days, fare includes/excludes tag inputs, base price, offer percent (0–100), cover image, and status (DRAFT / PUBLISHED).
3. WHEN the duration field value changes to `n` (where `1 ≤ n ≤ 30`), THE Package_Form SHALL render exactly `n` ItineraryDayCard components, each with `dayNumber` equal to its 1-based index.
4. WHEN the duration field decreases, THE Package_Form SHALL preserve existing day data for retained days and truncate the rest.
5. WHEN the duration field increases, THE Package_Form SHALL preserve existing day data and append blank ItineraryDayCard entries for the new days.
6. THE Package_Form SHALL compute and display a live traveler price preview using the formula `Math.round(basePrice * (1 - offerPercent / 100))`.
7. THE computed traveler price SHALL always be less than or equal to `basePrice` for any valid `basePrice > 0` and `offerPercent ∈ [0, 100]`.
8. THE computed traveler price SHALL always be greater than or equal to 0 for any valid inputs.
9. IF a cover image file exceeds 5 MB or has a non-image MIME type, THE Package_Form SHALL display an inline error below the drop zone and reject the file.
10. IF the package form is submitted with invalid data (missing required fields, `basePrice ≤ 0`, or `duration` outside `[1, 30]`), THEN THE Package_Form SHALL display inline field-level error messages and prevent API submission.
11. WHEN a valid package form is submitted with `status: 'PUBLISHED'`, THE Package_Form SHALL POST to `/packages`, show a success toast, and redirect to the new package detail page.
12. THE Package_Detail_Page SHALL render a hero banner, 4 stat tiles, a Recharts PieChart for gender split, and a traveler payments data table with Paid/Pending StatusPill.
13. WHEN a PUBLISHED package status is updated via the API, THE Packages_API SHALL only accept a transition to `ARCHIVED` and reject any attempt to revert to `DRAFT`.

---

### Requirement 7: Inquiry Management

**User Story:** As a planner, I want to view and respond to traveler inquiries, so that I can convert interest into bookings.

#### Acceptance Criteria

1. THE Inquiries_Page SHALL render a filter tab bar with tabs: All, New, Replied, and Converted, each showing a count of matching inquiries.
2. WHEN the active tab is "ALL", THE Inquiries_Page SHALL display all inquiries in the list, preserving their original order.
3. WHEN the active tab is a specific status (NEW, REPLIED, or CONVERTED), THE Inquiries_Page SHALL display only inquiries whose `status` matches that value, preserving relative order.
4. THE filter result for any status SHALL include every inquiry with that status (no omissions) and no inquiry with a different status (no false inclusions).
5. THE Inquiries_Page SHALL render each inquiry as an InquiryCard showing traveler avatar, package title, message excerpt, timestamp, StatusPill, and a Reply CTA.
6. WHEN a planner submits a reply, THE Inquiries_Page SHALL optimistically update the inquiry status to REPLIED and dispatch the API call.

---

### Requirement 8: Bookings Management

**User Story:** As a planner, I want to view all bookings in a structured table, so that I can track traveler commitments and manage cancellations.

#### Acceptance Criteria

1. THE Bookings_Page SHALL render a data table with columns: Booking ID (IBM Plex Mono), Traveler, Package, Travel Date, Amount (IBM Plex Mono), Status (StatusPill), and an overflow action menu.
2. THE overflow action menu SHALL provide "View Details" and "Cancel Booking" options per row.
3. WHEN there are no bookings, THE Bookings_Page SHALL display an empty state with an ocean-themed SVG illustration, a descriptive title, and a CTA button.
4. WHEN data is loading, THE Bookings_Page SHALL display Skeleton placeholder rows matching the table structure.

---

### Requirement 9: Trip Groups

**User Story:** As a planner, I want to organize travelers into trip groups, so that I can manage group logistics and communication.

#### Acceptance Criteria

1. THE Trip_Groups_Page SHALL render a grid of GroupCard components, each displaying icon emoji badge, group name, unread message count badge, member count, and departure date.
2. WHEN a planner clicks "New Group", THE Trip_Groups_Page SHALL open a modal form with fields for group name, linked package, and departure date.
3. WHEN there are no trip groups, THE Trip_Groups_Page SHALL display an empty state with an ocean-themed illustration and a "Create Group" CTA.

---

### Requirement 10: Social Media Integration

**User Story:** As a planner, I want to connect my social media accounts and auto-share new packages, so that I can promote my offerings with minimal manual effort.

#### Acceptance Criteria

1. THE Social_Page SHALL render four platform connection cards for Instagram, Facebook, YouTube, and WhatsApp Business, each showing the platform logo, connection status, and a Connect or Disconnect button.
2. WHEN a platform is connected, THE Social_Page SHALL display the connected account handle and follower count on the platform card.
3. THE Social_Page SHALL render an auto-share toggle banner labeled "Automatically share new packages".
4. WHEN the auto-share toggle is enabled and a new package is published, THE Social_System SHALL dispatch a share action to all currently connected platforms.
5. THE Social_Page SHALL render a recent shares grid showing thumbnail tiles with a platform badge overlay and share timestamp.

---

### Requirement 11: Messages

**User Story:** As a planner, I want a two-panel chat interface, so that I can communicate with travelers in real time.

#### Acceptance Criteria

1. THE Messages_Page SHALL render a two-panel layout: a conversation list panel on the left and an active message thread panel on the right.
2. THE conversation list panel SHALL display each conversation with traveler avatar, name, last message preview, timestamp, and unread count badge.
3. WHEN a conversation is selected, THE Messages_Page SHALL highlight it in the left panel and render the full message thread in the right panel.
4. WHEN a planner sends a message, THE Messages_Page SHALL append the new message bubble to the active thread and dispatch the API call.
5. Message bubbles from the planner SHALL appear on the right side with `wp-teal` background; message bubbles from the traveler SHALL appear on the left side with white background.
6. WHEN no conversation is selected, THE Messages_Page SHALL display an empty state in the right panel.
7. THE Messages_Page SHALL poll for new messages at a 500 ms interval as a real-time fallback until WebSocket support is added.

---

### Requirement 12: Payments

**User Story:** As a planner, I want to view my balance and transaction history, so that I can track earnings and initiate withdrawals.

#### Acceptance Criteria

1. THE Payments_Page SHALL render a gradient balance card (navy-to-teal) displaying the available balance in INR using IBM Plex Mono font and a "Withdraw to bank" CTA button.
2. THE Payments_Page SHALL render a transaction list where each row shows a direction indicator (↓ green for IN, ↑ red for OUT), description, date, and signed amount in IBM Plex Mono.

---

### Requirement 13: Analytics

**User Story:** As a planner, I want charts showing my booking counts and revenue breakdown, so that I can identify performance trends.

#### Acceptance Criteria

1. THE Analytics_Page SHALL render a monthly bookings bar chart using Recharts `BarChart` with `wp-teal` fill.
2. THE Analytics_Page SHALL render a revenue-by-package donut chart using Recharts `PieChart` with a legend.
3. THE Analytics_Page SHALL render a date-range selector with options for last 3 months, 6 months, and 12 months.
4. WHEN the date-range selector value changes, THE Analytics_Page SHALL re-fetch chart data and re-render both charts for the selected range.

---

### Requirement 14: Design System

**User Story:** As a developer, I want a consistent design system, so that all Waypoint UI components share a coherent visual language.

#### Acceptance Criteria

1. THE Design_System SHALL define the following Tailwind CSS v4 `@theme` tokens in `globals.css`: `--color-wp-navy` (#002349), `--color-wp-teal` (#0097A6), `--color-wp-cyan` (#00CBE0), `--color-wp-bg` (#F0FAFB), `--color-wp-border` (#D6EEF1), `--color-wp-muted` (#5C7A88).
2. THE Design_System SHALL load Space Grotesk via `next/font/google` for headings and stat numbers, Inter for body copy and UI labels, and IBM Plex Mono for booking IDs, prices, and monetary amounts.
3. THE Design_System SHALL provide a GlassCard primitive with `bg-white/80 backdrop-blur-lg border border-wp-border rounded-2xl shadow-sm` and hover lift transition.
4. THE Design_System SHALL provide StatusPill variants for: NEW (cyan-tint), REPLIED (teal-tint), CONVERTED (navy-tint), CONFIRMED (green), PENDING (amber), and CANCELLED (red).

---

### Requirement 15: Data Model Extensions

**User Story:** As a developer, I want the Prisma schema extended with new models, so that the application can persist inquiries, trip groups, social connections, and chat messages.

#### Acceptance Criteria

1. THE Prisma_Schema SHALL add `offerPercent` (Float, optional), `spotsTotal` (Int, optional), and `tags` (String array) fields to the existing `Package` model.
2. THE Prisma_Schema SHALL create an `Inquiry` model with fields: `id` (ObjectId), `plannerId` (ObjectId), `travelerId` (ObjectId), `packageId` (ObjectId, optional), `message` (String), `status` (InquiryStatus enum, default NEW), `createdAt`, and `updatedAt`.
3. THE Prisma_Schema SHALL create a `TripGroup` model with fields: `id` (ObjectId), `plannerId` (ObjectId), `packageId` (ObjectId, optional), `name` (String), `iconEmoji` (String, default "✈️"), `memberCount` (Int, default 0), `departureDate` (DateTime), and `createdAt`.
4. THE Prisma_Schema SHALL create a `SocialConnection` model with fields: `id` (ObjectId), `plannerId` (ObjectId), `platform` (SocialPlatform enum), `handle` (String, optional), `connected` (Boolean, default false), `autoShare` (Boolean, default false), and `createdAt`.
5. THE Prisma_Schema SHALL create a `ChatMessage` model with fields: `id` (ObjectId), `conversationId` (String), `senderId` (ObjectId), `text` (String), `attachmentUrl` (String, optional), `read` (Boolean, default false), and `createdAt`.
6. THE Prisma_Schema SHALL define `InquiryStatus` enum with values: NEW, REPLIED, CONVERTED.
7. THE Prisma_Schema SHALL define `SocialPlatform` enum with values: INSTAGRAM, FACEBOOK, YOUTUBE, WHATSAPP_BUSINESS.

---

### Requirement 16: New API Endpoints

**User Story:** As a developer, I want new NestJS API endpoints for inquiries, trip groups, social connections, and messages, so that the dashboard sections have data to display and mutate.

#### Acceptance Criteria

1. THE NestJS_API SHALL expose `POST /auth/firebase` that accepts `{ idToken: string }`, verifies the Firebase token via the Firebase Admin SDK, and returns `{ access_token, user }` with the same HttpOnly cookie pattern as existing auth endpoints.
2. THE NestJS_API SHALL expose `GET /planner/stats` returning `{ activeBookings, newInquiries, packagesLive, travelerRating }` for the authenticated planner.
3. THE NestJS_API SHALL expose `GET /planner/revenue?months=n` returning an array of `{ month, revenue }` data points for the last `n` months.
4. THE NestJS_API SHALL expose CRUD endpoints for Inquiry: `GET /inquiries`, `POST /inquiries`, `PATCH /inquiries/:id`.
5. THE NestJS_API SHALL expose CRUD endpoints for TripGroup: `GET /trip-groups`, `POST /trip-groups`, `DELETE /trip-groups/:id`.
6. THE NestJS_API SHALL expose endpoints for SocialConnection: `GET /social/connections`, `POST /social/connect`, `POST /social/disconnect`, `PATCH /social/auto-share`.
7. THE NestJS_API SHALL expose endpoints for Messages: `GET /messages`, `GET /messages/:conversationId`, `POST /messages`.
8. THE NestJS_API SHALL protect all planner endpoints with the existing JWT auth guard, rejecting requests without a valid `access_token` cookie.

---

### Requirement 17: Performance and Accessibility

**User Story:** As a user, I want the application to load quickly and work on all devices, so that I can use it on mobile as well as desktop.

#### Acceptance Criteria

1. THE Application SHALL implement React Server Components for Overview, Bookings, and Packages list pages to avoid client-side waterfalls on initial load.
2. THE Application SHALL wrap each data-dependent RSC section in a `<Suspense>` boundary with a matching Skeleton fallback component.
3. THE Application SHALL use `next/image` with `sizes` prop for all package cover images and serve them in WebP format.
4. THE Application SHALL lazy-load Recharts chart components using `dynamic(() => import(...), { ssr: false })` to prevent SSR hydration mismatches.
5. THE Application SHALL be fully responsive and functional at viewport widths from 375px (mobile) through 1440px (desktop).
6. THE Application SHALL not commit Firebase service account keys, JWT secrets, or third-party API keys to source control; these values SHALL be stored in environment variables only.
