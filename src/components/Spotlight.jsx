import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

export default function Spotlight() {
  const ref = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isTouch])

  if (isTouch) return null

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[9998] will-change-transform"
      style={{
        background:
          'radial-gradient(circle, rgba(16,185,129,0.07) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)',
      }}
    />
  )
}
