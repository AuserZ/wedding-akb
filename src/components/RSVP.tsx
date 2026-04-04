'use client'

import { useEffect, useState } from 'react'

interface Counter { hadirCount: number; totalGuests: number }

export default function RSVP({ guestName }: { guestName: string }) {
  const [name, setName] = useState(guestName)
  const [phone, setPhone] = useState('')
  const [attendance, setAttend] = useState<'hadir' | 'tidak' | ''>('')
  const [guests, setGuests] = useState('1')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState<Counter | null>(null)

  useEffect(() => {
    fetch('/api/rsvp')
      .then((r) => r.json())
      .then((d) => setCounter({ hadirCount: d.hadirCount, totalGuests: d.totalGuests }))
      .catch(() => null)
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!name.trim()) e.name = 'Nama tidak boleh kosong.'
    if (!/^[\d\s+\-]{8,}$/.test(phone)) e.phone = 'Masukkan nomor telepon yang valid.'
    if (!attendance) e.attend = 'Silakan pilih kehadiran Anda.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          attendance,
          guests: attendance === 'hadir' ? Number(guests) : 0,
        }),
      })
      if (res.ok) setSubmitted(true)
    } catch {
      /* ignore */
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="rsvp" className="section">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag" data-words-slide-up>/ Konfirmasi</span>
          <h2 className="sec-title" data-line-slide-up>RSVP</h2>
        </div>

        {counter && (
          <p className="rsvp-count" data-fade-in>
            <b>{counter.hadirCount}</b> tamu telah mengkonfirmasi &middot;{' '}
            <b>{counter.totalGuests}</b> total kehadiran
          </p>
        )}

        {submitted ? (
          <div className="rsvp-ok" data-slide-up>
            <div className="rsvp-ok-icon">&#10003;</div>
            <div className="rsvp-ok-name">{name}</div>
            <p className="rsvp-ok-txt">
              {attendance === 'hadir'
                ? 'Terima kasih! Kami sangat menantikan kehadiran Anda.'
                : 'Terima kasih atas konfirmasi Anda. Kami memahami dan tetap mendoakan yang terbaik.'}
            </p>
          </div>
        ) : (
          <form className="form-wrap" onSubmit={submit} data-slide-up>
            <div className="f-group">
              <label className="f-label">Nama</label>
              <input
                className={`f-input${errors.name ? ' err' : ''}`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
              />
              {errors.name && <span className="f-err show">{errors.name}</span>}
            </div>

            <div className="f-group">
              <label className="f-label">No. Telepon</label>
              <input
                className={`f-input${errors.phone ? ' err' : ''}`}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 xxx xxxx xxxx"
              />
              {errors.phone && <span className="f-err show">{errors.phone}</span>}
            </div>

            <div className="f-group">
              <label className="f-label">Kehadiran</label>
              <div className="radio-row">
                <label className="r-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="hadir"
                    checked={attendance === 'hadir'}
                    onChange={() => setAttend('hadir')}
                  />
                  Hadir
                </label>
                <label className="r-label">
                  <input
                    type="radio"
                    name="attendance"
                    value="tidak"
                    checked={attendance === 'tidak'}
                    onChange={() => setAttend('tidak')}
                  />
                  Tidak Hadir
                </label>
              </div>
              {errors.attend && <span className="f-err show">{errors.attend}</span>}
            </div>

            {attendance === 'hadir' && (
              <div className="f-group">
                <label className="f-label">Jumlah Tamu</label>
                <select
                  className="f-select"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'orang' : 'orang'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button className="btn btn-gold btn-block" disabled={loading} data-cursor-hover>
              {loading ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
