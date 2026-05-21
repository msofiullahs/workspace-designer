'use client'

import { useState } from 'react'

// ─── Data ───────────────────────────────────────────────────────────────────

type Desk = { id: string; name: string; desc: string; price: number; emoji: string; color: string }
type Chair = { id: string; name: string; desc: string; price: number; emoji: string; color: string }
type Accessory = { id: string; name: string; price: number; emoji: string; category: string; maxQty: number }

const DESKS: Desk[] = [
  { id: 'standing', name: 'Standing Desk Pro', desc: 'Electric height-adjustable, 160×80cm', price: 89, emoji: '🖥️', color: 'bg-amber-100 border-amber-300' },
  { id: 'minimal', name: 'Minimal Desk', desc: 'Clean solid-wood surface, 140×70cm', price: 59, emoji: '📐', color: 'bg-orange-100 border-orange-300' },
  { id: 'corner', name: 'L-Shape Corner', desc: 'Dual-workspace corner unit, 200×160cm', price: 119, emoji: '📏', color: 'bg-yellow-100 border-yellow-300' },
]

const CHAIRS: Chair[] = [
  { id: 'ergonomic', name: 'Ergonomic Pro', desc: 'Full lumbar support, mesh back', price: 79, emoji: '🪑', color: 'bg-teal-100 border-teal-300' },
  { id: 'executive', name: 'Executive Chair', desc: 'Premium leather, high-back', price: 99, emoji: '💺', color: 'bg-emerald-100 border-emerald-300' },
  { id: 'stool', name: 'Drafting Stool', desc: 'Adjustable height stool, great for standing desks', price: 49, emoji: '🧲', color: 'bg-cyan-100 border-cyan-300' },
]

const ACCESSORIES: Accessory[] = [
  { id: 'monitor1', name: 'Monitor 24"', price: 39, emoji: '🖥️', category: 'Tech', maxQty: 3 },
  { id: 'monitor2', name: 'Monitor 27"', price: 55, emoji: '🖥️', category: 'Tech', maxQty: 3 },
  { id: 'lamp', name: 'Desk Lamp', price: 19, emoji: '💡', category: 'Lighting', maxQty: 2 },
  { id: 'plant', name: 'Tropical Plant', price: 12, emoji: '🌿', category: 'Decor', maxQty: 3 },
  { id: 'keyboard', name: 'Mech Keyboard', price: 25, emoji: '⌨️', category: 'Tech', maxQty: 1 },
  { id: 'dockingstation', name: 'Docking Station', price: 35, emoji: '🔌', category: 'Tech', maxQty: 1 },
  { id: 'webcam', name: 'HD Webcam', price: 22, emoji: '📷', category: 'Tech', maxQty: 1 },
  { id: 'speaker', name: 'Bluetooth Speaker', price: 28, emoji: '🔊', category: 'Audio', maxQty: 1 },
  { id: 'whiteboard', name: 'Mini Whiteboard', price: 18, emoji: '📋', category: 'Decor', maxQty: 1 },
  { id: 'cable', name: 'Cable Organiser', price: 9, emoji: '🗂️', category: 'Org', maxQty: 2 },
]

// ─── Workspace Preview ───────────────────────────────────────────────────────

