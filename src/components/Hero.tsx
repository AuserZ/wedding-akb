'use client'

import { useEffect, useRef, useState } from 'react'

const WEDDING_DATE = new Date('2025-11-15T00:00:00')

function useCountdown() {
  const [time, setTime] = useState({ d: '000', h: '00', m: '00', s: '00' })
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now())
      setTime({
        d: String(Math.floor(diff / 86400000)).padStart(3, '0'),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

const MARQUEE_TEXT = 'We\u2019re Getting Married \u00B7 15 November 2025 \u00B7 Save The Date \u00B7 '

export default function Hero({ guestName }: { guestName: string }) {
  const cd = useCountdown()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      const layer = heroRef.current.querySelector('.hero-bg-layer') as HTMLElement
      if (layer) layer.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-bg-layer" />
      <div className="hero-bg-overlay" />
      <div className="hero-bg-bottom-fade" />

      <div className="petals">
        {Array.from({ length: 18 }, (_, i) => {
          // Deterministic pseudo-random using index
          const seed = (i * 137 + 97) % 100
          const seed2 = (i * 251 + 43) % 100
          const seed3 = (i * 179 + 67) % 100
          const seed4 = (i * 311 + 23) % 100
          return (
            <div
              key={i}
              className="petal"
              style={{
                '--lft': `${seed}%`,
                '--sz': `${5 + (seed2 / 100) * 7}px`,
                '--fd': `${9 + (seed3 / 100) * 9}s`,
                '--dl': `${(seed4 / 100) * 12}s`,
                '--dx': `${-40 + (seed / 100) * 80}px`,
                '--c': ['#E8C4B8', '#C97B84', '#C9A84C', '#FAF6F0'][i % 4],
              } as React.CSSProperties}
            />
          )
        })}
      </div>

      <div className="hero-content">
        <div className="hero-guest" data-slide-up>
          <span className="hero-tag">Kepada Yth.</span>
          <span className="hero-guest-name">{guestName}</span>
        </div>

        <p className="hero-eyebrow" data-words-slide-up>The Wedding Of</p>

        <h1 className="hero-names" data-line-slide-up>Akbar &amp; Dina</h1>

        <div className="hero-rule" data-fade-in data-delay="0.4" />

        <p className="hero-date" data-words-slide-up>Sabtu, 15 November 2025</p>

        <div className="countdown" data-slide-up data-delay="0.3">
          {[
            { val: cd.d, lbl: 'Days' },
            { val: cd.h, lbl: 'Hours' },
            { val: cd.m, lbl: 'Min' },
            { val: cd.s, lbl: 'Sec' },
          ].map((u, i) => (
            <div key={u.lbl} className="cd-block">
              {i > 0 && <span className="cd-sep">:</span>}
              <div className="cd-unit">
                <span className="cd-num">{u.val}</span>
                <span className="cd-lbl">{u.lbl}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-hint" data-fade-in data-delay="1.5">
        <span className="scroll-hint-txt">Scroll</span>
        <span className="scroll-arrow" />
      </div>

      <div className="hero-marquee">
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
