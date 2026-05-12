'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const CATEGORIES = [
  {
    id: 'bowls', label: 'Bowls', image: '/images/menu-bowls.jpg',
    items: [
      { name: 'Salmon Protein Bowl', desc: 'Grilled salmon, quinoa, edamame, sesame-miso dressing', p: 42, c: 38, f: 14, zone: 'Lair' },
      { name: 'Açaí Fruit Bowl', desc: 'Açaí base, banana, granola, honey, mixed berries', p: 8, c: 52, f: 12, zone: 'Garden' },
      { name: 'Chicken & Quinoa Bowl', desc: 'Grilled chicken, tri-color quinoa, roasted veg, tahini', p: 48, c: 44, f: 10, zone: 'Lair' },
      { name: 'Tuna Poke Bowl', desc: 'Sushi-grade tuna, sushi rice, cucumber, avocado, nori', p: 38, c: 32, f: 8, zone: 'Both' },
    ],
  },
  {
    id: 'salads', label: 'Salads', image: '/images/menu-salads.jpg',
    items: [
      { name: 'Greek Protein Salad', desc: 'Grilled chicken, feta, Kalamata olives, cucumber, oregano vinaigrette', p: 34, c: 12, f: 18, zone: 'Garden' },
      { name: 'Avocado & Spinach', desc: 'Baby spinach, creamy avocado, toasted walnuts, citrus dressing', p: 14, c: 16, f: 22, zone: 'Garden' },
      { name: 'Tuna Niçoise', desc: 'Seared tuna, green beans, egg, Niçoise olives, Dijon dressing', p: 36, c: 18, f: 14, zone: 'Both' },
      { name: 'Kale Caesar', desc: 'Lacinato kale, grilled chicken, Parmigiano, house caesar dressing', p: 22, c: 14, f: 16, zone: 'Both' },
    ],
  },
  {
    id: 'sandwiches', label: 'Sandwiches', image: '/images/menu-sandwiches.jpg',
    items: [
      { name: 'Grilled Salmon Wrap', desc: 'Grilled salmon, mixed greens, pickled cucumber, tzatziki', p: 38, c: 34, f: 12, zone: 'Garden' },
      { name: 'Avocado Chicken Sandwich', desc: 'Grilled chicken breast, smashed avocado, whole grain sourdough', p: 44, c: 38, f: 14, zone: 'Lair' },
      { name: 'Egg White & Turkey Stack', desc: 'Egg whites, turkey breast, baby spinach, whole grain toast', p: 36, c: 28, f: 8, zone: 'Both' },
      { name: 'Tuna Avocado Flatbread', desc: 'Albacore tuna, ripe avocado, capers, lemon zest on GF flatbread', p: 32, c: 30, f: 10, zone: 'Garden' },
    ],
  },
  {
    id: 'hot', label: 'Hot Dishes', image: '/images/menu-hot.jpg',
    items: [
      { name: 'Grilled Chicken & Veggies', desc: 'Marinated free-range chicken breast, seasonal roasted vegetables', p: 52, c: 18, f: 8, zone: 'Lair' },
      { name: 'Baked Salmon Fillet', desc: 'Atlantic salmon, herb crust, steamed asparagus, lemon butter', p: 46, c: 4, f: 22, zone: 'Both' },
      { name: 'Beef & Broccoli Stir-fry', desc: 'Lean beef strips, broccoli florets, ginger-tamari glaze, brown rice', p: 48, c: 22, f: 14, zone: 'Lair' },
      { name: 'Turkey Meatballs & Zucchini', desc: 'Herb turkey meatballs, zucchini noodles, light tomato basil sauce', p: 44, c: 16, f: 12, zone: 'Garden' },
    ],
  },
  {
    id: 'beverages', label: 'Beverages', image: '/images/menu-beverages.jpg',
    items: [
      { name: 'Green Detox Juice', desc: 'Spinach, cucumber, green apple, ginger, lemon — cold-pressed', p: 4, c: 22, f: 0, zone: 'Garden' },
      { name: 'Chocolate Protein Shake', desc: 'Whey isolate, cacao, almond milk, banana — 350ml', p: 32, c: 18, f: 6, zone: 'Lair' },
      { name: 'Vitamin C Citrus Blast', desc: 'Orange, grapefruit, lemon, turmeric, cayenne — immune boost', p: 2, c: 28, f: 0, zone: 'Garden' },
      { name: 'Matcha Latte', desc: 'Ceremonial grade matcha, oat milk, hint of honey — hot or iced', p: 6, c: 14, f: 4, zone: 'Garden' },
    ],
  },
  {
    id: 'energy', label: 'Energy', image: '/images/menu-energy.jpg',
    items: [
      { name: 'Espresso Energy Shot', desc: 'Double espresso, MCT oil, Himalayan salt — 60ml', p: 0, c: 4, f: 0, zone: 'Lair' },
      { name: 'Matcha Pre-Workout', desc: "High-grade matcha, L-theanine, lion's mane, coconut water", p: 4, c: 8, f: 2, zone: 'Both' },
      { name: 'Collagen Beauty Drink', desc: 'Marine collagen, vitamin C, hyaluronic acid, rose water — 200ml', p: 12, c: 6, f: 0, zone: 'Garden' },
      { name: 'Turmeric Recovery Shot', desc: 'Turmeric, ginger, black pepper, honey, apple cider vinegar', p: 2, c: 10, f: 0, zone: 'Both' },
    ],
  },
]

