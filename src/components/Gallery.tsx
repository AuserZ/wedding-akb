'use client'

import { useState } from 'react'
import Image from 'next/image'

const PHOTOS = [
  '/img/IMG_4199.JPEG',
  '/img/IMG_4217.JPEG',
  '/img/IMG_4234.JPEG',
  '/img/IMG_4243.JPEG',
  '/img/IMG_4250.JPEG',
  '/img/IMG_4251.JPEG',
  '/img/IMG_4290.JPEG',
  '/img/IMG_4297.JPEG',
  '/img/IMG_4299.JPEG',
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
          {PHOTOS.map((src, i) => (
            <div
              key={i}
              className="g-item"
              data-reveal
              data-reveal-delay={String((i % 3) * 0.15)}
              onClick={() => setLightbox(i)}
            >
              <div className="reveal-cover" />
              <Image
                src={src}
                alt={`Gallery photo ${i + 1}`}
                width={400}
                height={500}
                className="reveal-img g-photo"
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
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
            <Image
              src={PHOTOS[lightbox]}
              alt={`Gallery photo ${lightbox + 1}`}
              width={600}
              height={800}
              className="lb-img"
              style={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: '85vh' }}
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
