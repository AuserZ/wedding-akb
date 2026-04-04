'use client'

import { useState } from 'react'

const ITEMS = [
  { h: 320, grad: 'linear-gradient(135deg,#2a1022,#3d1530)' },
  { h: 260, grad: 'linear-gradient(135deg,#1a2a1a,#2a3d2a)' },
  { h: 380, grad: 'linear-gradient(135deg,#1a1a2a,#2a2a3d)' },
  { h: 280, grad: 'linear-gradient(135deg,#2a2010,#3d3018)' },
  { h: 340, grad: 'linear-gradient(135deg,#201a2a,#30243d)' },
  { h: 240, grad: 'linear-gradient(135deg,#2a1018,#3d1825)' },
  { h: 300, grad: 'linear-gradient(135deg,#102a2a,#183d3d)' },
  { h: 360, grad: 'linear-gradient(135deg,#2a1a10,#3d2818)' },
  { h: 290, grad: 'linear-gradient(135deg,#1a102a,#28183d)' },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="gallery" className="section">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag" data-words-slide-up>/ Moments</span>
          <h2 className="sec-title" data-line-slide-up>Our Gallery</h2>
        </div>

        <div className="gallery-grid">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="g-item"
              data-reveal
              data-reveal-delay={String((i % 3) * 0.15)}
              onClick={() => setLightbox(i)}
            >
              <div className="reveal-cover" />
              <div
                className="reveal-img g-swatch"
                style={{ height: item.h, background: item.grad }}
              />
              <div className="g-overlay">
                <span className="g-number">{String(i + 1).padStart(2, '0')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox${lightbox !== null ? ' on' : ''}`}
        onClick={() => setLightbox(null)}
      >
        {lightbox !== null && (
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>
            <div
              className="lb-img"
              style={{
                height: 420,
                background: ITEMS[lightbox].grad,
              }}
            />
            <button className="lb-close" onClick={() => setLightbox(null)} data-cursor-hover>
              &times;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
