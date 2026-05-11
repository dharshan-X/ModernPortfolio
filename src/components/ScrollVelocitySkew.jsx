import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useLenis } from './SmoothScroll'

export default function ScrollVelocitySkew({ children, className = '' }) {
  const ref = useRef(null)
  const lenisRef = useLenis()

  useEffect(() => {
    const lenis = lenisRef?.current
    const el = ref.current
    if (!lenis || !el) return

    const quickSkew = gsap.quickTo(el, 'skewY', {
      duration: 0.5,
      ease: 'power3.out',
    })

    const onScroll = (e) => {
      const skew = gsap.utils.clamp(-2.5, 2.5, e.velocity * 0.015)
      quickSkew(skew)
    }

    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenisRef])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
