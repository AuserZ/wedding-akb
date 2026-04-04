'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'location', label: 'Location' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'wishes', label: 'Wishes' },
  { id: 'gift', label: 'Gift' },
]

export default function Nav() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3
      let current = SECTIONS[0].id
      for (const el of els) {
        if (el.offsetTop <= scrollY) current = el.id
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="section-nav">
      <ul>
        {SECTIONS.map((s) => (
          <li key={s.id} className={active === s.id ? 'active' : ''}>
            <a href={`#${s.id}`} data-cursor-hover>
              <span className="nav-dot" />
              <span className="nav-label">{s.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
