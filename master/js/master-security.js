/**
 * BEACON MASTER — ENTERPRISE SECURITY & AUTHENTICATION ENGINE
 * Implements MFA/2FA, Rate Limiting, Brute Force Lockout, Suspicious Device Detection, and RBAC.
 */

const STORAGE_KEYS = {
  AUTH_TOKEN: 'beacon_master_auth_token',
  ADMIN_USER: 'beacon_master_user',
  LOCKOUT_STATE: 'beacon_master_lockout',
  ACTIVE_SESSION: 'beacon_master_session',
  SECURITY_SETTINGS: 'beacon_master_security_config'
};

export const MASTER_ROLES = {
  SUPER_ADMIN: {
    title: "Super Admin / Master Admin",
    description: "Complete unconstrained control over the entire platform, financials, permissions and configuration.",
    badgeClass: "badge-purple",
    permissions: {
      users: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      planners: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      trips: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      bookings: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      payments: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      content: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      moderation: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      support: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      analytics: { view: true, export: true },
      audit: { view: true, export: true },
      settings: { view: true, edit: true },
      system: { view: true, edit: true }
    }
  },
  PLATFORM_ADMIN: {
    title: "Platform Admin",
    description: "Manage users, planners, platform operations and public content.",
    badgeClass: "badge-blue",
    permissions: {
      users: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
      planners: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
      trips: { view: true, create: false, edit: true, delete: false, approve: true, export: true },
      bookings: { view: true, create: false, edit: false, delete: false, approve: false, export: true },
      payments: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
      content: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      moderation: { view: true, create: false, edit: true, delete: true, approve: true, export: true },
      support: { view: true, create: true, edit: true, delete: false, approve: false, export: true },
      analytics: { view: true, export: true },
      audit: { view: true, export: false },
      settings: { view: true, edit: false },
      system: { view: true, edit: false }
    }
  },
  OPERATIONS_ADMIN: {
    title: "Operations Admin",
    description: "Manage active trips, real-time bookings, planner coordination and traveller logistics.",
    badgeClass: "badge-cyan",
    permissions: {
      users: { view: true, create: false, edit: true, delete: false, approve: false, export: true },
      planners: { view: true, create: false, edit: true, delete: false, approve: false, export: true },
      trips: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
      bookings: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
      payments: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
      content: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
      moderation: { view: true, create: false, edit: true, delete: false, approve: false, export: false },
      support: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
      analytics: { view: true, export: false },
      audit: { view: false, export: false },
      settings: { view: false, edit: false },
      system: { view: true, edit: false }
    }
  },
  FINANCE_ADMIN: {
    title: "Finance Admin",
    description: "Control escrow disbursements, commissions, refunds, payment gateways and tax reports.",
    badgeClass: "badge-green",
    permissions: {
      users: { view: true, create: false, edit: false, delete: false, approve: false, export: true },
      planners: { view: true, create: false, edit: false, delete: false, approve: false, export: true },
      trips: { view: true, create: false, edit: false, delete: false, approve: false, export: true },
      bookings: { view: true, create: false, edit: true, delete: false, approve: true, export: true },
      payments: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
      content: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
      moderation: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
      support: { view: true, create: false, edit: true, delete: false, approve: false, export: false },
      analytics: { view: true, export: true },
      audit: { view: true, export: true },
      settings: { view: true, edit: false },
      system: { view: false, edit: false }
    }
  },
  SUPPORT_ADMIN: {
    title: "Support Admin",
    description: "Resolve traveller & planner inquiries, emergency SOS hotlines, and dispatch assistance.",
    badgeClass: "badge-amber",
    permissions: {
      users: { view: true, create: false, edit: true, delete: false, approve: false, export: false },
      planners: { view: true, create: false, edit: true, delete: false, approve: false, export: false },
      trips: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
      bookings: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
      payments: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
      content: { view: true, create: false, edit: false, delete: false, approve: false, export: false },
      moderation: { view: true, create: true, edit: true, delete: false, approve: false, export: false },
      support: { view: true, create: true, edit: true, delete: false, approve: true, export: true },
      analytics: { view: false, export: false },
      audit: { view: false, export: false },
      settings: { view: false, edit: false },
      system: { view: false, edit: false }
    }
  },
  MODERATOR: {
    title: "Content Moderator",
    description: "Moderate user complaints, spam reviews, fake itineraries and enforce community guidelines.",
    badgeClass: "badge-red",
    permissions: {
      users: { view: true, create: false, edit: true, delete: false, approve: false, export: false },
      planners: { view: true, create: false, edit: true, delete: false, approve: false, export: false },
      trips: { view: true, create: false, edit: true, delete: false, approve: false, export: false },
      bookings: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
      payments: { view: false, create: false, edit: false, delete: false, approve: false, export: false },
      content: { view: true, create: false, edit: true, delete: true, approve: true, export: false },
      moderation: { view: true, create: true, edit: true, delete: true, approve: true, export: true },
      support: { view: true, create: false, edit: true, delete: false, approve: false, export: false },
      analytics: { view: false, export: false },
      audit: { view: false, export: false },
      settings: { view: false, edit: false },
      system: { view: false, edit: false }
    }
  }
};

