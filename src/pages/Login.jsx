import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ email: '', password: '', name: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div style={{
      minHeight: '100dvh', background: '#F5F5F3',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', fontFamily: "'Outfit', sans-serif",
    }}>
      {/* Back to home */}
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed', top: 28, left: 32,
          display: 'flex', alignItems: 'center', gap: 8,
          textDecoration: 'none', color: '#6B6B6B', fontSize: 14, fontWeight: 500,
        }}
        whileHover={{ color: '#1C1C1C' }}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to home
      </motion.a>

      <div style={{ width: '100%', maxWidth: 460 }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, background: '#C0392B', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>HN</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 20, color: '#1C1C1C', letterSpacing: '-0.3px' }}>Healthy Nation</span>
          </div>
          <p style={{ fontSize: 14, color: '#6B6B6B' }}>Your nutrition & fitness hub</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: '#FFFFFF', borderRadius: 24, padding: '40px 40px',
            border: '1px solid #E8E8E5',
            boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
          }}
        >
          {/* Mode toggle */}
          <div style={{ display: 'flex', background: '#F5F5F3', borderRadius: 12, padding: 4, marginBottom: 32, gap: 4 }}>
            {[{ id: 'login', label: 'Log in' }, { id: 'signup', label: 'Sign up' }].map(tab => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                style={{
                  flex: 1, padding: '10px', borderRadius: 8, border: 'none',
                  cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                  background: mode === tab.id ? '#FFFFFF' : 'transparent',
                  color: mode === tab.id ? '#1C1C1C' : '#6B6B6B',
                  boxShadow: mode === tab.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === 'signup' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'signup' ? -20 : 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {mode === 'signup' && (
                <Field label="Full Name" type="text" placeholder="Your full name" value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))} />
              )}
              <Field label="Email" type="email" placeholder="your@email.com" value={form.email}
                onChange={v => setForm(f => ({ ...f, email: v }))} />
              <Field label="Password" type="password" placeholder={mode === 'signup' ? 'Create a password' : 'Your password'} value={form.password}
                onChange={v => setForm(f => ({ ...f, password: v }))} />

              {mode === 'login' && (
                <div style={{ textAlign: 'right', marginTop: -8 }}>
                  <a href="#" style={{ fontSize: 13, color: '#C0392B', textDecoration: 'none', fontWeight: 500 }}>Forgot password?</a>
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 6px 24px rgba(192,57,43,0.35)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  marginTop: 8, background: '#C0392B', color: '#fff', border: 'none',
                  borderRadius: 10, padding: '14px', fontFamily: 'inherit',
                  fontSize: 15, fontWeight: 700, cursor: 'pointer',
                }}
              >
                {mode === 'login' ? 'Log in to Dashboard' : 'Create Account'}
              </motion.button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
                <div style={{ flex: 1, height: 1, background: '#E8E8E5' }} />
                <span style={{ fontSize: 13, color: '#6B6B6B' }}>or</span>
                <div style={{ flex: 1, height: 1, background: '#E8E8E5' }} />
              </div>

              {/* Social login */}
              {[
                { label: 'Continue with Google', icon: <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
                { label: 'Continue with Apple', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg> },
              ].map(({ label, icon }) => (
                <motion.button
                  key={label}
                  type="button"
                  whileHover={{ borderColor: '#1C1C1C' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    border: '1.5px solid #E8E8E5', borderRadius: 10, padding: '12px',
                    background: '#FFFFFF', cursor: 'pointer', fontFamily: 'inherit',
                    fontSize: 14, fontWeight: 500, color: '#1C1C1C', transition: 'border-color 0.2s',
                  }}
                >
                  {icon}{label}
                </motion.button>
              ))}
            </motion.form>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center', fontSize: 13, color: '#6B6B6B', marginTop: 20 }}
        >
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            style={{ background: 'none', border: 'none', color: '#C0392B', fontWeight: 600, cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>
            {mode === 'login' ? 'Sign up' : 'Log in'}
          </button>
        </motion.p>
      </div>
    </div>
  )
}

function Field({ label, type, placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1C' }}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: '11px 14px', borderRadius: 10,
          border: `1.5px solid ${focused ? '#C0392B' : '#E8E8E5'}`,
          fontSize: 14, fontFamily: 'inherit', background: '#FFFFFF', color: '#1C1C1C',
          outline: 'none', transition: 'border-color 0.2s',
        }}
      />
    </div>
  )
}
