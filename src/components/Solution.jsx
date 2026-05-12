'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pillars = [
  { num: '01', title: 'AI Diet Assistant', desc: 'Your personal nutrition engine. Learns your goals, adjusts macros in real-time, and recommends the right meal every visit.', accent: '#C0392B' },
  { num: '02', title: 'Real-Time Health Sync', desc: 'Integrated with your wearables and gym membership. Your workouts feed directly into your meal recommendations.', accent: '#B8962E' },
  { num: '03', title: 'Smart Menu Engine', desc: 'Two zone-specific menus calibrated for your body. Every item macro-tagged. Nothing generic, nothing empty.', accent: '#C0392B' },
  { num: '04', title: 'Physical Ecosystem', desc: 'A real space purpose-built for health. Two distinct atmospheres. One for power. One for balance.', accent: '#B8962E' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 90, damping: 18 },
  },
}

export default function Solution() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 80px' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}
        >
          <div>
            <div style={{ display: 'inline-block', background: '#FEF9EC', border: '1px solid #F5D76E', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#B8962E', letterSpacing: '0.08em', textTransform: 'uppercase' }}>The Solution</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#1C1C1C', lineHeight: 1.05 }}>
              Four pillars of a<br />complete ecosystem
            </h2>
          </div>
          <p style={{ fontSize: 16, color: '#6B6B6B', maxWidth: '44ch', lineHeight: 1.65 }}>
            We built the infrastructure that connects your nutrition, your fitness, and your daily routine into one intelligent system.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: '#E8E8E5', borderRadius: 24, overflow: 'hidden' }}
        >
          {pillars.map((p) => (
            <motion.div
              key={p.num}
              variants={cardVariants}
              whileHover={{
                background: '#FAFAFA',
                boxShadow: 'inset 0 0 0 1px rgba(192,57,43,0.15)',
                transition: { duration: 0.2 },
              }}
              style={{ background: '#FFFFFF', padding: '40px 36px 44px', cursor: 'default' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.3 }}
                style={{ fontSize: 13, fontWeight: 700, color: p.accent, letterSpacing: '0.08em', marginBottom: 32 }}
              >
                {p.num}
              </motion.div>
              <h3 style={{ fontSize: 21, fontWeight: 800, color: '#1C1C1C', marginBottom: 14, letterSpacing: '-0.4px', lineHeight: 1.2 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.7 }}>{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){
        section > div { padding: 0 24px !important; }
        section > div > div:last-child { grid-template-columns: 1fr !important; gap: 1px !important; }
      }`}</style>
    </section>
  )
}