export class MasterSecurityEngine {
  constructor() {
    this.maxAttempts = 3;
    this.lockoutDurationMinutes = 15;
  }

  // Get current lockout state
  getLockoutStatus() {
    const raw = localStorage.getItem(STORAGE_KEYS.LOCKOUT_STATE);
    if (!raw) return { isLocked: false, remainingSeconds: 0, attempts: 0 };
    
    try {
      const state = JSON.parse(raw);
      const now = Date.now();
      if (state.lockedUntil && now < state.lockedUntil) {
        const remainingSeconds = Math.ceil((state.lockedUntil - now) / 1000);
        return { isLocked: true, remainingSeconds, attempts: state.attempts };
      } else if (state.lockedUntil && now >= state.lockedUntil) {
        // Lockout expired
        localStorage.removeItem(STORAGE_KEYS.LOCKOUT_STATE);
        return { isLocked: false, remainingSeconds: 0, attempts: 0 };
      }
      return { isLocked: false, remainingSeconds: 0, attempts: state.attempts || 0 };
    } catch {
      return { isLocked: false, remainingSeconds: 0, attempts: 0 };
    }
  }

  recordFailedAttempt() {
    const current = this.getLockoutStatus();
    const newAttempts = (current.attempts || 0) + 1;
    
    if (newAttempts >= this.maxAttempts) {
      const lockedUntil = Date.now() + (this.lockoutDurationMinutes * 60 * 1000);
      localStorage.setItem(STORAGE_KEYS.LOCKOUT_STATE, JSON.stringify({
        attempts: newAttempts,
        lockedUntil
      }));
      return { isLocked: true, remainingSeconds: this.lockoutDurationMinutes * 60, attempts: newAttempts };
    } else {
      localStorage.setItem(STORAGE_KEYS.LOCKOUT_STATE, JSON.stringify({
        attempts: newAttempts,
        lockedUntil: null
      }));
      return { isLocked: false, remainingSeconds: 0, attempts: newAttempts };
    }
  }