function WorkspacePreview({
  desk, chair, accessories
}: {
  desk: Desk | null
  chair: Chair | null
  accessories: Record<string, number>
}) {
  const totalAccessories = Object.values(accessories).reduce((a, b) => a + b, 0)

  return (
    <div className="relative w-full aspect-[16/9] bg-gradient-to-b from-sky-100 to-amber-50 rounded-2xl overflow-hidden border-2 border-amber-200 shadow-inner">
      {/* Room background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-amber-100/60 rounded-b-2xl" />
        <div className="absolute top-2 right-4 text-4xl opacity-20">☀️</div>
      </div>

      {/* Desk */}
      {desk ? (
        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 text-center">
          <div className="bg-amber-800/20 rounded-t-lg px-8 pt-3 pb-1 border-t-4 border-amber-700/40 shadow-lg min-w-[180px]">
            {/* Monitors on desk */}
            <div className="flex justify-center gap-2 mb-1">
              {accessories['monitor1'] > 0 && Array(accessories['monitor1']).fill(0).map((_, i) => (
                <span key={`m1-${i}`} className="text-2xl drop-shadow">🖥️</span>
              ))}
              {accessories['monitor2'] > 0 && Array(accessories['monitor2']).fill(0).map((_, i) => (
                <span key={`m2-${i}`} className="text-2xl drop-shadow">🖥️</span>
              ))}
              {accessories['lamp'] > 0 && <span className="text-2xl drop-shadow">💡</span>}
              {accessories['plant'] > 0 && <span className="text-2xl drop-shadow">🌿</span>}
            </div>
            {/* Keyboard */}
            <div className="flex justify-center gap-2 mb-2">
              {accessories['keyboard'] > 0 && <span className="text-xl">⌨️</span>}
              {accessories['webcam'] > 0 && <span className="text-xl">📷</span>}
              {accessories['dockingstation'] > 0 && <span className="text-xl">🔌</span>}
            </div>
            <div className="text-xs font-semibold text-amber-900/70">{desk.name}</div>
          </div>
          <div className="bg-amber-900/30 rounded-b h-2 mx-2" />
        </div>
      ) : (
        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 text-center opacity-30">
          <div className="border-2 border-dashed border-amber-400 rounded-lg px-12 py-4 min-w-[180px]">
            <div className="text-2xl">📐</div>
            <div className="text-xs text-amber-700">Pick a desk</div>
          </div>
        </div>
      )}

      {/* Chair */}
      {chair ? (
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-4xl drop-shadow-lg animate-bounce-slow">
          {chair.emoji}
        </div>
      ) : (
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 opacity-20 text-3xl">🪑</div>
      )}

      {/* Side accessories */}
      {accessories['speaker'] > 0 && (
        <div className="absolute bottom-[30%] right-[15%] text-2xl drop-shadow">🔊</div>
      )}
      {accessories['whiteboard'] > 0 && (
        <div className="absolute top-[15%] left-[10%] text-2xl drop-shadow">📋</div>
      )}

      {/* Empty state prompt */}
      {!desk && !chair && totalAccessories === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center bg-white/60 rounded-xl px-6 py-4 backdrop-blur-sm">
            <div className="text-4xl mb-2">🏝️</div>
            <div className="text-amber-800 font-semibold">Design your workspace!</div>
            <div className="text-amber-600 text-sm">Pick a desk and chair to get started</div>
          </div>
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

  const canCheckout = selectedDesk && selectedChair

  // ── Checkout View ────────────────────────────────────────────────────────
  if (view === 'checkout') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 text-white">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏝️</span>
              <div>
                <h2 className="text-2xl font-bold">Your Setup is Ready!</h2>
                <p className="text-teal-100 text-sm">Here's your dream workspace summary</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="p-6 space-y-4">
            {/* Desk */}
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

            {/* Chair */}
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

            {/* Accessories */}
            {selectedAccessories.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Accessories</h3>
                {selectedAccessories.map(acc => (
                  <div key={acc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{acc.emoji}</span>
                      <span className="text-gray-700">{acc.name}</span>
                      {acc.qty > 1 && <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded-full text-gray-600">×{acc.qty}</span>}
                    </div>
                    <span className="text-gray-600 text-sm">€{acc.price * acc.qty}/mo</span>
                  </div>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t-2 border-dashed border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-teal-600">€{totalPrice}</span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://monis.rent"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-center font-bold text-lg rounded-xl hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              🚀 Rent This Setup on monis.rent
            </a>

            <button
              onClick={() => setView('designer')}
              className="block w-full py-3 text-gray-500 text-center hover:text-gray-700 text-sm transition-colors"
            >
              ← Back to Designer
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Designer View ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏝️</span>
            <div>
              <h1 className="text-white font-bold text-xl leading-none">Workspace Designer</h1>
              <p className="text-teal-300 text-xs">by monis.rent — Bali Office Rentals</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-white/60 text-xs">Monthly total</div>
              <div className="text-white font-bold text-lg">€{totalPrice}<span className="text-sm font-normal text-white/60">/mo</span></div>
            </div>
            <button
              onClick={() => canCheckout && setView('checkout')}
              disabled={!canCheckout}
              className="bg-amber-400 hover:bg-amber-300 disabled:bg-white/20 disabled:cursor-not-allowed text-black disabled:text-white/50 font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-amber-400/40 text-sm"
            >
              {canCheckout ? '🛒 Rent My Setup' : 'Select Desk & Chair'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        {/* LEFT PANEL – Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden flex flex-col">
          {/* Tabs */}
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

          {/* Tab content */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[60vh] lg:max-h-none">
            {/* Desks */}
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
                      {selectedDesk?.id === desk.id && <span className="text-amber-400 text-sm">✓ Selected</span>}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">{desk.desc}</div>
                    <div className="text-amber-300 font-bold mt-1">€{desk.price}/mo</div>
                  </div>
                </div>
              </button>
            ))}

            {/* Chairs */}
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
                      {selectedChair?.id === chair.id && <span className="text-teal-400 text-sm">✓ Selected</span>}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">{chair.desc}</div>
                    <div className="text-teal-300 font-bold mt-1">€{chair.price}/mo</div>
                  </div>
                </div>
              </button>
            ))}

            {/* Accessories */}
            {activeTab === 'accessories' && (() => {
              const categories = Array.from(new Set(ACCESSORIES.map(a => a.category)))
              return categories.map(cat => (
                <div key={cat}>
                  <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">{cat}</h3>
                  <div className="space-y-2">
                    {ACCESSORIES.filter(a => a.category === cat).map(acc => {
                      const qty = accessories[acc.id] || 0
                      return (
                        <div key={acc.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
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

        {/* RIGHT PANEL – Preview */}
        <div className="flex flex-col gap-4">
          {/* Preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white font-semibold">Live Preview</h2>
              <span className="text-white/40 text-xs">Updates as you choose</span>
            </div>
            <WorkspacePreview desk={selectedDesk} chair={selectedChair} accessories={accessories} />
          </div>

          {/* Selected items summary */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
            <h2 className="text-white font-semibold mb-3">Your Selection</h2>
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
                    <div className="text-white font-medium">{selectedAccessories.map(a => a.emoji).join(' ')}</div>
                    <div className="text-purple-300 text-xs">€{Object.entries(accessories).reduce((s, [id, q]) => s + (ACCESSORIES.find(a => a.id === id)?.price || 0) * q, 0)}/mo</div>
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
                🚀 Ready to Rent? View My Setup →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
