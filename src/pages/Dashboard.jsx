import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'

/* ─── Mock Data ──────────────────────────────────────────────────── */
const USER = {
  name: 'Ahmed Al-Rashid',
  age: 28,
  gender: 'Male',
  height: '182 cm',
  weight: '84 kg',
  goal: 'Muscle Gain & Performance',
  diet: 'High Protein',
  allergies: 'None',
  zone: 'The Lair',
  tier: 'Gold Member',
  avatar: 'AR',
}

const HEALTH_METRICS = [
  { label: 'Steps', value: '11,240', unit: '', icon: '👟', pct: 75, color: '#C0392B' },
  { label: 'Calories Burned', value: '680', unit: 'kcal', icon: '🔥', pct: 62, color: '#E67E22' },
  { label: 'Heart Rate', value: '68', unit: 'bpm', icon: '❤️', pct: 55, color: '#E74C3C' },
  { label: 'Sleep', value: '7.4', unit: 'hrs', icon: '🌙', pct: 80, color: '#8E44AD' },
  { label: 'Recovery', value: '82', unit: '%', icon: '⚡', pct: 82, color: '#27AE60' },
  { label: 'Stress Level', value: 'Low', unit: '', icon: '🧘', pct: 25, color: '#16A085' },
]

const INTEGRATIONS = [
  { name: 'Apple Health', connected: true, color: '#1C1C1C', icon: '🍎' },
  { name: 'Garmin', connected: true, color: '#006EAD', icon: '⌚' },
  { name: 'Whoop', connected: false, color: '#1A1A2E', icon: '📿' },
  { name: 'Google Fit', connected: false, color: '#4285F4', icon: '🏃' },
]

const WEEKLY_ACTIVITY = [
  { day: 'Mon', cal: 520 }, { day: 'Tue', cal: 780 }, { day: 'Wed', cal: 340 },
  { day: 'Thu', cal: 890 }, { day: 'Fri', cal: 680 }, { day: 'Sat', cal: 1020 }, { day: 'Sun', cal: 460 },
]

const VISITS = [
  { date: 'May 10, 2026', time: '1:15 PM', zone: 'The Lair', duration: '45 min', reward: '+24 pts' },
  { date: 'May 8, 2026', time: '9:30 AM', zone: 'The Lair', duration: '60 min', reward: '+32 pts' },
  { date: 'May 5, 2026', time: '2:00 PM', zone: 'The Garden', duration: '30 min', reward: '+18 pts' },
  { date: 'May 2, 2026', time: '11:45 AM', zone: 'The Lair', duration: '50 min', reward: '+28 pts' },
  { date: 'Apr 29, 2026', time: '8:00 AM', zone: 'The Lair', duration: '75 min', reward: '+40 pts' },
]

const ORDERS = [
  { date: 'May 10, 2026', items: ['Salmon Protein Bowl', 'Chocolate Protein Shake'], total: 'SAR 68', status: 'Completed', zone: 'The Lair' },
  { date: 'May 8, 2026', items: ['Grilled Chicken & Veggies', 'Espresso Energy Shot'], total: 'SAR 72', status: 'Completed', zone: 'The Lair' },
  { date: 'May 5, 2026', items: ['Avocado & Spinach Salad', 'Matcha Latte'], total: 'SAR 54', status: 'Completed', zone: 'The Garden' },
  { date: 'May 2, 2026', items: ['Beef & Broccoli Stir-fry'], total: 'SAR 48', status: 'Completed', zone: 'The Lair' },
]

const DELIVERIES = [
  { date: 'May 9, 2026', address: 'Al Olaya, Riyadh', items: ['Salmon Protein Bowl x2', 'Protein Shake'], total: 'SAR 136', status: 'Delivered' },
  { date: 'May 3, 2026', address: 'Al Malaz, Riyadh', items: ['Meal Prep Box — 5 days'], total: 'SAR 280', status: 'Delivered' },
]

const AI_INSIGHTS = [
  { title: 'Post-Workout Nutrition', desc: 'Based on your 75-min session today, a high-protein meal within 30 mins is optimal. Try the Chicken & Quinoa Bowl.', tag: 'Nutrition' },
  { title: 'Sleep Optimisation', desc: "Your 7.4hr sleep average is good. Avoiding caffeine after 2 PM could push you to 8hrs and improve recovery by ~15%.", tag: 'Recovery' },
  { title: 'Calorie Target', desc: "You're 320 kcal short of your daily target. A Chocolate Protein Shake covers this without exceeding your macro limits.", tag: 'Calories' },
  { title: 'Consistency Streak', desc: "You've visited The Lair 3× this week. Maintaining this over 8 weeks qualifies you for Elite Member tier.", tag: 'Goals' },
]

