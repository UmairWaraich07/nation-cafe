'use client'
import { useRef, useEffect, useState } from 'react'
import {
  motion, useMotionValue, useSpring, useTransform,
  useScroll, animate
} from 'framer-motion'

/* ── Magnetic Button ─────────────────────────────────────────── */
function MagneticBtn({ children, style, href }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.35)
    y.set((e.clientY - r.top - r.height / 2) * 0.35)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      href={href}
      style={{ ...style, x: sx, y: sy, display: 'inline-block', textDecoration: 'none' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.a>
  )
}

/* ── Counting Stat ───────────────────────────────────────────── */
function CountStat({ num, label, delay, inView }) {
  const isNumeric = /^\d/.test(num)
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    return mv.on('change', v => setDisplay(Math.round(v).toLocaleString()))
  }, [mv])

  useEffect(() => {
    if (!inView || !isNumeric) return
    const target = parseInt(num.replace(/\D/g, '')) || 0
    const ctrl = animate(mv, target, { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] })
    return ctrl.stop
  }, [inView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ fontSize: 28, fontWeight: 800, color: '#1C1C1C', letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>
        {isNumeric ? (
          <span>{display}{num.includes('+') ? '+' : ''}</span>
        ) : (
          <span>{num}</span>
        )}
      </div>
      <div style={{ fontSize: 13, color: '#6B6B6B', marginTop: 2 }}>{label}</div>
    </motion.div>
  )
}

/* ── Pulse Dot ───────────────────────────────────────────────── */
function PulseDot() {
  return (
    <div style={{ position: 'relative', width: 10, height: 10 }}>
      <motion.div
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: '#C0392B', opacity: 0.3,
        }}
        animate={{ scale: [1, 2.2, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
      />
      <div style={{ position: 'absolute', inset: 2, borderRadius: '50%', background: '#C0392B' }} />
    </div>
  )
}

/* ── Hero ────────────────────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <section
      ref={sectionRef}
      className="hero-wrap"
      style={{ paddingTop: 72 }}
    >
      {/* ── Left: text ─────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="hero-txt"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#FEF3F2', border: '1px solid #FECACA',
            borderRadius: 100, padding: '6px 14px', marginBottom: 28,
          }}>
            <PulseDot />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#C0392B', letterSpacing: '0.02em' }}>
              Coming to Riyadh 2026
            </span>
          </div>
        </motion.div>

        {/* Headline — word-by-word */}
        <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
          <h1 style={{
            fontSize: 'clamp(42px, 5vw, 76px)', fontWeight: 900,
            lineHeight: 1.0, letterSpacing: '-2.5px', color: '#1C1C1C',
          }}>
            {'Healthy'.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block' }}
              >{ch}</motion.span>
            ))}
            <br />
            {'Nation'.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block', color: '#C0392B' }}
              >{ch}</motion.span>
            ))}
            <br />
            {'Café'.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.78 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block' }}
              >{ch}</motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          style={{ fontSize: 18, color: '#6B6B6B', lineHeight: 1.65, maxWidth: '52ch', marginBottom: 40 }}
        >
          AI-powered nutrition and fitness ecosystem. Two zones — one for strength, one for balance. Every meal calibrated to your goals.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="hero-cta-row" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <MagneticBtn
            href="#contact"
            style={{
              background: '#C0392B', color: '#fff', padding: '14px 28px',
              borderRadius: 10, fontWeight: 700, fontSize: 15,
              boxShadow: '0 4px 24px rgba(192,57,43,0.35)',
            }}
          >
            Join the Waitlist
          </MagneticBtn>
          <MagneticBtn
            href="#partnerships"
            style={{
              background: 'transparent', color: '#1C1C1C', padding: '14px 28px',
              borderRadius: 10, fontWeight: 600, fontSize: 15,
              border: '1.5px solid #1C1C1C',
            }}
          >
            Become a Partner
          </MagneticBtn>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="hero-stats-row"
          style={{ display: 'flex', gap: 36, marginTop: 56 }}
        >
          {[
            { num: '2', label: 'Zones' },
            { num: '6', label: 'Menu Categories' },
            { num: '∞', label: 'Goal Combinations' },
          ].map(({ num, label }, i) => (
            <CountStat key={label} num={num} label={label} delay={0.9 + i * 0.1} inView={true} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Right: parallax image ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="hero-img"
      >
        <motion.img
          src="/images/20260512_173238.jpg"
          alt="Healthy Nation Café interior"
          style={{ width: '100%', height: '100%', objectFit: 'cover', y: imgY, scale: imgScale }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(255,255,255,0.18), transparent)',
        }} />

        {/* Floating badge over image */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', bottom: 36, left: 32,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.6)',
            borderRadius: 16, padding: '16px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <PulseDot />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C' }}>AI Nutrition Engine</div>
              <div style={{ fontSize: 11, color: '#6B6B6B' }}>Adapts to every workout</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  )
}
