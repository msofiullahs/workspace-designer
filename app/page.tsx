'use client'

import { useEffect, useState } from 'react'

// ─── Types & Data ───────────────────────────────────────────────────────────

type DeskShape = 'minimal' | 'standing' | 'corner'
type ChairShape = 'ergonomic' | 'executive' | 'stool'

type Desk = {
  id: string
  shape: DeskShape
  name: string
  desc: string
  price: number
  emoji: string
  tint: string
}
type Chair = {
  id: string
  shape: ChairShape
  name: string
  desc: string
  price: number
  emoji: string
  color: string
}
type Accessory = {
  id: string
  name: string
  price: number
  emoji: string
  category: string
  maxQty: number
  slot: 'desk-top' | 'desk-front' | 'floor-left' | 'floor-right' | 'wall'
}

const DESKS: Desk[] = [
  { id: 'minimal',  shape: 'minimal',  name: 'Minimal Desk',     desc: 'Clean solid-wood surface, 140×70cm',   price: 59,  emoji: '📐', tint: '#d6a87a' },
  { id: 'standing', shape: 'standing', name: 'Standing Desk Pro', desc: 'Electric height-adjustable, 160×80cm', price: 89,  emoji: '🖥️', tint: '#b48a5a' },
  { id: 'corner',   shape: 'corner',   name: 'L-Shape Corner',    desc: 'Dual-workspace corner unit, 200×160cm', price: 119, emoji: '📏', tint: '#c19360' },
]

const CHAIRS: Chair[] = [
  { id: 'ergonomic', shape: 'ergonomic', name: 'Ergonomic Pro',   desc: 'Full lumbar support, mesh back',                 price: 79, emoji: '🪑', color: '#1f2937' },
  { id: 'executive', shape: 'executive', name: 'Executive Chair', desc: 'Premium leather, high-back',                     price: 99, emoji: '💺', color: '#3b2a1e' },
  { id: 'stool',     shape: 'stool',     name: 'Drafting Stool',  desc: 'Adjustable height stool, great for standing desks', price: 49, emoji: '🧲', color: '#0f766e' },
]

const ACCESSORIES: Accessory[] = [
  { id: 'monitor1',       name: 'Monitor 24"',      price: 39, emoji: '🖥️', category: 'Tech',     maxQty: 3, slot: 'desk-top'    },
  { id: 'monitor2',       name: 'Monitor 27"',      price: 55, emoji: '🖥️', category: 'Tech',     maxQty: 3, slot: 'desk-top'    },
  { id: 'lamp',           name: 'Desk Lamp',        price: 19, emoji: '💡', category: 'Lighting', maxQty: 2, slot: 'desk-top'    },
  { id: 'plant',          name: 'Tropical Plant',   price: 12, emoji: '🪴', category: 'Decor',    maxQty: 3, slot: 'floor-left'  },
  { id: 'keyboard',       name: 'Mech Keyboard',    price: 25, emoji: '⌨️', category: 'Tech',     maxQty: 1, slot: 'desk-front'  },
  { id: 'dockingstation', name: 'Docking Station',  price: 35, emoji: '🔌', category: 'Tech',     maxQty: 1, slot: 'desk-front'  },
  { id: 'webcam',         name: 'HD Webcam',        price: 22, emoji: '📷', category: 'Tech',     maxQty: 1, slot: 'desk-top'    },
  { id: 'speaker',        name: 'Bluetooth Speaker', price: 28, emoji: '🔊', category: 'Audio',   maxQty: 1, slot: 'floor-right' },
  { id: 'whiteboard',     name: 'Mini Whiteboard',  price: 18, emoji: '📋', category: 'Decor',    maxQty: 1, slot: 'wall'        },
  { id: 'cable',          name: 'Cable Organiser',  price: 9,  emoji: '🗂️', category: 'Org',      maxQty: 2, slot: 'desk-front'  },
]

const STORAGE_KEY = 'workspace-designer-state-v1'

// ─── SVG components ─────────────────────────────────────────────────────────

