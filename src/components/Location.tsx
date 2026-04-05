'use client'

function downloadICS() {
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Akbar Dina Wedding 2026//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:akbar-dina-20261031@wedding',
    'DTSTART:20261031T020000Z', 'DTEND:20261031T100000Z',
    'SUMMARY:Pernikahan Akbar & Dina',
    'LOCATION:Gedung O.B. Sya\'af Lantamal\\, Jl. RE Martadinata\\, Jakarta Utara',
    'DESCRIPTION:Kami mengundang Anda untuk merayakan hari bahagia kami.',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'arief-nadine-wedding.ics'
  a.click()
  URL.revokeObjectURL(a.href)
}

export default function Location() {
  return (
    <section id="location" className="section">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag" data-words-slide-up>/ When &amp; Where</span>
          <h2 className="sec-title" data-line-slide-up>The Celebration</h2>
        </div>

        <div className="venue-grid">
          <div className="venue-card" data-slide-up>
            <div className="venue-card-inner">
              <span className="v-tag">Akad &amp; Resepsi</span>
              <h3 className="v-name" data-line-slide-up>
                Gedung O.B. Sya&apos;af Lantamal
              </h3>
              <p className="v-addr">
                Jl. RE Martadinata No.1, Tanjung Priok<br />
                Jakarta Utara, DKI Jakarta 14310
              </p>
              <p className="v-time">09:00 &mdash; 17:00 WIB</p>

              <div className="venue-actions">
                <button className="btn" onClick={downloadICS} data-cursor-hover>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Save The Date
                </button>
                <a
                  href="https://maps.google.com/?q=Gedung+OB+Syaaf+Lantamal+Jakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  data-cursor-hover
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Open Maps
                </a>
              </div>
            </div>
          </div>

          <div className="map-embed" data-slide-up data-delay="0.2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d106.8!3d-6.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDYnMzYuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sen!2sid!4v1!5m2!1sen!2sid"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Map"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
