'use client'
import { useState, useRef, useEffect, memo } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'


/* ── 3D Tilt Card ────────────────────────────────────────────── */
const TiltImage = memo(function TiltImage({ src, alt, delay, inView }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 22 })
  const sy = useSpring(y, { stiffness: 180, damping: 22 })
  const rotateX = useTransform(sy, [-60, 60], [8, -8])
  const rotateY = useTransform(sx, [-60, 60], [-8, 8])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left - r.width / 2)
    y.set(e.clientY - r.top - r.height / 2)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, type: 'spring', stiffness: 80, damping: 16 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '3/4', transformStyle: 'preserve-3d', perspective: 600 }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d', width: '100%', height: '100%' }}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* gloss overlay */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: useTransform([sx, sy], ([mx, my]) =>
              `radial-gradient(circle at ${50 + mx * 0.3}% ${50 + my * 0.3}%, rgba(255,255,255,0.18), transparent 60%)`
            ),
          }}
        />
      </motion.div>
    </motion.div>
  )
})

/* ── Animated Stat ───────────────────────────────────────────── */
const AnimatedStat = memo(function AnimatedStat({ value, label, light, inView, delay }) {
  const isNum = /^\d/.test(value)
  const mv = useMotionValue(0)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!isNum) return
    return mv.on('change', v => {
      const n = Math.round(v)
      setDisplay(value.includes('+') ? `${n.toLocaleString()}+` : n.toLocaleString())
    })
  }, [mv, isNum, value])

  useEffect(() => {
    if (!inView || !isNum) return
    const target = parseInt(value.replace(/\D/g, '')) || 0
    const ctrl = animate(mv, target, { duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] })
    return ctrl.stop
  }, [inView])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: light ? 'rgba(253,246,240,0.5)' : 'rgba(255,255,255,0.08)',
        border: `1px solid ${light ? '#E8C4B8' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 12, padding: '14px 20px',
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 800, color: light ? '#2A1A20' : '#FFFFFF', letterSpacing: '-0.8px', fontVariantNumeric: 'tabular-nums' }}>
        {display}
      </div>
      <div style={{ fontSize: 12, color: light ? '#D4968A' : 'rgba(255,255,255,0.55)', marginTop: 2, fontWeight: 500 }}>{label}</div>
    </motion.div>
  )
})

const lairImages = [
  { src: '/images/male1.jpeg', alt: 'The Lair — industrial seating' },
  { src: '/images/male2.jpeg', alt: 'The Lair — gym-café hybrid' },
  { src: '/images/male3.jpeg', alt: 'The Lair — dark lounge' },
]
const gardenImages = [
  { src: '/images/female1.png', alt: 'The Garden — arched interior' },
  { src: '/images/female2.png', alt: 'The Garden — cherry blossom' },
  { src: '/images/female3.png', alt: 'The Garden — cream and blush' },
]

export default function Zones() {
  const [zone, setZone] = useState('lair')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLair = zone === 'lair'
  const images = isLair ? lairImages : gardenImages

  return (
    <section ref={ref} id="zones" style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div className="hn-c" style={{ maxWidth: 1400, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <div style={{ display: 'inline-block', background: '#F5F5F3', border: '1px solid #E8E8E5', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6B6B6B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>The Zones</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#1C1C1C', lineHeight: 1.05 }}>
            Two spaces. One mission.
          </h2>
        </motion.div>

        {/* Zone switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="zone-tabs-outer" style={{ marginBottom: 40 }}
        >
          <div style={{ display: 'inline-flex', background: '#F5F5F3', borderRadius: 14, padding: 4, gap: 4, position: 'relative' }}>
            {[
              { id: 'lair', label: "The Lair — Men's Zone" },
              { id: 'garden', label: "The Garden — Women's Zone" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setZone(tab.id)}
                style={{
                  position: 'relative', padding: '12px 24px', borderRadius: 10,
                  border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                  background: 'transparent',
                  color: zone === tab.id ? (tab.id === 'lair' ? '#FFFFFF' : '#2A1A20') : '#6B6B6B',
                  zIndex: 1, transition: 'color 0.25s',
                }}
              >
                {zone === tab.id && (
                  <motion.div
                    layoutId="zone-pill"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 10,
                      background: tab.id === 'lair' ? '#2A1F1A' : '#F7D6D0',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Zone panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={zone}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderRadius: 28, overflow: 'hidden',
              background: isLair ? '#2A1F1A' : '#FDF6F0',
            }}
          >
            <div className="zone-panel-grid">
              {/* Left: info */}
              <div className="zone-info">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'inline-block', borderRadius: 100, padding: '5px 14px', marginBottom: 24,
                    background: isLair ? 'rgba(192,57,43,0.2)' : '#E8C4B8',
                    border: `1px solid ${isLair ? 'rgba(192,57,43,0.4)' : '#D4968A'}`,
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 700, color: isLair ? '#F1948A' : '#8B4513', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {isLair ? "Men's Zone" : "Women's Zone"}
                  </span>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: 'clamp(36px, 4vw, 58px)', fontWeight: isLair ? 900 : 700,
                    color: isLair ? '#FFFFFF' : '#2A1A20',
                    letterSpacing: isLair ? '-2px' : '-1.5px',
                    fontFamily: isLair ? 'inherit' : "'Playfair Display', serif",
                    lineHeight: 1.0, marginBottom: 12,
                  }}
                >
                  {isLair ? 'The Lair' : 'The Garden'}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.22 }}
                  style={{ fontSize: 15, fontWeight: 500, color: isLair ? 'rgba(255,255,255,0.65)' : '#D4968A', marginBottom: 24 }}
                >
                  {isLair ? 'Strength, discipline, character.' : 'Harmony, beauty, lightness.'}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.28 }}
                  style={{ fontSize: 15, lineHeight: 1.7, color: isLair ? 'rgba(255,255,255,0.7)' : '#6B5C58', marginBottom: 36, maxWidth: '38ch' }}
                >
                  {isLair
                    ? 'More caloric. Protein-forward. Heavier portions built for density and energy to power serious training loads.'
                    : 'Light. Balanced. Lighter portions with precision macro balance and aesthetic plating designed for mindful eating.'}
                </motion.p>

                <div className="zone-stats">
                  {isLair ? (
                    <>
                      <AnimatedStat value="2800+" label="Daily calories" light={false} inView={inView} delay={0.4} />
                      <AnimatedStat value="180+" label="Daily protein (g)" light={false} inView={inView} delay={0.5} />
                      <AnimatedStat value="100%" label="Training-optimised" light={false} inView={inView} delay={0.6} />
                    </>
                  ) : (
                    <>
                      <AnimatedStat value="1600" label="Daily calories" light={true} inView={inView} delay={0.4} />
                      <AnimatedStat value="Balanced" label="Macro ratio" light={true} inView={inView} delay={0.5} />
                      <AnimatedStat value="Aesthetic" label="Plating style" light={true} inView={inView} delay={0.6} />
                    </>
                  )}
                </div>
              </div>

              {/* Right: 3D tilt gallery */}
              <div className="zone-img-right">
                <div className="zone-img-grid">
                  {images.map((img, i) => (
                    <TiltImage key={img.src} src={img.src} alt={img.alt} delay={0.15 * i} inView={inView} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  )
}
