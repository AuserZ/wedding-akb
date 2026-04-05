'use client'

import { useState } from 'react'
import Image from 'next/image'

const PHOTOS = [
  { src: '/img/IMG_4199.JPEG', h: 380, rot: -3 },
  { src: '/img/IMG_4217.JPEG', h: 300, rot: 2 },
  { src: '/img/IMG_4234.JPEG', h: 340, rot: -1.5 },
  { src: '/img/IMG_4243.JPEG', h: 420, rot: 2.5 },
  { src: '/img/IMG_4250.JPEG', h: 280, rot: -2 },
  { src: '/img/IMG_4251.JPEG', h: 360, rot: 1.5 },
  { src: '/img/IMG_4290.JPEG', h: 320, rot: -2.5 },
  { src: '/img/IMG_4297.JPEG', h: 400, rot: 1 },
  { src: '/img/IMG_4299.JPEG', h: 350, rot: -1 },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="gallery" className="section gallery-section">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag" data-words-slide-up>/ Moments</span>
          <h2 className="sec-title" data-line-slide-up>Memories</h2>
        </div>

        <div className="gallery-scattered">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="gs-item"
              data-reveal
              data-reveal-delay={String((i % 3) * 0.12)}
              style={{
                '--rot': `${photo.rot}deg`,
                '--h': `${photo.h}px`,
              } as React.CSSProperties}
              onClick={() => setLightbox(i)}
            >
              <div className="gs-frame">
                <Image
                  src={photo.src}
                  alt={`Photo ${i + 1}`}
                  width={400}
                  height={500}
                  className="gs-photo"
                />
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
              src={PHOTOS[lightbox].src}
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
