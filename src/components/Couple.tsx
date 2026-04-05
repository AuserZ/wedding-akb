'use client'

import Image from 'next/image'

export default function Couple() {
  return (
    <section id="couple" className="section couple-section">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag" data-words-slide-up>/ Bride &amp; Groom</span>
          <h2 className="sec-title" data-line-slide-up>Akbar &amp; Dina</h2>
        </div>

        <p className="couple-intro" data-fade-in>
          Dengan memohon rahmat dan ridho Allah SWT, kami mengundang
          Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:
        </p>

        <div className="couple-cards">
          {/* Bride */}
          <div className="couple-card" data-reveal>
            <div className="couple-photo-wrap">
              <Image
                src="/img/IMG_4243.JPEG"
                alt="Dina"
                width={280}
                height={350}
                className="couple-photo"
              />
            </div>
            <h3 className="couple-name">Maulidina Lubis, B. Sc.</h3>
            <p className="couple-parent">
              Putri dari<br />
              Bapak Cas November Lubis &amp; Ibu ...
            </p>
          </div>

          {/* Separator */}
          <div className="couple-and" data-fade-in>
            <span className="couple-ampersand">&amp;</span>
          </div>

          {/* Groom */}
          <div className="couple-card" data-reveal>
            <div className="couple-photo-wrap">
              <Image
                src="/img/IMG_4234.JPEG"
                alt="Akbar"
                width={280}
                height={350}
                className="couple-photo"
              />
            </div>
            <h3 className="couple-name">Muhammad Zainurroziqin Akbar, S. Kom.</h3>
            <p className="couple-parent">
              Putra dari<br />
              Bapak ... &amp; Ibu ...
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
