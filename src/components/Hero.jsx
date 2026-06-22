import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)
  const imgRef = useRef(null)
  const nameRef = useRef(null)
  const nameOutlineRef = useRef(null)

  useGSAP(() => {
    // Initial page load reveal sequence
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

    gsap.set(imgRef.current, { opacity: 0, y: 70, scale: 0.96 })
    gsap.set('.hero-top-el', { opacity: 0, y: -20 })
    gsap.set('.hero-bottom-left', { opacity: 0, x: -30 })
    gsap.set('.hero-bottom-right', { opacity: 0, x: 30 })
    gsap.set([nameRef.current, nameOutlineRef.current], { opacity: 0, scale: 0.95 })

    tl.to(imgRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.5,
    })
    .to([nameRef.current, nameOutlineRef.current], {
      opacity: 1,
      scale: 1,
      stagger: 0.04,
      duration: 1.3,
    }, '-=1.1')
    .to('.hero-top-el', {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.9,
    }, '-=0.9')
    .to(['.hero-bottom-left', '.hero-bottom-right'], {
      opacity: 1,
      x: 0,
      stagger: 0.08,
      duration: 1.1,
    }, '-=0.8')

    // Scale portrait image on scroll, pivoting from the bottom center so it remains anchored to the divider
    gsap.to('.hero-char-img', {
      scale: 1.15,
      transformOrigin: 'bottom center',
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })
  }, { scope: containerRef })

  return (
    <section 
      id="hero" 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#e6e6e6] select-none text-black"
    >
      {/* 60/40 Split Background */}
      {/* Top 60dvh: Light Grey */}
      <div className="absolute top-0 left-0 right-0 h-[60dvh] bg-[#e6e6e6] z-0" />
      {/* Bottom 40dvh: Solid Black */}
      <div className="absolute bottom-0 left-0 right-0 h-[40dvh] bg-black z-0 border-t border-black/5" />

      {/* Top Header Row */}
      <div className="relative w-full px-6 md:px-12 py-8 flex justify-between items-start z-40">
        {/* Top Left: Date / Time Coordinates */}
        <div className="hero-top-el flex flex-col font-mono text-[9px] md:text-[10px] text-black/60 font-bold uppercase tracking-wider">
          <span>07.00 PM IST</span>
          <span>22 June 2026</span>
        </div>

        {/* Top Middle: Minimal Brand Accent */}
        <div className="hero-top-el text-black font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-black rotate-45" />
          <span>Dharshan Balaji</span>
        </div>

        {/* Top Right: Location & Weather Coordinates */}
        <div className="hero-top-el flex flex-col font-mono text-[9px] md:text-[10px] text-right text-black/60 font-bold uppercase tracking-wider">
          <span>28°C</span>
          <span>Salem, India</span>
        </div>
      </div>

      {/* Underlaid Title Text (z-10: Behind portrait) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 select-none">
        <h1 
          ref={nameRef}
          className="w-full text-center font-satoshi font-black text-[13vw] leading-none text-black tracking-tighter uppercase select-none"
          style={{ transform: 'translateY(-10dvh)' }}
        >
          Dharshan
        </h1>
      </div>

      {/* Centered Portrait Image (z-20: Layers in middle) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] md:max-w-[480px] xl:max-w-[530px] h-[85vh] md:h-[90vh] z-20 pointer-events-none flex items-end justify-center overflow-visible">
        <img 
          ref={imgRef}
          src="/hero-portrait.png" 
          alt="Dharshan Balaji"
          className="hero-char-img h-[90%] object-contain object-bottom filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]"
        />
      </div>

      {/* Overlaid Outline Title Text (z-30: Layers in front for 3D depth) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 select-none">
        <h1 
          ref={nameOutlineRef}
          className="w-full text-center font-satoshi font-black text-[13vw] leading-none tracking-tighter uppercase select-none"
          style={{ 
            transform: 'translateY(-10dvh)',
            WebkitTextStroke: '1.2px rgba(255,255,255,0.7)',
            color: 'transparent',
            textFillColor: 'transparent'
          }}
        >
          Dharshan
        </h1>
      </div>

      {/* Phone/Sub-labels underneath massive name word */}
      <div className="absolute left-0 right-0 top-[52dvh] -translate-y-1/2 z-35 px-6 md:px-12 flex justify-between pointer-events-none">
        {/* Left Sub-label */}
        <div className="hero-top-el text-left font-mono text-[9px] md:text-[10px] text-black font-extrabold uppercase tracking-widest pl-[4%]">
          <span>மென்பொருள் // DEVELOPER</span>
        </div>
        {/* Right Sub-label */}
        <div className="hero-top-el text-right font-mono text-[9px] md:text-[10px] text-black font-extrabold uppercase tracking-widest pr-[4%]">
          <span>/dɑːr.ʃən/</span>
        </div>
      </div>

      {/* Bottom Content Area (Overlaying Black Section) */}
      <div className="relative w-full px-6 md:px-12 pb-10 md:pb-16 flex flex-col md:flex-row justify-between items-end gap-10 md:gap-0 z-40">
        
        {/* Bottom Left: Bio Details & Translations */}
        <div className="hero-bottom-left flex flex-col gap-6 text-left max-w-sm md:max-w-md">
          {/* Accent Dots */}
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 bg-white/40 rotate-45" />
            <span className="w-1.5 h-1.5 bg-white/40 rotate-45" />
            <span className="w-1.5 h-1.5 bg-white/40 rotate-45" />
          </div>

          <div className="space-y-4 font-satoshi font-bold leading-relaxed text-white/80">
            {/* English description */}
            <p className="text-xs md:text-sm">
              Architecting autonomous agent loops, cloud infrastructure suites, and low-level security engines. Focus on speed, scalability, and robust system designs.
            </p>
            {/* Tamil translation (editorial details matching screenshot style) */}
            <p className="text-[11px] md:text-xs text-white/30 leading-relaxed font-normal">
              கணினி மென்பொருள் பொறியாளர், அதிவேக அமைப்புகள் மற்றும் கணினி உள்கட்டமைப்பை உருவாக்குபவர்.
            </p>
          </div>
        </div>

        {/* Bottom Right: Role & Developer Name Titles */}
        <div className="hero-bottom-right flex flex-col items-start md:items-end text-left md:text-right text-white space-y-3">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 font-bold">
            SOFTWARE ENGINEER
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-satoshi font-black leading-[0.9] tracking-tighter uppercase">
            Dharshan Balaji
          </h2>
        </div>

      </div>

    </section>
  )
}
