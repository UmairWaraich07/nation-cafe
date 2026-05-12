'use client'
import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const links = [
  { label: 'About', href: '#about' },
  { label: 'The Zones', href: '#zones' },
  { label: 'Menu', href: '#menu' },
  { label: 'Partnerships', href: '#partnerships' },
  { label: 'Contact', href: '#contact' },
]

/* ── Magnetic CTA ────────────────────────────────────────────── */
function MagneticCTA({ children }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 20 })
  const sy = useSpring(y, { stiffness: 250, damping: 20 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      href="#contact"
      style={{
        x: sx, y: sy, display: 'inline-block',
        background: '#C0392B', color: '#fff', padding: '10px 22px',
        borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none',
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ background: '#A93226', boxShadow: '0 6px 24px rgba(192,57,43,0.4)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.a>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#FFFFFF',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid #E8E8E5' : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
      }}
    >
      <div style={{
        maxWidth: 1400, margin: '0 auto', padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72,
      }}>
        {/* Logo */}
        <motion.a
          href="#"
          style={{ textDecoration: 'none' }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.div
              style={{
                width: 32, height: 32, background: '#C0392B',
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              whileHover={{ rotate: 8, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 14 }}>HN</span>
            </motion.div>
            <span style={{ fontWeight: 700, fontSize: 17, color: '#1C1C1C', letterSpacing: '-0.3px' }}>
              Healthy Nation
            </span>
          </div>
        </motion.a>

        {/* Links with layoutId underline */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * i + 0.2, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setActive(link.label)}
              onHoverEnd={() => setActive(null)}
              style={{
                position: 'relative', color: '#6B6B6B', textDecoration: 'none',
                fontSize: 15, fontWeight: 500, padding: '6px 12px',
                transition: 'color 0.2s',
              }}
              whileHover={{ color: '#1C1C1C' }}
            >
              {link.label}
              {active === link.label && (
                <motion.div
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute', bottom: 0, left: 12, right: 12,
                    height: 2, background: '#C0392B', borderRadius: 2,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <motion.button
            onClick={() => navigate('/login')}
            whileHover={{ color: '#1C1C1C' }}
            whileTap={{ scale: 0.96 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#6B6B6B', fontFamily: 'inherit', padding: '8px 12px' }}
          >
            Log in
          </motion.button>
          <MagneticCTA>Join Waitlist</MagneticCTA>
        </div>
      </div>
    </motion.nav>
  )
}
