'use client'

const ROTATING_WORDS = ['celebrate', 'cherish', 'love', 'honor', 'remember']

export default function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section id="cta" className="section cta-section">
        <div className="wrap cta-wrap">
          <span className="sec-tag" data-words-slide-up>/ See You There</span>
          <h2 className="cta-heading" data-line-slide-up>
            Ready to Make<br />it Official?
          </h2>

          <div className="rotating-text-wrap" data-fade-in data-delay="0.3">
            <span className="rotating-prefix">Let&apos;s</span>
            <div className="rotating-carousel">
              {ROTATING_WORDS.map((word) => (
                <span key={word} className="rotating-word">{word}</span>
              ))}
            </div>
            <span className="rotating-suffix">together</span>
          </div>

          <a href="#rsvp" className="btn btn-gold btn-lg" data-cursor-hover data-slide-up data-delay="0.5">
            Konfirmasi Kehadiran
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="wrap footer-grid">
          <div className="footer-col">
            <span className="footer-tag">/ Contact</span>
            <a href="mailto:wedding@ariefnadine.com" data-cursor-hover>wedding@ariefnadine.com</a>
          </div>
          <div className="footer-col">
            <span className="footer-tag">/ Location</span>
            <p>Gedung O.B. Sya&apos;af Lantamal<br />Jakarta Utara</p>
          </div>
          <div className="footer-col">
            <span className="footer-tag">/ Date</span>
            <p>Saturday<br />31 Oktober 2026</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="ft-names">Akbar &amp; Dina</span>
          <p className="ft-copy">2026 &copy; With love. All rights reserved.</p>
          <a href="#hero" className="ft-top" data-cursor-hover>Back to top &uarr;</a>
        </div>

        {/* Petals */}
        <div className="ft-petals">
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={i}
              className="ft-petal"
              style={{
                '--s': `${6 + ((i * 3.7) % 9)}px`,
                '--l': `${7 + i * 13}%`,
                '--d': `${6 + (i % 4) * 2.3}s`,
                '--del': `${i * 1.1}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </footer>
    </>
  )
}
