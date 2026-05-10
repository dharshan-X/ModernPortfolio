import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const textRef = useRef(null)
  const counterRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.5,
          ease: 'power4.inOut',
          onComplete,
        })
      }
    })

    const counter = { value: 0 }
    
    tl.to(counter, {
      value: 100,
      duration: 2.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.round(counter.value)
        }
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleX: counter.value / 100 })
        }
      }
    })
    .to(textRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: 'power4.in',
    }, '+=0.2')

    return () => tl.kill()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10001] bg-bg flex flex-col items-center justify-center overflow-hidden"
    >
      <div ref={textRef} className="relative">
        <div className="flex items-baseline gap-2 mb-4">
          <span ref={counterRef} className="text-[120px] md:text-[180px] font-display font-bold leading-none tabular-nums">0</span>
          <span className="text-primary text-4xl font-display font-bold">%</span>
        </div>
        <p className="text-text-muted text-sm tracking-[0.4em] uppercase text-center font-medium">
          Initializing Portfolio
        </p>
      </div>
      
      <div className="absolute bottom-20 left-10 right-10 flex flex-col gap-4">
         <div className="h-[1px] w-full bg-white/5 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-primary origin-left w-full"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-mute uppercase tracking-widest font-mono">
            <span>Systems Online</span>
            <span>Est. 2026</span>
          </div>
      </div>
    </div>
  )
}