const ZONE_COLORS = {
  Lair:   { bg: '#2A1F1A', color: '#F1948A' },
  Garden: { bg: '#F7D6D0', color: '#8B4513' },
  Both:   { bg: '#F5F5F3', color: '#6B6B6B' },
}

const cardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const cardItem = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 18 } },
}

function MacroBar({ label, val, max }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: '#6B6B6B' }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: '#1C1C1C', letterSpacing: '-0.3px' }}>{val}g</span>
      </div>
      <div style={{ height: 3, background: '#F5F5F3', borderRadius: 2, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((val / max) * 100, 100)}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ height: '100%', background: '#C0392B', borderRadius: 2 }}
        />
      </div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState('bowls')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const category = CATEGORIES.find(c => c.id === activeTab)

  return (
    <section ref={ref} id="menu" style={{ background: '#F5F5F3', padding: '100px 0' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 80px' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ display: 'inline-block', background: '#FEF9EC', border: '1px solid #F5D76E', borderRadius: 100, padding: '5px 14px', marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#B8962E', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Menu</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', color: '#1C1C1C', lineHeight: 1.05 }}>
              Every meal, by design.
            </h2>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['100% Healthy', 'Sugar-Free', 'Minimal Gluten', 'Always Natural'].map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 * i + 0.3, type: 'spring', stiffness: 200, damping: 16 }}
                  style={{ background: '#FFFFFF', border: '1px solid #E8E8E5', borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 600, color: '#6B6B6B' }}
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tabs with layoutId indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: 6, marginBottom: 36, flexWrap: 'wrap' }}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                position: 'relative', padding: '10px 20px', borderRadius: 100,
                border: `1px solid ${activeTab === cat.id ? '#1C1C1C' : '#E8E8E5'}`,
                cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
                background: 'transparent',
                color: activeTab === cat.id ? '#FFFFFF' : '#6B6B6B',
                zIndex: 0, transition: 'border-color 0.2s, color 0.2s',
                overflow: 'hidden',
              }}
            >
              {activeTab === cat.id && (
                <motion.div
                  layoutId="menu-tab-bg"
                  style={{ position: 'absolute', inset: 0, background: '#1C1C1C', zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Category content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Hero image with Ken Burns */}
            <motion.div
              style={{ borderRadius: 24, overflow: 'hidden', height: 280, marginBottom: 28, position: 'relative' }}
            >
              <motion.img
                key={category.image}
                src={category.image}
                alt={category.label}
                initial={{ scale: 1.08, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.04, opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.1))' }} />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ position: 'absolute', bottom: 28, left: 36 }}
              >
                <h3 style={{ fontSize: 36, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-1px', marginBottom: 4 }}>{category.label}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{category.items.length} items available</p>
              </motion.div>
            </motion.div>

            {/* Items grid — spring stagger */}
            <motion.div
              variants={cardContainer}
              initial="hidden"
              animate="visible"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}
            >
              {category.items.map((item) => (
                <motion.div
                  key={item.name}
                  variants={cardItem}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 20px 48px -16px rgba(0,0,0,0.12)',
                    transition: { type: 'spring', stiffness: 300, damping: 22 },
                  }}
                  style={{ background: '#FFFFFF', border: '1px solid #E8E8E5', borderRadius: 20, padding: '28px 32px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <h4 style={{ fontSize: 17, fontWeight: 700, color: '#1C1C1C', letterSpacing: '-0.3px', maxWidth: '80%' }}>{item.name}</h4>
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      style={{
                        background: ZONE_COLORS[item.zone]?.bg, color: ZONE_COLORS[item.zone]?.color,
                        fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.zone}
                    </motion.div>
                  </div>

                  <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6, marginBottom: 20 }}>{item.desc}</p>

                  {/* Animated macro bars */}
                  <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: '1px solid #F5F5F3' }}>
                    <MacroBar label="Protein" val={item.p} max={60} />
                    <MacroBar label="Carbs" val={item.c} max={60} />
                    <MacroBar label="Fats" val={item.f} max={30} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media(max-width:768px){
          section > div { padding: 0 24px !important; }
          section > div > div:last-child > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
