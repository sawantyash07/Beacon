import { useState, useEffect, useRef } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMasterAdmin, type AdminRole, type SystemMode } from '@/data/masterAdminData';
import { 
  ShieldAlert, ShieldCheck, Search, Bell, Clock, Cpu, 
  Menu, X, ChevronDown, LogOut, Terminal, 
  LayoutDashboard, FileCheck, Users, Radio, Package, 
  Calendar, Wallet, Headphones, Scale, MessageSquare, 
  Megaphone, BarChart3, AlertTriangle, Settings, ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';

export default function MasterControlLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    currentRole, setCurrentRole, 
    systemMode, triggerEmergencyLockdown,
    riskAlerts, planners, tickets, disputes,
    isSessionActive, logoutSession, globalSearch
  } = useMasterAdmin();

  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({ planners: [], customers: [], bookings: [], tickets: [] });
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [time, setTime] = useState(new Date());

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-redirect if not logged in
  useEffect(() => {
    if (!isSessionActive) {
      navigate('/master-login');
    }
  }, [isSessionActive, navigate]);

  // Real-time clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut Ctrl+K to open search command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync search results when query changes
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setSearchResults(globalSearch(searchQuery));
    } else {
      setSearchResults({ planners: [], customers: [], bookings: [], tickets: [] });
    }
  }, [searchQuery]);

  // Trigger search focus
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Navigation Items
  const menuGroups = [
    {
      title: 'Platform Operations',
      items: [
        { path: '/master-control/overview', label: 'Mission Control', icon: LayoutDashboard },
        { 
          path: '/master-control/verifications', 
          label: 'Verification Center', 
          icon: FileCheck,
          badge: planners.filter(p => p.status === 'UNVERIFIED').length 
        },
        { path: '/master-control/users', label: 'User Management', icon: Users },
        { 
          path: '/master-control/live-trips', 
          label: 'Live Trips Operations', 
          icon: Radio,
          badge: riskAlerts.filter(a => a.type === 'SOS_ALERT' && a.status !== 'RESOLVED').length ? 'SOS' : null,
          badgeColor: 'bg-red-500'
        },
        { path: '/master-control/packages', label: 'Package Management', icon: Package },
        { path: '/master-control/bookings', label: 'Booking Desk', icon: Calendar },
        { path: '/master-control/payments', label: 'Payment Center', icon: Wallet },
      ]
    },
    {
      title: 'CRM & Legal Moderation',
      items: [
        { 
          path: '/master-control/customer-care', 
          label: 'Support Desk CRM', 
          icon: Headphones,
          badge: tickets.filter(t => t.status === 'OPEN').length 
        },
        { 
          path: '/master-control/disputes', 
          label: 'Disputes & Reports', 
          icon: Scale,
          badge: disputes.filter(d => d.status === 'UNDER_INVESTIGATION').length 
        },
        { path: '/master-control/reviews', label: 'Review Moderation', icon: MessageSquare },
      ]
    },
    {
      title: 'Growth & Security Core',
      items: [
        { path: '/master-control/marketing', label: 'Marketing Announcements', icon: Megaphone },
        { path: '/master-control/analytics', label: 'Executive Analytics', icon: BarChart3 },
        { 
          path: '/master-control/fraud-audit', 
          label: 'Fraud & Audit Logs', 
          icon: AlertTriangle,
          badge: riskAlerts.filter(a => a.status === 'PENDING').length 
        },
        { path: '/master-control/settings', label: 'Platform Config', icon: Settings },
      ]
    }
  ];

  const handleSystemLockdown = () => {
    const confirm = window.confirm('WARNING: You are about to initiate a platform-wide EMERGENCY LOCKDOWN. This will restrict transactional operations and notify administrators. Proceed?');
    if (confirm) {
      triggerEmergencyLockdown();
      toast.error('Emergency Lockdown Mode Initiated!');
    }
  };

  const handleLogout = () => {
    logoutSession();
    toast.info('Session Terminated.');
    navigate('/master-login');
  };

  // Format date helper
  const formatIST = (d: Date) => {
    return d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' IST';
  };

  const formatUTC = (d: Date) => {
    return d.toUTCString().slice(17, 25) + ' UTC';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex font-body selection:bg-cyan-500 selection:text-black">
      
      {/* ==========================================
          SIDEBAR NAVIGATION (DESKTOP)
          ========================================== */}
      <aside className="hidden lg:flex flex-col w-72 bg-gray-900 border-r border-gray-850 shrink-0 sticky top-0 h-screen select-none">
        
        {/* Brand Banner */}
        <div className="p-6 border-b border-gray-850 flex items-center justify-between">
          <Link to="/master-control/overview" className="flex items-center gap-2">
            <ShieldCheck className="text-cyan-400 w-7 h-7 filter drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-pulse" />
            <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              BEACON CENTRAL
            </span>
          </Link>
          <div className="px-2 py-0.5 rounded text-[10px] font-medium border border-cyan-500/20 bg-cyan-950/20 text-cyan-400">
            ROOT
          </div>
        </div>

        {/* Navigation links container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-thin">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <h3 className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                {group.title}
              </h3>
              <nav className="space-y-1">
                {group.items.map((item, iIdx) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={iIdx}
                      to={item.path}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                        isActive 
                          ? 'bg-gradient-to-r from-cyan-950/40 to-cyan-900/10 border border-cyan-500/20 text-cyan-400 glow-cyan-sm' 
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-gray-200'} />
                        <span>{item.label}</span>
                      </div>
                      
                      {/* Dynamic badge indicator */}
                      {item.badge !== undefined && item.badge !== null && item.badge !== 0 && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-cyan-500 text-black'}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User Card & Logout bottom */}
        <div className="p-4 border-t border-gray-850 bg-gray-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400">
              {currentRole[0]}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold truncate">{currentRole}</span>
              <span className="text-[10px] text-green-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Active
              </span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* ==========================================
          MOBILE DRAWER SIDEBAR
          ========================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity">
          <div className="w-72 bg-gray-900 border-r border-gray-850 h-full flex flex-col justify-between animate-[slideIn_0.2s_ease-out]">
            <div>
              <div className="p-6 border-b border-gray-850 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-cyan-400 w-6 h-6 animate-pulse" />
                  <span className="font-extrabold text-md tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                    BEACON CENTRAL
                  </span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded bg-gray-800 text-gray-400 hover:text-gray-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto px-4 py-4 space-y-5 max-h-[75vh]">
                {menuGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-2.5">
                    <h3 className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      {group.title}
                    </h3>
                    <nav className="space-y-1">
                      {group.items.map((item, iIdx) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                          <Link
                            key={iIdx}
                            to={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                              isActive 
                                ? 'bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 glow-cyan-sm' 
                                : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40 border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon size={16} className={isActive ? 'text-cyan-400' : 'text-gray-400'} />
                              <span>{item.label}</span>
                            </div>
                            {item.badge !== undefined && item.badge !== null && item.badge !== 0 && (
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor || 'bg-cyan-500 text-black'}`}>
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-850 bg-gray-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400">
                  {currentRole[0]}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate leading-tight">{currentRole}</span>
                  <span className="text-[9px] text-green-400 font-medium">NODE ACTIVE</span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-950/20 rounded transition-colors cursor-pointer"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MAIN AREA CONTENT
          ========================================== */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* ==========================================
            TOP HEADER / COMMAND BAR
            ========================================== */}
        <header className="sticky top-0 z-30 h-16 border-b border-gray-850 bg-gray-900/60 backdrop-blur-xl px-4 lg:px-8 flex items-center justify-between select-none">
          
          {/* Left section: Search & Command trigger */}
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
            >
              <Menu size={20} />
            </button>

            {/* Ctrl+K search launch input */}
            <div 
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center justify-between w-full max-w-sm pl-4 pr-2.5 py-1.5 rounded-xl border border-gray-800 bg-gray-950/50 hover:bg-gray-950/80 hover:border-gray-700 text-gray-500 text-xs font-medium cursor-pointer transition-all duration-150"
            >
              <span className="flex items-center gap-2">
                <Search size={14} className="text-gray-500" />
                Global Search console
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-gray-900 border border-gray-850 text-[10px] text-gray-400">
                Ctrl+K
              </kbd>
            </div>
          </div>

          {/* Right section: System clock, websocket pulse, mode indicator, role selector, lockdown */}
          <div className="flex items-center gap-3 lg:gap-5">
            
            {/* Clock Diagnostics */}
            <div className="hidden xl:flex flex-col text-right font-medium text-[10px] text-gray-400">
              <span className="flex items-center gap-1.5 justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                {formatIST(time)}
              </span>
              <span className="text-gray-600">{formatUTC(time)}</span>
            </div>

            {/* Platform Status Badge */}
            <div className="flex items-center gap-2">
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-medium font-bold tracking-wider flex items-center gap-1.5 border shadow-sm ${
                systemMode === 'LIVE' 
                  ? 'bg-green-950/30 border-green-500/20 text-green-400 glow-cyan-sm'
                  : systemMode === 'MAINTENANCE'
                  ? 'bg-amber-950/30 border-amber-500/20 text-amber-400'
                  : 'bg-red-950/30 border-red-500/20 text-red-500 animate-pulse'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  systemMode === 'LIVE' 
                    ? 'bg-green-400 animate-ping'
                    : systemMode === 'MAINTENANCE'
                    ? 'bg-amber-400 animate-pulse'
                    : 'bg-red-500'
                }`} />
                {systemMode}
              </div>
            </div>

            {/* Role Switcher Selector */}
            <div className="relative">
              <button 
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="px-3 py-1.5 rounded-xl border border-gray-800 bg-gray-950/50 hover:bg-gray-950 text-xs font-medium font-semibold flex items-center gap-2 text-cyan-400 hover:border-cyan-500/30 transition-all cursor-pointer"
              >
                <span>{currentRole}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {roleDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setRoleDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-805 rounded-xl shadow-2xl z-50 p-1.5 text-xs">
                    <div className="px-2.5 py-1.5 text-[9px] font-medium text-gray-500 uppercase border-b border-gray-850 tracking-wider">
                      Switch Agent Scope
                    </div>
                    <div className="max-h-60 overflow-y-auto pt-1">
                      {[
                        'Super Admin',
                        'CEO',
                        'Operations Head',
                        'Verification Manager',
                        'Finance Manager',
                        'Customer Care Manager',
                        'Legal Officer',
                        'Marketing Executive'
                      ].map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setCurrentRole(role as AdminRole);
                            setRoleDropdownOpen(false);
                            toast.success(`Role Switched to ${role}`);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors text-[11px] mb-0.5 cursor-pointer ${
                            currentRole === role
                              ? 'bg-cyan-950/50 text-cyan-400 border border-cyan-500/20 font-bold'
                              : 'text-gray-400 hover:text-gray-100 hover:bg-gray-850 border border-transparent'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Emergency Action Lockdown Button */}
            {systemMode !== 'EMERGENCY_LOCKDOWN' ? (
              <button 
                onClick={handleSystemLockdown}
                className="px-3.5 py-1.5 rounded-xl bg-red-650 hover:bg-red-550 active:scale-95 text-gray-950 font-bold text-xs font-medium shadow-md shadow-red-950/20 flex items-center gap-1 cursor-pointer transition-all uppercase"
                title="Initiate emergency security lockdown"
              >
                <ShieldAlert size={14} /> Lockdown
              </button>
            ) : (
              <span className="px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500 text-red-500 font-bold text-xs font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> LOCKDOWN ACTIVE
              </span>
            )}

          </div>
        </header>

        {/* ==========================================
            OUTLET ROUTED PAGE CONTENT
            ========================================== */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 scrollbar-thin">
          {systemMode === 'EMERGENCY_LOCKDOWN' && (
            <div className="mb-6 p-4 rounded-2xl bg-red-950/20 border border-red-500/40 text-red-400 flex items-start gap-3 shadow-lg glow-cyan-sm relative overflow-hidden">
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-red-500/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
              <ShieldAlert className="shrink-0 mt-0.5 text-red-500 w-5 h-5 animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm uppercase tracking-wider font-heading">
                  EMERGENCY SHIELD ACTIVE
                </h4>
                <p className="text-xs text-red-400/80 leading-relaxed font-medium">
                  Super Admin initiated a platforms-wide operational freeze. Database writes are throttled, payouts are halted, and packages are protected from public visibility. Monitor active security cases on the <Link to="/master-control/fraud-audit" className="underline text-red-300 font-bold hover:text-white">Fraud Ledger</Link>.
                </p>
              </div>
            </div>
          )}
          <Outlet />
        </main>
      </div>

      {/* ==========================================
          COMMAND PALETTE DIALOG (Ctrl+K MODAL)
          ========================================== */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setSearchOpen(false)} />
          <div className="relative w-full max-w-xl bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl p-6 overflow-hidden animate-[scaleUp_0.15s_ease-out]">
            
            {/* Search inputs */}
            <div className="flex items-center gap-3 border-b border-gray-850 pb-4 mb-4">
              <Search className="text-gray-400 shrink-0" size={18} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to find Planners, Bookings, Tickets, Actions..."
                className="w-full bg-transparent border-none text-gray-200 outline-none placeholder-gray-500 text-sm font-medium"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded bg-gray-800 text-gray-500 hover:text-gray-200 text-xs font-medium"
              >
                ESC
              </button>
            </div>

            {/* Results listing */}
            {searchQuery.trim().length === 0 ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 font-medium">
                    System Quick Actions
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button 
                      onClick={() => { navigate('/master-control/overview'); setSearchOpen(false); }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-gray-950/50 hover:bg-cyan-950/20 hover:text-cyan-400 border border-gray-850 text-left transition-colors font-medium"
                    >
                      <ChevronRight size={12} /> Go to Mission Control
                    </button>
                    <button 
                      onClick={() => { navigate('/master-control/settings'); setSearchOpen(false); }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-gray-950/50 hover:bg-cyan-950/20 hover:text-cyan-400 border border-gray-850 text-left transition-colors font-medium"
                    >
                      <ChevronRight size={12} /> Configure System Flags
                    </button>
                    <button 
                      onClick={() => { navigate('/master-control/fraud-audit'); setSearchOpen(false); }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-gray-950/50 hover:bg-cyan-950/20 hover:text-cyan-400 border border-gray-850 text-left transition-colors font-medium"
                    >
                      <ChevronRight size={12} /> Read Audit logs
                    </button>
                    <button 
                      onClick={() => { handleSystemLockdown(); setSearchOpen(false); }}
                      className="flex items-center gap-2 p-2 rounded-xl bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/30 text-left transition-colors font-medium font-bold"
                    >
                      <ChevronRight size={12} /> Trigger System Lockdown
                    </button>
                  </div>
                </div>
                <div className="text-center py-6 text-gray-600 text-xs font-medium border border-dashed border-gray-850 rounded-2xl">
                  Press Ctrl+K at any time to open this command portal
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {/* Planners results */}
                {searchResults.planners.length > 0 && (
                  <div>
                    <h5 className="text-[9px] font-bold font-medium text-cyan-400 uppercase tracking-wider mb-1.5">
                      Planners ({searchResults.planners.length})
                    </h5>
                    <div className="space-y-1">
                      {searchResults.planners.map((p: any) => (
                        <div 
                          key={p.id}
                          onClick={() => { navigate('/master-control/users'); setSearchOpen(false); }}
                          className="p-2 rounded-xl hover:bg-gray-950/60 flex items-center justify-between text-xs cursor-pointer border border-transparent hover:border-gray-800"
                        >
                          <div>
                            <p className="font-bold">{p.agencyName}</p>
                            <p className="text-[10px] text-gray-500 font-medium">Owner: {p.ownerName} | ID: {p.id}</p>
                          </div>
                          <ChevronRight size={14} className="text-gray-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Customers results */}
                {searchResults.customers.length > 0 && (
                  <div>
                    <h5 className="text-[9px] font-bold font-medium text-cyan-400 uppercase tracking-wider mb-1.5">
                      Travelers ({searchResults.customers.length})
                    </h5>
                    <div className="space-y-1">
                      {searchResults.customers.map((c: any) => (
                        <div 
                          key={c.id}
                          onClick={() => { navigate('/master-control/users'); setSearchOpen(false); }}
                          className="p-2 rounded-xl hover:bg-gray-950/60 flex items-center justify-between text-xs cursor-pointer border border-transparent hover:border-gray-800"
                        >
                          <div>
                            <p className="font-bold">{c.name}</p>
                            <p className="text-[10px] text-gray-500 font-medium">Email: {c.email} | ID: {c.id}</p>
                          </div>
                          <ChevronRight size={14} className="text-gray-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bookings results */}
                {searchResults.bookings.length > 0 && (
                  <div>
                    <h5 className="text-[9px] font-bold font-medium text-cyan-400 uppercase tracking-wider mb-1.5">
                      Bookings ({searchResults.bookings.length})
                    </h5>
                    <div className="space-y-1">
                      {searchResults.bookings.map((b: any) => (
                        <div 
                          key={b.id}
                          onClick={() => { navigate('/master-control/bookings'); setSearchOpen(false); }}
                          className="p-2 rounded-xl hover:bg-gray-950/60 flex items-center justify-between text-xs cursor-pointer border border-transparent hover:border-gray-800"
                        >
                          <div>
                            <p className="font-bold font-medium text-cyan-300">{b.id}</p>
                            <p className="text-[10px] text-gray-500 leading-tight">Pkg: {b.packageTitle} | Guest: {b.customerName}</p>
                          </div>
                          <ChevronRight size={14} className="text-gray-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tickets results */}
                {searchResults.tickets.length > 0 && (
                  <div>
                    <h5 className="text-[9px] font-bold font-medium text-cyan-400 uppercase tracking-wider mb-1.5">
                      Support Tickets ({searchResults.tickets.length})
                    </h5>
                    <div className="space-y-1">
                      {searchResults.tickets.map((t: any) => (
                        <div 
                          key={t.id}
                          onClick={() => { navigate('/master-control/customer-care'); setSearchOpen(false); }}
                          className="p-2 rounded-xl hover:bg-gray-950/60 flex items-center justify-between text-xs cursor-pointer border border-transparent hover:border-gray-800"
                        >
                          <div>
                            <p className="font-bold flex items-center gap-1.5 font-medium text-yellow-500">
                              {t.id} <span className={`text-[9px] px-1 rounded uppercase font-bold text-black ${t.priority === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-400'}`}>{t.priority}</span>
                            </p>
                            <p className="text-[10px] text-gray-500 leading-tight truncate max-w-[420px]">{t.subject}</p>
                          </div>
                          <ChevronRight size={14} className="text-gray-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No results indicator */}
                {searchResults.planners.length === 0 && searchResults.customers.length === 0 && searchResults.bookings.length === 0 && searchResults.tickets.length === 0 && (
                  <div className="text-center py-8 text-gray-600 text-xs font-medium">
                    No matching records found. Refine your query parameters.
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
