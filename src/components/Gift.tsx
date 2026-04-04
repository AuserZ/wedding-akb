'use client'

import { useState } from 'react'

function toast(msg: string) {
  const el = document.getElementById('toast')
  if (!el) return
  el.textContent = msg
  el.classList.add('on')
  setTimeout(() => el.classList.remove('on'), 2400)
}

function copy(text: string) {
  navigator.clipboard.writeText(text).then(() => toast('Nomor rekening disalin!'))
}

const BANKS = [
  { name: 'BCA', number: '8730 1234 567', holder: 'Arief Pratama', color: '#003D79' },
  { name: 'Mandiri', number: '1300 0567 8901', holder: 'Nadine Kusuma', color: '#003B71' },
]

export default function Gift() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <section id="gift" className="section">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag" data-words-slide-up>/ Wedding Gift</span>
          <h2 className="sec-title" data-line-slide-up>Love &amp; Blessings</h2>
        </div>

        <p className="gift-sub" data-fade-in>
          Kehadiran Anda adalah hadiah terindah. Namun jika Anda ingin memberikan tanda kasih,
          kami menyediakan beberapa opsi berikut.
        </p>

        <div className="bank-grid">
          {BANKS.map((bank, i) => (
            <div
              key={bank.name}
              className={`flip-wrap${flipped === i ? ' flipped' : ''}`}
              onClick={() => setFlipped(flipped === i ? null : i)}
              data-slide-up
              data-delay={String(i * 0.15)}
              data-cursor-hover
            >
              <div className="flip-inner">
                <div className="flip-f">
                  <span className="bk-logo">{bank.name}</span>
                  <span className="bk-masked">&bull;&bull;&bull;&bull; {bank.number.slice(-3)}</span>
                  <span className="bk-hint">Tap to reveal</span>
                </div>
                <div className="flip-b">
                  <span className="bk-name">{bank.holder}</span>
                  <span className="bk-num">{bank.number}</span>
                  <button
                    className="btn btn-sm"
                    onClick={(e) => { e.stopPropagation(); copy(bank.number.replace(/\s/g, '')) }}
                    data-cursor-hover
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* E-wallet */}
        <div className="ewallet-row" data-slide-up data-delay="0.3">
          <div className="ew-item">
            <span className="ew-tag">DANA</span>
            <span className="ew-num">0812-3456-7890</span>
          </div>
          <div className="ew-item">
            <span className="ew-tag">GoPay</span>
            <span className="ew-num">0812-3456-7890</span>
          </div>
        </div>

        {/* Physical gift */}
        <div className="gift-physical" data-slide-up data-delay="0.4">
          <span className="gift-physical-tag">Kirim Hadiah</span>
          <h3 className="gift-physical-title">Send a Physical Gift</h3>
          <div className="gift-addr-card">
            <span className="gift-addr-to">Kepada</span>
            <span className="gift-addr-name">Arief &amp; Nadine</span>
            <p className="gift-addr-text">
              <span>Jl. Mangga Dua No. 45</span>
              <span>Jakarta Utara, DKI Jakarta 14430</span>
              <span>Telp: 0812-3456-7890</span>
            </p>
          </div>
        </div>
      </div>

      <div id="toast" />
    </section>
  )
}
