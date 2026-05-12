'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'The Zones', href: '#zones' },
  { label: 'Menu', href: '#menu' },
  { label: 'Partnerships', href: '#partnerships' },
  { label: 'Contact', href: '#contact' },
]

function SocialIcon({ href, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 40, height: 40, borderRadius: 10, border: '1px solid #E8E8E5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#6B6B6B', textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#1C1C1C'; e.currentTarget.style.color = '#1C1C1C' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E8E5'; e.currentTarget.style.color = '#6B6B6B' }}
    >
      {children}
    </motion.a>
  )
}

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer ref={ref} style={{ background: '#FFFFFF', borderTop: '1px solid #E8E8E5', padding: '60px 0 40px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 48, marginBottom: 48 }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, background: '#C0392B', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 800, fontSize: 15 }}>HN</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#1C1C1C', letterSpacing: '-0.3px' }}>Healthy Nation</span>
            </div>
            <p style={{ fontSize: 14, color: '#6B6B6B', lineHeight: 1.7, maxWidth: '36ch', marginBottom: 24 }}>
              AI-powered nutrition and fitness ecosystem. Two zones. One mission. Opening Riyadh 2026.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <SocialIcon href="#">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </SocialIcon>
              <SocialIcon href="#">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
              </SocialIcon>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Navigation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ fontSize: 14, color: '#6B6B6B', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#1C1C1C'}
                  onMouseLeave={e => e.target.style.color = '#6B6B6B'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="mailto:hello@healthynation.sa" style={{ fontSize: 14, color: '#6B6B6B', textDecoration: 'none' }}>hello@healthynation.sa</a>
              <span style={{ fontSize: 14, color: '#6B6B6B' }}>Riyadh, Saudi Arabia</span>
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <div style={{ background: '#FEF3F2', border: '1px solid #FECACA', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#C0392B' }}>
                  Opening 2026
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ borderTop: '1px solid #E8E8E5', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#6B6B6B' }}>© 2026 Healthy Nation Café. All rights reserved.</span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: 13, color: '#6B6B6B', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:768px){
          footer > div { padding: 0 24px !important; }
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
          footer > div > div:last-child { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </footer>
  )
}
