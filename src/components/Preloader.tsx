'use client'

import { useEffect, useState } from 'react'

const COLS = 24
const ROWS = 14
const TOTAL = COLS * ROWS

export default function Preloader() {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done' | 'init'>('init')

  useEffect(() => {
    const seen = sessionStorage.getItem('preloaderSeen')
    if (seen) { setPhase('done'); return }

    setPhase('loading')
    const t1 = setTimeout(() => setPhase('reveal'), 2200)
    const t2 = setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem('preloaderSeen', '1')
    }, 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done' || phase === 'init') return null

  return (
    <div className={`preloader ${phase}`}>
      <div className="preloader-grid">
        {Array.from({ length: TOTAL }, (_, i) => {
          const col = i % COLS
          const row = Math.floor(i / COLS)
          const dist = Math.sqrt(
            Math.pow(col - COLS / 2, 2) + Math.pow(row - ROWS / 2, 2)
          )
          // Deterministic "random" for loading phase
          const pseudoRand = ((i * 137 + 97) % 60) / 100
          const delay = phase === 'loading' ? pseudoRand : dist * 0.04
          return (
            <div
              key={i}
              className="preloader-cell"
              style={{ animationDelay: `${delay}s` }}
            />
          )
        })}
      </div>
      <div className="preloader-text">
        <span className="preloader-names">A &amp; D</span>
        <span className="preloader-date">31 . 10 . 2026</span>
      </div>
    </div>
  )
}
