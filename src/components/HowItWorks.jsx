'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    n: '1', title: 'Set Your Profile',
    desc: 'Input your body metrics, fitness goals, dietary restrictions, and training schedule.',
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>,
  },
  {
    n: '2', title: 'Connect Your Gym',
    desc: 'Link your fitness membership. We sync your workouts to adjust your daily macro targets.',
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5" /></svg>,
  },
  {
    n: '3', title: 'Choose Your Zone',
    desc: 'Enter The Lair for power and density, or The Garden for balance and refinement.',
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" /></svg>,
  },
  {
    n: '4', title: 'Scan & Order',
    desc: "Your AI shows you today's recommended meal based on your last workout and current goals.",
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" /></svg>,
  },
  {
    n: '5', title: 'Track & Improve',
    desc: 'Log meals automatically. Review weekly reports. Your nutrition gets smarter every visit.',
    icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z" /><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>,
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="the-zones" style={{ background: '#F5F5F3', padding: '100px 0', overflow: 'hidden' }}>
      <div className="hn-c" style={{ maxWidth: 1400, margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{ display: 'inline-block', background: '#F5F5F3', border: '1px solid #E8E8E5', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#6B6B6B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>How It Works</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#1C1C1C', lineHeight: 1.05 }}>
            Five steps to precision nutrition
          </h2>
        </motion.div>

        <div className="how-row">
          {/* Animated SVG connector line */}
          <svg
            className="how-connector"
            style={{ position: 'absolute', top: 35, left: '10%', width: '80%', height: 2, overflow: 'visible', pointerEvents: 'none', zIndex: 0 }}
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            {/* grey base */}
            <line x1="0" y1="1" x2="1000" y2="1" stroke="#E8E8E5" strokeWidth="1" />
            {/* animated red progress */}
            <motion.line
              x1="0" y1="1" x2="1000" y2="1"
              stroke="#C0392B" strokeWidth="2"
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              animate={inView ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 56 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6, delay: 0.18 * i + 0.2,
                type: 'spring', stiffness: 80, damping: 16,
              }}
              className="how-item"
            >
              <motion.div
                whileHover={{
                  scale: 1.15,
                  background: '#C0392B',
                  color: '#fff',
                  boxShadow: '0 8px 28px rgba(192,57,43,0.35)',
                }}
                animate={inView ? {
                  boxShadow: ['0 4px 20px rgba(0,0,0,0.06)', '0 4px 20px rgba(192,57,43,0.15)', '0 4px 20px rgba(0,0,0,0.06)'],
                } : {}}
                transition={{
                  hover: { type: 'spring', stiffness: 350, damping: 18 },
                  boxShadow: { duration: 2.5, repeat: Infinity, delay: i * 0.4 },
                }}
                className="how-icon"
                style={{
                  borderRadius: '50%',
                  background: '#FFFFFF', border: '2px solid #E8E8E5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#C0392B',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                {step.icon}
              </motion.div>

              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.22 * i + 0.4 }}
                  style={{ fontSize: 12, fontWeight: 700, color: '#C0392B', marginBottom: 8, letterSpacing: '0.06em' }}
                >
                  STEP {step.n}
                </motion.div>

                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1C', marginBottom: 10, letterSpacing: '-0.2px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.65, maxWidth: '18ch' }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
