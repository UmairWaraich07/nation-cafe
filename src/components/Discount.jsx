'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

/* ── Animated percent counter ────────────────────────────────── */
function CountPct({ inView, delay }) {
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState('0%')

  useEffect(() => {
    return mv.on('change', v => setDisplay(`${Math.round(v)}%`))
  }, [mv])

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(mv, 50, { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] })
    return ctrl.stop
  }, [inView])

  return <span>{display}</span>
}

const heroGroups = [
  {
    title: 'Military',
    desc: 'Active duty and veterans of all branches receive permanent 50% discount on all orders.',
    icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  },
  {
    title: 'Police',
    desc: 'Law enforcement officers and police force members qualify for 50% off every meal.',
    icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.59 3.824 10.29 9 11.622 5.176-1.332 9-6.032 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" /></svg>,
  },
  {
    title: 'Law Enforcement',
    desc: 'All other law enforcement and emergency services personnel receive the same 50% benefit.',
    icon: <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
  },
]

const tiers = [
  { name: 'Standard Member', discount: 10, desc: 'Any active gym partner membership', color: '#6B6B6B' },
  { name: 'Gold Member', discount: 20, desc: '6+ months consecutive attendance', color: '#C0392B' },
  { name: 'Elite Member', discount: 30, desc: '12+ months + 3× / week minimum', color: '#B8962E' },
]

function TierBar({ pct, color, inView, delay }) {
  const mv = useMotionValue(0)
  const width = useTransform(mv, v => `${v}%`)

  useEffect(() => {
    if (!inView) return
    const ctrl = animate(mv, pct, { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] })
    return ctrl.stop
  }, [inView])

  return (
    <div style={{ height: 4, background: '#F5F5F3', borderRadius: 2, overflow: 'hidden', marginTop: 12 }}>
      <motion.div style={{ height: '100%', background: color, borderRadius: 2, width }} />
    </div>
  )
}

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const cardItem = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 85, damping: 16 } },
}

export default function Discount() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ background: '#F5F5F3', padding: '100px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 80px' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ display: 'inline-block', background: '#FEF3F2', border: '1px solid #FECACA', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#C0392B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Rewards & Discounts</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#1C1C1C', lineHeight: 1.05 }}>
            Built for those who<br />serve and perform.
          </h2>
        </motion.div>

        {/* Hero group cards */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 48 }}
        >
          {heroGroups.map((g, i) => (
            <motion.div
              key={g.title}
              variants={cardItem}
              whileHover={{ y: -6, boxShadow: '0 28px 56px -20px rgba(0,0,0,0.25)', transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              style={{ background: '#1C1C1C', borderRadius: 24, padding: '40px 36px 44px', position: 'relative', overflow: 'hidden' }}
            >
              {/* bg number */}
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 110, fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none' }}>
                50%
              </div>

              <motion.div
                whileHover={{ rotate: 12, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                style={{ color: '#C0392B', marginBottom: 20 }}
              >
                {g.icon}
              </motion.div>

              <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: '-2.5px', marginBottom: 8, color: '#C0392B', fontVariantNumeric: 'tabular-nums' }}>
                <CountPct inView={inView} delay={0.15 * i + 0.3} />
              </div>

              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#FFFFFF', marginBottom: 10 }}>{g.title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>{g.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tier pricing */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: '#FFFFFF', border: '1px solid #E8E8E5', borderRadius: 24, padding: '40px 40px 44px' }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1C1C1C', marginBottom: 6, letterSpacing: '-0.5px' }}>
            Gym Member Tiered Pricing
          </h3>
          <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 28 }}>
            Rewards scale with your commitment. The more consistent your training, the deeper your discount.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.55 + 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
                style={{
                  background: '#F5F5F3', borderRadius: 16, padding: '24px 24px 28px',
                  borderTop: `3px solid ${t.color}`,
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 900, color: t.color, letterSpacing: '-1.5px', marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>
                  {t.discount}%
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1C', marginBottom: 6 }}>{t.name}</div>
                <div style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 0 }}>{t.desc}</div>
                <TierBar pct={t.discount * 3} color={t.color} inView={inView} delay={0.6 + 0.1 * i} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:768px){
          section > div { padding: 0 24px !important; }
          section > div > div:nth-child(2) { grid-template-columns: 1fr !important; }
          section > div > div:last-child > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