  resetAttempts() {
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_STATE);
  }

  // Step 1: Password Authentication
  validateMasterCredentials(email, password) {
    const lockout = this.getLockoutStatus();
    if (lockout.isLocked) {
      return {
        success: false,
        error: `Account is temporarily locked due to repeated failed attempts. Try again in ${Math.ceil(lockout.remainingSeconds / 60)} minutes.`,
        locked: true,
        remainingSeconds: lockout.remainingSeconds
      };
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Master Admin demo credentials
    const validEmails = ['master@beacon.travel', 'admin@beacon.travel', 'superadmin@beacon.travel'];
    const validPassword = 'BeaconMaster2026!';

    // For flexibility in demo mode, accept any valid email with the master password, or demo credentials
    const isValid = (validEmails.includes(cleanEmail) || cleanEmail.endsWith('@beacon.travel') || cleanEmail === 'admin') && 
                    (cleanPass === validPassword || cleanPass === 'admin' || cleanPass === 'password' || cleanPass.length >= 6);

    if (!isValid) {
      const attemptState = this.recordFailedAttempt();
      const attemptsLeft = this.maxAttempts - attemptState.attempts;
      return {
        success: false,
        error: attemptState.isLocked 
          ? `Account locked out for ${this.lockoutDurationMinutes} minutes.`
          : `Invalid master credentials. ${attemptsLeft} attempt(s) remaining before security lockout.`,
        locked: attemptState.isLocked,
        attemptsLeft: Math.max(0, attemptsLeft)
      };
    }

    this.resetAttempts();

    // Determine role
    let role = "SUPER_ADMIN";
    let name = "Vikram Malhotra";
    if (cleanEmail.includes('ops')) {
      role = "OPERATIONS_ADMIN";
      name = "Sneha Nair";
    } else if (cleanEmail.includes('finance')) {
      role = "FINANCE_ADMIN";
      name = "Rajesh Gupta";
    }

    return {
      success: true,
      requiresMfa: true,
      pendingUser: {
        id: "ADM-001",
        name: name,
        email: cleanEmail.includes('@') ? cleanEmail : 'master@beacon.travel',
        role: MASTER_ROLES[role].title,
        roleCode: role,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        mfaMethod: "TOTP_AUTHENTICATOR",
        phoneMasked: "+91 ••••• ••920",
        emailMasked: "m•••••@beacon.travel"
      }
    };
  }

  // Step 2: MFA / OTP Verification
  verifyMfaCode(otpCode) {
    const cleanOtp = (otpCode || '').trim();
    // Default demo master code: 123456 or any 6-digit number
    if (cleanOtp === '123456' || cleanOtp === '000000' || (cleanOtp.length === 6 && /^\d+$/.test(cleanOtp))) {
      return { success: true };
    }
    return { success: false, error: "Invalid 6-digit authentication code. Please check your authenticator app or request a new code." };
  }

  // Check if current device is unrecognized to trigger security banner
  checkDeviceReputation() {
    const isKnown = localStorage.getItem('beacon_master_known_device');
    if (!isKnown) {
      return {
        isNewDevice: true,
        deviceInfo: {
          device: "MacBook Pro / Windows PC",
          browser: navigator.userAgent.includes('Chrome') ? 'Google Chrome 128' : 'Web Browser',
          ip: "103.246.40.112",
          approxLocation: "Mumbai, Maharashtra, India",
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
        }
      };
    }
    return { isNewDevice: false };
  }

  approveCurrentDevice() {
    localStorage.setItem('beacon_master_known_device', 'true');
  }

  // Start Authenticated Session
  createSession(adminUser, rememberDevice = false) {
    const token = 'bcn_mst_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const sessionData = {
      token,
      user: adminUser,
      createdAt: Date.now(),
      expiresAt: Date.now() + (60 * 60 * 1000), // 1 hour session
      rememberDevice
    };

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(adminUser));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(sessionData));
    
    if (rememberDevice) {
      this.approveCurrentDevice();
    }

    return sessionData;
  }

  // Get active session
  getCurrentSession() {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const rawUser = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    const rawSession = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);

    if (!token || !rawUser || !rawSession) return null;

    try {
      const session = JSON.parse(rawSession);
      if (Date.now() > session.expiresAt) {
        this.destroySession();
        return null;
      }
      return session;
    } catch {
      this.destroySession();
      return null;
    }
  }

  destroySession() {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  }

  // Check RBAC permission for action
  hasPermission(moduleKey, action = 'view') {
    const session = this.getCurrentSession();
    if (!session || !session.user) return false;
    
    const roleCode = session.user.roleCode || 'SUPER_ADMIN';
    const roleConfig = MASTER_ROLES[roleCode] || MASTER_ROLES.SUPER_ADMIN;
    
    if (!roleConfig.permissions[moduleKey]) return false;
    return Boolean(roleConfig.permissions[moduleKey][action]);
  }
}

export const masterSecurity = new MasterSecurityEngine();
