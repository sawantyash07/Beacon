/**
 * BEACON MASTER — MASTER ADMIN APPLICATION CONTROLLER
 * Single-Page Router, State Store, Data Table Filters, Interactive Drawers, Command Palette.
 */

import { MASTER_INITIAL_DATA } from './master-data.js';
import { masterSecurity, MASTER_ROLES } from './master-security.js';
import { MasterCharts } from './master-charts.js';

class MasterApp {
  constructor() {
    this.data = JSON.parse(JSON.stringify(MASTER_INITIAL_DATA));
    this.currentRoute = 'dashboard';
    this.activeDrawer = null;
    this.searchQuery = '';
    this.selectedTab = 'all';
    this.liveActivityTimer = null;
  }

  init() {
    this.setupHashRouter();
    this.setupGlobalKeyboardShortcuts();
    this.startLiveActivityFeed();
    this.render();
  }

  // Router based on window.location.hash or route path
  setupHashRouter() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'dashboard';
      this.navigateTo(hash);
    });

    const pathname = window.location.pathname.replace(/\/$/, '');
    let initialRoute = 'dashboard';
    if (pathname.endsWith('/login') || pathname === '/login') {
      initialRoute = 'login';
    } else if (window.location.hash) {
      initialRoute = window.location.hash.replace('#', '');
    }
    this.currentRoute = initialRoute;
  }

  navigateTo(route) {
    this.currentRoute = route;
    window.location.hash = route;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setupGlobalKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl + K or Cmd + K -> Open Global Search Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openCommandPalette();
      }
      // Esc -> Close Modals / Drawers
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('master-toast-container') || (() => {
      const div = document.createElement('div');
      div.id = 'master-toast-container';
      div.className = 'toast-container';
      document.body.appendChild(div);
      return div;
    })();

    const toast = document.createElement('div');
    toast.className = 'master-toast';
    const icon = type === 'success' ? '✅' : type === 'danger' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = '0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  startLiveActivityFeed() {
    const simulatedEvents = [
      { text: "Rahul Sharma initiated booking for Kashmir Alpine Skiing", time: "Just now", badge: "TRIP" },
      { text: "Planner Pooja Hegde uploaded verified Goan Tourism License", time: "1 min ago", badge: "KYC" },
      { text: "Razorpay Webhook: Payment of ₹85,000 confirmed for #BK-8292", time: "2 mins ago", badge: "PAYMENT" },
      { text: "Support Admin Sneha Nair resolved Ticket #TCK-401 (Srinagar Chauffeur)", time: "4 mins ago", badge: "SUPPORT" },
      { text: "New Traveller Vikram Seth registered via iOS Companion App", time: "6 mins ago", badge: "USER" }
    ];

    // Listen to real-time events from Traveller / Planner portals
    if (window.BeaconSync) {
      window.BeaconSync.on('PLANNER_REMINDER', (data) => {
        this.addLiveMonitoringItem(`Traveller ${data.travellerName} is customizing "${data.packageName}" (${data.guestsCount} guests, ${data.mealPreference || 'Custom'} meals)`, 'CUSTOMIZE');
      });

      window.BeaconSync.on('PAYMENT_CLAIM_RECEIVED', (data) => {
        this.addLiveMonitoringItem(`UPI Payment Submitted: ${data.amount} for ${data.packageName} (UTR: ${data.utrId})`, 'UTR PAYMENT');
        this.showToast(`💳 New UPI Payment Claim: ${data.amount} for #${data.bookingId}`, 'info');
      });

      window.BeaconSync.on('PAYMENT_VERIFIED', (data) => {
        this.addLiveMonitoringItem(`Payment Verified by ${data.plannerName} for Booking #${data.bookingId}`, 'VERIFIED');
        this.showToast(`✅ Payment verified for Booking #${data.bookingId}`, 'success');
      });

      window.BeaconSync.on('ATTENDANCE_MARKED', (data) => {
        this.addLiveMonitoringItem(`Day ${data.dayNum} Attendance Verified: ${data.travellerName} at destination`, 'CHECK-IN');
      });
    }

    let eventIdx = 0;
    this.liveActivityTimer = setInterval(() => {
      if (simulatedEvents[eventIdx]) {
        const ev = simulatedEvents[eventIdx];
        this.addLiveMonitoringItem(ev.text, ev.badge, ev.time);
        eventIdx = (eventIdx + 1) % simulatedEvents.length;
      }
    }, 14000);
  }

  addLiveMonitoringItem(text, badge = 'EVENT', time = 'Just now') {
    const feedEl = document.getElementById('live-activity-stream-list');
    if (feedEl) {
      const item = document.createElement('div');
      item.className = 'activity-item-stream';
      item.style.cssText = "display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05); animation:fadeIn 0.4s ease;";
      item.innerHTML = `
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="status-pill active" style="font-size:10px;">${badge}</span>
          <span style="font-size:12.5px; color:#E2E8F0;">${text}</span>
        </div>
        <span style="font-size:11px; color:#64748B; font-family:var(--font-mono);">${time}</span>
      `;
      feedEl.prepend(item);
      if (feedEl.children.length > 7) feedEl.lastElementChild.remove();
    }
  }

  // RENDER APP ENTRY
  render() {
    const appRoot = document.getElementById('master-app-root');
    if (!appRoot) return;

    const session = masterSecurity.getCurrentSession();

    // If not authenticated and route is not login, force login
    if (!session && this.currentRoute !== 'login') {
      this.renderLoginPage(appRoot);
      return;
    }

    if (this.currentRoute === 'login') {
      this.renderLoginPage(appRoot);
      return;
    }

    // Authenticated Shell
    this.renderAppShell(appRoot, session);
  }

  // =========================================================================
  // 1. MASTER LOGIN VIEW (/master/login)
  // =========================================================================
  renderLoginPage(root) {
    const lockout = masterSecurity.getLockoutStatus();
    const deviceReputation = masterSecurity.checkDeviceReputation();

    root.innerHTML = `
      <div class="master-login-layout">
        <!-- Left Hero Panel -->
        <div class="login-hero-panel">
          <div class="login-hero-content">
            <a href="#" class="login-brand-logo">
              <img src="/Beacon-%20Logo.png" alt="Beacon Logo" onerror="this.src='https://via.placeholder.com/44x44/00CBD4/070B14?text=B'">
              <div class="login-brand-text">
                BEACON
                <span>MASTER CONTROL</span>
              </div>
            </a>
          </div>

          <div class="login-hero-headline">
            <h1>Navigate the world.<br><span class="cyan-glow-text">Manage the journey.</span></h1>
            <p>One secure, intelligent command center governing travellers, planners, bespoke itineraries, escrow finances, and system telemetry across the Beacon ecosystem.</p>
          </div>

          <div class="login-hero-telemetry">
            <div class="telemetry-item">
              <span class="value">12,482</span>
              <span class="label">Travellers</span>
            </div>
            <div class="telemetry-item" style="border-left: 1px solid var(--border-subtle); padding-left: 20px;">
              <span class="value">1,284</span>
              <span class="label">Planners</span>
            </div>
            <div class="telemetry-item" style="border-left: 1px solid var(--border-subtle); padding-left: 20px;">
              <span class="value">₹48.6L</span>
              <span class="label">Gross GMV</span>
            </div>
            <div class="telemetry-item" style="border-left: 1px solid var(--border-subtle); padding-left: 20px;">
              <span class="value" style="color: var(--beacon-green);">99.98%</span>
              <span class="label">System Health</span>
            </div>
          </div>
        </div>

        <!-- Right Authentication Panel -->
        <div class="login-auth-panel">
          <div class="login-auth-card" id="auth-card-container">
            ${this.getLoginFormHtml(lockout, deviceReputation)}
          </div>
        </div>
      </div>
    `;

    this.attachLoginEventListeners();
  }

  getLoginFormHtml(lockout, deviceReputation) {
    return `
      <div class="auth-header">
        <span class="auth-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Master Administrator Access
        </span>
        <h2>Sign In to Beacon Master</h2>
        <p>Enter your administrative credentials to access command controls.</p>
      </div>

      ${deviceReputation.isNewDevice ? `
        <div class="security-alert-box warning">
          <span style="font-size:18px;">🛡️</span>
          <div>
            <strong>New Device Detected</strong><br>
            IP: ${deviceReputation.deviceInfo.ip} (${deviceReputation.deviceInfo.approxLocation}). MFA verification required.
          </div>
        </div>
      ` : ''}

      ${lockout.isLocked ? `
        <div class="security-alert-box danger">
          <span style="font-size:18px;">🔒</span>
          <div>
            <strong>Account Temporarily Locked</strong><br>
            Security lockout active. Please wait ${Math.ceil(lockout.remainingSeconds / 60)} minutes before trying again.
          </div>
        </div>
      ` : ''}

      <form id="master-login-form">
        <div class="form-group">
          <label>Administrator Email / ID</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <input type="email" id="login-email" class="form-control" placeholder="master@beacon.travel" value="master@beacon.travel" required ${lockout.isLocked ? 'disabled' : ''}>
          </div>
        </div>

        <div class="form-group">
          <label>Master Security Key</label>
          <div class="input-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••••••" value="BeaconMaster2026!" required ${lockout.isLocked ? 'disabled' : ''}>
          </div>
        </div>

        <div class="form-extra-row">
          <label class="checkbox-label">
            <input type="checkbox" id="remember-device" checked>
            <span>Remember this device</span>
          </label>
          <a href="#" id="btn-forgot-credentials" class="forgot-link">Reset Key</a>
        </div>

        <button type="submit" class="btn-primary-master" id="btn-submit-login" ${lockout.isLocked ? 'disabled' : ''}>
          <span>Authenticate & Proceed to 2FA</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </form>

      <div class="security-seal-footer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>End-to-End Encrypted Session · ISO/IEC 27001 Certified Vault</span>
      </div>
    `;
  }

  attachLoginEventListeners() {
    const form = document.getElementById('master-login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const rememberDevice = document.getElementById('remember-device').checked;

      const authRes = masterSecurity.validateMasterCredentials(email, password);

      if (!authRes.success) {
        this.showToast(authRes.error, 'danger');
        this.render();
        return;
      }

      // Step 2: Show MFA / 2FA Verification Screen
      this.renderMfaScreen(authRes.pendingUser, rememberDevice);
    });

    const forgotBtn = document.getElementById('btn-forgot-credentials');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Master Administrator recovery requires hardware token or direct super-admin console reset. Security link dispatched to master backup recovery email.');
      });
    }
  }

  // 2FA / MFA Verification Screen
  renderMfaScreen(pendingUser, rememberDevice) {
    const container = document.getElementById('auth-card-container');
    if (!container) return;

    container.innerHTML = `
      <div class="auth-header">
        <span class="auth-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--beacon-green); border-color: rgba(16, 185, 129, 0.3);">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Password Verified
        </span>
        <h2>Two-Factor Verification</h2>
        <p>Enter the 6-digit security code generated by your Authenticator App or SMS for <strong>${pendingUser.emailMasked}</strong>.</p>
      </div>

      <div class="security-alert-box info">
        <span style="font-size:16px;">🔑</span>
        <div>Demo Key: Enter <strong>123456</strong> or your TOTP code to enter the command center.</div>
      </div>

      <form id="mfa-verify-form">
        <div class="otp-container">
          <input type="text" maxlength="1" class="otp-box" autofocus required>
          <input type="text" maxlength="1" class="otp-box" required>
          <input type="text" maxlength="1" class="otp-box" required>
          <input type="text" maxlength="1" class="otp-box" required>
          <input type="text" maxlength="1" class="otp-box" required>
          <input type="text" maxlength="1" class="otp-box" required>
        </div>

        <div class="resend-countdown-wrap">
          Didn't receive code? <button type="button" class="resend-btn" id="btn-resend-otp">Resend OTP via SMS</button>
        </div>

        <button type="submit" class="btn-primary-master" id="btn-confirm-mfa">
          <span>Authorize Master Session</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>

        <button type="button" class="btn-secondary-master" id="btn-back-to-login" style="width:100%; justify-content:center; margin-top:12px;">
          <span>Back to Credentials</span>
        </button>
      </form>
    `;

    // Handle OTP Box auto-focus progression
    const otpBoxes = container.querySelectorAll('.otp-box');
    otpBoxes.forEach((box, idx) => {
      box.addEventListener('input', (e) => {
        if (e.target.value.length === 1 && idx < otpBoxes.length - 1) {
          otpBoxes[idx + 1].focus();
        }
      });
      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && idx > 0) {
          otpBoxes[idx - 1].focus();
        }
      });
    });

    // Auto-fill demo OTP on paste
    otpBoxes[0].addEventListener('paste', (e) => {
      const pasteData = e.clipboardData.getData('text').trim();
      if (pasteData.length === 6) {
        pasteData.split('').forEach((char, i) => {
          if (otpBoxes[i]) otpBoxes[i].value = char;
        });
        otpBoxes[5].focus();
      }
    });

    // Handle MFA Submission
    document.getElementById('mfa-verify-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const code = Array.from(otpBoxes).map(b => b.value).join('');
      const verifyRes = masterSecurity.verifyMfaCode(code || '123456');

      if (!verifyRes.success) {
        this.showToast(verifyRes.error, 'danger');
        return;
      }

      // Establish secure session
      masterSecurity.createSession(pendingUser, rememberDevice);
      this.showToast("Authenticated as Master Administrator. Command Center active.", 'success');
      this.navigateTo('dashboard');
    });

    document.getElementById('btn-back-to-login').addEventListener('click', () => {
      this.render();
    });

    document.getElementById('btn-resend-otp').addEventListener('click', () => {
      this.showToast("New 6-digit OTP code dispatched to registered mobile number.", 'info');
    });
  }

  // =========================================================================
  // 2. MASTER APP SHELL (Sidebar, Topbar & Dynamic Route Views)
  // =========================================================================
  renderAppShell(root, session) {
    const activeRoute = this.currentRoute;

    root.innerHTML = `
      <div class="master-app-shell">
        <!-- Sidebar Navigation -->
        <aside class="master-sidebar" id="master-sidebar">
          <div class="sidebar-brand-head">
            <a href="#dashboard" class="sidebar-logo">
              <img src="/Beacon-%20Logo.png" alt="Beacon" onerror="this.src='https://via.placeholder.com/32x32/00CBD4/070B14?text=B'">
              <div class="sidebar-logo-text">
                BEACON
                <span>MASTER CONTROL</span>
              </div>
            </a>
          </div>

          <div class="sidebar-nav">
            <!-- Overview -->
            <div>
              <div class="nav-group-title">Overview</div>
              <a href="#dashboard" class="nav-item-link ${activeRoute === 'dashboard' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>Command Dashboard</span>
              </a>
            </div>

            <!-- People -->
            <div>
              <div class="nav-group-title">People & Roles</div>
              <a href="#users" class="nav-item-link ${activeRoute === 'users' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span>All Users</span>
                <span class="nav-item-badge badge-cyan">${this.data.stats.totalTravellers + this.data.stats.totalPlanners}</span>
              </a>
              <a href="#travellers" class="nav-item-link ${activeRoute === 'travellers' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Travellers</span>
              </a>
              <a href="#planners" class="nav-item-link ${activeRoute === 'planners' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span>Trip Planners</span>
                <span class="nav-item-badge badge-cyan">${this.data.stats.totalPlanners}</span>
              </a>
              <a href="#verifications" class="nav-item-link ${activeRoute === 'verifications' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>KYC Verifications</span>
                <span class="nav-item-badge badge-amber">${this.data.stats.pendingVerifications}</span>
              </a>
              <a href="#admins" class="nav-item-link ${activeRoute === 'admins' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                <span>Admin RBAC</span>
              </a>
            </div>

            <!-- Travel -->
            <div>
              <div class="nav-group-title">Travel Ecosystem</div>
              <a href="#trips" class="nav-item-link ${activeRoute === 'trips' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                <span>Trips & Itineraries</span>
                <span class="nav-item-badge badge-cyan">${this.data.stats.activeTrips}</span>
              </a>
              <a href="#destinations" class="nav-item-link ${activeRoute === 'destinations' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Destinations</span>
              </a>
              <a href="#experiences" class="nav-item-link ${activeRoute === 'experiences' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <span>Experiences</span>
              </a>
            </div>

            <!-- Commerce -->
            <div>
              <div class="nav-group-title">Commerce & Escrow</div>
              <a href="#bookings" class="nav-item-link ${activeRoute === 'bookings' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Bookings</span>
                <span class="nav-item-badge badge-green">${this.data.stats.totalBookings}</span>
              </a>
              <a href="#payments" class="nav-item-link ${activeRoute === 'payments' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <span>Financial Ledger</span>
              </a>
            </div>

            <!-- Operations -->
            <div>
              <div class="nav-group-title">Operations & Safety</div>
              <a href="#support" class="nav-item-link ${activeRoute === 'support' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span>Support & SOS</span>
                <span class="nav-item-badge badge-red">${this.data.stats.openSupportTickets}</span>
              </a>
              <a href="#moderation" class="nav-item-link ${activeRoute === 'moderation' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                <span>Moderation</span>
              </a>
              <a href="#notifications" class="nav-item-link ${activeRoute === 'notifications' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span>Broadcasts</span>
              </a>
            </div>

            <!-- Intelligence & System -->
            <div>
              <div class="nav-group-title">Intelligence & Governance</div>
              <a href="#analytics" class="nav-item-link ${activeRoute === 'analytics' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                <span>Analytics & Maps</span>
              </a>
              <a href="#audit-logs" class="nav-item-link ${activeRoute === 'audit-logs' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <span>Immutable Audit Log</span>
              </a>
              <a href="#system-health" class="nav-item-link ${activeRoute === 'system-health' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                <span>System Health</span>
              </a>
              <a href="#settings" class="nav-item-link ${activeRoute === 'settings' ? 'active' : ''}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                <span>Platform Settings</span>
              </a>
            </div>
          </div>

          <!-- Sidebar Footer Admin -->
          <div class="sidebar-footer">
            <div class="admin-mini-profile">
              <img src="${session.user.avatar}" alt="${session.user.name}" class="admin-mini-avatar">
              <div class="admin-mini-info">
                <div class="admin-mini-name">${session.user.name}</div>
                <div class="admin-mini-role">${session.user.role}</div>
              </div>
              <button class="btn-sidebar-logout" id="btn-logout" title="Sign Out">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Workspace -->
        <div class="master-main-wrapper">
          <!-- Topbar -->
          <header class="master-topbar">
            <div class="global-search-trigger" id="btn-trigger-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <span>Search Beacon ecosystem...</span>
              <kbd>Ctrl K</kbd>
            </div>

            <div class="topbar-right-actions">
              <div class="system-status-indicator">
                <span class="live-beacon-pulse"></span>
                <span>Operational</span>
              </div>

              <button class="topbar-btn" id="btn-notification-bell" title="System Notifications">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <span class="topbar-badge-dot"></span>
              </button>

              <button class="topbar-btn" id="btn-quick-sos-modal" title="Emergency Travel SOS" style="border-color: rgba(239,68,68,0.4); color: var(--beacon-red);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </button>
            </div>
          </header>

          <!-- Dynamic View Body -->
          <main class="master-content-body" id="master-view-container">
            ${this.getDynamicViewContent(activeRoute, session)}
          </main>
        </div>
      </div>

      <!-- Modals and Drawers Container -->
      <div id="master-modal-root"></div>
    `;

    this.attachShellEventListeners();
    this.postRenderView(activeRoute);
  }

  attachShellEventListeners() {
    document.getElementById('btn-logout')?.addEventListener('click', () => {
      this.openLogoutConfirmation();
    });

    document.getElementById('btn-trigger-search')?.addEventListener('click', () => {
      this.openCommandPalette();
    });

    document.getElementById('btn-notification-bell')?.addEventListener('click', () => {
      this.openNotificationsDrawer();
    });

    document.getElementById('btn-quick-sos-modal')?.addEventListener('click', () => {
      this.navigateTo('support');
      this.showToast("Emergency Support & SOS queue active.", 'info');
    });

    document.querySelector('.system-status-indicator')?.addEventListener('click', () => {
      this.navigateTo('system-health');
      this.showToast("System Telemetry & Live Sparklines Active.", 'info');
    });
  }

  // Route Dispatcher
  getDynamicViewContent(route, session) {
    switch (route) {
      case 'dashboard':
        return this.getDashboardViewHtml(session);
      case 'users':
      case 'travellers':
        return this.getUsersViewHtml(route);
      case 'planners':
        return this.getPlannersViewHtml();
      case 'verifications':
        return this.getVerificationsViewHtml();
      case 'trips':
        return this.getTripsViewHtml();
      case 'destinations':
        return this.getDestinationsViewHtml();
      case 'experiences':
        return this.getExperiencesViewHtml();
      case 'bookings':
        return this.getBookingsViewHtml();
      case 'payments':
        return this.getPaymentsViewHtml();
      case 'support':
        return this.getSupportViewHtml();
      case 'moderation':
        return this.getModerationViewHtml();
      case 'notifications':
        return this.getNotificationsViewHtml();
      case 'analytics':
        return this.getAnalyticsViewHtml();
      case 'audit-logs':
        return this.getAuditLogsViewHtml();
      case 'system-health':
        return this.getSystemHealthViewHtml();
      case 'admins':
        return this.getAdminsViewHtml();
      case 'settings':
        return this.getSettingsViewHtml();
      default:
        return this.getDashboardViewHtml(session);
    }
  }

  postRenderView(route) {
    if (route === 'dashboard') {
      MasterCharts.renderRevenueChart('chart-gmv-revenue');
      MasterCharts.renderDestinationShareChart('chart-dest-share');
    } else if (route === 'analytics') {
      MasterCharts.renderRevenueChart('chart-analytics-revenue');
      MasterCharts.renderGeographicMap('chart-geo-world-map', (destId) => {
        this.openDestinationDetail(destId);
      });
    } else if (route === 'system-health') {
      MasterCharts.renderLatencySparkline('canvas-latency-sparkline');
    }
  }

  // =========================================================================
  // 3. DASHBOARD VIEW (/master/dashboard)
  // =========================================================================
  getDashboardViewHtml(session) {
    const s = this.data.stats;
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Good morning, ${session.user.name}</h1>
          <p>Here is what is happening across the Beacon travel ecosystem today.</p>
        </div>
        <div class="page-actions-group">
          <button class="btn-secondary-master" onclick="window.masterApp.openExportModal('Executive KPI Summary')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Export Report</span>
          </button>
          <button class="btn-primary-master" style="width: auto; padding: 10px 18px;" onclick="window.masterApp.navigateTo('verifications')">
            <span>Review Verifications (${s.pendingVerifications})</span>
          </button>
        </div>
      </div>

      <!-- 8 Executive KPI Cards -->
      <div class="kpi-grid-master">
        <!-- Travellers -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Total Travellers</span>
            <div class="kpi-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
          </div>
          <div class="kpi-value">${s.totalTravellers.toLocaleString()}</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${s.travellersGrowth}%</span>
            <span class="trend-period">vs last month</span>
          </div>
        </div>

        <!-- Planners -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Verified Planners</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-purple); background: rgba(139,92,246,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
          </div>
          <div class="kpi-value">${s.totalPlanners.toLocaleString()}</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${s.plannersGrowth}%</span>
            <span class="trend-period">active organizers</span>
          </div>
        </div>

        <!-- Active Trips -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Active Trips</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-blue); background: rgba(2,132,199,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
            </div>
          </div>
          <div class="kpi-value">${s.activeTrips.toLocaleString()}</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${s.tripsGrowth}%</span>
            <span class="trend-period">in progress worldwide</span>
          </div>
        </div>

        <!-- Total Bookings -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Total Bookings</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-green); background: rgba(16,185,129,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
          </div>
          <div class="kpi-value">${s.totalBookings.toLocaleString()}</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${s.bookingsGrowth}%</span>
            <span class="trend-period">converted itineraries</span>
          </div>
        </div>

        <!-- Gross GMV -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Gross Booking Value</span>
            <div class="kpi-icon-wrap" style="color: #38BDF8; background: rgba(56,189,248,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
          </div>
          <div class="kpi-value">₹48.60L</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${s.gbvGrowth}%</span>
            <span class="trend-period">₹48,60,000 GMV</span>
          </div>
        </div>

        <!-- Net Platform Revenue -->
        <div class="kpi-card-master">
          <div class="kpi-top-row">
            <span class="kpi-label">Platform Take (14%)</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-green); background: rgba(16,185,129,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
          </div>
          <div class="kpi-value">₹6.80L</div>
          <div class="kpi-bottom-row">
            <span class="trend-badge up">↑ ${s.revenueGrowth}%</span>
            <span class="trend-period">net platform commission</span>
          </div>
        </div>

        <!-- Pending Verifications -->
        <div class="kpi-card-master" style="border-color: rgba(245,158,11,0.3);">
          <div class="kpi-top-row">
            <span class="kpi-label">Pending KYC Vault</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-amber); background: rgba(245,158,11,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
          </div>
          <div class="kpi-value" style="color: var(--beacon-amber);">${s.pendingVerifications}</div>
          <div class="kpi-bottom-row">
            <span class="status-pill pending" style="font-size: 10px;">Action Required</span>
            <span class="trend-period">3 submitted today</span>
          </div>
        </div>

        <!-- Open Support / SOS -->
        <div class="kpi-card-master" style="border-color: rgba(239,68,68,0.3);">
          <div class="kpi-top-row">
            <span class="kpi-label">Open SOS & Support</span>
            <div class="kpi-icon-wrap" style="color: var(--beacon-red); background: rgba(239,68,68,0.1);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
          </div>
          <div class="kpi-value" style="color: var(--beacon-red);">${s.openSupportTickets}</div>
          <div class="kpi-bottom-row">
            <span class="status-pill suspended" style="font-size: 10px;">1 Urgent SOS</span>
            <span class="trend-period">Srinagar Pickup</span>
          </div>
        </div>
      </div>

      <!-- Travel Ecosystem Flow Architecture -->
      <div class="ecosystem-graph-card">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <div>
            <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Beacon Travel Ecosystem Flow Architecture</h3>
            <p style="font-size:12px; color:var(--text-muted);">Real-time relationship pipeline connecting demand, bespoke planning, curation, escrow settlements, and traveller feedback.</p>
          </div>
          <span class="status-pill active">🟢 Live Telemetry Stream</span>
        </div>

        <div class="ecosystem-nodes-flow">
          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(0,203,212,0.1); color: var(--beacon-cyan);">👤</div>
            <div class="eco-node-title">Travellers</div>
            <div class="eco-node-count">12,482 Profiles</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(2,132,199,0.1); color: var(--beacon-blue);">🗺️</div>
            <div class="eco-node-title">Custom Trips</div>
            <div class="eco-node-count">3,846 Active</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(139,92,246,0.1); color: var(--beacon-purple);">🎖️</div>
            <div class="eco-node-title">Local Planners</div>
            <div class="eco-node-count">1,284 Verified</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(245,158,11,0.1); color: var(--beacon-amber);">✨</div>
            <div class="eco-node-title">Experiences</div>
            <div class="eco-node-count">840 Curated</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(16,185,129,0.1); color: var(--beacon-green);">💳</div>
            <div class="eco-node-title">Escrow Payments</div>
            <div class="eco-node-count">₹48.6L Secured</div>
          </div>
          <div class="eco-arrow">➔</div>

          <div class="eco-node">
            <div class="eco-node-icon" style="background: rgba(236,72,153,0.1); color: #EC4899;">⭐</div>
            <div class="eco-node-title">Reviews & Trust</div>
            <div class="eco-node-count">4.92 / 5.0 Avg</div>
          </div>
        </div>
      </div>

      <!-- Charts & Live Feed Section -->
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 30px;">
        <!-- Left: Revenue & GMV Chart -->
        <div class="table-card-master" style="padding: 24px; margin-bottom: 0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div>
              <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Gross Booking Value (GMV) vs Net Platform Revenue</h3>
              <p style="font-size:12px; color:var(--text-muted);">Monthly financial trajectory in Indian Rupees (Lakhs).</p>
            </div>
            <div style="display:flex; gap:12px; font-size:11px;">
              <span style="display:flex; align-items:center; gap:6px; color:var(--beacon-cyan); font-weight:600;"><span style="width:8px; height:8px; border-radius:50%; background:var(--beacon-cyan);"></span> Gross GMV</span>
              <span style="display:flex; align-items:center; gap:6px; color:var(--beacon-green); font-weight:600;"><span style="width:8px; height:8px; border-radius:50%; background:var(--beacon-green);"></span> Net Take (14%)</span>
            </div>
          </div>
          <div id="chart-gmv-revenue" style="height: 220px; width: 100%;"></div>
        </div>

        <!-- Right: Destination Market Share -->
        <div class="table-card-master" style="padding: 24px; margin-bottom: 0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div>
              <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Top Travel Hubs</h3>
              <p style="font-size:12px; color:var(--text-muted);">Active itinerary density by destination.</p>
            </div>
          </div>
          <div id="chart-dest-share"></div>
        </div>
      </div>

      <!-- Live Activity Stream & Recent Trips Grid -->
      <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 24px;">
        <!-- Live Real-Time Feed -->
        <div class="table-card-master" style="padding: 24px; margin-bottom: 0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
            <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Real-Time Beacon Activity Feed</h3>
            <span class="status-pill active" style="font-size:10px;">Live WebSockets</span>
          </div>
          <div id="live-activity-stream-list" style="display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="status-pill active" style="font-size:10px;">TRIP</span>
                <span style="font-size:12.5px; color:#E2E8F0;">Aarav Mehta confirmed booking for Kashmir Ski Expedition</span>
              </div>
              <span style="font-size:11px; color:#64748B; font-family:var(--font-mono);">10 mins ago</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="status-pill pending" style="font-size:10px;">KYC</span>
                <span style="font-size:12.5px; color:#E2E8F0;">Karan Deshmukh submitted Maharashtra Tourism Operator License</span>
              </div>
              <span style="font-size:11px; color:#64748B; font-family:var(--font-mono);">3 hours ago</span>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="status-pill active" style="font-size:10px;">PAYMENT</span>
                <span style="font-size:12.5px; color:#E2E8F0;">₹1,45,000 Escrow lock confirmed via Razorpay for #BK-8291</span>
              </div>
              <span style="font-size:11px; color:#64748B; font-family:var(--font-mono);">5 hours ago</span>
            </div>
          </div>
        </div>

        <!-- Quick Action Shortcuts -->
        <div class="table-card-master" style="padding: 24px; margin-bottom: 0;">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF; margin-bottom:16px;">Master Command Shortcuts</h3>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button class="btn-secondary-master" style="justify-content: flex-start; padding: 14px;" onclick="window.masterApp.navigateTo('verifications')">
              <span style="font-size:18px;">📄</span>
              <div style="text-align: left;">
                <div style="font-weight: 700; color: #FFF; font-size: 13px;">Approve KYC</div>
                <div style="font-size: 11px; color: var(--text-muted);">37 Pending Vault</div>
              </div>
            </button>

            <button class="btn-secondary-master" style="justify-content: flex-start; padding: 14px;" onclick="window.masterApp.navigateTo('trips')">
              <span style="font-size:18px;">✈️</span>
              <div style="text-align: left;">
                <div style="font-weight: 700; color: #FFF; font-size: 13px;">Inspect Trips</div>
                <div style="font-size: 11px; color: var(--text-muted);">3,846 Active</div>
              </div>
            </button>

            <button class="btn-secondary-master" style="justify-content: flex-start; padding: 14px;" onclick="window.masterApp.navigateTo('payments')">
              <span style="font-size:18px;">💰</span>
              <div style="text-align: left;">
                <div style="font-weight: 700; color: #FFF; font-size: 13px;">Disburse Escrow</div>
                <div style="font-size: 11px; color: var(--text-muted);">Weekly Monday Batch</div>
              </div>
            </button>

            <button class="btn-secondary-master" style="justify-content: flex-start; padding: 14px;" onclick="window.masterApp.navigateTo('system-health')">
              <span style="font-size:18px;">⚡</span>
              <div style="text-align: left;">
                <div style="font-weight: 700; color: #FFF; font-size: 13px;">System Health</div>
                <div style="font-size: 11px; color: var(--beacon-green);">99.98% Latency 38ms</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 4. USERS & TRAVELLER MANAGEMENT (/master/users & /master/travellers)
  // =========================================================================
  getUsersViewHtml(routeMode) {
    const isTravellerOnly = routeMode === 'travellers';
    const users = this.data.users.filter(u => {
      if (isTravellerOnly) return u.type === 'TRAVELLER';
      if (this.selectedTab === 'travellers') return u.type === 'TRAVELLER';
      if (this.selectedTab === 'planners') return u.type === 'PLANNER';
      if (this.selectedTab === 'admins') return u.type === 'ADMIN';
      if (this.selectedTab === 'suspended') return u.status === 'SUSPENDED';
      if (this.selectedTab === 'pending') return u.verificationStatus === 'PENDING';
      return true;
    }).filter(u => {
      if (!this.searchQuery) return true;
      const q = this.searchQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
    });

    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>${isTravellerOnly ? 'Traveller Intelligence & Profiles' : 'Master User Management'}</h1>
          <p>Supervise travellers, planners, administrators, status governance, and granular dossiers.</p>
        </div>
        <div class="page-actions-group">
          <button class="btn-secondary-master" onclick="window.masterApp.openExportModal('Users Directory')">Export CSV</button>
        </div>
      </div>

      <div class="table-card-master">
        <div class="table-header-controls">
          ${!isTravellerOnly ? `
            <div class="table-tabs-nav">
              <button class="tab-btn ${this.selectedTab === 'all' ? 'active' : ''}" onclick="window.masterApp.setUserTab('all')">All Users (${this.data.users.length})</button>
              <button class="tab-btn ${this.selectedTab === 'travellers' ? 'active' : ''}" onclick="window.masterApp.setUserTab('travellers')">Travellers</button>
              <button class="tab-btn ${this.selectedTab === 'planners' ? 'active' : ''}" onclick="window.masterApp.setUserTab('planners')">Planners</button>
              <button class="tab-btn ${this.selectedTab === 'admins' ? 'active' : ''}" onclick="window.masterApp.setUserTab('admins')">Admins</button>
              <button class="tab-btn ${this.selectedTab === 'suspended' ? 'active' : ''}" onclick="window.masterApp.setUserTab('suspended')">Suspended</button>
            </div>
          ` : '<div></div>'}

          <input type="text" class="table-search-input" placeholder="Search by name, email, user ID..." value="${this.searchQuery}" oninput="window.masterApp.handleSearch(this.value)">
        </div>

        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>User / Identity</th>
                <th>Role / Type</th>
                <th>Status</th>
                <th>Verification</th>
                <th>Location</th>
                <th>Trips / Volume</th>
                <th>Last Active</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td>
                    <div class="user-cell-wrap">
                      <img src="${u.avatar}" alt="${u.name}" class="user-cell-avatar">
                      <div>
                        <div class="user-cell-name">${u.name}</div>
                        <div class="user-cell-email">${u.email} · ${u.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="status-pill ${u.type === 'PLANNER' ? 'badge-purple' : u.type === 'ADMIN' ? 'badge-green' : 'badge-cyan'}">
                      ${u.type}
                    </span>
                  </td>
                  <td>
                    <span class="status-pill ${u.status.toLowerCase()}">
                      ${u.status}
                    </span>
                  </td>
                  <td>
                    <span class="status-pill ${u.verificationStatus.toLowerCase()}">
                      ${u.verificationStatus === 'VERIFIED' ? '✓ Verified' : 'Pending KYC'}
                    </span>
                  </td>
                  <td>${u.location || 'India'}</td>
                  <td><strong>${u.tripsCount || 0}</strong> trips ${u.totalSpent ? `(${u.totalSpent})` : u.totalEarned ? `(${u.totalEarned})` : ''}</td>
                  <td>${u.lastActive}</td>
                  <td style="text-align: right;">
                    <div class="action-btn-group" style="justify-content: flex-end;">
                      <button class="btn-action-icon" title="View Dossier" onclick="window.masterApp.openUserDossier('${u.id}')">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      ${u.status === 'ACTIVE' ? `
                        <button class="btn-action-icon danger" title="Suspend User" onclick="window.masterApp.openDangerousActionModal('SUSPEND_USER', '${u.id}', '${u.name}')">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                        </button>
                      ` : `
                        <button class="btn-action-icon" title="Reactivate Account" onclick="window.masterApp.reactivateUser('${u.id}')" style="color: var(--beacon-green);">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                      `}
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 5. PLANNER MANAGEMENT (/master/planners)
  // =========================================================================
  getPlannersViewHtml() {
    const planners = this.data.users.filter(u => u.type === 'PLANNER');

    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Trip Planner Management & Governance</h1>
          <p>Oversee verified tour organizers, Gold/Silver tier badges, commissions, response rates, and KYC compliance.</p>
        </div>
        <div class="page-actions-group">
          <button class="btn-primary-master" style="width:auto;" onclick="window.masterApp.navigateTo('verifications')">
            <span>Pending Approvals (${this.data.verifications.length})</span>
          </button>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Planner / Business</th>
                <th>Specialization</th>
                <th>Rating & Reviews</th>
                <th>Trips Organized</th>
                <th>Total Earned</th>
                <th>SLA Response</th>
                <th>Status</th>
                <th style="text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${planners.map(p => `
                <tr>
                  <td>
                    <div class="user-cell-wrap">
                      <img src="${p.avatar}" alt="${p.name}" class="user-cell-avatar">
                      <div>
                        <div class="user-cell-name">${p.name}</div>
                        <div class="user-cell-email">${p.location} · <span style="color:var(--beacon-cyan);">${p.plannerBadge || 'Planner'}</span></div>
                      </div>
                    </div>
                  </td>
                  <td>${(p.specialization || ['Custom Tours']).slice(0, 2).join(', ')}</td>
                  <td>⭐ <strong>${p.rating || 'New'}</strong> (${p.reviewsCount || 0})</td>
                  <td><strong>${p.tripsCount || 0}</strong> completed</td>
                  <td style="color: var(--beacon-green); font-weight:700;">${p.totalEarned || '₹0'}</td>
                  <td><span class="status-pill active">${p.responseRate || '100%'}</span></td>
                  <td><span class="status-pill ${p.status.toLowerCase()}">${p.status}</span></td>
                  <td style="text-align: right;">
                    <div class="action-btn-group" style="justify-content: flex-end;">
                      <button class="btn-secondary-master" style="padding: 6px 12px; font-size:11px;" onclick="window.masterApp.openPlannerDossier('${p.id}')">
                        Inspect Profile
                      </button>
                      <button class="btn-action-icon danger" title="Suspend Planner" onclick="window.masterApp.openDangerousActionModal('SUSPEND_PLANNER', '${p.id}', '${p.name}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 6. KYC & VERIFICATIONS CENTER (/master/verifications)
  // =========================================================================
  getVerificationsViewHtml() {
    // If a specific planner is selected for scrutiny, render the Document Scrutiny Dossier
    if (this.activeScrutinyPlannerId) {
      return this.getPlannerScrutinyDossierHtml(this.activeScrutinyPlannerId);
    }

    // Otherwise, render Step 1: Planners Submission Queue (List View First)
    return this.getPlannersVerificationQueueHtml();
  }

  // STEP 1: PLANNERS SUBMISSION QUEUE (LIST VIEW FIRST)
  getPlannersVerificationQueueHtml() {
    let totalPlanners = this.data.verifications.length;
    let pendingPlanners = 0;
    let verifiedPlanners = 0;
    let rejectedPlanners = 0;
    let totalDocs = 0;

    this.data.verifications.forEach(v => {
      totalDocs += (v.documents || []).length;
      if (v.status === 'VERIFIED') verifiedPlanners++;
      else if (v.status === 'REJECTED' || (v.documents || []).some(d => d.status === 'REJECTED')) rejectedPlanners++;
      else pendingPlanners++;
    });

    const activeFilter = this.selectedQueueFilter || 'ALL';
    const query = (this.searchQuery || '').toLowerCase();

    const filteredQueue = this.data.verifications.filter(v => {
      const nameMatch = v.applicantName.toLowerCase().includes(query) || v.applicantId.toLowerCase().includes(query) || (v.location || '').toLowerCase().includes(query);
      const isRejected = v.status === 'REJECTED' || (v.documents || []).some(d => d.status === 'REJECTED');

      if (activeFilter === 'PENDING') return v.status === 'PENDING' && !isRejected;
      if (activeFilter === 'VERIFIED') return v.status === 'VERIFIED';
      if (activeFilter === 'REJECTED') return isRejected;
      return nameMatch;
    });

    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Identity & Business KYC Verification Vault</h1>
          <p>Planner Verification Queue: Inspect submitted credentials, review PDF documents, and grant package planning authorization.</p>
        </div>
        <div class="page-actions-group">
          <button class="btn-secondary-master" onclick="window.masterApp.simulatePlannerUpload()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>+ Simulate New Planner Submission</span>
          </button>
          <button class="btn-primary-master" style="width: auto; padding: 10px 18px;" onclick="window.masterApp.openExportModal('KYC Planners Queue')">
            <span>Export Verification Audit</span>
          </button>
        </div>
      </div>

      <!-- Vault Metric Telemetry Cards -->
      <div class="kyc-vault-header-stats">
        <div class="kyc-stat-box">
          <span class="kyc-stat-label">Total Planner Submissions</span>
          <div class="kyc-stat-val">${totalPlanners} <span style="font-size: 13px; font-weight: normal; color: var(--text-muted);">${totalDocs} Documents</span></div>
        </div>
        <div class="kyc-stat-box" style="border-color: rgba(245,158,11,0.3);">
          <span class="kyc-stat-label">Pending Document Scrutiny</span>
          <div class="kyc-stat-val" style="color: var(--beacon-amber);">${pendingPlanners} <span style="font-size: 13px; font-weight: normal; color: var(--text-muted);">Awaiting Review</span></div>
        </div>
        <div class="kyc-stat-box" style="border-color: rgba(239,68,68,0.3);">
          <span class="kyc-stat-label">Rejections / Action Required</span>
          <div class="kyc-stat-val" style="color: var(--beacon-red);">${rejectedPlanners} <span style="font-size: 13px; font-weight: normal; color: var(--text-muted);">Re-upload Dispatched</span></div>
        </div>
        <div class="kyc-stat-box" style="border-color: rgba(16,185,129,0.3);">
          <span class="kyc-stat-label">Fully Authorized & Verified</span>
          <div class="kyc-stat-val" style="color: var(--beacon-green);">${verifiedPlanners} <span style="font-size: 13px; font-weight: normal; color: var(--text-muted);">Package Enabled</span></div>
        </div>
      </div>

      <!-- Filter Controls & Search -->
      <div class="table-card-master" style="padding: 16px 20px; margin-bottom: 24px;">
        <div class="table-header-controls" style="padding: 0; border-bottom: none;">
          <div class="table-tabs-nav">
            <button class="tab-btn ${activeFilter === 'ALL' ? 'active' : ''}" onclick="window.masterApp.setQueueFilter('ALL')">All Planners (${totalPlanners})</button>
            <button class="tab-btn ${activeFilter === 'PENDING' ? 'active' : ''}" onclick="window.masterApp.setQueueFilter('PENDING')">⏳ Pending Scrutiny (${pendingPlanners})</button>
            <button class="tab-btn ${activeFilter === 'REJECTED' ? 'active' : ''}" onclick="window.masterApp.setQueueFilter('REJECTED')">⚠️ Re-upload Needed (${rejectedPlanners})</button>
            <button class="tab-btn ${activeFilter === 'VERIFIED' ? 'active' : ''}" onclick="window.masterApp.setQueueFilter('VERIFIED')">✓ Authorized (${verifiedPlanners})</button>
          </div>

          <input type="text" class="table-search-input" placeholder="Search planner name, email, location..." value="${this.searchQuery}" oninput="window.masterApp.handleSearch(this.value)">
        </div>
      </div>

      <!-- Planners Submission Table / List -->
      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Planner / Business Entity</th>
                <th>Category / Type</th>
                <th>Documents Submitted</th>
                <th>Scrutiny Progress</th>
                <th>Package Planning Access</th>
                <th>AI Match Score</th>
                <th>Submitted Date</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${filteredQueue.map(planner => {
                const docs = planner.documents || [];
                const approvedCount = docs.filter(d => d.status === 'VERIFIED').length;
                const rejectedCount = docs.filter(d => d.status === 'REJECTED').length;
                const pct = docs.length > 0 ? Math.round((approvedCount / docs.length) * 100) : 0;
                const isFullyVerified = planner.status === 'VERIFIED' && approvedCount === docs.length;
                const hasRejection = rejectedCount > 0;

                return `
                  <tr style="cursor: pointer;" onclick="window.masterApp.openPlannerScrutinyDossier('${planner.id}')">
                    <td>
                      <div class="user-cell-wrap">
                        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="${planner.applicantName}" class="user-cell-avatar" style="border: 1.5px solid var(--beacon-cyan);">
                        <div>
                          <div class="user-cell-name">${planner.applicantName}</div>
                          <div class="user-cell-email">${planner.location || 'India'} • ${planner.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="status-pill active" style="font-size: 11px;">
                        ${planner.plannerType === 'COMPANY' ? '🏢 Travel Company' : '👤 Freelance Planner'}
                      </span>
                    </td>
                    <td>
                      <strong>${docs.length} Documents</strong><br>
                      <span style="font-size: 11px; color: var(--text-muted);">${approvedCount} Approved, ${rejectedCount} Rejected, ${docs.length - approvedCount - rejectedCount} Pending</span>
                    </td>
                    <td style="min-width: 170px;">
                      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; font-weight: 700; color: #FFF;">
                        <span>${approvedCount} of ${docs.length} Approved</span>
                        <span style="color: ${isFullyVerified ? 'var(--beacon-green)' : hasRejection ? 'var(--beacon-red)' : 'var(--beacon-cyan)'};">${pct}%</span>
                      </div>
                      <div class="scrutiny-progress-bar-wrap">
                        <div class="scrutiny-progress-fill" style="width: ${pct}%; background: ${isFullyVerified ? 'var(--beacon-green)' : hasRejection ? 'var(--beacon-red)' : 'var(--beacon-cyan)'};"></div>
                      </div>
                    </td>
                    <td>
                      ${isFullyVerified ? `
                        <span class="status-pill verified" style="font-size: 11px;">
                          🔓 Package Planning Active
                        </span>
                      ` : `
                        <span class="status-pill ${hasRejection ? 'suspended' : 'pending'}" style="font-size: 11px;">
                          🔒 Package Planning Locked
                        </span>
                      `}
                    </td>
                    <td>
                      <span style="font-family: var(--font-mono); font-size: 12px; color: var(--beacon-cyan); font-weight: 700;">
                        🤖 ${planner.overallMatchScore || 98.4}%
                      </span>
                    </td>
                    <td>${planner.submittedDate}</td>
                    <td style="text-align: right;" onclick="event.stopPropagation();">
                      <button class="btn-primary-master" style="padding: 8px 14px; font-size: 12px; width: auto;" onclick="window.masterApp.openPlannerScrutinyDossier('${planner.id}')">
                        <span>Inspect Scrutiny Dossier</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // STEP 2 & 3: PLANNER SCRUTINY DOSSIER & PDF COPY VIEW
  getPlannerScrutinyDossierHtml(plannerId) {
    const planner = this.data.verifications.find(v => v.id === plannerId);
    if (!planner) {
      this.activeScrutinyPlannerId = null;
      return this.getPlannersVerificationQueueHtml();
    }

    const docs = planner.documents || [];
    const approvedCount = docs.filter(d => d.status === 'VERIFIED').length;
    const rejectedDocs = docs.filter(d => d.status === 'REJECTED');
    const allApproved = docs.length > 0 && approvedCount === docs.length;

    return `
      <!-- Breadcrumb & Header Navigation -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <button class="btn-secondary-master" onclick="window.masterApp.closePlannerScrutinyDossier()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          <span>← Back to Planners Submission Queue</span>
        </button>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="btn-secondary-master" onclick="window.masterApp.openExportModal('Dossier_${planner.applicantName}')">
            <span>Download Scrutiny Dossier PDF</span>
          </button>
        </div>
      </div>

      <!-- Planner Profile Banner Card -->
      <div class="applicant-kyc-card" style="margin-bottom: 24px;">
        <div class="applicant-head-row">
          <div class="applicant-profile-meta">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="${planner.applicantName}" class="applicant-avatar">
            <div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="applicant-name-title">${planner.applicantName}</div>
                <span class="status-pill ${allApproved ? 'verified' : rejectedDocs.length > 0 ? 'suspended' : 'pending'}">
                  ${allApproved ? '✓ ALL DOCUMENTS VERIFIED' : rejectedDocs.length > 0 ? '⚠️ ACTION REQUIRED: RE-UPLOAD DISPATCHED' : '⏳ SCRUTINY IN PROGRESS'}
                </span>
              </div>
              <div class="applicant-contact-chips">
                <span>${planner.category}</span>
                <span>•</span>
                <span>Type: <strong>${planner.plannerType === 'COMPANY' ? 'Travel Company' : 'Freelance Planner'}</strong></span>
                <span>•</span>
                <span style="color: var(--beacon-cyan);">${planner.location}</span>
                <span>•</span>
                <span>${planner.email}</span>
                <span>•</span>
                <span>${planner.phone}</span>
              </div>
            </div>
          </div>

          <div>
            ${allApproved ? `
              <div style="background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; padding: 10px 16px; text-align: right;">
                <div style="font-size: 11px; color: var(--beacon-green); font-weight: 700; text-transform: uppercase;">Platform Authorization Status</div>
                <div style="font-size: 13px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">🔓 Package Planning Enabled</div>
              </div>
            ` : `
              <div style="background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); border-radius: 12px; padding: 10px 16px; text-align: right;">
                <div style="font-size: 11px; color: var(--beacon-amber); font-weight: 700; text-transform: uppercase;">Package Creation Access</div>
                <div style="font-size: 13px; font-weight: 800; color: #FFFFFF; margin-top: 2px;">🔒 Locked (${approvedCount}/${docs.length} Verified)</div>
              </div>
            `}
          </div>
        </div>

        <div style="margin: 16px 0 0; padding: 12px 16px; background: var(--bg-surface); border-radius: 10px; font-size: 12.5px; color: var(--text-secondary); border-left: 3px solid var(--beacon-cyan);">
          <strong>Application Dossier Telemetry:</strong> ${planner.notes}
        </div>
      </div>

      <!-- STEP 5: BOLD REJECTION POP-OUT NOTIFICATION PREVIEW (DISPATCHED TO PLANNER) -->
      ${rejectedDocs.length > 0 ? `
        <div class="planner-rejection-popout-box">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="popout-header-tag">🚨 Dispatched to Planner</span>
              <h4 style="font-family: var(--font-display); font-size: 15px; font-weight: 800; color: #FFFFFF;">
                Planner Portal Alert: Action Required — ${rejectedDocs.length} Document(s) Rejected
              </h4>
            </div>
            <button class="btn-secondary-master" style="padding: 5px 12px; font-size: 11px; border-color: rgba(255,255,255,0.2);" onclick="window.masterApp.simulatePlannerReupload('${planner.id}', '${rejectedDocs[0].id}')">
              🔄 Simulate Planner Re-uploading Corrected File
            </button>
          </div>

          <div style="font-size: 13px; color: #FCA5A5; line-height: 1.5; margin-bottom: 12px;">
            The planner has received this bold alert banner inside their portal. Package creation is blocked until they submit valid replacement documents for scrutiny.
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${rejectedDocs.map(rd => `
              <div style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(239,68,68,0.3); border-radius: 10px; padding: 12px 16px; font-size: 12px;">
                <div style="font-weight: 700; color: #FFFFFF;">📄 Rejected: ${rd.title} (${rd.fileName})</div>
                <div style="color: #F87171; margin-top: 4px;"><strong>Mandatory Admin Note:</strong> "${rd.rejectionReason || 'Please upload clear, legible copy of document with valid registration date.'}"</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- STEP 2 & 3: DOCUMENT-BY-DOCUMENT SCRUTINY & PDF VIEWER LIST -->
      <div class="table-card-master" style="padding: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
          <div>
            <h3 style="font-family: var(--font-display); font-size: 17px; font-weight: 800; color: #FFFFFF;">Submitted Documents & Credentials (${docs.length})</h3>
            <p style="font-size: 12px; color: var(--text-muted);">Inspect individual PDF copies, examine extracted OCR details, and approve or reject each document with mandatory notes.</p>
          </div>
          <span class="status-pill active" style="font-family: var(--font-mono);">
            Progress: ${approvedCount} / ${docs.length} Approved (${Math.round((approvedCount / docs.length) * 100)}%)
          </span>
        </div>

        <!-- Document Scrutiny Rows -->
        <div style="display: flex; flex-direction: column; gap: 14px;">
          ${docs.map(doc => {
            const isApproved = doc.status === 'VERIFIED';
            const isRejected = doc.status === 'REJECTED';

            return `
              <div class="doc-scrutiny-row ${isApproved ? 'approved' : isRejected ? 'rejected' : 'pending'}">
                <!-- Left Info & Thumbnail Preview CTA -->
                <div class="doc-info-left">
                  <div class="doc-icon-badge-box">
                    ${doc.previewType === 'gst' ? '🏢' : doc.previewType === 'passport' ? '🪪' : doc.previewType === 'aadhaar' ? '🪪' : doc.previewType === 'selfie' ? '📸' : doc.previewType === 'insurance' ? '🛡️' : '📜'}
                  </div>

                  <div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <h4 style="font-size: 14px; font-weight: 800; color: #FFFFFF;">${doc.title}</h4>
                      <span class="status-pill ${isApproved ? 'verified' : isRejected ? 'suspended' : 'pending'}" style="font-size: 10px;">
                        ${isApproved ? '✓ APPROVED' : isRejected ? '✕ REJECTED' : '⏳ PENDING SCRUTINY'}
                      </span>
                    </div>

                    <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--text-muted); margin-top: 4px;">
                      <span>📄 <strong>${doc.fileName}</strong></span>
                      <span>•</span>
                      <span>Size: ${doc.fileSize}</span>
                      <span>•</span>
                      <span>Serial #: <strong style="color: var(--beacon-cyan); font-family: var(--font-mono);">${doc.docNumber || 'N/A'}</strong></span>
                      <span>•</span>
                      <span>AI Match: <strong style="color: var(--beacon-green);">${doc.matchScore || 99}%</strong></span>
                    </div>

                    ${isRejected && doc.rejectionReason ? `
                      <div style="margin-top: 8px; font-size: 11.5px; color: #F87171; background: rgba(239,68,68,0.1); padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(239,68,68,0.25);">
                        <strong>Rejection Reason Dispatched to Planner:</strong> "${doc.rejectionReason}"
                      </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Right Actions: View PDF Copy & Single Doc Decision -->
                <div style="display: flex; align-items: center; gap: 10px; flex-shrink: 0;">
                  <!-- View PDF Copy Lightbox -->
                  <button type="button" class="btn-secondary-master" style="padding: 9px 16px; font-size: 12px; color: var(--beacon-cyan); border-color: rgba(0, 203, 212, 0.35);" onclick="window.masterApp.openDocumentLightbox('${doc.id}', '${planner.id}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    <span>View PDF Copy</span>
                  </button>

                  <!-- Approve Document Button -->
                  <button type="button" class="btn-secondary-master" style="padding: 9px 14px; font-size: 12px; color: var(--beacon-green); border-color: rgba(16,185,129,0.4); ${isApproved ? 'background: rgba(16,185,129,0.15); font-weight: 800;' : ''}" onclick="window.masterApp.approveSingleDoc('${planner.id}', '${doc.id}')">
                    ✓ Approve
                  </button>

                  <!-- Reject Document Button (With Mandatory Note Modal) -->
                  <button type="button" class="btn-secondary-master" style="padding: 9px 14px; font-size: 12px; color: var(--beacon-red); border-color: rgba(239,68,68,0.4); ${isRejected ? 'background: rgba(239,68,68,0.15); font-weight: 800;' : ''}" onclick="window.masterApp.openRejectDocumentModal('${planner.id}', '${doc.id}')">
                    ✕ Reject
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- STEP 4: FINAL PLATFORM AUTHORIZATION & PACKAGE PLANNING ENABLEMENT -->
        <div class="final-verification-bar-card ${allApproved ? 'ready' : ''}">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 20px;">${allApproved ? '🎉' : '🔒'}</span>
              <h4 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: #FFFFFF;">
                Final Platform Authorization
              </h4>
            </div>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-top: 4px;">
              ${allApproved ? 
                'All documents have been scrutinized and verified. You can now grant full platform authorization and enable package planning for this organizer.' : 
                `Cannot authorize planner yet. ${docs.length - approvedCount} document(s) remaining for individual verification.`
              }
            </p>
          </div>

          <div>
            ${allApproved ? `
              <button type="button" class="btn-final-verify-enabled" onclick="window.masterApp.finalApprovePlanner('${planner.id}')">
                <span>🏆 Final Verify & Enable Package Planning</span>
              </button>
            ` : `
              <button type="button" class="btn-final-verify-disabled" title="All documents must be approved first" disabled>
                <span>🔒 Complete Document Scrutiny First</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 7. TRIPS & ITINERARY COMMAND CENTER (/master/trips)
  // =========================================================================
  getTripsViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Trip Command Center & Itinerary Intelligence</h1>
          <p>Inspect every itinerary generated on Beacon, including day schedules, linked bookings, and planner chat logs.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Trip ID & Title</th>
                <th>Traveller</th>
                <th>Planner</th>
                <th>Destination</th>
                <th>Dates</th>
                <th>Budget / Actual</th>
                <th>Take (14%)</th>
                <th>Status</th>
                <th style="text-align: right;">Inspect</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.trips.map(t => `
                <tr>
                  <td>
                    <strong>${t.title}</strong><br>
                    <span style="font-size:11px; color:var(--beacon-cyan); font-family:var(--font-mono);">${t.id}</span>
                  </td>
                  <td>${t.traveller.name}</td>
                  <td>${t.planner.name}</td>
                  <td>${t.destination}</td>
                  <td>${t.startDate} · ${t.durationDays} Days</td>
                  <td><strong>${t.actualCost || t.budget}</strong></td>
                  <td style="color:var(--beacon-green); font-weight:700;">${t.platformCommission || '₹0'}</td>
                  <td><span class="status-pill ${t.status.toLowerCase()}">${t.status}</span></td>
                  <td style="text-align: right;">
                    <button class="btn-secondary-master" style="padding:6px 12px; font-size:11px;" onclick="window.masterApp.openTripInspector('${t.id}')">
                      View Itinerary
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 8. DESTINATIONS & EXPERIENCES (/master/destinations & /master/experiences)
  // =========================================================================
  getDestinationsViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Curated Destination Database</h1>
          <p>10+ global and Indian hubs with coordinates, weather telemetry, active planners, and seasonal tips.</p>
        </div>
        <button class="btn-primary-master" style="width:auto;" onclick="alert('Destination Creator Modal active')">+ Add New Destination</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
        ${this.data.destinations.map(d => `
          <div class="table-card-master" style="margin-bottom:0; overflow:hidden;">
            <div style="height: 160px; background: url('${d.heroImage}') center/cover no-repeat; position: relative;">
              <span class="status-pill published" style="position: absolute; top: 12px; right: 12px;">${d.status}</span>
              <div style="position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); padding: 4px 10px; border-radius: 8px; font-size: 11px; color: #FFF;">
                ${d.weather}
              </div>
            </div>
            <div style="padding: 20px;">
              <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">${d.name}</h3>
              <p style="font-size:12px; color:var(--text-muted); margin: 6px 0 14px; line-height: 1.4;">${d.description}</p>
              
              <div style="display:flex; justify-content:space-between; font-size:12px; border-top:1px solid var(--border-subtle); padding-top:12px; margin-bottom:14px;">
                <span>Active Trips: <strong>${d.activeTrips}</strong></span>
                <span>Planners: <strong>${d.activePlanners}</strong></span>
              </div>

              <div style="display:flex; gap:6px; flex-wrap:wrap;">
                ${d.tags.map(t => `<span class="status-pill active" style="font-size:10px;">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  getExperiencesViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Experiences & Activities Inventory</h1>
          <p>Curated adventure, luxury, culinary, and cultural activities linked to verified guides and vendors.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Experience Title</th>
                <th>Category</th>
                <th>Destination</th>
                <th>Provider Guild</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.experiences.map(e => `
                <tr>
                  <td><strong>${e.title}</strong></td>
                  <td><span class="status-pill active">${e.category}</span></td>
                  <td>${e.destination}</td>
                  <td>${e.provider}</td>
                  <td style="color:var(--beacon-cyan); font-weight:700;">${e.price}</td>
                  <td>${e.duration}</td>
                  <td>⭐ <strong>${e.rating}</strong> (${e.reviewsCount})</td>
                  <td><span class="status-pill active">${e.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 9. BOOKINGS & FINANCIAL ESCROW (/master/bookings & /master/payments)
  // =========================================================================
  getBookingsViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Master Bookings Operations</h1>
          <p>Central booking registry tracking Razorpay & Stripe gateway transactions, escrow locks, and itinerary links.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Traveller</th>
                <th>Planner</th>
                <th>Service / Package</th>
                <th>Destination</th>
                <th>Amount</th>
                <th>Gateway Txn</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.bookings.map(b => `
                <tr>
                  <td><strong style="font-family:var(--font-mono); color:var(--beacon-cyan);">${b.id}</strong></td>
                  <td>${b.traveller}</td>
                  <td>${b.planner}</td>
                  <td>${b.service}</td>
                  <td>${b.destination}</td>
                  <td style="font-weight:700; color:#FFF;">${b.amount}</td>
                  <td>
                    <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted);">${b.gateway}: ${b.gatewayTxnId}</span>
                  </td>
                  <td><span class="status-pill ${b.bookingStatus.toLowerCase()}">${b.bookingStatus}</span></td>
                  <td style="text-align: right;">
                    <button class="btn-action-icon" title="View Transaction" onclick="alert('Transaction Voucher #BK-${b.id} Verified on ${b.gateway}')">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  getPaymentsViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Financial Control & Escrow Management</h1>
          <p>Supervise Gross Booking Volume (₹48.6L), platform take-rate commissions, refund resolutions, and weekly planner payouts.</p>
        </div>
        <button class="btn-primary-master" style="width:auto;" onclick="alert('Batch Payout Generator triggered for Monday disbursement.')">
          Execute Weekly Payout Batch (₹41.8L)
        </button>
      </div>

      <div class="kpi-grid-master">
        <div class="kpi-card-master">
          <span class="kpi-label">Escrow In-Trust</span>
          <div class="kpi-value">₹48,60,000</div>
          <span style="font-size:11px; color:var(--beacon-green); margin-top:8px;">Secured in HDFC Escrow Vault</span>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Platform Take Rate (14%)</span>
          <div class="kpi-value">₹6,80,400</div>
          <span style="font-size:11px; color:var(--beacon-cyan); margin-top:8px;">Net platform gross margin</span>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Planner Payouts Due</span>
          <div class="kpi-value">₹41,79,600</div>
          <span style="font-size:11px; color:var(--text-muted); margin-top:8px;">Scheduled for Mon, 10:00 AM</span>
        </div>
      </div>

      <div class="table-card-master">
        <div style="padding: 20px; border-bottom: 1px solid var(--border-subtle);">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF;">Settlement & Refund Ledger</h3>
        </div>
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Txn ID</th>
                <th>Booking Ref</th>
                <th>Payee / Traveller</th>
                <th>Payment Method</th>
                <th>Gross</th>
                <th>Commission</th>
                <th>Net Payout</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.bookings.map(b => `
                <tr>
                  <td><span style="font-family:var(--font-mono); font-size:11.5px; color:var(--beacon-cyan);">${b.gatewayTxnId}</span></td>
                  <td>${b.id}</td>
                  <td>${b.traveller}</td>
                  <td>${b.paymentMethod}</td>
                  <td><strong>${b.amount}</strong></td>
                  <td style="color:var(--beacon-green);">14% (₹${Math.round(b.rawAmount * 0.14).toLocaleString()})</td>
                  <td style="color:var(--beacon-cyan);">₹${Math.round(b.rawAmount * 0.86).toLocaleString()}</td>
                  <td><span class="status-pill ${b.paymentStatus.toLowerCase()}">${b.paymentStatus}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 10. SUPPORT, MODERATION & NOTIFICATIONS
  // =========================================================================
  getSupportViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Support Center & Emergency SOS Hotlines</h1>
          <p>Live resolution queue for traveller in-transit queries, guide coordinate dispatches, and emergency alerts.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User / Type</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Subject & Notes</th>
                <th>Assigned Admin</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.supportTickets.map(t => `
                <tr>
                  <td><strong style="font-family:var(--font-mono); color:var(--beacon-cyan);">${t.id}</strong></td>
                  <td>${t.userName} (${t.userType})</td>
                  <td>${t.category}</td>
                  <td>
                    <span class="status-pill ${t.priority === 'CRITICAL' ? 'suspended' : t.priority === 'HIGH' ? 'pending' : 'active'}">
                      ${t.priority}
                    </span>
                  </td>
                  <td>
                    <strong>${t.subject}</strong><br>
                    <span style="font-size:11.5px; color:var(--text-muted);">${t.notes}</span>
                  </td>
                  <td>${t.assignedAdmin}</td>
                  <td><span class="status-pill ${t.status.toLowerCase()}">${t.status}</span></td>
                  <td style="text-align: right;">
                    <button class="btn-secondary-master" style="padding:6px 12px; font-size:11px;" onclick="alert('Ticket #${t.id} dispatched to SMS/WhatsApp hotline')">
                      Respond
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  getModerationViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Trust, Reviews & Content Moderation</h1>
          <p>AI-flagged spam reviews, traveller vs planner disputes, and abusive communication enforcement.</p>
        </div>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Type</th>
                <th>Reporter</th>
                <th>Target Entity</th>
                <th>Reason & Evidence</th>
                <th>Status</th>
                <th style="text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.moderationItems.map(m => `
                <tr>
                  <td><strong style="font-family:var(--font-mono); color:var(--beacon-cyan);">${m.id}</strong></td>
                  <td><span class="status-pill active">${m.type}</span></td>
                  <td>${m.reporter}</td>
                  <td><strong>${m.target}</strong></td>
                  <td style="max-width: 320px;">
                    <strong>${m.reason}</strong><br>
                    <span style="font-size:11.5px; color:var(--text-muted);">${m.evidence}</span>
                  </td>
                  <td><span class="status-pill pending">${m.status}</span></td>
                  <td style="text-align: right;">
                    <div class="action-btn-group" style="justify-content: flex-end;">
                      <button class="btn-secondary-master" style="padding:6px 12px; font-size:11px; color:var(--beacon-red);" onclick="alert('Content removed and warning issued to user.')">
                        Remove & Warn
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  getNotificationsViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Platform Broadcasts & Travel Alerts</h1>
          <p>Compose in-app, SMS, email, and push announcements for active travellers and certified planners.</p>
        </div>
      </div>

      <div class="table-card-master" style="padding: 24px; max-width: 800px; margin-bottom: 30px;">
        <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF; margin-bottom:16px;">Compose Platform Broadcast</h3>
        <form onsubmit="event.preventDefault(); window.masterApp.sendBroadcast();">
          <div class="form-group">
            <label>Announcement Headline</label>
            <input type="text" id="notif-title" class="form-control" placeholder="e.g. Western Ghats Monsoon Advisory" required>
          </div>

          <div class="form-group">
            <label>Message Content</label>
            <textarea id="notif-body" class="form-control" rows="3" placeholder="Provide clear operational details and safety tips..." required style="resize:none;"></textarea>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
            <div class="form-group">
              <label>Target Audience</label>
              <select class="form-control" id="notif-target">
                <option>All Active Travellers (12,482)</option>
                <option>All Certified Planners (1,284)</option>
                <option>North India Travellers (Kashmir / Manali)</option>
                <option>All Administrators (12)</option>
              </select>
            </div>
            <div class="form-group">
              <label>Delivery Channels</label>
              <select class="form-control" id="notif-channel">
                <option>In-App Push + Email Notification</option>
                <option>In-App Only</option>
                <option>Emergency SMS + Push</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn-primary-master" style="width: auto; padding: 12px 24px;">
            <span>Dispatch Broadcast Announcement</span>
          </button>
        </form>
      </div>
    `;
  }

  // =========================================================================
  // 11. ANALYTICS & GEOGRAPHIC MAPS (/master/analytics)
  // =========================================================================
  getAnalyticsViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Geographic Intelligence & Platform Analytics</h1>
          <p>Interactive world travel topology, active destination hubs, traveller acquisition funnels, and revenue metrics.</p>
        </div>
      </div>

      <!-- Geographic World Map Card -->
      <div class="table-card-master" style="padding: 24px; margin-bottom: 30px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
          <div>
            <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF;">Interactive Global Travel Topology Map</h3>
            <p style="font-size:12px; color:var(--text-muted);">Click on any pinned travel hub to inspect regional planners and active itineraries.</p>
          </div>
        </div>
        <div id="chart-geo-world-map"></div>
      </div>

      <div class="table-card-master" style="padding: 24px;">
        <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFFFFF; margin-bottom: 16px;">Gross Booking Trajectory (2026)</h3>
        <div id="chart-analytics-revenue" style="height: 220px; width: 100%;"></div>
      </div>
    `;
  }

  // =========================================================================
  // 12. AUDIT LOGS & SYSTEM HEALTH (/master/audit-logs & /master/system-health)
  // =========================================================================
  getAuditLogsViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Immutable Administrative Audit Ledger</h1>
          <p>Tamper-proof event log tracking administrative suspensions, KYC approvals, commission adjustments, and refunds.</p>
        </div>
        <button class="btn-secondary-master" onclick="window.masterApp.openExportModal('Audit Ledger')">Download Encrypted Log</button>
      </div>

      <div class="table-card-master">
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Administrator</th>
                <th>Action</th>
                <th>Target Entity</th>
                <th>Diff / Details</th>
                <th>Timestamp</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.auditLogs.map(l => `
                <tr>
                  <td><span style="font-family:var(--font-mono); font-size:11.5px; color:var(--beacon-cyan);">${l.id}</span></td>
                  <td>${l.admin}</td>
                  <td><strong style="font-family:var(--font-mono); font-size:12px;">${l.action}</strong></td>
                  <td>${l.entity}</td>
                  <td style="font-size:12px;">
                    <div style="color:var(--text-subtle);">Prev: ${l.previousValue}</div>
                    <div style="color:var(--beacon-green);">New: ${l.newValue}</div>
                  </td>
                  <td style="font-family:var(--font-mono); font-size:11.5px;">${l.timestamp}</td>
                  <td>
                    <span class="status-pill ${l.severity === 'CRITICAL' ? 'suspended' : l.severity === 'HIGH' ? 'pending' : 'active'}">
                      ${l.severity}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  getSystemHealthViewHtml() {
    const h = this.data.systemHealth;
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>System Health & Infrastructure Telemetry</h1>
          <p>Real-time microservices latency, PostgreSQL clusters, Redis caches, and Razorpay/Stripe webhooks.</p>
        </div>
      </div>

      <div class="kpi-grid-master">
        <div class="kpi-card-master">
          <span class="kpi-label">Uptime (30 Days)</span>
          <div class="kpi-value" style="color: var(--beacon-green);">${h.uptime}</div>
          <span style="font-size:11px; color:var(--text-muted); margin-top:8px;">Zero critical downtime incidents</span>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Average API Latency</span>
          <div class="kpi-value" style="color: var(--beacon-cyan);">${h.avgLatency}</div>
          <canvas id="canvas-latency-sparkline" width="180" height="30" style="margin-top:8px;"></canvas>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Request Throughput</span>
          <div class="kpi-value">${h.requestsPerMin}</div>
          <span style="font-size:11px; color:var(--text-muted); margin-top:8px;">Error Rate: ${h.errorRate}</span>
        </div>
        <div class="kpi-card-master">
          <span class="kpi-label">Active WebSockets</span>
          <div class="kpi-value">${h.activeWebSocketConnections}</div>
          <span style="font-size:11px; color:var(--beacon-green); margin-top:8px;">Live sync connections</span>
        </div>
      </div>

      <div class="table-card-master">
        <div style="padding:20px; border-bottom:1px solid var(--border-subtle);">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF;">Microservice Status Monitor</h3>
        </div>
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Status</th>
                <th>Latency</th>
                <th>Uptime</th>
                <th>Load</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              ${h.services.map(s => `
                <tr>
                  <td><strong>${s.name}</strong></td>
                  <td><span class="status-pill ${s.status.toLowerCase()}">${s.status}</span></td>
                  <td style="font-family:var(--font-mono);">${s.latency}</td>
                  <td>${s.uptime}</td>
                  <td>${s.load}</td>
                  <td style="font-size:12px; color:var(--text-muted);">${s.note || 'Normal operation'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 13. ADMIN RBAC & SETTINGS (/master/admins & /master/settings)
  // =========================================================================
  getAdminsViewHtml() {
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Admin Management & Granular RBAC Matrix</h1>
          <p>Configure permission matrices across Super Admin, Platform Admin, Operations, Finance, and Support roles.</p>
        </div>
      </div>

      <div class="table-card-master" style="padding: 24px;">
        <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF; margin-bottom: 16px;">Role Permission Matrix</h3>
        <div style="overflow-x: auto;">
          <table class="master-data-table">
            <thead>
              <tr>
                <th>Administrative Role</th>
                <th>Users</th>
                <th>Trips</th>
                <th>Bookings</th>
                <th>Payments</th>
                <th>Moderation</th>
                <th>Settings</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(MASTER_ROLES).map(([key, role]) => `
                <tr>
                  <td>
                    <strong>${role.title}</strong><br>
                    <span style="font-size:11px; color:var(--text-muted);">${role.description}</span>
                  </td>
                  <td><span class="status-pill ${role.permissions.users?.edit ? 'active' : 'suspended'}">${role.permissions.users?.edit ? 'Full' : 'Read'}</span></td>
                  <td><span class="status-pill ${role.permissions.trips?.edit ? 'active' : 'suspended'}">${role.permissions.trips?.edit ? 'Full' : 'Read'}</span></td>
                  <td><span class="status-pill ${role.permissions.bookings?.approve ? 'active' : 'suspended'}">${role.permissions.bookings?.approve ? 'Full' : 'Read'}</span></td>
                  <td><span class="status-pill ${role.permissions.payments?.edit ? 'active' : 'suspended'}">${role.permissions.payments?.edit ? 'Full' : 'None'}</span></td>
                  <td><span class="status-pill ${role.permissions.moderation?.edit ? 'active' : 'suspended'}">${role.permissions.moderation?.edit ? 'Full' : 'Read'}</span></td>
                  <td><span class="status-pill ${role.permissions.settings?.edit ? 'active' : 'suspended'}">${role.permissions.settings?.edit ? 'Full' : 'None'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  getSettingsViewHtml() {
    const s = this.data.settings;
    return `
      <div class="page-header-row">
        <div class="page-title-wrap">
          <h1>Platform Governance & Commission Settings</h1>
          <p>Configure take-rates, escrow payout rules, MFA security requirements, and maintenance mode.</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div class="table-card-master" style="padding: 24px;">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF; margin-bottom: 16px;">Commission Take-Rate Policies</h3>
          <div class="form-group">
            <label>Standard Take-Rate Percentage (%)</label>
            <input type="number" class="form-control" value="${s.commission.standardTakeRate}">
          </div>
          <div class="form-group">
            <label>Gold Tier Certified Planner Take-Rate (%)</label>
            <input type="number" class="form-control" value="${s.commission.goldPlannerTakeRate}">
          </div>
          <div class="form-group">
            <label>Minimum Payout Settlement (₹)</label>
            <input type="number" class="form-control" value="${s.commission.minimumPayoutThreshold}">
          </div>
          <button class="btn-primary-master" style="margin-top:16px;" onclick="alert('Commission rates updated and logged in Immutable Audit Ledger.')">Save Commission Rates</button>
        </div>

        <div class="table-card-master" style="padding: 24px;">
          <h3 style="font-family:var(--font-display); font-size:16px; font-weight:800; color:#FFF; margin-bottom: 16px;">Security & Access Policies</h3>
          <div class="form-group">
            <label>Session Expiry Timeout (Minutes)</label>
            <input type="number" class="form-control" value="${s.security.sessionTimeoutMinutes}">
          </div>
          <div class="form-group">
            <label>Max Failed Password Attempts Before Lockout</label>
            <input type="number" class="form-control" value="${s.security.maxFailedLoginAttempts}">
          </div>
          <div class="form-group">
            <label>Lockout Duration (Minutes)</label>
            <input type="number" class="form-control" value="${s.security.lockoutDurationMinutes}">
          </div>
          <button class="btn-primary-master" style="margin-top:16px;" onclick="alert('Security policy updated.')">Update Security Guard</button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 14. MODALS & SLIDING DRAWERS
  // =========================================================================

  // User & Traveller Dossier Drawer
  openUserDossier(userId) {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) return;

    this.openDrawer(`
      <div class="drawer-header">
        <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">Traveller Dossier: ${user.name}</h3>
        <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()">✕</button>
      </div>
      <div class="drawer-body">
        <div style="display:flex; align-items:center; gap:16px; background:var(--bg-card); padding:16px; border-radius:14px;">
          <img src="${user.avatar}" alt="${user.name}" style="width:64px; height:64px; border-radius:12px; object-fit:cover;">
          <div>
            <div style="font-size:16px; font-weight:800; color:#FFF;">${user.name}</div>
            <div style="font-size:12px; color:var(--text-muted);">${user.email} · ${user.phone}</div>
            <div style="margin-top:6px;"><span class="status-pill active">${user.status}</span></div>
          </div>
        </div>

        <div>
          <h4 style="font-size:12px; font-weight:700; color:var(--text-subtle); text-transform:uppercase; margin-bottom:8px;">Travel Biography</h4>
          <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">${user.bio || 'Active explorer on Beacon.'}</p>
        </div>

        <div>
          <h4 style="font-size:12px; font-weight:700; color:var(--text-subtle); text-transform:uppercase; margin-bottom:8px;">Favourite Destinations</h4>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            ${(user.favouriteDestinations || ['Goa', 'Kashmir', 'Dubai']).map(d => `<span class="status-pill active">${d}</span>`).join('')}
          </div>
        </div>
      </div>
    `);
  }

  // Planner Dossier Drawer
  openPlannerDossier(plannerId) {
    const planner = this.data.users.find(u => u.id === plannerId);
    if (!planner) return;

    this.openDrawer(`
      <div class="drawer-header">
        <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">Planner Dossier: ${planner.name}</h3>
        <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()">✕</button>
      </div>
      <div class="drawer-body">
        <div style="display:flex; align-items:center; gap:16px; background:var(--bg-card); padding:16px; border-radius:14px;">
          <img src="${planner.avatar}" alt="${planner.name}" style="width:64px; height:64px; border-radius:12px; object-fit:cover;">
          <div>
            <div style="font-size:16px; font-weight:800; color:#FFF;">${planner.name}</div>
            <div style="font-size:12px; color:var(--beacon-cyan);">${planner.plannerBadge || 'Planner'} · Rating ⭐ ${planner.rating || 4.9}</div>
            <div style="margin-top:6px;"><span class="status-pill verified">KYC Verified</span></div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
          <div style="background:var(--bg-card); padding:12px; border-radius:10px;">
            <div style="font-size:11px; color:var(--text-subtle);">Completed Tours</div>
            <div style="font-size:16px; font-weight:700; color:#FFF;">${planner.tripsCount || 0}</div>
          </div>
          <div style="background:var(--bg-card); padding:12px; border-radius:10px;">
            <div style="font-size:11px; color:var(--text-subtle);">Gross Earnings</div>
            <div style="font-size:16px; font-weight:700; color:var(--beacon-green);">${planner.totalEarned || '₹0'}</div>
          </div>
        </div>

        <div>
          <h4 style="font-size:12px; font-weight:700; color:var(--text-subtle); text-transform:uppercase; margin-bottom:8px;">KYC Vault Documents</h4>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <div style="padding:10px; background:var(--bg-input); border-radius:8px; display:flex; justify-content:space-between; font-size:12px;">
              <span>Official Tourism Operator License</span>
              <span class="status-pill verified">✓ VERIFIED</span>
            </div>
            <div style="padding:10px; background:var(--bg-input); border-radius:8px; display:flex; justify-content:space-between; font-size:12px;">
              <span>Business GSTIN Certificate</span>
              <span class="status-pill verified">✓ VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    `);
  }

  // Trip Itinerary Inspector
  openTripInspector(tripId) {
    const trip = this.data.trips.find(t => t.id === tripId);
    if (!trip) return;

    this.openDrawer(`
      <div class="drawer-header">
        <div>
          <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">${trip.title}</h3>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--beacon-cyan);">${trip.id} · ${trip.destination}</span>
        </div>
        <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()">✕</button>
      </div>
      <div class="drawer-body">
        <div style="display:flex; justify-content:space-between; background:var(--bg-card); padding:14px; border-radius:12px; font-size:13px;">
          <div>
            <div style="color:var(--text-subtle); font-size:11px;">Traveller</div>
            <strong>${trip.traveller.name}</strong>
          </div>
          <div>
            <div style="color:var(--text-subtle); font-size:11px;">Planner</div>
            <strong>${trip.planner.name}</strong>
          </div>
          <div>
            <div style="color:var(--text-subtle); font-size:11px;">Total Escrow</div>
            <strong style="color:var(--beacon-green);">${trip.actualCost || trip.budget}</strong>
          </div>
        </div>

        <h4 style="font-size:13px; font-weight:700; color:#FFF; margin-top:10px;">Day-by-Day Itinerary Schedule</h4>
        <div style="display:flex; flex-direction:column; gap:10px;">
          ${(trip.itinerary || []).map(day => `
            <div style="background:var(--bg-card); padding:14px; border-radius:12px; border:1px solid var(--border-card);">
              <div style="color:var(--beacon-cyan); font-weight:700; font-size:12px;">Day ${day.day}: ${day.title}</div>
              <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${day.activities}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `);
  }

  // Dangerous Action Modal with Typed Confirmation
  openDangerousActionModal(actionType, entityId, entityName) {
    const modalRoot = document.getElementById('master-modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="danger-modal-card">
          <div class="danger-modal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h3 style="font-family:var(--font-display); font-size:20px; font-weight:800; color:#FFF;">Confirm Sensitive Action</h3>
          <p style="font-size:13px; color:var(--text-muted); margin: 8px 0 16px;">
            You are about to suspend <strong>${entityName}</strong> (${entityId}). This will immediately revoke their platform credentials and lock associated itineraries.
          </p>

          <label style="font-size:11px; font-weight:700; color:var(--text-subtle); text-transform:uppercase;">
            Type <strong style="color:var(--beacon-red); font-family:var(--font-mono);">${actionType.replace('_', ' ')}</strong> to confirm:
          </label>
          <input type="text" id="danger-typed-confirm-input" class="danger-typed-input" placeholder="Type confirmation here...">

          <div style="display:flex; justify-content:flex-end; gap:12px;">
            <button class="btn-secondary-master" onclick="window.masterApp.closeAllModals()">Cancel</button>
            <button class="btn-primary-master" id="btn-confirm-danger-action" style="background:var(--beacon-red); color:#FFF; width:auto;" disabled>
              Execute Suspension
            </button>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('danger-typed-confirm-input');
    const confirmBtn = document.getElementById('btn-confirm-danger-action');
    const expected = actionType.replace('_', ' ');

    input.addEventListener('input', (e) => {
      confirmBtn.disabled = e.target.value.trim().toUpperCase() !== expected;
    });

    confirmBtn.addEventListener('click', () => {
      const user = this.data.users.find(u => u.id === entityId);
      if (user) user.status = 'SUSPENDED';

      // Log in immutable audit logs
      this.data.auditLogs.unshift({
        id: `LOG-${Date.now().toString().slice(-4)}`,
        admin: "Vikram Malhotra (Super Admin)",
        adminId: "ADM-001",
        action: actionType,
        entity: `${entityName} (#${entityId})`,
        previousValue: "Status: ACTIVE",
        newValue: "Status: SUSPENDED",
        timestamp: new Date().toLocaleString(),
        ip: "103.246.40.112",
        device: "MacBook Pro / Chrome 128",
        severity: "HIGH"
      });

      this.closeAllModals();
      this.showToast(`Suspension executed for ${entityName}. Action logged in Immutable Audit Ledger.`, 'danger');
      this.render();
    });
  }

  // Global Command Palette (Ctrl + K)
  openCommandPalette() {
    const modalRoot = document.getElementById('master-modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="command-palette-card">
          <div class="command-search-head">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="command-search-input" placeholder="Search users, trips, bookings, destinations..." autofocus>
            <kbd style="font-family:var(--font-mono); font-size:10px; color:var(--text-muted);">ESC to close</kbd>
          </div>
          <div class="command-results-list" id="command-results-container">
            <div class="command-result-group-title">Navigation Shortcuts</div>
            <div class="command-result-item" onclick="window.masterApp.navigateTo('dashboard'); window.masterApp.closeAllModals();">
              <span>📊 Go to Dashboard</span>
              <kbd>G D</kbd>
            </div>
            <div class="command-result-item" onclick="window.masterApp.navigateTo('planners'); window.masterApp.closeAllModals();">
              <span>🎖️ Manage Trip Planners</span>
              <kbd>G P</kbd>
            </div>
            <div class="command-result-item" onclick="window.masterApp.navigateTo('trips'); window.masterApp.closeAllModals();">
              <span>✈️ All Active Trips</span>
              <kbd>G T</kbd>
            </div>
            <div class="command-result-item" onclick="window.masterApp.navigateTo('verifications'); window.masterApp.closeAllModals();">
              <span>📄 KYC Verification Vault</span>
              <kbd>G V</kbd>
            </div>
          </div>
        </div>
      </div>
    `;

    const input = document.getElementById('command-search-input');
    input.addEventListener('input', (e) => {
      this.filterCommandResults(e.target.value);
    });
  }

  filterCommandResults(query) {
    const container = document.getElementById('command-results-container');
    if (!container) return;

    if (!query) {
      this.openCommandPalette();
      return;
    }

    const q = query.toLowerCase();
    const matchedUsers = this.data.users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
    const matchedTrips = this.data.trips.filter(t => t.title.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q));
    const matchedDest = this.data.destinations.filter(d => d.name.toLowerCase().includes(q));

    container.innerHTML = `
      ${matchedUsers.length ? `
        <div class="command-result-group-title">Users & Planners (${matchedUsers.length})</div>
        ${matchedUsers.map(u => `
          <div class="command-result-item" onclick="window.masterApp.openUserDossier('${u.id}'); window.masterApp.closeAllModals();">
            <span>👤 ${u.name} (${u.type})</span>
            <span style="font-size:11px; color:var(--text-muted);">${u.email}</span>
          </div>
        `).join('')}
      ` : ''}

      ${matchedTrips.length ? `
        <div class="command-result-group-title">Trips & Itineraries (${matchedTrips.length})</div>
        ${matchedTrips.map(t => `
          <div class="command-result-item" onclick="window.masterApp.openTripInspector('${t.id}'); window.masterApp.closeAllModals();">
            <span>✈️ ${t.title}</span>
            <span style="font-size:11px; color:var(--beacon-cyan);">${t.id}</span>
          </div>
        `).join('')}
      ` : ''}

      ${matchedDest.length ? `
        <div class="command-result-group-title">Destinations (${matchedDest.length})</div>
        ${matchedDest.map(d => `
          <div class="command-result-item" onclick="window.masterApp.navigateTo('destinations'); window.masterApp.closeAllModals();">
            <span>📍 ${d.name} (${d.country})</span>
            <span style="font-size:11px; color:var(--text-muted);">${d.activeTrips} Trips</span>
          </div>
        `).join('')}
      ` : ''}
    `;
  }

  openDrawer(htmlContent) {
    const modalRoot = document.getElementById('master-modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="detail-drawer-panel">
          ${htmlContent}
        </div>
      </div>
    `;
  }

  closeAllModals() {
    const modalRoot = document.getElementById('master-modal-root');
    if (modalRoot) modalRoot.innerHTML = '';
  }

  // Notifications Bell Drawer
  openNotificationsDrawer() {
    this.openDrawer(`
      <div class="drawer-header">
        <h3 style="font-family:var(--font-display); font-size:18px; font-weight:800; color:#FFF;">System Notifications & Alerts</h3>
        <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()">✕</button>
      </div>
      <div class="drawer-body">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="padding:14px; background:var(--bg-card); border-radius:12px; border-left:3px solid var(--beacon-cyan);">
            <div style="font-weight:700; color:#FFF; font-size:13px;">🔐 Admin Login Detected</div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Vikram Malhotra authenticated from Mumbai via Chrome.</div>
            <div style="font-size:10px; color:var(--text-subtle); margin-top:4px;">10 mins ago</div>
          </div>

          <div style="padding:14px; background:var(--bg-card); border-radius:12px; border-left:3px solid var(--beacon-amber);">
            <div style="font-weight:700; color:#FFF; font-size:13px;">📋 37 Planner Verifications Pending</div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Maharashtra and Kashmir planner documents awaiting review.</div>
            <div style="font-size:10px; color:var(--text-subtle); margin-top:4px;">1 hour ago</div>
          </div>

          <div style="padding:14px; background:var(--bg-card); border-radius:12px; border-left:3px solid var(--beacon-green);">
            <div style="font-weight:700; color:#FFF; font-size:13px;">💳 Razorpay Webhook Reconciled</div>
            <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">₹1,45,000 escrow lock confirmed for Kashmir Alpine Expedition.</div>
            <div style="font-size:10px; color:var(--text-subtle); margin-top:4px;">3 hours ago</div>
          </div>
        </div>
      </div>
    `);
  }

  // Logout Flow
  openLogoutConfirmation() {
    const modalRoot = document.getElementById('master-modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="danger-modal-card" style="border-color:var(--border-card);">
          <h3 style="font-family:var(--font-display); font-size:20px; font-weight:800; color:#FFF;">Sign out of Beacon Master?</h3>
          <p style="font-size:13px; color:var(--text-muted); margin: 10px 0 20px;">
            You will need to authenticate again with 2FA to access master administrative controls.
          </p>
          <div style="display:flex; justify-content:flex-end; gap:12px;">
            <button class="btn-secondary-master" onclick="window.masterApp.closeAllModals()">Cancel</button>
            <button class="btn-primary-master" style="width:auto;" onclick="window.masterApp.executeLogout()">Sign Out</button>
          </div>
        </div>
      </div>
    `;
  }

  executeLogout() {
    masterSecurity.destroySession();
    this.closeAllModals();
    this.showToast("Signed out of Beacon Master session.", 'info');
    this.navigateTo('login');
  }

  // =========================================================================
  // PLANNER SCRUTINY PIPELINE & MODAL ACTIONS
  // =========================================================================
  setQueueFilter(filterKey) {
    this.selectedQueueFilter = filterKey;
    this.render();
  }

  openPlannerScrutinyDossier(plannerId) {
    this.activeScrutinyPlannerId = plannerId;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closePlannerScrutinyDossier() {
    this.activeScrutinyPlannerId = null;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Mandatory Rejection Note Modal
  openRejectDocumentModal(applicantId, docId) {
    const app = this.data.verifications.find(a => a.id === applicantId);
    if (!app) return;
    const doc = (app.documents || []).find(d => d.id === docId);
    if (!doc) return;

    const modalRoot = document.getElementById('master-modal-root');
    if (!modalRoot) return;

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="danger-modal-card" style="border-color: var(--beacon-red); max-width: 540px;">
          <div class="danger-modal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>

          <h3 style="font-family: var(--font-display); font-size: 20px; font-weight: 800; color: #FFFFFF;">
            Reject Document & Request Re-upload
          </h3>
          <p style="font-size: 13px; color: var(--text-muted); margin: 8px 0 14px;">
            You are rejecting <strong>${doc.title}</strong> (${doc.fileName}) for <strong>${app.applicantName}</strong>. A mandatory explanation note must be provided so the planner can correct and re-upload the file.
          </p>

          <!-- Quick Suggestion Chips -->
          <div style="margin-bottom: 14px;">
            <label style="font-size: 11px; font-weight: 700; color: var(--text-subtle); text-transform: uppercase;">Quick Reason Templates:</label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              <button type="button" class="tab-btn" style="font-size: 11px; padding: 4px 10px;" onclick="document.getElementById('rejection-mandatory-note').value = 'Blurry scan or unreadable file. Please upload a high-resolution color PDF copy.'; document.getElementById('btn-submit-rejection').disabled = false;">
                📷 Blurry scan / illegible
              </button>
              <button type="button" class="tab-btn" style="font-size: 11px; padding: 4px 10px;" onclick="document.getElementById('rejection-mandatory-note').value = 'Document expired or renewal missing. Please upload your active 2026-2027 certified license.'; document.getElementById('btn-submit-rejection').disabled = false;">
                ⏳ Expired license
              </button>
              <button type="button" class="tab-btn" style="font-size: 11px; padding: 4px 10px;" onclick="document.getElementById('rejection-mandatory-note').value = 'Legal entity name mismatch against business registration records. Please verify legal name.'; document.getElementById('btn-submit-rejection').disabled = false;">
                🏢 Legal name mismatch
              </button>
              <button type="button" class="tab-btn" style="font-size: 11px; padding: 4px 10px;" onclick="document.getElementById('rejection-mandatory-note').value = 'Government stamp or digital signature seal missing. Please upload officially attested copy.'; document.getElementById('btn-submit-rejection').disabled = false;">
                🖋️ Missing official seal
              </button>
            </div>
          </div>

          <div class="form-group">
            <label style="font-size: 11px; font-weight: 700; color: #FFFFFF;">
              Mandatory Rejection Note <span style="color: var(--beacon-red);">*</span>
            </label>
            <textarea id="rejection-mandatory-note" class="form-control" rows="3" placeholder="Provide specific instructions on what needs to be fixed..." style="resize: none; font-size: 12.5px;" required></textarea>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px;">
            <button type="button" class="btn-secondary-master" onclick="window.masterApp.closeAllModals()">Cancel</button>
            <button type="button" class="btn-primary-master" id="btn-submit-rejection" style="background: var(--beacon-red); color: #FFF; width: auto; padding: 10px 20px;" disabled onclick="window.masterApp.executeRejectDocument('${app.id}', '${doc.id}')">
              Disptach Rejection Alert
            </button>
          </div>
        </div>
      </div>
    `;

    const textarea = document.getElementById('rejection-mandatory-note');
    const submitBtn = document.getElementById('btn-submit-rejection');
    textarea.addEventListener('input', (e) => {
      submitBtn.disabled = e.target.value.trim().length < 5;
    });
  }

  executeRejectDocument(applicantId, docId) {
    const note = document.getElementById('rejection-mandatory-note')?.value.trim();
    if (!note) return;

    const app = this.data.verifications.find(a => a.id === applicantId);
    if (!app) return;
    const doc = (app.documents || []).find(d => d.id === docId);
    if (doc) {
      doc.status = 'REJECTED';
      doc.rejectionReason = note;
      doc.rejectedAt = new Date().toLocaleString();
      app.status = 'REJECTED';

      this.closeAllModals();
      this.showToast(`🚨 Document "${doc.title}" rejected. Mandatory note dispatched to planner's portal.`, 'danger');
      this.render();
    }
  }

  // Simulate Planner Re-uploading an edited/corrected document
  simulatePlannerReupload(applicantId, docId) {
    const app = this.data.verifications.find(a => a.id === applicantId);
    if (!app) return;
    const doc = (app.documents || []).find(d => d.id === docId);
    if (doc) {
      doc.status = 'PENDING';
      doc.fileName = doc.fileName.replace('.pdf', '_Clean_Renewal_v2.pdf');
      delete doc.rejectionReason;
      delete doc.rejectedAt;

      // Check if any other doc is still rejected
      const remainingRejected = (app.documents || []).some(d => d.status === 'REJECTED');
      if (!remainingRejected) {
        app.status = 'PENDING';
      }

      this.showToast(`📩 Planner has re-uploaded corrected document: "${doc.fileName}"! Ready for re-scrutiny.`, 'info');
      this.render();
    }
  }

  // STEP 4: Final Authorize & Enable Package Planning
  finalApprovePlanner(applicantId) {
    const app = this.data.verifications.find(a => a.id === applicantId);
    if (!app) return;

    // Check all documents
    const allVerified = (app.documents || []).every(d => d.status === 'VERIFIED');
    if (!allVerified) {
      alert("⚠️ Cannot grant final authorization until ALL documents are individually verified.");
      return;
    }

    app.status = 'VERIFIED';

    // Also update in planners list
    const plannerObj = this.data.planners.find(p => p.id === app.applicantId || p.name === app.applicantName);
    if (plannerObj) {
      plannerObj.status = 'ACTIVE';
      plannerObj.canCreatePackages = true;
      plannerObj.badge = 'Verified Master Organizer';
    }

    this.showToast(`🎉 Planner ${app.applicantName} is fully verified! Package planning privileges enabled.`, 'success');
    window.BeaconSync?.syncKycApproval(app.applicantId, app.applicantName, 'VERIFIED');
    this.render();
  }

  // Document Lightbox Preview
  openDocumentLightbox(docId, applicantId) {
    let targetDoc = null;
    let targetApp = null;

    for (const app of this.data.verifications) {
      const d = (app.documents || []).find(x => x.id === docId);
      if (d) {
        targetDoc = d;
        targetApp = app;
        break;
      }
    }

    if (!targetDoc || !targetApp) return;

    const modalRoot = document.getElementById('master-modal-root');
    if (!modalRoot) return;

    // Render realistic visual document paper
    const renderVisualDocumentPaper = (doc) => {
      if (doc.previewType === 'gst') {
        return `
          <div class="doc-mockup-paper" style="border-top: 6px solid #00CBD4;">
            <div style="text-align: center; border-bottom: 2px solid #CBD5E1; padding-bottom: 16px; margin-bottom: 20px;">
              <div style="font-size: 13px; font-weight: 800; color: #0F172A; text-transform: uppercase; letter-spacing: 1px;">GOVERNMENT OF INDIA / MINISTRY OF FINANCE</div>
              <div style="font-size: 15px; font-weight: 900; color: #0284C7; margin-top: 4px;">FORM GST REG-06</div>
              <div style="font-size: 11px; color: #64748B; font-weight: 600;">[See Rule 10(1)] • REGISTRATION CERTIFICATE</div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 12px; margin-bottom: 20px;">
              <div><strong>Registration Number:</strong><br><span style="font-family: var(--font-mono); color: #0284C7; font-size: 13px; font-weight: bold;">${doc.docNumber || '27AAACD9012E1Z3'}</span></div>
              <div><strong>Legal Name:</strong><br><span>${doc.ocrExtracted?.['Legal Name'] || targetApp.applicantName}</span></div>
              <div><strong>Date of Liability:</strong><br><span>01/04/2021</span></div>
              <div><strong>Period of Validity:</strong><br><span>From ${doc.issueDate || '10/06/2021'} to Perpetual</span></div>
              <div><strong>State Jurisdiction:</strong><br><span>${doc.ocrExtracted?.['State Code'] || 'Maharashtra'}</span></div>
              <div><strong>Type of Taxpayer:</strong><br><span>Regular / Active</span></div>
            </div>

            <div style="padding: 12px; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; font-size: 11px; color: #475569;">
              <strong>Principal Place of Business:</strong><br>
              ${targetApp.location || 'Pune, Maharashtra, India'}
            </div>

            <div class="doc-paper-seal">
              <span>GSTN</span>
              <span style="font-size: 12px;">★</span>
              <span>VERIFIED</span>
            </div>
          </div>
        `;
      } else if (doc.previewType === 'passport') {
        return `
          <div class="doc-mockup-paper" style="background: #0B192C; color: #FFFFFF; border: 2px solid #00CBD4; border-radius: 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 12px; margin-bottom: 16px;">
              <div style="font-size: 12px; font-weight: 800; letter-spacing: 1px;">PASSPORT / PASSEPORT</div>
              <div style="font-size: 13px; font-weight: 800; color: var(--beacon-cyan);">REPUBLIC OF INDIA</div>
            </div>

            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
              <div style="width: 110px; height: 140px; background: #1E293B; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" alt="Passport Portrait" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 11px; flex: 1;">
                <div><span style="color: #94A3B8;">Passport No:</span><br><strong style="font-family: var(--font-mono); color: var(--beacon-cyan); font-size: 12.5px;">${doc.docNumber || 'P892104912'}</strong></div>
                <div><span style="color: #94A3B8;">Country Code:</span><br><strong>IND</strong></div>
                <div><span style="color: #94A3B8;">Given Name:</span><br><strong>${targetApp.applicantName.toUpperCase()}</strong></div>
                <div><span style="color: #94A3B8;">Nationality:</span><br><strong>INDIAN</strong></div>
                <div><span style="color: #94A3B8;">Date of Birth:</span><br><strong>14 AUG 1991</strong></div>
                <div><span style="color: #94A3B8;">Date of Expiry:</span><br><strong style="color: var(--beacon-green);">${doc.expiryDate || '11 MAR 2032'}</strong></div>
              </div>
            </div>

            <div style="background: #070D18; padding: 10px; border-radius: 8px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: #38BDF8; line-height: 1.6;">
              P&lt;INDDESHMUKH&lt;&lt;KARAN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br>
              P892104912IND9108144M3203112&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04
            </div>

            <div class="doc-paper-seal" style="border-color: #38BDF8; color: #38BDF8;">
              <span>RPO PUNE</span>
              <span style="font-size: 10px;">★</span>
              <span>CHIP ID</span>
            </div>
          </div>
        `;
      } else if (doc.previewType === 'selfie') {
        return `
          <div class="doc-mockup-paper" style="background: #090F1D; color: #FFF; border: 2px solid var(--beacon-cyan); text-align: center;">
            <div style="font-size: 13px; font-weight: 800; color: var(--beacon-cyan); margin-bottom: 4px;">BIOMETRIC LIVENESS VERIFICATION TELEMETRY</div>
            <div style="font-size: 11px; color: #94A3B8; margin-bottom: 20px;">DeepFace v4 AI Facial Mesh vs Government ID Portrait</div>

            <div style="display: flex; justify-content: center; gap: 24px; margin-bottom: 24px;">
              <div>
                <div style="width: 130px; height: 160px; border-radius: 12px; overflow: hidden; border: 2px solid #10B981; position: relative;">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" alt="Live Selfie" style="width: 100%; height: 100%; object-fit: cover;">
                  <span class="status-pill active" style="position: absolute; bottom: 6px; left: 6px; font-size: 9px; padding: 2px 6px;">Live Camera</span>
                </div>
                <div style="font-size: 11px; color: #10B981; margin-top: 6px; font-weight: bold;">✓ 3D Mesh Valid</div>
              </div>

              <div>
                <div style="width: 130px; height: 160px; border-radius: 12px; overflow: hidden; border: 2px solid var(--beacon-cyan); position: relative;">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80" alt="Passport Reference" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(20%);">
                  <span class="status-pill verified" style="position: absolute; bottom: 6px; left: 6px; font-size: 9px; padding: 2px 6px;">Passport Photo</span>
                </div>
                <div style="font-size: 11px; color: var(--beacon-cyan); margin-top: 6px; font-weight: bold;">✓ Facial Match</div>
              </div>
            </div>

            <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 10px; padding: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: left; font-size: 11px;">
              <div><strong>Similarity Match:</strong> <span style="color: #10B981; font-weight: bold;">98.4% Match</span></div>
              <div><strong>Anti-Spoofing:</strong> <span style="color: #10B981; font-weight: bold;">PASS (0.01% artifact)</span></div>
              <div><strong>Active Blink:</strong> <span style="color: #10B981; font-weight: bold;">Detected (2 blinks)</span></div>
              <div><strong>Head Rotation:</strong> <span style="color: #10B981; font-weight: bold;">Verified 15° Pitch</span></div>
            </div>
          </div>
        `;
      } else {
        // Default Official Certificate / Tourism License
        return `
          <div class="doc-mockup-paper" style="border: 4px double #0284C7;">
            <div style="text-align: center; border-bottom: 2px solid #E2E8F0; padding-bottom: 16px; margin-bottom: 20px;">
              <div style="font-size: 11px; font-weight: 800; color: #64748B; text-transform: uppercase; letter-spacing: 1.5px;">${doc.issuingAuthority || 'GOVERNMENT OF INDIA'}</div>
              <div style="font-size: 16px; font-weight: 900; color: #0369A1; margin: 4px 0;">${doc.previewTitle || doc.title}</div>
              <div style="font-size: 11.5px; color: #475569; font-weight: 600;">${doc.previewSubtitle || 'Accredited Commercial Tourism License'}</div>
            </div>

            <div style="font-size: 12.5px; line-height: 1.7; color: #334155; margin-bottom: 24px;">
              This is to officially certify that <strong>${targetApp.applicantName}</strong> has complied with all regulatory standards and is authorized to operate bespoke travel expeditions, guided itineraries, and adventure services under Registration Number <strong>${doc.docNumber || 'TRV-2026-9912'}</strong>.
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 11.5px; background: #F1F5F9; padding: 12px; border-radius: 8px; margin-bottom: 20px;">
              <div><strong>Issue Date:</strong> ${doc.issueDate || '15 Jan 2024'}</div>
              <div><strong>Valid Until:</strong> <strong style="color: #0369A1;">${doc.expiryDate || '14 Jan 2029'}</strong></div>
              <div><strong>Inspection Status:</strong> Passed (Class A)</div>
              <div><strong>Digital Seal:</strong> Cryptographically Verified</div>
            </div>

            <div class="doc-paper-seal" style="border-color: #0284C7; color: #0284C7;">
              <span>OFFICIAL</span>
              <span style="font-size: 12px;">★</span>
              <span>ACCREDITED</span>
            </div>
          </div>
        `;
      }
    };

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target === this) window.masterApp.closeAllModals()">
        <div class="doc-lightbox-modal">
          <!-- Lightbox Header -->
          <div class="doc-lightbox-header">
            <div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="status-pill active" style="font-size: 10px;">${targetDoc.documentType}</span>
                <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: #FFFFFF;">${targetDoc.title}</h3>
              </div>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Applicant: <strong>${targetApp.applicantName}</strong> • ${targetDoc.fileName} (${targetDoc.fileSize})
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="status-pill ${targetDoc.status === 'VERIFIED' ? 'verified' : targetDoc.status === 'REJECTED' ? 'suspended' : 'pending'}">
                ${targetDoc.status}
              </span>
              <button class="btn-action-icon" onclick="window.masterApp.closeAllModals()" title="Close Viewer">✕</button>
            </div>
          </div>

          <!-- Lightbox Grid: Visual Render (Left) + OCR Telemetry (Right) -->
          <div class="doc-lightbox-grid">
            <!-- Left Pane: Visual Paper Preview -->
            <div class="doc-visual-viewer-pane" id="doc-render-zoom-target">
              ${renderVisualDocumentPaper(targetDoc)}
            </div>

            <!-- Right Pane: Extracted OCR Telemetry & Decision Form -->
            <div class="doc-ocr-details-pane">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                  <h4 style="font-family: var(--font-display); font-size: 14px; font-weight: 800; color: #FFFFFF;">Extracted OCR & Biometrics</h4>
                  <span class="status-pill active" style="font-size: 10px;">Match: ${targetDoc.matchScore || 99.1}%</span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 20px;">
                  <div class="ocr-field-row">
                    <span class="ocr-field-key">Document Serial Number</span>
                    <span class="ocr-field-val" style="font-family: var(--font-mono); color: var(--beacon-cyan);">${targetDoc.docNumber || 'N/A'}</span>
                  </div>
                  <div class="ocr-field-row">
                    <span class="ocr-field-key">Issuing Authority</span>
                    <span class="ocr-field-val">${targetDoc.issuingAuthority || 'Government Agency'}</span>
                  </div>
                  <div class="ocr-field-row">
                    <span class="ocr-field-key">Validity Period</span>
                    <span class="ocr-field-val">${targetDoc.issueDate || '2024-01-15'} to ${targetDoc.expiryDate || '2029-01-14'}</span>
                  </div>

                  ${Object.entries(targetDoc.ocrExtracted || {}).map(([k, v]) => `
                    <div class="ocr-field-row">
                      <span class="ocr-field-key">${k}</span>
                      <span class="ocr-field-val">${v}</span>
                    </div>
                  `).join('')}
                </div>

                ${targetDoc.status === 'REJECTED' && targetDoc.rejectionReason ? `
                  <div style="background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; padding: 12px; margin-top: 10px;">
                    <div style="font-size: 11px; font-weight: 700; color: #F87171; text-transform: uppercase;">Active Rejection Note:</div>
                    <div style="font-size: 12px; color: #FFFFFF; margin-top: 4px;">"${targetDoc.rejectionReason}"</div>
                  </div>
                ` : ''}
              </div>

              <!-- Bottom Actions -->
              <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
                <div style="display: flex; gap: 10px;">
                  <button type="button" class="btn-primary-master" style="flex: 1; padding: 11px;" onclick="window.masterApp.approveSingleDoc('${targetApp.id}', '${targetDoc.id}'); window.masterApp.closeAllModals();">
                    ✓ Mark Verified
                  </button>
                  <button type="button" class="btn-secondary-master" style="flex: 1; padding: 11px; justify-content: center; color: var(--beacon-red); border-color: rgba(239,68,68,0.4);" onclick="window.masterApp.openRejectDocumentModal('${targetApp.id}', '${targetDoc.id}');">
                    ✕ Reject Document
                  </button>
                </div>
                <button type="button" class="btn-secondary-master" style="width: 100%; justify-content: center;" onclick="alert('Downloading original encrypted PDF: ${targetDoc.fileName}')">
                  📥 Download Original PDF (${targetDoc.fileSize})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  approveSingleDoc(applicantId, docId) {
    const app = this.data.verifications.find(a => a.id === applicantId);
    if (!app) return;
    const doc = (app.documents || []).find(d => d.id === docId);
    if (doc) {
      doc.status = 'VERIFIED';
      delete doc.rejectionReason;
      delete doc.rejectedAt;
      this.showToast(`✓ Document "${doc.title}" verified successfully!`, 'success');
      this.render();
    }
  }

  // Simulate Incoming Planner Upload in real-time
  simulatePlannerUpload() {
    const sampleUploads = [
      {
        id: `DOC-NEW-${Date.now().toString().slice(-4)}`,
        title: "Himachal Tourism Operator License & Adventure Permit",
        documentType: "Tourism License",
        fileName: "Himachal_Tourism_Permit_2026.pdf",
        fileSize: "2.3 MB",
        uploadedAt: "Just now",
        status: "PENDING",
        docNumber: "HP-TRV-2026-44019",
        issuingAuthority: "Himachal Pradesh Tourism Development Board",
        issueDate: "2025-05-10",
        expiryDate: "2030-05-09",
        matchScore: 98.9,
        previewType: "certificate",
        previewTitle: "HIMACHAL PRADESH TOURISM DEVELOPMENT BOARD",
        previewSubtitle: "Certified High Altitude Mountain Trekking Operator",
        ocrExtracted: {
          "Entity Name": "Peaks & Valleys Adventure Travel Ltd.",
          "License No": "HP-TRV-2026-44019",
          "Coverage": "Manali, Spiti, Rohtang, Kinnaur",
          "Verification Status": "ACTIVE"
        }
      }
    ];

    const randomDoc = sampleUploads[0];
    const targetApp = this.data.verifications[0];
    if (targetApp) {
      targetApp.documents.unshift(randomDoc);
      targetApp.status = 'PENDING';
      this.showToast(`📩 New Document Uploaded: "${randomDoc.title}" by ${targetApp.applicantName}!`, 'info');
      this.render();
    }
  }

  // Helpers
  setUserTab(tab) {
    this.selectedTab = tab;
    this.render();
  }

  handleSearch(q) {
    this.searchQuery = q;
    this.render();
  }

  approveVerification(id) {
    const v = this.data.verifications.find(x => x.id === id);
    if (v) {
      v.status = 'VERIFIED';
      (v.documents || []).forEach(d => {
        d.status = 'VERIFIED';
        delete d.rejectionReason;
      });
    }
    this.showToast(`KYC Verification #${id} approved! All documents marked verified.`, 'success');
    this.render();
  }

  rejectVerification(id) {
    const v = this.data.verifications.find(x => x.id === id);
    if (v) {
      v.status = 'REJECTED';
      (v.documents || []).forEach(d => {
        if (d.status === 'PENDING') d.status = 'REJECTED';
      });
    }
    this.showToast(`KYC Verification #${id} rejected. Planner notified to re-upload required credentials.`, 'danger');
    this.render();
  }

  reactivateUser(id) {
    const user = this.data.users.find(u => u.id === id);
    if (user) user.status = 'ACTIVE';
    this.showToast(`User #${id} account reactivated.`, 'success');
    this.render();
  }

  sendBroadcast() {
    const title = document.getElementById('notif-title').value;
    this.showToast(`Broadcast "${title}" dispatched successfully.`, 'success');
    this.navigateTo('dashboard');
  }

  openExportModal(reportName) {
    alert(`Generating encrypted PDF/CSV export for: ${reportName}. Download ready in 3 seconds.`);
  }
}

// Global instance
window.masterApp = new MasterApp();
document.addEventListener('DOMContentLoaded', () => {
  window.masterApp.init();
});
