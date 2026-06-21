import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      const { clientX, clientY } = e
      gsap.to(dot, { x: clientX, y: clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: clientX, y: clientY, duration: 0.4, ease: 'power3.out' })
    }

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')
      if (target) {
        gsap.to(ring, { scale: 1.5, borderColor: 'var(--color-primary)', backgroundColor: 'rgba(0, 0, 0, 0.05)', duration: 0.3 })
        gsap.to(dot, { scale: 0, duration: 0.2 })
      } else {
        gsap.to(ring, { scale: 1, borderColor: 'rgba(0, 0, 0, 0.1)', backgroundColor: 'transparent', duration: 0.3 })
        gsap.to(dot, { scale: 1, duration: 0.2 })
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onMouseOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onMouseOver)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-black/10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[border-color,background-color] duration-300"
      />
    </>
  )
}
