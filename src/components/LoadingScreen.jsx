import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null)
  const ringRef = useRef(null)
  const ringBgRef = useRef(null)
  const counterRef = useRef(null)
  const charRefs = useRef([])
  const subtitleRef = useRef(null)
  const lineLeftRef = useRef(null)
  const lineRightRef = useRef(null)
  const coordsRef = useRef([])
  const scanLineRef = useRef(null)
  const handRef = useRef(null)
  const handGroupRef = useRef(null)
  const ticksRefs = useRef([])

  const name = 'DHARSHAN'

  useEffect(() => {
    const ctx = gsap.context(() => {
      const master = gsap.timeline({
        onComplete: () => {
          const exit = gsap.timeline({ onComplete })

          // Characters scatter outward
          charRefs.current.forEach((el, i) => {
            const angle = ((i / charRefs.current.length) * Math.PI * 2) - Math.PI / 2
            exit.to(el, {
              x: Math.cos(angle) * 200,
              y: Math.sin(angle) * 200,
              opacity: 0,
              scale: 0.3,
              rotation: gsap.utils.random(-90, 90),
              duration: 0.6,
              ease: 'power3.in',
            }, 0)
          })

          exit.to([counterRef.current, subtitleRef.current, lineLeftRef.current, lineRightRef.current], {
            opacity: 0,
            duration: 0.4,
            ease: 'power3.in',
          }, 0)

          exit.to([ringRef.current, ringBgRef.current, handGroupRef.current], {
            opacity: 0,
            duration: 0.5,
            ease: 'power3.in',
          }, 0.1)

          exit.to(coordsRef.current, {
            opacity: 0,
            duration: 0.3,
          }, 0)

          // Final container fade (solid, no-shake fade-out transition)
          exit.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: 'power3.inOut',
          }, 0.4)
        }
      })

      // Phase 1: Ring draws in
      master.fromTo(ringBgRef.current, 
        { strokeDashoffset: 565 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
        0
      )

      // Rotating arc
      master.fromTo(ringRef.current,
        { rotation: 0 },
        { rotation: 720, duration: 3.5, ease: 'power2.inOut' },
        0
      )
      master.fromTo(ringRef.current.querySelector('circle'),
        { strokeDashoffset: 500 },
        { strokeDashoffset: 100, duration: 3, ease: 'power2.inOut' },
        0
      )

      // Phase 2: Characters drop in one by one
      charRefs.current.forEach((el, i) => {
        master.fromTo(el,
          { y: -60, opacity: 0, rotationX: -90 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.5, ease: 'back.out(1.7)' },
          0.4 + i * 0.08
        )
      })

      // Expanding lines from center
      master.fromTo(lineLeftRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        1.0
      )
      master.fromTo(lineRightRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        1.0
      )

      // Subtitle types in
      master.fromTo(subtitleRef.current,
        { opacity: 0, letterSpacing: '0em' },
        { opacity: 1, letterSpacing: '0.5em', duration: 0.8, ease: 'power3.out' },
        1.3
      )

      // Corner coordinates
      master.fromTo(coordsRef.current,
        { opacity: 0 },
        { opacity: 0.3, stagger: 0.15, duration: 0.4 },
        0.6
      )

      // Counter from 000 to 100
      const counter = { value: 0 }
      master.to(counter, {
        value: 100,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.round(counter.value)
          
          if (counterRef.current) {
            counterRef.current.innerText = String(val).padStart(3, '0')
          }

          if (handRef.current) {
            const angle = (counter.value / 100) * 360
            handRef.current.setAttribute('transform', `rotate(${angle} 100 100)`)
          }

          // Light up ticks clockwise
          const progressTickCount = Math.floor((counter.value / 100) * 60)
          ticksRefs.current.forEach((tick, idx) => {
            if (tick) {
              if (idx < progressTickCount) {
                tick.setAttribute('stroke', 'rgba(0,0,0,0.85)')
                tick.setAttribute('stroke-width', idx % 5 === 0 ? '1.5' : '1')
              } else {
                tick.setAttribute('stroke', idx % 5 === 0 ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)')
                tick.setAttribute('stroke-width', idx % 5 === 0 ? '1' : '0.5')
              }
            }
          })
        },
      }, 0.5)

      // Scan line sweep
      master.fromTo(scanLineRef.current,
        { top: '0%', opacity: 0 },
        { top: '100%', opacity: 0.15, duration: 2, ease: 'none', repeat: 1 },
        0.5
      )

    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10001] bg-bg flex items-center justify-center overflow-hidden"
    >
      {/* Scan line */}
      <div
        ref={scanLineRef}
        className="absolute left-0 right-0 h-[1px] bg-black/30 pointer-events-none"
        style={{ top: '0%' }}
      />

      {/* Corner coordinates — engineering touch */}
      {[
        { pos: 'top-5 left-6', label: '00.00' },
        { pos: 'top-5 right-6', label: '12.27' },
        { pos: 'bottom-5 left-6', label: 'SYS.OK' },
        { pos: 'bottom-5 right-6', label: 'V.2026' },
      ].map(({ pos, label }, i) => (
        <span
          key={label}
          ref={el => coordsRef.current[i] = el}
          className="absolute text-[9px] font-mono text-text-muted tracking-widest uppercase"
          style={{ [pos.split(' ')[0]]: '1.25rem', [pos.split(' ')[1]]: '1.5rem' }}
        >
          {label}
        </span>
      ))}

      {/* Orbital ring SVG */}
      <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px]">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          {/* Background ring that draws in */}
          <circle
            ref={ringBgRef}
            cx="100" cy="100" r="90"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="0.5"
            strokeDasharray="565"
            strokeDashoffset="565"
          />

          {/* Inner accent ring */}
          <circle
            cx="100" cy="100" r="80"
            stroke="rgba(0,0,0,0.03)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />

          {/* Tick marks around the ring */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i / 60) * Math.PI * 2 - Math.PI / 2
            const isMajor = i % 5 === 0
            const r1 = isMajor ? 83 : 86
            const r2 = 90
            return (
              <line
                key={i}
                ref={el => ticksRefs.current[i] = el}
                x1={100 + Math.cos(angle) * r1}
                y1={100 + Math.sin(angle) * r1}
                x2={100 + Math.cos(angle) * r2}
                y2={100 + Math.sin(angle) * r2}
                stroke={isMajor ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.06)'}
                strokeWidth={isMajor ? 1 : 0.5}
              />
            )
          })}

          {/* Sweeping second hand dial wrapper to prevent GSAP transform conflict */}
          <g ref={handGroupRef}>
            <g ref={handRef} transform="rotate(0 100 100)">
              {/* The exclamation mark bar (tapered trapezoid, broader at the top, sharp corners, extended below) */}
              <polygon
                points="96,18 104,18 102,84 98,84"
                fill="rgba(0,0,0,0.85)"
              />
              {/* The exclamation mark dot (circle pivot cap at center) */}
              <circle
                cx="100"
                cy="100"
                r="5"
                fill="rgba(0,0,0,0.85)"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Rotating progress arc */}
      <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] pointer-events-none">
        <svg ref={ringRef} viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <circle
            cx="100" cy="100" r="90"
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="1.2"
            strokeDasharray="565"
            strokeDashoffset="500"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Center content */}
      <div className="relative flex flex-col items-center z-10">
        {/* Name characters */}
        <div className="flex items-center gap-[2px] md:gap-1">
          {name.split('').map((char, i) => (
            <span
              key={i}
              ref={el => charRefs.current[i] = el}
              className="text-[2.5rem] md:text-[4.5rem] font-satoshi font-black text-primary leading-none inline-block tracking-tighter"
              style={{ perspective: '400px' }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Expanding horizontal lines */}
        <div className="flex items-center w-full mt-4 gap-3">
          <div ref={lineLeftRef} className="flex-1 h-[1px] bg-black/20 origin-right" />
          <div className="w-1.5 h-1.5 bg-black/30 rotate-45" />
          <div ref={lineRightRef} className="flex-1 h-[1px] bg-black/20 origin-left" />
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-5 text-[9px] md:text-[10px] uppercase text-text-muted font-satoshi tracking-[0.3em] font-extrabold"
        >
          Full-Stack Engineer
        </p>
      </div>

      {/* Bottom counter */}
      <div className="absolute bottom-12 md:bottom-16 flex flex-col items-center gap-1">
        <span
          ref={counterRef}
          className="text-[56px] md:text-[80px] font-satoshi font-black leading-none tabular-nums text-black/[0.05] tracking-tight"
        >
          000
        </span>
      </div>
    </div>
  )
}