function DeskSVG({ desk }: { desk: Desk }) {
  const tint = desk.tint
  if (desk.shape === 'minimal') {
    return (
      <svg viewBox="0 0 280 80" className="w-full h-full">
        <ellipse cx="140" cy="74" rx="120" ry="4" fill="rgba(0,0,0,0.15)" />
        <rect x="20" y="14" width="240" height="14" rx="2" fill={tint} />
        <rect x="20" y="14" width="240" height="3" fill="rgba(255,255,255,0.25)" />
        <rect x="28" y="28" width="6" height="46" fill={tint} />
        <rect x="246" y="28" width="6" height="46" fill={tint} />
      </svg>
    )
  }
  if (desk.shape === 'standing') {
    return (
      <svg viewBox="0 0 280 80" className="w-full h-full">
        <ellipse cx="140" cy="76" rx="110" ry="4" fill="rgba(0,0,0,0.15)" />
        <rect x="30" y="10" width="220" height="12" rx="2" fill={tint} />
        <rect x="30" y="10" width="220" height="3" fill="rgba(255,255,255,0.25)" />
        <rect x="130" y="22" width="20" height="48" fill="#6b7280" />
        <rect x="100" y="68" width="80" height="8" rx="2" fill="#374151" />
        <rect x="240" y="26" width="14" height="3" rx="1.5" fill="#0d9488" />
      </svg>
    )
  }
  // corner
  return (
    <svg viewBox="0 0 320 90" className="w-full h-full">
      <ellipse cx="160" cy="84" rx="140" ry="4" fill="rgba(0,0,0,0.15)" />
      <rect x="10" y="20" width="300" height="14" rx="2" fill={tint} />
      <rect x="220" y="34" width="90" height="36" rx="2" fill={tint} />
      <rect x="10" y="20" width="300" height="3" fill="rgba(255,255,255,0.25)" />
      <rect x="18" y="34" width="6" height="46" fill={tint} />
      <rect x="296" y="34" width="6" height="46" fill={tint} />
      <rect x="226" y="70" width="6" height="14" fill={tint} />
      <rect x="298" y="70" width="6" height="14" fill={tint} />
    </svg>
  )
}

function ChairSVG({ chair }: { chair: Chair }) {
  if (chair.shape === 'ergonomic') {
    return (
      <svg viewBox="0 0 80 110" className="w-full h-full">
        <ellipse cx="40" cy="104" rx="28" ry="3" fill="rgba(0,0,0,0.2)" />
        {/* back */}
        <rect x="20" y="6" width="40" height="46" rx="10" fill={chair.color} />
        <rect x="24" y="12" width="32" height="34" rx="6" fill="rgba(255,255,255,0.08)" />
        {/* seat */}
        <rect x="14" y="52" width="52" height="12" rx="4" fill={chair.color} />
        {/* post */}
        <rect x="38" y="64" width="4" height="22" fill="#374151" />
        {/* base */}
        <path d="M 14 96 L 40 86 L 66 96 L 60 100 L 20 100 Z" fill="#374151" />
        <circle cx="20" cy="100" r="3" fill="#1f2937" />
        <circle cx="40" cy="100" r="3" fill="#1f2937" />
        <circle cx="60" cy="100" r="3" fill="#1f2937" />
      </svg>
    )
  }
  if (chair.shape === 'executive') {
    return (
      <svg viewBox="0 0 80 120" className="w-full h-full">
        <ellipse cx="40" cy="114" rx="28" ry="3" fill="rgba(0,0,0,0.2)" />
        {/* high back */}
        <rect x="18" y="2" width="44" height="58" rx="12" fill={chair.color} />
        <rect x="22" y="8" width="36" height="48" rx="8" fill="rgba(255,255,255,0.06)" />
        {/* headrest seam */}
        <rect x="22" y="22" width="36" height="1.5" fill="rgba(0,0,0,0.3)" />
        {/* armrests */}
        <rect x="10" y="50" width="10" height="18" rx="3" fill={chair.color} />
        <rect x="60" y="50" width="10" height="18" rx="3" fill={chair.color} />
        {/* seat */}
        <rect x="12" y="60" width="56" height="14" rx="4" fill={chair.color} />
        {/* post */}
        <rect x="38" y="74" width="4" height="24" fill="#1f2937" />
        {/* base */}
        <path d="M 14 108 L 40 96 L 66 108 L 60 112 L 20 112 Z" fill="#1f2937" />
        <circle cx="20" cy="112" r="3" fill="#0f172a" />
        <circle cx="40" cy="112" r="3" fill="#0f172a" />
        <circle cx="60" cy="112" r="3" fill="#0f172a" />
      </svg>
    )
  }
  // stool
  return (
    <svg viewBox="0 0 80 110" className="w-full h-full">
      <ellipse cx="40" cy="104" rx="22" ry="3" fill="rgba(0,0,0,0.2)" />
      {/* seat */}
      <ellipse cx="40" cy="30" rx="22" ry="6" fill={chair.color} />
      <ellipse cx="40" cy="28" rx="22" ry="6" fill={chair.color} />
      <path d="M 18 28 Q 18 34 22 36 L 58 36 Q 62 34 62 28" fill={chair.color} opacity="0.7" />
      {/* post */}
      <rect x="38" y="36" width="4" height="56" fill="#475569" />
      <rect x="32" y="56" width="16" height="2" fill="#475569" />
      {/* base */}
      <path d="M 22 96 L 40 88 L 58 96 L 54 100 L 26 100 Z" fill="#334155" />
    </svg>
  )
}

