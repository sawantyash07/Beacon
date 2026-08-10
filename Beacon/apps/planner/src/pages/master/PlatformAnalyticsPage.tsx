import { useState } from 'react';
import { useMasterAdmin } from '@/data/masterAdminData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { BarChart3, TrendingUp, DollarSign, Calendar, Compass, Star, Users } from 'lucide-react';

export default function PlatformAnalyticsPage() {
  const { planners } = useMasterAdmin();

  // Selected date filter
  const [dateRange, setDateRange] = useState('6m');

  // Forecast slider state
  const [growthMultiplier, setGrowthMultiplier] = useState(15); // e.g. 15% MoM projected

  // Simulated Monthly Revenue Series Data (6 Months)
  const revenueData = [
    { month: 'Mar', revenue: 11200000, bookings: 980 },
    { month: 'Apr', revenue: 12400500, bookings: 1120 },
    { month: 'May', revenue: 13900000, bookings: 1240 },
    { month: 'Jun', revenue: 12900000, bookings: 1040 },
    { month: 'Jul', revenue: 14842000, bookings: 1342 },
    { month: 'Aug', revenue: 16100000, bookings: 1480 }
  ];

  // Destination Distribution Data
  const destinationData = [
    { name: 'Leh Ladakh', value: 35, color: '#00D4FF' },
    { name: 'Goa Coast', value: 45, color: '#008CFF' },
    { name: 'Spiti Valley', value: 12, color: '#8B5CF6' },
    { name: 'Others', value: 8, color: '#3B82F6' }
  ];

  // Forecast calculator
  const currentTotalRevenue = 148420000; // ₹14.84 Cr
  const projectedRevenue = Math.round(currentTotalRevenue * (1 + (growthMultiplier / 100)));

  return (
    <div className="space-y-8 select-none">
      
      {/* Header and date filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-850 pb-4">
        <div>
          <h1 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <BarChart3 className="text-cyan-400" /> Executive Business Intelligence
          </h1>
          <p className="text-xs text-gray-500">
            Platform performance metrics, destination heatmaps, and financial forecasting simulations.
          </p>
        </div>

        <div className="flex bg-gray-955/65 p-1 rounded-xl text-[10px] font-mono border border-gray-855">
          {['3m', '6m', '12m'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3.5 py-1.5 rounded-lg font-bold cursor-pointer uppercase ${
                dateRange === range ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats cards overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        {[
          { label: 'Avg Booking Value (ABV)', value: '₹24,850', sub: '+4.2% vs last month', color: 'text-cyan-300' },
          { label: 'Retention Cohort Rate', value: '64.2%', sub: 'Customer repeat bookings MoM', color: 'text-purple-400' },
          { label: 'Platform Refund Ratio', value: '1.15%', sub: 'Target target: below 2.0%', color: 'text-green-400' },
          { label: 'Average Cancellation Rate', value: '2.45%', sub: 'Includes operator cancels', color: 'text-blue-400' }
        ].map((stat, idx) => (
          <div key={idx} className="border border-gray-855 bg-gray-900/40 p-4 rounded-2xl shadow-lg">
            <span className="text-[10px] text-gray-500 uppercase block mb-1">{stat.label}</span>
            <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
            <span className="text-[9px] text-gray-600 block mt-1">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* ==========================================
          CHARTS BLOCK
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Revenue Area Chart */}
        <div className="lg:col-span-8 border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between border-b border-gray-850 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-1.5">
              <DollarSign size={14} className="text-cyan-400" /> Monthly Revenue Trend
            </h4>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00D4FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" opacity={0.3} />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937' }} />
                <Area type="monotone" dataKey="revenue" stroke="#00D4FF" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Destination Pie Chart */}
        <div className="lg:col-span-4 border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex justify-between border-b border-gray-850 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-1.5">
              <Compass size={14} className="text-cyan-400" /> Destination Share
            </h4>
          </div>
          <div className="h-64 flex flex-col justify-center">
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#1f2937' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Custom legends */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400">
              {destinationData.map((d, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span>{d.name} ({d.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
          BOTTOM ROW: TOP PLANNERS & PROJECTION SLIDER
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Planners leaderboard */}
        <div className="lg:col-span-7 border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-1.5 border-b border-gray-850 pb-3">
            <Star size={14} className="text-yellow-500" /> Operational Leaderboard (Top Agencies)
          </h4>
          <div className="overflow-x-auto text-[11px] font-mono">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-855 text-gray-500 pb-2">
                  <th className="pb-2">Agency Name</th>
                  <th className="pb-2">Total Revenue</th>
                  <th className="pb-2">Bookings Count</th>
                  <th className="pb-2 text-center">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-855/40 text-gray-300">
                {planners.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-855/10">
                    <td className="py-2.5 font-bold flex items-center gap-2">
                      <span className="text-gray-500 font-bold">{idx + 1}.</span> {p.agencyName}
                    </td>
                    <td className="py-2.5 text-cyan-300">₹{p.revenue.toLocaleString()}</td>
                    <td className="py-2.5">{p.bookings} trips</td>
                    <td className="py-2.5 text-center text-yellow-500 font-bold">★ {p.rating || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Projection forecasting calculator */}
        <div className="lg:col-span-5 border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-1.5 border-b border-gray-850 pb-3">
              <TrendingUp size={14} className="text-cyan-400 animate-pulse" /> Revenue Projections Forecast
            </h4>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-gray-400">
                  <span>Projected Growth MoM</span>
                  <span className="text-cyan-400 font-bold">{growthMultiplier}% Growth</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={45}
                  value={growthMultiplier}
                  onChange={(e) => setGrowthMultiplier(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-850 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Projections calculations */}
              <div className="bg-gray-955/40 border border-gray-855 p-4 rounded-2xl space-y-3 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>Current Annualized Base:</span>
                  <span className="text-gray-200">₹{(currentTotalRevenue / 10000000).toFixed(2)} Cr</span>
                </div>
                <div className="flex justify-between border-t border-gray-850/40 pt-2">
                  <span>Projected Annualised Target:</span>
                  <span className="text-cyan-400 font-bold">₹{(projectedRevenue / 10000000).toFixed(2)} Cr</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Net Commission:</span>
                  <span className="text-yellow-500">₹{((projectedRevenue * 0.1) / 10000000).toFixed(2)} Cr (10% Tier)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[9px] text-gray-500 font-mono mt-3 leading-relaxed">
            * Forecaster computations are mock-simulated algorithms based on linear platform projections.
          </div>
        </div>

      </div>

    </div>
  );
}
