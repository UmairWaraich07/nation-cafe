import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Sheet — a shadcn-style slide-in panel backed by Framer Motion.
 * Props: open, onClose, side ('right' | 'left'), children
 */
export function Sheet({ open, onClose, side = 'right', children }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const variants = {
    right: { hidden: { x: '100%' }, visible: { x: 0 }, exit: { x: '100%' } },
    left:  { hidden: { x: '-100%' }, visible: { x: 0 }, exit: { x: '-100%' } },
  }[side]

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(3px)',
              zIndex: 9998,
            }}
          />

          {/* Panel */}
          <motion.div
            key="sheet-panel"
            initial={variants.hidden}
            animate={variants.visible}
            exit={variants.exit}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            style={{
              position: 'fixed',
              top: 0,
              [side]: 0,
              bottom: 0,
              width: 'min(320px, 88vw)',
              background: '#FFFFFF',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: side === 'right'
                ? '-8px 0 40px rgba(0,0,0,0.12)'
                : '8px 0 40px rgba(0,0,0,0.12)',
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}

export function SheetHeader({ children }) {
  return (
    <div style={{
      padding: '20px 24px',
      borderBottom: '1px solid #E8E8E5',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

export function SheetContent({ children }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px' }}>
      {children}
    </div>
  )
}

export function SheetFooter({ children }) {
  return (
    <div style={{
      padding: '16px 24px',
      borderTop: '1px solid #E8E8E5',
      flexShrink: 0,
    }}>
      {children}
    </div>
  )
}

export function SheetClose({ onClose }) {
  return (
    <motion.button
      onClick={onClose}
      whileHover={{ scale: 1.1, background: '#F5F5F3' }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 32, height: 32, borderRadius: 8,
        border: 'none', background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', color: '#6B6B6B',
      }}
    >
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </motion.button>
  )
}
