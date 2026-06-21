import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)
  const imgRef = useRef(null)

  useGSAP(() => {
    // Initial page load animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } })

    gsap.set(imgRef.current, { opacity: 0, y: 50, scale: 0.98 })
    gsap.set('.hero-left-el', { opacity: 0, x: -30 })
    gsap.set('.hero-right-el', { opacity: 0, x: 30 })

    tl.to(imgRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: 'power4.out'
    })
    .to('.hero-left-el', {
      opacity: 1,
      x: 0,
      stagger: 0.08,
    }, '-=1.1')
    .to('.hero-right-el', {
      opacity: 1,
      x: 0,
      stagger: 0.08,
    }, '-=1.1')

    // Scroll scale and translation parallax effect on the centered portrait image (desktop & mobile)
    gsap.to('.hero-char-img', {
      scale: 1.12,
      y: -20,
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
      className="relative min-h-screen bg-bg select-none text-black overflow-hidden"
    >
      
      {/* ========================================== */}
      {/* DESKTOP LAYOUT (>= 1024px)                 */}
      {/* ========================================== */}
      <div className="hidden lg:block absolute inset-0 w-full h-full">
        
        {/* Diagonal Surface-Dark Split Background */}
        <div className="absolute inset-0 w-full h-full bg-surface-dark [clip-path:polygon(0_0,_68%_0,_46%_100%,_0_100%)] z-10" />
        
        {/* Brand / Developer Name (Left side) */}
        <div className="absolute left-[6%] top-[50%] -translate-y-1/2 z-20 w-[35%] text-left">
          <h1 className="hero-left-el font-display font-black text-6xl xl:text-[80px] 2xl:text-[96px] leading-[0.85] text-black uppercase tracking-tighter">
            DHARSHAN
            <br />
            BALAJI
          </h1>
          
          <a 
            href="#projects" 
            className="hero-left-el mt-8 px-6 py-3 bg-white text-black font-mono font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 w-max hover:bg-black hover:text-white border border-white hover:border-black transition-colors duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <span className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[8px] border-l-current shrink-0" />
            VIEW PROJECTS
          </a>
        </div>

        {/* Centered Transparent Portrait Image */}
        <div className="absolute bottom-0 left-[48%] -translate-x-1/2 w-full max-w-[500px] xl:max-w-[560px] h-[85%] xl:h-[90%] z-20 pointer-events-none flex items-end justify-center overflow-visible">
          <img 
            ref={imgRef}
            src="/hero-portrait.png" 
            alt="Dharshan Balaji Portrait"
            className="hero-char-img h-full object-contain object-bottom filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
          />
        </div>

        {/* Developer Role Title (Right side) */}
        <div className="absolute right-[6%] top-[30%] -translate-y-1/2 z-10 text-right w-[40%]">
          <h2 className="hero-right-el font-display font-black text-4xl xl:text-[60px] 2xl:text-[72px] leading-[0.85] text-black uppercase tracking-tighter">
            SOFTWARE
            <br />
            ENGINEER
          </h2>
          <div className="hero-right-el font-mono text-[9px] xl:text-[10px] text-accent tracking-[0.35em] uppercase mt-3.5 font-bold">
            SYSTEMS ARCHITECT & EDGE INFRASTRUCTURE
          </div>
        </div>

        {/* Developer About Block & Status Strip (Right side) */}
        <div className="absolute right-[6%] top-[64%] -translate-y-1/2 z-20 w-[30%] space-y-6 text-left">
          <div className="hero-right-el space-y-3">
            <h4 className="font-display font-black text-black text-xs tracking-widest uppercase">
              ABOUT
            </h4>
            <p className="font-sans text-xs xl:text-sm text-black/70 leading-relaxed font-semibold">
              Hi, I'm Dharshan. I'm a Software Engineer dedicated to building high-performance cloud suites, autonomous AI agents, and secure low-level systems architectures.
            </p>
          </div>

          {/* Technical Status Strip */}
          <div className="hero-right-el flex items-center gap-3 font-mono text-[9px] text-accent font-bold border-t border-black/10 pt-4">
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="uppercase tracking-widest leading-none">
              SYS_STATUS: ONLINE // TAMIL NADU, IN
            </span>
          </div>
        </div>

      </div>

      {/* ========================================== */}
      {/* MOBILE LAYOUT (< 1024px)                   */}
      {/* ========================================== */}
      <div className="lg:hidden flex flex-col min-h-screen w-full">
        
        {/* Top Section (Surface-Dark background) */}
        <div className="bg-surface-dark px-6 py-12 flex flex-col gap-4 relative overflow-hidden shrink-0">
          <div className="z-10">
            <h1 className="font-display font-black text-4xl sm:text-5xl leading-[0.9] text-black uppercase tracking-tighter">
              DHARSHAN
              <br />
              BALAJI
            </h1>
            
            <div className="flex items-center gap-2 mt-4 font-mono text-[9px] text-black/70 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              SYS_ONLINE // EDGE
            </div>
          </div>
        </div>

        {/* Center Portrait Image */}
        <div className="relative h-[280px] sm:h-[320px] flex items-end justify-center bg-gradient-to-b from-surface-dark to-bg overflow-hidden shrink-0">
          <img 
            src="/hero-portrait.png" 
            alt="Dharshan Balaji Portrait"
            className="hero-char-img h-[95%] object-contain object-bottom filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
          />
        </div>

        {/* Bottom Details Section */}
        <div className="flex-1 px-6 py-10 bg-bg flex flex-col justify-between gap-8">
          <div className="space-y-2">
            <h2 className="font-display font-black text-3xl sm:text-4xl leading-none text-black uppercase tracking-tighter">
              SOFTWARE ENGINEER
            </h2>
            <div className="font-mono text-[9px] text-accent tracking-widest uppercase font-bold">
              SYSTEMS ARCHITECT & EDGE INFRA
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-display font-black text-black text-[10px] tracking-widest uppercase">
              ABOUT
            </h4>
            <p className="font-sans text-xs text-black/70 leading-relaxed font-semibold">
              Hi, I'm Dharshan. I'm a Software Engineer dedicated to building high-performance cloud suites, autonomous AI agents, and secure low-level systems architectures.
            </p>
          </div>

          <a 
            href="#projects" 
            className="px-5 py-3 bg-white text-black font-mono font-bold text-[9px] uppercase tracking-wider flex items-center justify-center gap-2 border border-black/10 hover:bg-black hover:text-white transition-colors duration-300 shadow-sm"
          >
            <span className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-current" />
            EXPLORE PROJECTS
          </a>
        </div>

      </div>

    </section>
  );
}
