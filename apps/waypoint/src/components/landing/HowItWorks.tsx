import { motion } from 'framer-motion'
import { Compass, MousePointerClick, CalendarCheck, PlaneTakeoff } from 'lucide-react'

const steps = [
  { id: 1, title: 'Discover', description: 'Explore our handpicked destinations and AI-curated itineraries tailored to your preferences.', icon: Compass },
  { id: 2, title: 'Choose', description: 'Select the perfect travel package or let a verified planner customize every detail.', icon: MousePointerClick },
  { id: 3, title: 'Book', description: 'Secure your trip with our seamless, protected online booking and payment system.', icon: CalendarCheck },
  { id: 4, title: 'Travel', description: 'Enjoy your journey with real-time updates and 24/7 support right in your pocket.', icon: PlaneTakeoff },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-page overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            How Waypoint <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Your dream vacation is just a few clicks away. We make travel planning effortless.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-border">
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-cyan to-teal"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center relative group"
              >
                <div className="w-24 h-24 rounded-full bg-surface border-2 border-teal/20 flex items-center justify-center mb-6 group-hover:border-teal group-hover:shadow-[0_0_20px_rgba(0,203,224,0.3)] transition-all duration-300 relative z-10 bg-page">
                  <step.icon className="w-10 h-10 text-teal group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center border-2 border-page">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
                <p className="text-muted text-sm px-2">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
