import { motion } from 'framer-motion'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { Card } from '@/components/ui/Card'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { revenueData, packagePerformance, genderDistribution } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

const COLORS = ['#0097A6', '#00CBE0', '#002349', '#5C7A88', '#D6EEF1']

const growthMetrics = [
  { label: 'Booking Growth', value: 23, suffix: '%' },
  { label: 'Revenue Growth', value: 18, suffix: '%' },
  { label: 'New Travelers', value: 156, suffix: '' },
  { label: 'Avg. Package Value', value: 2145, prefix: '$', suffix: '' },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Analytics</h1>
        <p className="text-muted text-sm mt-1">Track performance and growth metrics</p>
      </div>

      {/* Growth metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {growthMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card hover>
              <p className="text-sm text-muted mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-navy font-mono">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Monthly Bookings</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D6EEF1" />
              <XAxis dataKey="month" stroke="#5C7A88" fontSize={12} />
              <YAxis stroke="#5C7A88" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #D6EEF1' }} />
              <Bar dataKey="bookings" fill="#0097A6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Trend */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D6EEF1" />
              <XAxis dataKey="month" stroke="#5C7A88" fontSize={12} />
              <YAxis stroke="#5C7A88" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #D6EEF1', fontFamily: 'IBM Plex Mono' }}
                formatter={(value) => [formatCurrency(Number(value ?? 0)), 'Revenue']}
              />
              <Line type="monotone" dataKey="revenue" stroke="#00CBE0" strokeWidth={2} dot={{ fill: '#0097A6', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Package Performance */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Package Performance</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={packagePerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#D6EEF1" />
              <XAxis type="number" stroke="#5C7A88" fontSize={12} />
              <YAxis dataKey="name" type="category" stroke="#5C7A88" fontSize={12} width={60} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #D6EEF1' }} />
              <Bar dataKey="bookings" fill="#0097A6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Gender Distribution */}
        <Card>
          <h2 className="text-lg font-semibold text-navy mb-4">Traveler Demographics</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={genderDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
              >
                {genderDistribution.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #D6EEF1' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