// ─── Workspace Preview ──────────────────────────────────────────────────────

function WorkspacePreview({
  desk, chair, accessories
}: {
  desk: Desk | null
  chair: Chair | null
  accessories: Record<string, number>
}) {
  const qty = (id: string) => accessories[id] || 0
  const totalItems =
    (desk ? 1 : 0) + (chair ? 1 : 0) + Object.values(accessories).reduce((a, b) => a + b, 0)

  const monitorsOnDesk: { emoji: string; size: string; offset: number }[] = []
  for (let i = 0; i < qty('monitor2'); i++) {
    monitorsOnDesk.push({ emoji: '🖥️', size: 'text-4xl', offset: monitorsOnDesk.length })
  }
  for (let i = 0; i < qty('monitor1'); i++) {
    monitorsOnDesk.push({ emoji: '🖥️', size: 'text-3xl', offset: monitorsOnDesk.length })
  }

  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/20 shadow-inner select-none">
      {/* Sky / wall */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-amber-50" />

      {/* Sun */}
      <div className="absolute top-4 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-200 to-amber-400 shadow-[0_0_40px_8px_rgba(251,191,36,0.4)]" />

      {/* Palm silhouettes */}
      <svg className="absolute bottom-[35%] left-2 w-16 h-24 opacity-50" viewBox="0 0 60 90" aria-hidden>
        <rect x="27" y="40" width="6" height="50" fill="#5b4a3b" />
        <path d="M30 40 Q10 30 5 18 Q22 30 30 36 Z" fill="#10b981" />
        <path d="M30 40 Q50 30 55 18 Q38 30 30 36 Z" fill="#059669" />
        <path d="M30 40 Q15 25 20 8 Q28 25 30 36 Z" fill="#047857" />
        <path d="M30 40 Q45 25 40 8 Q32 25 30 36 Z" fill="#10b981" />
      </svg>

      {/* Window */}
      <div className="absolute top-[12%] left-[35%] w-[30%] h-[28%] bg-gradient-to-b from-sky-300 to-sky-100 rounded-md border-4 border-amber-900/30 shadow-md overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber-900/20" />
        <div className="absolute top-0 left-1/2 w-0.5 h-full bg-amber-900/20" />
        <div className="absolute bottom-0 w-full h-1/3 bg-emerald-300/30" />
      </div>

      {/* Whiteboard on wall */}
      {qty('whiteboard') > 0 && (
        <div className="absolute top-[10%] right-[8%] w-[16%] h-[20%] bg-white rounded shadow-md border border-gray-300 animate-fade-in">
          <div className="absolute inset-1 border border-gray-200 rounded-sm flex items-end p-1">
            <div className="w-full space-y-0.5">
              <div className="h-0.5 w-3/4 bg-sky-400 rounded" />
              <div className="h-0.5 w-1/2 bg-rose-400 rounded" />
              <div className="h-0.5 w-2/3 bg-emerald-400 rounded" />
            </div>
          </div>
        </div>
      )}

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[38%] bg-gradient-to-b from-amber-200/80 to-amber-300/80">
        <div className="absolute top-0 left-0 right-0 h-px bg-amber-900/30" />
      </div>

      {/* ── Workspace ── */}

      {/* Desk */}
      {desk && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[18%] animate-fade-in"
          style={{ width: desk.shape === 'corner' ? '70%' : '56%' }}
        >
          {/* monitors sitting on desk */}
          {monitorsOnDesk.length > 0 && (
            <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 flex items-end gap-1">
              {monitorsOnDesk.slice(0, 6).map((m, i) => (
                <div key={i} className="flex flex-col items-center animate-slide-up">
                  <div className={`${m.size === 'text-4xl' ? 'w-12 h-8' : 'w-10 h-7'} bg-gradient-to-b from-slate-700 to-slate-900 rounded-sm border border-slate-600 relative overflow-hidden`}>
                    <div className="absolute inset-0.5 bg-gradient-to-br from-sky-400/40 via-purple-400/30 to-pink-400/30" />
                  </div>
                  <div className="w-2 h-1 bg-slate-700" />
                  <div className="w-5 h-0.5 bg-slate-700 rounded-sm" />
                </div>
              ))}
            </div>
          )}

          {/* desk-top items: lamp */}
          {qty('lamp') > 0 && (
            <div className="absolute -top-[34px] right-4 flex items-end animate-slide-up">
              <div className="w-1 h-7 bg-slate-600 rounded" />
              <div className="absolute top-0 right-0 w-6 h-2 bg-amber-400 rounded-t-md shadow-[0_0_12px_4px_rgba(251,191,36,0.5)]" />
            </div>
          )}
          {qty('lamp') > 1 && (
            <div className="absolute -top-[34px] left-4 flex items-end animate-slide-up">
              <div className="w-1 h-7 bg-slate-600 rounded" />
              <div className="absolute top-0 left-0 w-6 h-2 bg-amber-400 rounded-t-md shadow-[0_0_12px_4px_rgba(251,191,36,0.5)]" />
            </div>
          )}

          {/* webcam on top of central monitor */}
          {qty('webcam') > 0 && monitorsOnDesk.length > 0 && (
            <div className="absolute -top-[70px] left-1/2 -translate-x-1/2 w-3 h-2 bg-slate-800 rounded-full animate-slide-up" />
          )}

          {/* desk itself */}
          <div className="relative h-[80px]">
            <DeskSVG desk={desk} />
          </div>

          {/* desk-front items */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {qty('keyboard') > 0 && (
              <div className="w-14 h-2 bg-slate-700 rounded-sm shadow animate-slide-up" />
            )}
            {qty('dockingstation') > 0 && (
              <div className="w-4 h-1.5 bg-slate-800 rounded-sm animate-slide-up" />
            )}
            {qty('cable') > 0 && (
              <div className="w-3 h-1.5 bg-amber-700/70 rounded-sm animate-slide-up" />
            )}
          </div>
        </div>
      )}

      {/* Chair */}
      {chair && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[3%] w-[10%] h-[26%] animate-bounce-slow">
          <ChairSVG chair={chair} />
        </div>
      )}

      {/* Plants on left floor */}
      {qty('plant') > 0 && (
        <div className="absolute bottom-[2%] left-[6%] flex items-end gap-1 animate-slide-up">
          {Array(qty('plant')).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col items-center" style={{ transform: `translateY(${i % 2 === 0 ? 0 : -4}px)` }}>
              <div className="text-3xl leading-none">🪴</div>
            </div>
          ))}
        </div>
      )}

      {/* Speaker on right floor */}
      {qty('speaker') > 0 && (
        <div className="absolute bottom-[5%] right-[8%] animate-slide-up">
          <div className="w-7 h-12 bg-gradient-to-b from-slate-700 to-slate-900 rounded-md shadow-md relative">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 rounded-full border border-slate-600" />
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-950 rounded-full border border-slate-600" />
          </div>
        </div>
      )}

      {/* Empty state */}
      {totalItems === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-lg border border-white/60 animate-fade-in">
            <div className="text-5xl mb-2">🏝️</div>
            <div className="text-amber-900 font-bold text-lg">Design your workspace</div>
            <div className="text-amber-700 text-sm">Pick a desk and chair to begin</div>
          </div>
        </div>
      )}

      {/* Hints */}
      {!desk && totalItems > 0 && (
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 text-xs text-amber-900/60 bg-white/70 rounded-full px-3 py-1 backdrop-blur-sm animate-fade-in">
          ↑ Add a desk
        </div>
      )}
      {desk && !chair && (
        <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 text-xs text-amber-900/60 bg-white/70 rounded-full px-3 py-1 backdrop-blur-sm animate-fade-in">
          ↓ Add a chair
        </div>
      )}
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

