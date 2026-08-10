import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogs } from '@/data/mockData'
import { Link } from 'react-router-dom'

export function BlogSection() {
  return (
    <section className="py-24 px-4 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Latest Blogs & <span className="text-gradient">Travel Tips</span>
            </h2>
            <p className="text-muted">
              Get inspired by our expert guides, packing tips, and destination highlights.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/blogs">
              <button className="text-teal font-semibold flex items-center gap-2 hover:gap-3 transition-all hover:text-cyan">
                View All Articles <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blogs/${blog.id}`} className="group glass rounded-[20px] overflow-hidden border border-border/50 hover:border-teal/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full block">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-sm text-cyan text-xs font-bold px-3 py-1.5 rounded-full border border-cyan/20">
                  {blog.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {blog.date}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {blog.readTime}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-teal transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy group-hover:text-teal transition-colors">
                    Read More
                  </span>
                  <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal transition-colors">
                    <ArrowRight className="w-4 h-4 text-teal group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
