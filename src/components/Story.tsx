'use client'

const ITEMS = [
  {
    date: 'Maret 2020',
    title: 'First Meeting',
    desc: 'Pertemuan pertama yang tak terduga di sebuah acara kampus. Satu senyum yang mengubah segalanya.',
    side: 'left' as const,
  },
  {
    date: 'Juni 2020',
    title: 'First Date',
    desc: 'Kencan pertama di kafe kecil yang hangat. Obrolan berjam-jam yang terasa hanya semenit.',
    side: 'right' as const,
  },
  {
    date: 'Desember 2023',
    title: 'The Proposal',
    desc: 'Di bawah langit malam berbintang, satu pertanyaan yang mengubah hidup kami selamanya.',
    side: 'left' as const,
  },
  {
    date: 'November 2025',
    title: 'Forever Begins',
    desc: 'Awal dari perjalanan baru sebagai satu. Hari yang telah lama kami nantikan.',
    side: 'right' as const,
  },
]

export default function Story() {
  return (
    <section id="story" className="section">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag" data-words-slide-up>/ Our Journey</span>
          <h2 className="sec-title" data-line-slide-up>How It All Began</h2>
        </div>

        <div className="timeline">
          <div className="timeline-line" />
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`tl-item ${item.side}`}
              data-slide-up
              data-delay={String(i * 0.12)}
            >
              <div className="tl-dot" />
              <div className="tl-card">
                <span className="tl-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="tl-date">{item.date}</span>
                <h3 className="tl-name">{item.title}</h3>
                <p className="tl-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
