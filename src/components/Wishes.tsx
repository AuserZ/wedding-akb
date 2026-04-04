'use client'

import { useEffect, useRef, useState } from 'react'

interface Wish { id: number; name: string; message: string; likes: number; createdAt: string }

export default function Wishes() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const feedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/wishes').then((r) => r.json()).then((d) => setWishes(d.wishes || [])).catch(() => null)
    try {
      const stored = JSON.parse(localStorage.getItem('wl') || '[]')
      setLiked(new Set(stored))
    } catch { /* noop */ }
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.wish) setWishes((prev) => [data.wish, ...prev])
        setName('')
        setMessage('')
      }
    } catch { /* noop */ } finally { setLoading(false) }
  }

  const toggleLike = async (id: number) => {
    const isLiked = liked.has(id)
    const action = isLiked ? 'unlike' : 'like'
    setLiked((prev) => {
      const next = new Set(prev)
      isLiked ? next.delete(id) : next.add(id)
      localStorage.setItem('wl', JSON.stringify([...next]))
      return next
    })
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + (isLiked ? -1 : 1) } : w))
    )
    fetch('/api/wishes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    }).catch(() => null)
  }

  return (
    <section id="wishes" className="section">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag" data-words-slide-up>/ Guestbook</span>
          <h2 className="sec-title" data-line-slide-up>Wedding Wishes</h2>
        </div>

        {/* Marquee ticker */}
        {wishes.length > 0 && (
          <div className="wishes-ticker" data-fade-in>
            <div className="marquee">
              <div className="marquee-track marquee-slow">
                {[...wishes.slice(0, 10), ...wishes.slice(0, 10)].map((w, i) => (
                  <div key={`${w.id}-${i}`} className="tick-card">
                    <div className="tick-name">{w.name}</div>
                    <div className="tick-msg">{w.message}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form className="wish-form" onSubmit={submit} data-slide-up>
          <input
            className="f-input"
            placeholder="Nama Anda"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="f-textarea"
            placeholder="Tulis ucapan & doa untuk kedua mempelai..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
          <button className="btn btn-gold" disabled={loading} data-cursor-hover>
            {loading ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </form>

        {/* Feed */}
        <div className="wishes-feed" ref={feedRef}>
          {wishes.map((w) => (
            <div key={w.id} className="w-card" data-slide-up>
              <div className="w-head">
                <span className="w-name">{w.name}</span>
                <span className="w-ts">
                  {new Date(w.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'short', year: 'numeric',
                  })}
                </span>
              </div>
              <p className="w-msg">{w.message}</p>
              <button
                className={`w-like${liked.has(w.id) ? ' on' : ''}`}
                onClick={() => toggleLike(w.id)}
                data-cursor-hover
              >
                &#9825; {w.likes}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
