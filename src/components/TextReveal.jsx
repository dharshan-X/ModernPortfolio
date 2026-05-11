import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({
  children,
  className = '',
  as: Tag = 'div',
  stagger = 0.04,
  duration = 1,
  start = 'top 85%',
}) {
  const ref = useRef(null)

  useGSAP(() => {
    const words = ref.current?.querySelectorAll('.text-reveal-inner')
    if (!words?.length) return

    gsap.fromTo(
      words,
      { y: '110%', rotate: 2 },
      {
        y: '0%',
        rotate: 0,
        duration,
        stagger,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: ref })

  const text = typeof children === 'string' ? children : ''
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="text-reveal-inner inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