/* ─── Sidebar Nav ────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'profile', label: 'My Profile', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
  { id: 'health', label: 'Health Tracking', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg> },
  { id: 'loyalty', label: 'Loyalty & Cashback', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
  { id: 'visits', label: 'Visit History', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg> },
  { id: 'orders', label: 'Order History', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
  { id: 'delivery', label: 'Delivery', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg> },
  { id: 'ai', label: 'AI Assistant', icon: <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" /></svg> },
]

/* ─── Shared Components ──────────────────────────────────────────── */
function Card({ children, style }) {
  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E8E8E5',
      borderRadius: 20, padding: '28px 28px',
      ...style,
    }}>
      {children}
    </div>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1C1C1C', letterSpacing: '-0.5px', marginBottom: 4 }}>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: '#6B6B6B' }}>{subtitle}</p>}
    </div>
  )
}

function Badge({ children, color = '#C0392B', bg = '#FEF3F2' }) {
  return (
    <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.04em' }}>
      {children}
    </span>
  )
}

/* ─── Section: Profile ───────────────────────────────────────────── */
function ProfileSection() {
  const fields = [
    ['Name', USER.name], ['Age', USER.age], ['Gender', USER.gender],
    ['Height', USER.height], ['Weight', USER.weight],
    ['Fitness Goal', USER.goal], ['Dietary Preference', USER.diet], ['Allergies', USER.allergies],
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionTitle title="My Profile" subtitle="Your personal information and fitness preferences." />

      {/* Avatar + tier */}
      <Card style={{ marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ width: 72, height: 72, background: '#C0392B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
          {USER.avatar}
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1C1C1C', letterSpacing: '-0.5px' }}>{USER.name}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Badge>{USER.tier}</Badge>
            <Badge color="#B8962E" bg="#FEF9EC">{USER.zone}</Badge>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          style={{ marginLeft: 'auto', background: '#1C1C1C', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
        >
          Edit Profile
        </motion.button>
      </Card>

      {/* Info grid */}
      <div className="dash-g2" style={{ gap: 12 }}>
        {fields.map(([label, value]) => (
          <Card key={label} style={{ padding: '20px 24px' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 6 }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1C1C' }}>{value}</div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Section: Health Tracking ───────────────────────────────────── */
function HealthSection() {
  const maxCal = Math.max(...WEEKLY_ACTIVITY.map(d => d.cal))
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionTitle title="Health & Fitness Tracking" subtitle="Live data from your connected devices. Mock data for demo." />

      {/* Integrations */}
      <div className="dash-g4" style={{ gap: 12, marginBottom: 20 }}>
        {INTEGRATIONS.map(intg => (
          <Card key={intg.name} style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 22 }}>{intg.icon}</span>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 100,
                background: intg.connected ? '#ECFDF5' : '#F5F5F3',
                color: intg.connected ? '#059669' : '#6B6B6B',
              }}>{intg.connected ? 'Connected' : 'Connect'}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C' }}>{intg.name}</div>
          </Card>
        ))}
      </div>

      {/* Metrics */}
      <div className="dash-g3" style={{ gap: 12, marginBottom: 20 }}>
        {HEALTH_METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Card style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontSize: 22 }}>{m.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B6B6B' }}>{m.label}</div>
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#1C1C1C', letterSpacing: '-0.8px' }}>
                {m.value}<span style={{ fontSize: 13, fontWeight: 500, color: '#6B6B6B', marginLeft: 4 }}>{m.unit}</span>
              </div>
              <div style={{ height: 4, background: '#F5F5F3', borderRadius: 2, overflow: 'hidden', marginTop: 12 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.pct}%` }}
                  transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%', background: m.color, borderRadius: 2 }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Weekly activity chart */}
      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1C', marginBottom: 20 }}>Weekly Activity — Calories Burned</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 120 }}>
          {WEEKLY_ACTIVITY.map((d, i) => (
            <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ width: '100%', position: 'relative', height: 100, display: 'flex', alignItems: 'flex-end' }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.cal / maxCal) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: '100%', background: d.day === 'Sat' ? '#C0392B' : '#E8E8E5', borderRadius: '4px 4px 0 0' }}
                />
              </div>
              <span style={{ fontSize: 11, color: '#6B6B6B', fontWeight: 600 }}>{d.day}</span>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

/* ─── Section: Loyalty ───────────────────────────────────────────── */
function LoyaltySection() {
  const tiers = [
    { name: 'Standard', pct: 33, color: '#6B6B6B', req: 'Active gym membership' },
    { name: 'Gold', pct: 66, color: '#C0392B', req: '6+ months attendance' },
    { name: 'Elite', pct: 100, color: '#B8962E', req: '12+ months, 3× / week' },
  ]
  const promos = [
    { title: 'Double Points Weekend', desc: 'Earn 2× points on all orders Fri–Sat', expires: 'May 16', tag: 'Active' },
    { title: 'Referral Bonus', desc: 'Earn 500 pts for every friend who joins', expires: 'Ongoing', tag: 'Ongoing' },
    { title: 'Birthday Reward', desc: '20% off your birthday week', expires: 'Jun 15', tag: 'Upcoming' },
  ]
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionTitle title="Loyalty & Cashback" subtitle="Track your rewards, tier status, and available bonuses." />

      {/* Balance cards */}
      <div className="dash-g3" style={{ gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Cashback Balance', value: 'SAR 142', sub: 'Available to redeem', color: '#C0392B', bg: '#FEF3F2' },
          { label: 'Reward Points', value: '3,840 pts', sub: '≈ SAR 38 value', color: '#B8962E', bg: '#FEF9EC' },
          { label: 'Total Saved', value: 'SAR 286', sub: 'Since joining', color: '#27AE60', bg: '#ECFDF5' },
        ].map(c => (
          <Card key={c.label} style={{ background: c.bg, border: `1px solid ${c.color}22`, padding: '24px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.color, marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#1C1C1C', letterSpacing: '-1px' }}>{c.value}</div>
            <div style={{ fontSize: 12, color: '#6B6B6B', marginTop: 4 }}>{c.sub}</div>
          </Card>
        ))}
      </div>

      {/* Tier progress */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1C' }}>Membership Tier</div>
          <Badge>Gold Member</Badge>
        </div>
        <div className="dash-g3" style={{ gap: 12 }}>
          {tiers.map((t, i) => (
            <div key={t.name} style={{ padding: '16px', background: '#F5F5F3', borderRadius: 12, borderTop: `3px solid ${t.color}` }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: t.color, marginBottom: 4 }}>{t.pct === 66 ? '20%' : t.pct === 33 ? '10%' : '30%'} off</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C', marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: '#6B6B6B' }}>{t.req}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: '12px 16px', background: '#FEF9EC', borderRadius: 10, border: '1px solid #F5D76E' }}>
          <span style={{ fontSize: 13, color: '#B8962E', fontWeight: 600 }}>🏆 4 more months of consistent visits to unlock Elite tier</span>
        </div>
      </Card>

      {/* Promos */}
      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1C', marginBottom: 16 }}>Active Promotions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {promos.map(p => (
            <div key={p.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: '#F5F5F3', borderRadius: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C', marginBottom: 2 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: '#6B6B6B' }}>{p.desc} · Expires: {p.expires}</div>
              </div>
              <Badge color={p.tag === 'Active' ? '#059669' : p.tag === 'Upcoming' ? '#B8962E' : '#6B6B6B'}
                bg={p.tag === 'Active' ? '#ECFDF5' : p.tag === 'Upcoming' ? '#FEF9EC' : '#F5F5F3'}>
                {p.tag}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

/* ─── Section: Visit History ─────────────────────────────────────── */
function VisitsSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionTitle title="Visit History" subtitle="Your check-ins, activity timeline, and zone usage." />
      <div className="dash-g3" style={{ gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Total Visits', value: '47' },
          { label: 'This Month', value: '12' },
          { label: 'Favourite Zone', value: 'The Lair' },
        ].map(s => (
          <Card key={s.label} style={{ textAlign: 'center', padding: '24px' }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#C0392B', letterSpacing: '-1px' }}>{s.value}</div>
            <div style={{ fontSize: 13, color: '#6B6B6B', marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1C', marginBottom: 16 }}>Recent Check-ins</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {VISITS.map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: i < VISITS.length - 1 ? '1px solid #F5F5F3' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, background: v.zone === 'The Lair' ? '#2A1F1A' : '#FDF6F0', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                  {v.zone === 'The Lair' ? '🏋️' : '🌿'}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C' }}>{v.zone}</div>
                  <div style={{ fontSize: 12, color: '#6B6B6B' }}>{v.date} · {v.time} · {v.duration}</div>
                </div>
              </div>
              <Badge color="#059669" bg="#ECFDF5">{v.reward}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

/* ─── Section: Order History ─────────────────────────────────────── */
function OrdersSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionTitle title="Order History" subtitle="Your past meals, favourites, and reorder options." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {ORDERS.map((o, i) => (
          <Card key={i} style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C', marginBottom: 4 }}>{o.date}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Badge>{o.zone}</Badge>
                  <Badge color="#059669" bg="#ECFDF5">{o.status}</Badge>
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#1C1C1C' }}>{o.total}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {o.items.map((item, j) => (
                <div key={j} style={{ fontSize: 13, color: '#6B6B6B' }}>· {item}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ background: '#F5F5F3', border: 'none', borderRadius: 8, padding: '8px 16px', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: '#1C1C1C', cursor: 'pointer' }}>
                View Details
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                style={{ background: '#C0392B', border: 'none', borderRadius: 8, padding: '8px 16px', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
                Reorder
              </motion.button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}

/* ─── Section: Delivery ──────────────────────────────────────────── */
function DeliverySection() {
  const addresses = ['Al Olaya, Riyadh (Home)', 'Al Malaz, Riyadh (Office)']
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionTitle title="Delivery Management" subtitle="Delivery history, saved addresses, and preferences." />

      <div className="dash-g2" style={{ gap: 16, marginBottom: 20 }}>
        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C', marginBottom: 14 }}>Saved Addresses</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {addresses.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: '#F5F5F3', borderRadius: 10 }}>
                <span style={{ fontSize: 18 }}>{i === 0 ? '🏠' : '🏢'}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1C1C1C' }}>{a}</span>
                {i === 0 && <Badge color="#059669" bg="#ECFDF5" style={{ marginLeft: 'auto' }}>Default</Badge>}
              </div>
            ))}
            <motion.button whileHover={{ scale: 1.01 }} style={{ border: '1.5px dashed #E8E8E5', borderRadius: 10, padding: '10px', background: 'none', cursor: 'pointer', fontSize: 13, color: '#6B6B6B', fontFamily: 'inherit', fontWeight: 600 }}>
              + Add Address
            </motion.button>
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C', marginBottom: 14 }}>Delivery Preferences</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[['Preferred Time', 'Afternoon (12–3 PM)'], ['Special Instructions', 'Ring doorbell'], ['Packaging', 'Eco packaging']].map(([k, v]) => (
              <div key={k} style={{ padding: '10px 14px', background: '#F5F5F3', borderRadius: 10 }}>
                <div style={{ fontSize: 11, color: '#6B6B6B', fontWeight: 600, marginBottom: 2 }}>{k}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C' }}>{v}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1C', marginBottom: 16 }}>Delivery History</div>
        {DELIVERIES.map((d, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < DELIVERIES.length - 1 ? '1px solid #F5F5F3' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, background: '#F5F5F3', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚗</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C' }}>{d.address}</div>
                <div style={{ fontSize: 12, color: '#6B6B6B' }}>{d.date} · {d.items.join(', ')}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1C' }}>{d.total}</div>
              <Badge color="#059669" bg="#ECFDF5">{d.status}</Badge>
            </div>
          </div>
        ))}
      </Card>
    </motion.div>
  )
}

/* ─── Section: AI Assistant ──────────────────────────────────────── */
function AISection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <SectionTitle title="AI Health Assistant" subtitle="Personalised insights powered by your health data. Coming soon." />

      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #2A1F1A 100%)', borderRadius: 20, padding: '36px 40px', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 200, height: 200, background: 'rgba(192,57,43,0.15)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -40, right: 60, width: 140, height: 140, background: 'rgba(184,150,46,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(192,57,43,0.2)', border: '1px solid rgba(192,57,43,0.4)', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#F1948A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Coming Soon</span>
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.8px', marginBottom: 10 }}>
            Your Personal Nutrition AI
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', maxWidth: '55ch', lineHeight: 1.65 }}>
            Real-time meal recommendations, adaptive macro targets, and recovery-aware nutrition plans — all synced to your wearables.
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="dash-g2" style={{ gap: 14, marginBottom: 20 }}>
        {AI_INSIGHTS.map((insight, i) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            <Card style={{ height: '100%' }}>
              <div style={{ marginBottom: 10 }}>
                <Badge>{insight.tag}</Badge>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1C', marginBottom: 8 }}>{insight.title}</div>
              <div style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.65 }}>{insight.desc}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Future features */}
      <Card>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1C', marginBottom: 16 }}>Planned Features</div>
        <div className="dash-g3" style={{ gap: 10 }}>
          {[
            ['🍽️', 'Meal Planning', 'Weekly personalised meal plans based on training schedule'],
            ['📊', 'Macro Tracking', 'Automatic macro logging from café orders'],
            ['💊', 'Supplement Advice', 'Evidence-based supplement timing recommendations'],
            ['🎯', 'Goal Calibration', 'Dynamic calorie targets that adjust to your activity'],
            ['🔄', 'Recovery Meals', 'Post-workout meal suggestions within 30 min of sessions'],
            ['🧬', 'Biomarker Insights', 'Nutritional guidance from lab results (coming 2027)'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ padding: '16px', background: '#F5F5F3', borderRadius: 12 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C', marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 12, color: '#6B6B6B', lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

/* ─── Dashboard Shell ────────────────────────────────────────────── */
const SECTIONS = {
  profile: ProfileSection,
  health: HealthSection,
  loyalty: LoyaltySection,
  visits: VisitsSection,
  orders: OrdersSection,
  delivery: DeliverySection,
  ai: AISection,
}

/* ─── Sidebar inner content (shared between desktop + mobile drawer) ── */
function SidebarContent({ active, setActive, navigate, onNavClick }) {
  return (
    <>
      {/* Logo */}
      <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid #E8E8E5' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, background: '#C0392B', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 13 }}>HN</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#1C1C1C', letterSpacing: '-0.2px' }}>Healthy Nation</span>
        </a>
      </div>

      {/* User pill */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #E8E8E5' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#F5F5F3', borderRadius: 12, padding: '12px 14px' }}>
          <div style={{ width: 36, height: 36, background: '#C0392B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#fff', flexShrink: 0 }}>
            AR
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1C1C1C', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{USER.name}</div>
            <div style={{ fontSize: 11, color: '#C0392B', fontWeight: 600 }}>{USER.tier}</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 12px' }}>
        {NAV_ITEMS.map(item => (
          <motion.button
            key={item.id}
            onClick={() => { setActive(item.id); onNavClick && onNavClick() }}
            whileHover={{ x: 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, textAlign: 'left',
              background: active === item.id ? '#FEF3F2' : 'transparent',
              color: active === item.id ? '#C0392B' : '#6B6B6B',
              marginBottom: 2, transition: 'background 0.15s, color 0.15s',
            }}
          >
            <span style={{ color: active === item.id ? '#C0392B' : '#6B6B6B' }}>{item.icon}</span>
            {item.label}
          </motion.button>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid #E8E8E5' }}>
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ x: 2 }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            padding: '11px 14px', borderRadius: 10, border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
            background: 'transparent', color: '#6B6B6B',
          }}
        >
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Log out
        </motion.button>
      </div>
    </>
  )
}

export default function Dashboard() {
  const [active, setActive] = useState('profile')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const ActiveSection = SECTIONS[active]
  const activeLabel = NAV_ITEMS.find(n => n.id === active)?.label || 'Dashboard'

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setDrawerOpen(false) }
    if (drawerOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [drawerOpen])

  return (
    <div className="dash-wrap" style={{ background: '#F5F5F3', fontFamily: "'Outfit', sans-serif" }}>

      {/* ── Desktop Sidebar ───────────────────────────────────── */}
      <motion.aside
        className="dash-side"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <SidebarContent active={active} setActive={setActive} navigate={navigate} />
      </motion.aside>

      {/* ── Mobile Drawer (portal) ────────────────────────────── */}
      {createPortal(
        <AnimatePresence>
          {drawerOpen && (
            <>
              <motion.div
                key="db-backdrop"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                onClick={() => setDrawerOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(3px)', zIndex: 9998 }}
              />
              <motion.div
                key="db-drawer"
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                style={{
                  position: 'fixed', top: 0, left: 0, bottom: 0,
                  width: 'min(280px, 85vw)',
                  background: '#FFFFFF', zIndex: 9999,
                  display: 'flex', flexDirection: 'column',
                  boxShadow: '8px 0 40px rgba(0,0,0,0.14)',
                  overflowY: 'auto',
                }}
              >
                <SidebarContent
                  active={active}
                  setActive={setActive}
                  navigate={navigate}
                  onNavClick={() => setDrawerOpen(false)}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ── Right side: topbar + content ─────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

        {/* Mobile top bar */}
        <div className="dash-topbar">
          <button
            onClick={() => setDrawerOpen(true)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 8,
              display: 'flex', flexDirection: 'column', gap: 5, borderRadius: 8,
            }}
            aria-label="Open menu"
          >
            <span style={{ display: 'block', width: 22, height: 2, background: '#1C1C1C', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#1C1C1C', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 14, height: 2, background: '#1C1C1C', borderRadius: 2, alignSelf: 'flex-end' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 26, height: 26, background: '#C0392B', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 800, fontSize: 11 }}>HN</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#1C1C1C' }}>{activeLabel}</span>
          </div>
          <div style={{ width: 38 }} />{/* spacer */}
        </div>

        {/* Main content */}
        <main className="dash-main" style={{ overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ActiveSection />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
