/**
 * ============================================================================
 * BEACON REAL-TIME ECOSYSTEM SYNCHRONIZATION BRIDGE (BeaconSyncBridge)
 * ============================================================================
 * Seamlessly connects and synchronizes:
 * 1. TRAVELLERS (B2C Portal: Packages, Customization, Enquiries, UTR Payment, Check-ins)
 * 2. PLANNERS (B2B Desk: KYC, UPI IDs, Package Pricing, UTR Verification, Attendance)
 * 3. MASTER ADMIN (Beacon Master: Platform Governance, Scrutiny, Escrow, Telemetry)
 * ============================================================================
 */

(function(window) {
  const SYNC_KEYS = {
    PACKAGES: 'beacon_planner_packages',
    BOOKINGS: 'beacon_bookings',
    PAYMENTS: 'beacon_payment_attempts',
    VERIFICATIONS: 'beacon_master_verifications',
    ENQUIRIES: 'beacon_traveller_enquiries',
    ATTENDANCE: 'beacon_trip_attendance',
    NOTIFICATIONS: 'beacon_sync_notifications'
  };

  class BeaconSyncBridge {
    constructor() {
      this.listeners = {};
      this.initBroadcastChannel();
      this.initStorageListener();
    }

    initBroadcastChannel() {
      if ('BroadcastChannel' in window) {
        this.channel = new BroadcastChannel('beacon_ecosystem_sync_channel');
        this.channel.onmessage = (event) => {
          if (event && event.data) {
            this.handleIncomingSync(event.data.type, event.data.payload);
          }
        };
      }
    }

    initStorageListener() {
      window.addEventListener('storage', (e) => {
        if (Object.values(SYNC_KEYS).includes(e.key)) {
          this.emit('STORAGE_CHANGED', { key: e.key, newValue: e.newValue });
        }
      });
    }

    // Broadcast event across all tabs (Traveller, Planner, Master Admin)
    broadcast(type, payload) {
      const msg = { type, payload, timestamp: Date.now() };
      if (this.channel) {
        this.channel.postMessage(msg);
      }
      this.handleIncomingSync(type, payload);
    }

    handleIncomingSync(type, payload) {
      // Trigger internal listeners
      this.emit(type, payload);

      // Play subtle chime for notifications
      if (type === 'PLANNER_REMINDER' || type === 'PAYMENT_VERIFIED' || type === 'PAYMENT_CLAIM_RECEIVED') {
        this.triggerChime();
      }
    }

    on(event, callback) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(callback);
    }

    emit(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(cb => {
          try { cb(data); } catch(err) { console.error('Sync listener error:', err); }
        });
      }
    }

    // --- 1. KYC & PLANNER AUTHORIZATION SYNC ---
    syncKycApproval(plannerId, plannerName, status) {
      this.broadcast('KYC_STATUS_UPDATED', { plannerId, plannerName, status });
    }

    // --- 2. PACKAGE CREATION & UPI BINDING SYNC ---
    syncNewPackage(packageData) {
      let packages = JSON.parse(localStorage.getItem(SYNC_KEYS.PACKAGES) || '[]');
      packages.unshift(packageData);
      localStorage.setItem(SYNC_KEYS.PACKAGES, JSON.stringify(packages));
      this.broadcast('PACKAGE_PUBLISHED', packageData);
    }

    // --- 3. TRAVELLER CUSTOMIZATION & ENQUIRY REMINDER SYNC ---
    sendPlannerCustomizationReminder(reminderData) {
      // reminderData: { travellerName, packageName, guestsCount, mealPreference, dates, note }
      let notifs = JSON.parse(localStorage.getItem(SYNC_KEYS.NOTIFICATIONS) || '[]');
      notifs.unshift({
        id: `REM-${Date.now().toString().slice(-4)}`,
        title: `Customization Alert: ${reminderData.travellerName}`,
        message: `${reminderData.travellerName} is customizing "${reminderData.packageName}" (${reminderData.guestsCount} guests, ${reminderData.mealPreference || 'Standard'} meals).`,
        time: 'Just now',
        type: 'CUSTOMIZATION_REMINDER',
        data: reminderData
      });
      localStorage.setItem(SYNC_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
      this.broadcast('PLANNER_REMINDER', reminderData);
    }

    // --- 4. TRAVELLER PAYMENT INITIATION & UTR SUBMISSION SYNC ---
    submitPaymentUtr(paymentData) {
      // paymentData: { bookingId, utr, amount, travellerName, plannerName, packageName, timestamp }
      let attempts = JSON.parse(localStorage.getItem(SYNC_KEYS.PAYMENTS) || '[]');
      const existingIdx = attempts.findIndex(a => a.bookingId === paymentData.bookingId);
      
      const paymentRecord = {
        id: `PAY-${Date.now().toString().slice(-5)}`,
        bookingId: paymentData.bookingId,
        utrId: paymentData.utr,
        amount: paymentData.amount,
        customerName: paymentData.travellerName || 'Rahul Sharma',
        plannerId: paymentData.plannerName || 'WanderWorld Travels',
        packageName: paymentData.packageName || 'Kashmir Alpine Expedition',
        status: 'CUSTOMER_MARKED_PAID',
        submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        history: [
          `${new Date().toLocaleTimeString()} UTR ${paymentData.utr} submitted by traveller.`,
          `${new Date().toLocaleTimeString()} Awaiting Planner verification.`
        ]
      };

      if (existingIdx >= 0) {
        attempts[existingIdx] = { ...attempts[existingIdx], ...paymentRecord };
      } else {
        attempts.unshift(paymentRecord);
      }

      localStorage.setItem(SYNC_KEYS.PAYMENTS, JSON.stringify(attempts));
      this.broadcast('PAYMENT_CLAIM_RECEIVED', paymentRecord);
    }

    // --- 5. PLANNER VERIFIES PAYMENT & RELEASES RECEIPT SYNC ---
    verifyPaymentAndConfirmBooking(bookingId, plannerName) {
      let attempts = JSON.parse(localStorage.getItem(SYNC_KEYS.PAYMENTS) || '[]');
      const target = attempts.find(a => a.bookingId === bookingId);
      if (target) {
        target.status = 'PLANNER_CONFIRMED';
        target.planner_confirmed_at = new Date().toLocaleTimeString();
        target.history.push(`${new Date().toLocaleTimeString()} Payment confirmed by planner.`);
        localStorage.setItem(SYNC_KEYS.PAYMENTS, JSON.stringify(attempts));
      }

      // Add to confirmed bookings
      let bookings = JSON.parse(localStorage.getItem(SYNC_KEYS.BOOKINGS) || '[]');
      bookings.unshift({
        id: bookingId,
        title: target ? target.packageName : 'Curated Expedition',
        amount: target ? target.amount : '₹28,000',
        planner: plannerName || (target ? target.plannerId : 'Certified Planner'),
        customer: target ? target.customerName : 'Rahul Sharma',
        utr: target ? target.utrId : '620194819201',
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        confirmedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      localStorage.setItem(SYNC_KEYS.BOOKINGS, JSON.stringify(bookings));

      this.broadcast('PAYMENT_VERIFIED', { bookingId, plannerName, target });
    }

    // --- 6. ATTENDANCE & DESTINATION CHECK-IN SYNC ---
    markTripAttendance(bookingId, travellerName, dayNum, status = 'PRESENT') {
      let attendanceList = JSON.parse(localStorage.getItem(SYNC_KEYS.ATTENDANCE) || '[]');
      attendanceList.unshift({
        bookingId,
        travellerName,
        dayNum: dayNum || 1,
        status,
        timestamp: new Date().toLocaleString()
      });
      localStorage.setItem(SYNC_KEYS.ATTENDANCE, JSON.stringify(attendanceList));
      this.broadcast('ATTENDANCE_MARKED', { bookingId, travellerName, dayNum, status });
    }

    triggerChime() {
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } catch(e) {}
    }
  }

  window.BeaconSync = new BeaconSyncBridge();
})(window);
