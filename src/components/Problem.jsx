'use client'
import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'

const problems = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C0392B" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'No Personalization',
    desc: 'Generic menus ignore your body composition, fitness goals, and dietary restrictions.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C0392B" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: 'No Connection',
    desc: 'Your café, gym, and nutrition app exist in separate silos with no shared data.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C0392B" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'No Accountability',
    desc: 'Without a system tracking your intake and progress, consistency becomes impossible.',
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C0392B" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'No Execution',
    desc: "Plans are made but the physical infrastructure to support healthy living doesn't exist.",
  },
]

/* ── Spotlight card — border illuminates under cursor ─────────── */
function SpotlightCard({ children, delay, inView }) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(-400)
  const mouseY = useMotionValue(-400)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - r.left)
    mouseY.set(e.clientY - r.top)
  }
  const onLeave = () => { mouseX.set(-400); mouseY.set(-400) }

  const spotBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(200px circle at ${x}px ${y}px, rgba(192,57,43,0.08), transparent 70%)`
  )

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, type: 'spring', stiffness: 80, damping: 18 }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      style={{
        background: '#FFFFFF', border: '1px solid #E8E8E5', borderRadius: 20,
        padding: '36px 40px', cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* spotlight overlay */}
      <motion.div style={{ position: 'absolute', inset: 0, background: spotBg, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function Problem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="about" style={{ background: '#F5F5F3', padding: '100px 0' }}>
      <div className="hn-c" style={{ maxWidth: 1400, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 64 }}
        >
          <div style={{ display: 'inline-block', background: '#FEF3F2', border: '1px solid #FECACA', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#C0392B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>The Problem</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#1C1C1C', maxWidth: '18ch', lineHeight: 1.05 }}>
            Why healthy living fails in the real world
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="hn-g2" style={{ gap: 24 }}
        >
          {problems.map((p, i) => (
            <SpotlightCard key={p.title} delay={0.08 * i} inView={inView}>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i + 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                style={{ marginBottom: 20, width: 48, height: 48, background: '#FEF3F2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {p.icon}
              </motion.div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1C1C1C', marginBottom: 12, letterSpacing: '-0.3px' }}>{p.title}</h3>
              <p style={{ fontSize: 15, color: '#6B6B6B', lineHeight: 1.65 }}>{p.desc}</p>
            </SpotlightCard>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
