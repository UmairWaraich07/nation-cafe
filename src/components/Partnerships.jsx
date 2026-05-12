'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const partners = ['Fitness Time', 'Body Masters', 'Arena Fitness Innovation', 'GymNation', 'N2 Fitness']

const mechanics = [
  {
    title: 'Unified Memberships',
    desc: 'Your gym membership unlocks automatic discounts, zone access priority, and macro tracking sync at Healthy Nation Café.',
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#B8962E" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" /></svg>,
  },
  {
    title: 'In-Venue Touchpoints',
    desc: 'Branded kiosks and QR experiences inside partner gyms. Members can pre-order post-workout meals and track nutrition.',
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#B8962E" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
  },
  {
    title: 'Cross-Promotions',
    desc: 'Joint campaigns, shared loyalty points, and co-branded challenges that drive new members to both venues.',
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#B8962E" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>,
  },
]

/* ── Infinite partner marquee ────────────────────────────────── */
function Marquee() {
  const doubled = [...partners, ...partners, ...partners]
  return (
    <div style={{ overflow: 'hidden', background: '#F5F5F3', borderRadius: 20, border: '1px solid #E8E8E5', marginBottom: 64 }}>
      <motion.div
        style={{ display: 'flex', width: 'max-content' }}
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((name, i) => (
          <div
            key={i}
            style={{
              padding: '28px 48px', borderRight: '1px solid #E8E8E5', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 200,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: '#6B6B6B', whiteSpace: 'nowrap' }}>{name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardItem = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 16 } },
}

export default function Partnerships() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="partnerships" style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 80px' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 52 }}
        >
          <div style={{ display: 'inline-block', background: '#FEF9EC', border: '1px solid #F5D76E', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#B8962E', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Partnerships</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#1C1C1C', lineHeight: 1.05 }}>
            Integrated with the<br />fitness ecosystem.
          </h2>
        </motion.div>

        {/* Infinite marquee */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Marquee />
        </motion.div>

        {/* Mechanics cards */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {mechanics.map((m) => (
            <motion.div
              key={m.title}
              variants={cardItem}
              whileHover={{
                y: -6,
                boxShadow: '0 24px 48px -16px rgba(0,0,0,0.1)',
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              style={{ border: '1px solid #E8E8E5', borderRadius: 20, padding: '36px 36px 40px', background: '#FFFFFF' }}
            >
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                style={{ marginBottom: 20, width: 48, height: 48, background: '#FEF9EC', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {m.icon}
              </motion.div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1C1C1C', marginBottom: 12, letterSpacing: '-0.3px' }}>{m.title}</h3>
              <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.7 }}>{m.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media(max-width:768px){
          section > div { padding: 0 24px !important; }
          section > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
