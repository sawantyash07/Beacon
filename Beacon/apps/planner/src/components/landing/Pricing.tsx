import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pricingPlans } from '@/data/mockData'
import { Button } from '@/components/ui/Button'

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Choose the plan that fits your travel business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-[16px] p-8 ${
                plan.popular
                  ? 'bg-navy text-white glow-cyan ring-2 ring-cyan/30 scale-105'
                  : 'bg-surface border border-border'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal text-white text-xs font-semibold rounded-full">
                  Most Popular
                </span>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-navy'}`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-white/60' : 'text-muted'}`}>
                {plan.description}
              </p>
              <div className="mb-8">
                <span className={`text-4xl font-bold font-mono ${plan.popular ? 'text-cyan' : 'text-navy'}`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-muted'}`}>/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.popular ? 'text-cyan' : 'text-teal'}`} />
                    <span className={plan.popular ? 'text-white/80' : 'text-muted'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className={`w-full ${plan.popular ? 'bg-teal hover:bg-teal/90' : ''}`}
                  glow={plan.popular}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
