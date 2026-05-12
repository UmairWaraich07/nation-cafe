'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function FormField({ label, type = 'text', placeholder, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1C' }}>{label}{required && <span style={{ color: '#C0392B' }}> *</span>}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        style={{
          padding: '11px 14px', borderRadius: 10, border: '1.5px solid #E8E8E5',
          fontSize: 14, fontFamily: 'inherit', background: '#FFFFFF', color: '#1C1C1C',
          outline: 'none', transition: 'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#C0392B'}
        onBlur={e => e.target.style.borderColor = '#E8E8E5'}
      />
    </div>
  )
}

function FormCard({ title, subtitle, icon, children, accentColor = '#C0392B' }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 24px 48px -16px rgba(0,0,0,0.1)' }}
      style={{
        background: '#FFFFFF', border: '1px solid #E8E8E5', borderRadius: 24,
        padding: '40px 36px', transition: 'box-shadow 0.3s ease',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ width: 48, height: 48, background: accentColor === '#B8962E' ? '#FEF9EC' : '#FEF3F2', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
        {icon}
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, color: '#1C1C1C', marginBottom: 6, letterSpacing: '-0.5px' }}>{title}</h3>
      <p style={{ fontSize: 14, color: '#6B6B6B', marginBottom: 28, lineHeight: 1.6 }}>{subtitle}</p>
      {children}
    </motion.div>
  )
}

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [waitlistSent, setWaitlistSent] = useState(false)
  const [partnerSent, setPartnerSent] = useState(false)
  const [contactSent, setContactSent] = useState(false)

  const handleSubmit = (setter) => (e) => {
    e.preventDefault()
    setter(true)
  }

  return (
    <section ref={ref} id="contact" style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div className="hn-c" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-2px', color: '#1C1C1C', lineHeight: 1.0, marginBottom: 16 }}>
            Be part of the<br /><span style={{ color: '#C0392B' }}>first chapter.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#6B6B6B', maxWidth: '52ch', margin: '0 auto', lineHeight: 1.65 }}>
            Opening in Riyadh 2026. Waitlist members get priority access and founding-member rates.
          </p>
        </motion.div>

        <div className="hn-g3" style={{ gap: 24 }}>
          {/* Waitlist */}
          <motion.div initial={{ opacity: 0, y: 48, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.65, delay: 0.1, type: 'spring', stiffness: 80, damping: 16 }}>
            <FormCard
              title="Join the Waitlist"
              subtitle="Get founding-member pricing and early access before public launch."
              icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#C0392B" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
            >
              {waitlistSent ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#C0392B', fontWeight: 700 }}>You're on the list. We'll be in touch.</div>
              ) : (
                <form onSubmit={handleSubmit(setWaitlistSent)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <FormField label="Full Name" placeholder="Your name" required />
                  <FormField label="Email" type="email" placeholder="your@email.com" required />
                  <FormField label="Phone" type="tel" placeholder="+966 5xx xxx xxxx" />
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{ marginTop: 8, background: '#C0392B', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Join Waitlist
                  </motion.button>
                </form>
              )}
            </FormCard>
          </motion.div>

          {/* Partner */}
          <motion.div initial={{ opacity: 0, y: 48, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.65, delay: 0.2, type: 'spring', stiffness: 80, damping: 16 }}>
            <FormCard
              title="Become a Partner"
              subtitle="Join our gym partnership program and unlock co-branded benefits for your members."
              accentColor="#B8962E"
              icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#B8962E" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" /></svg>}
            >
              {partnerSent ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#B8962E', fontWeight: 700 }}>Partnership request received. Our team will reach out within 48 hours.</div>
              ) : (
                <form onSubmit={handleSubmit(setPartnerSent)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <FormField label="Gym / Business Name" placeholder="Your business name" required />
                  <FormField label="Contact Name" placeholder="Your name" required />
                  <FormField label="Email" type="email" placeholder="business@email.com" required />
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{ marginTop: 8, background: '#B8962E', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Apply for Partnership
                  </motion.button>
                </form>
              )}
            </FormCard>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 48, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.65, delay: 0.3, type: 'spring', stiffness: 80, damping: 16 }}>
            <FormCard
              title="Contact Us"
              subtitle="General inquiries, media, or investment opportunities. We read everything."
              icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#C0392B" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>}
            >
              {contactSent ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#C0392B', fontWeight: 700 }}>Message received. Thank you.</div>
              ) : (
                <form onSubmit={handleSubmit(setContactSent)} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <FormField label="Name" placeholder="Your name" required />
                  <FormField label="Email" type="email" placeholder="your@email.com" required />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1C' }}>Message <span style={{ color: '#C0392B' }}>*</span></label>
                    <textarea
                      placeholder="Your message..."
                      required
                      rows={4}
                      style={{
                        padding: '11px 14px', borderRadius: 10, border: '1.5px solid #E8E8E5',
                        fontSize: 14, fontFamily: 'inherit', background: '#FFFFFF', color: '#1C1C1C',
                        outline: 'none', resize: 'none', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#C0392B'}
                      onBlur={e => e.target.style.borderColor = '#E8E8E5'}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit"
                    style={{ marginTop: 4, background: '#1C1C1C', color: '#fff', border: 'none', borderRadius: 10, padding: '13px', fontFamily: 'inherit', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </FormCard>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