type Tab = 'desks' | 'chairs' | 'accessories'
type View = 'designer' | 'checkout'

export default function WorkspaceDesigner() {
  const [activeTab, setActiveTab] = useState<Tab>('desks')
  const [selectedDesk, setSelectedDesk] = useState<Desk | null>(null)
  const [selectedChair, setSelectedChair] = useState<Chair | null>(null)
  const [accessories, setAccessories] = useState<Record<string, number>>({})
  const [view, setView] = useState<View>('designer')
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage after hydration
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as {
          deskId?: string
          chairId?: string
          accessories?: Record<string, number>
        }
        if (parsed.deskId) {
          const d = DESKS.find(x => x.id === parsed.deskId)
          if (d) setSelectedDesk(d)
        }
        if (parsed.chairId) {
          const c = CHAIRS.find(x => x.id === parsed.chairId)
          if (c) setSelectedChair(c)
        }
        if (parsed.accessories) setAccessories(parsed.accessories)
      }
    } catch {
      // ignore — corrupt storage, start fresh
    }
    setHydrated(true)
  }, [])

  // Persist on change (only after hydration to avoid wiping)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          deskId: selectedDesk?.id ?? null,
          chairId: selectedChair?.id ?? null,
          accessories,
        }),
      )
    } catch {
      // storage full or unavailable — non-fatal
    }
  }, [selectedDesk, selectedChair, accessories, hydrated])

  const addAccessory = (id: string, maxQty: number) => {
    setAccessories(prev => ({
      ...prev,
      [id]: Math.min((prev[id] || 0) + 1, maxQty),
    }))
  }

  const removeAccessory = (id: string) => {
    setAccessories(prev => {
      const next = { ...prev }
      if ((next[id] || 0) > 1) {
        next[id] = next[id] - 1
      } else {
        delete next[id]
      }
      return next
    })
  }

  const resetAll = () => {
    setSelectedDesk(null)
    setSelectedChair(null)
    setAccessories({})
  }

  const totalPrice =
    (selectedDesk?.price || 0) +
    (selectedChair?.price || 0) +
    Object.entries(accessories).reduce((sum, [id, qty]) => {
      const acc = ACCESSORIES.find(a => a.id === id)
      return sum + (acc?.price || 0) * qty
    }, 0)

  const selectedAccessories = Object.entries(accessories)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ ...ACCESSORIES.find(a => a.id === id)!, qty }))

  const canCheckout = !!selectedDesk && !!selectedChair

  // ── Checkout View ────────────────────────────────────────────────────────
  if (view === 'checkout' && canCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-slide-up">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏝️</span>
              <div>
                <h2 className="text-2xl font-bold">Your setup is ready</h2>
                <p className="text-teal-100 text-sm">Here is your dream workspace summary</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedDesk!.emoji}</span>
                <div>
                  <div className="font-semibold text-gray-800">{selectedDesk!.name}</div>
                  <div className="text-xs text-gray-500">{selectedDesk!.desc}</div>
                </div>
              </div>
              <span className="font-bold text-amber-700">€{selectedDesk!.price}/mo</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-teal-50 rounded-xl border border-teal-200">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedChair!.emoji}</span>
                <div>
                  <div className="font-semibold text-gray-800">{selectedChair!.name}</div>
                  <div className="text-xs text-gray-500">{selectedChair!.desc}</div>
                </div>
              </div>
              <span className="font-bold text-teal-700">€{selectedChair!.price}/mo</span>
            </div>

            {selectedAccessories.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Accessories</h3>
                {selectedAccessories.map(acc => (
                  <div key={acc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{acc.emoji}</span>
                      <span className="text-gray-700">{acc.name}</span>
                      {acc.qty > 1 && (
                        <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full text-gray-600">×{acc.qty}</span>
                      )}
                    </div>
                    <span className="text-gray-600 text-sm">€{acc.price * acc.qty}/mo</span>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t-2 border-dashed border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-teal-600">€{totalPrice}</span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
              </div>
            </div>

            <a
              href="https://monis.rent"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-center font-bold text-lg rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Rent this setup on monis.rent →
            </a>

            <button
              onClick={() => setView('designer')}
              className="block w-full py-3 text-gray-500 text-center hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to designer
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Designer View ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏝️</span>
            <div>
              <h1 className="text-white font-bold text-xl leading-none">Workspace Designer</h1>
              <p className="text-teal-300 text-xs">by monis.rent — Bali office rentals</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-white/60 text-xs">Monthly total</div>
              <div className="text-white font-bold text-lg">
                €{totalPrice}
                <span className="text-sm font-normal text-white/60">/mo</span>
              </div>
            </div>
            <button
              onClick={() => canCheckout && setView('checkout')}
              disabled={!canCheckout}
              className="bg-amber-400 hover:bg-amber-300 disabled:bg-white/20 disabled:cursor-not-allowed text-black disabled:text-white/50 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-amber-400/40 text-sm"
            >
              {canCheckout ? 'Rent my setup' : 'Select desk & chair'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* LEFT PANEL */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden flex flex-col order-2 lg:order-1">
          <div className="flex border-b border-white/10">
            {(['desks', 'chairs', 'accessories'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-amber-400/20 text-amber-300 border-b-2 border-amber-400'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {tab === 'desks' ? '🪵 Desks' : tab === 'chairs' ? '🪑 Chairs' : '✨ Add-ons'}
              </button>
            ))}
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[60vh] lg:max-h-[calc(100vh-220px)]">
            {activeTab === 'desks' && DESKS.map(desk => (
              <button
                key={desk.id}
                onClick={() => setSelectedDesk(desk.id === selectedDesk?.id ? null : desk)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedDesk?.id === desk.id
                    ? 'bg-amber-400/20 border-amber-400 shadow-amber-400/20 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{desk.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold flex items-center justify-between">
                      {desk.name}
                      {selectedDesk?.id === desk.id && (
                        <span className="text-amber-400 text-sm">✓ Selected</span>
                      )}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">{desk.desc}</div>
                    <div className="text-amber-300 font-bold mt-1">€{desk.price}/mo</div>
                  </div>
                </div>
              </button>
            ))}

            {activeTab === 'chairs' && CHAIRS.map(chair => (
              <button
                key={chair.id}
                onClick={() => setSelectedChair(chair.id === selectedChair?.id ? null : chair)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedChair?.id === chair.id
                    ? 'bg-teal-400/20 border-teal-400 shadow-teal-400/20 shadow-lg'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{chair.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold flex items-center justify-between">
                      {chair.name}
                      {selectedChair?.id === chair.id && (
                        <span className="text-teal-400 text-sm">✓ Selected</span>
                      )}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">{chair.desc}</div>
                    <div className="text-teal-300 font-bold mt-1">€{chair.price}/mo</div>
                  </div>
                </div>
              </button>
            ))}

            {activeTab === 'accessories' && (() => {
              const categories = Array.from(new Set(ACCESSORIES.map(a => a.category)))
              return categories.map(cat => (
                <div key={cat}>
                  <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{cat}</h3>
                  <div className="space-y-2">
                    {ACCESSORIES.filter(a => a.category === cat).map(acc => {
                      const qty = accessories[acc.id] || 0
                      return (
                        <div
                          key={acc.id}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                            qty > 0
                              ? 'bg-amber-400/10 border-amber-400/30'
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{acc.emoji}</span>
                            <div>
                              <div className="text-white text-sm font-medium">{acc.name}</div>
                              <div className="text-white/40 text-xs">€{acc.price}/mo</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {qty > 0 && (
                              <button
                                onClick={() => removeAccessory(acc.id)}
                                aria-label={`Remove one ${acc.name}`}
                                className="w-7 h-7 bg-white/10 hover:bg-white/20 text-white rounded-full text-sm font-bold transition-colors"
                              >
                                −
                              </button>
                            )}
                            {qty > 0 && (
                              <span className="text-white font-bold text-sm w-4 text-center">{qty}</span>
                            )}
                            <button
                              onClick={() => addAccessory(acc.id, acc.maxQty)}
                              disabled={qty >= acc.maxQty}
                              aria-label={`Add one ${acc.name}`}
                              className="w-7 h-7 bg-amber-400/20 hover:bg-amber-400/40 disabled:opacity-30 text-amber-300 rounded-full text-sm font-bold transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            })()}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-4 order-1 lg:order-2">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold">Live preview</h2>
              <span className="text-white/40 text-xs">Updates as you choose</span>
            </div>
            <WorkspacePreview desk={selectedDesk} chair={selectedChair} accessories={accessories} />
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold">Your selection</h2>
              {(selectedDesk || selectedChair || Object.keys(accessories).length > 0) && (
                <button
                  onClick={resetAll}
                  className="text-white/40 hover:text-white/70 text-xs transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-3 rounded-xl text-sm ${selectedDesk ? 'bg-amber-400/15 border border-amber-400/30' : 'bg-white/5 border border-dashed border-white/20'}`}>
                <div className="text-white/50 text-xs uppercase tracking-wide mb-1">Desk</div>
                {selectedDesk ? (
                  <div>
                    <div className="text-white font-medium">{selectedDesk.emoji} {selectedDesk.name}</div>
                    <div className="text-amber-300 text-xs">€{selectedDesk.price}/mo</div>
                  </div>
                ) : (
                  <div className="text-white/30 italic">Not selected</div>
                )}
              </div>
              <div className={`p-3 rounded-xl text-sm ${selectedChair ? 'bg-teal-400/15 border border-teal-400/30' : 'bg-white/5 border border-dashed border-white/20'}`}>
                <div className="text-white/50 text-xs uppercase tracking-wide mb-1">Chair</div>
                {selectedChair ? (
                  <div>
                    <div className="text-white font-medium">{selectedChair.emoji} {selectedChair.name}</div>
                    <div className="text-teal-300 text-xs">€{selectedChair.price}/mo</div>
                  </div>
                ) : (
                  <div className="text-white/30 italic">Not selected</div>
                )}
              </div>
              <div className={`p-3 rounded-xl text-sm ${Object.keys(accessories).length > 0 ? 'bg-purple-400/15 border border-purple-400/30' : 'bg-white/5 border border-dashed border-white/20'}`}>
                <div className="text-white/50 text-xs uppercase tracking-wide mb-1">Add-ons</div>
                {Object.keys(accessories).length > 0 ? (
                  <div>
                    <div className="text-white font-medium">
                      {selectedAccessories.map(a => a.emoji).join(' ')}
                    </div>
                    <div className="text-purple-300 text-xs">
                      €{Object.entries(accessories).reduce((s, [id, q]) => s + (ACCESSORIES.find(a => a.id === id)?.price || 0) * q, 0)}/mo
                    </div>
                  </div>
                ) : (
                  <div className="text-white/30 italic">None yet</div>
                )}
              </div>
            </div>

            {canCheckout && (
              <button
                onClick={() => setView('checkout')}
                className="mt-4 w-full py-3 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-black font-bold rounded-xl transition-all shadow-lg text-sm"
              >
                Ready to rent? View my setup →
              </button>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 pb-6 pt-2 text-center text-white/40 text-xs">
        Built for the Desent Solutions coding challenge · monis.rent
      </footer>
    </div>
  )
}
