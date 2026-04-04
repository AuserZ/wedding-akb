'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

function initWordSlideUp() {
  document.querySelectorAll('[data-words-slide-up]').forEach((el) => {
    const split = new SplitType(el as HTMLElement, { types: 'words' })
    if (!split.words) return

    gsap.fromTo(
      split.words,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: { amount: 0.5 },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    )
  })
}

function initLineSlideUp() {
  document.querySelectorAll('[data-line-slide-up]').forEach((el) => {
    const split = new SplitType(el as HTMLElement, { types: 'lines' })
    if (!split.lines) return

    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.fromTo(
      split.lines,
      { yPercent: 120, opacity: 0, filter: 'blur(6px)' },
      {
        yPercent: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    )
  })
}

function initImageReveal() {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const cover = el.querySelector('.reveal-cover')
    const img = el.querySelector('.reveal-img')
    if (!cover || !img) return

    const delay = parseFloat((el as HTMLElement).dataset.revealDelay || '0')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })

    tl.fromTo(
      cover,
      { yPercent: 0 },
      {
        yPercent: -101,
        duration: 1,
        delay,
        ease: 'power3.inOut',
      }
    ).fromTo(
      img,
      { scale: 1.3 },
      { scale: 1, duration: 1.2, ease: 'power2.out' },
      '<0.1'
    )
  })
}

function initParallax() {
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat((el as HTMLElement).dataset.parallaxSpeed || '5')
    gsap.to(el, {
      yPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

function initSlideUp() {
  document.querySelectorAll('[data-slide-up]').forEach((el) => {
    const delay = parseFloat((el as HTMLElement).dataset.delay || '0')
    gsap.fromTo(
      el,
      { yPercent: 40, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      }
    )
  })
}

function initFadeIn() {
  document.querySelectorAll('[data-fade-in]').forEach((el) => {
    const delay = parseFloat((el as HTMLElement).dataset.delay || '0')
    gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        delay,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      }
    )
  })
}

export default function AnimationInit() {
  useEffect(() => {
    // Delay to allow DOM to settle after hydration
    const timeout = setTimeout(() => {
      initWordSlideUp()
      initLineSlideUp()
      initImageReveal()
      initParallax()
      initSlideUp()
      initFadeIn()
      ScrollTrigger.refresh()
    }, 300)

    return () => {
      clearTimeout(timeout)
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return null
}
