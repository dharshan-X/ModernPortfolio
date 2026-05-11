import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowDownRight, Globe, Github, Linkedin, Mail } from 'lucide-react'
import { useLenis } from './SmoothScroll'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const containerRef = useRef(null)
  const lenisRef = useLenis()

  const scrollToAbout = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo('#about')
    } else {
      const el = document.querySelector('#about')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

    tl.from('.hero-title span', {
      y: 150,
      skewY: 10,
      stagger: 0.1,
      opacity: 0,
    })
    .from('.hero-snippet', {
      y: 50,
      opacity: 0,
    }, '-=1.2')
    .from('.hero-social', {
      x: -50,
      opacity: 0,
      stagger: 0.1,
    }, '-=1')
  }, { scope: containerRef })

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center bg-bg overflow-hidden pt-20">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="hero-title text-[40px] sm:text-[50px] md:text-[70px] lg:text-[90px] leading-[0.9] font-display font-bold mb-8 overflow-hidden flex flex-wrap justify-center gap-x-4 md:gap-x-6">
            <span className="inline-block">CRAFTING</span>
            <span className="inline-block gradient-text">FUTURE</span>
            <span className="inline-block">INTERFACES</span>
          </h1>

          <p className="text-text-muted text-base md:text-xl max-w-xl mb-10 hero-snippet leading-relaxed px-2 sm:px-0">
            I am <span className="text-text font-medium">Dharshan Balaji</span>, a Software Engineer from Salem. 
            Currently fighting the borrow checker and building high-performance systems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 hero-snippet">
            <MagneticButton strength={0.5} className="inline-block">
              <button
                onClick={scrollToAbout}
                className='w-[50px] h-[51px] rounded-full bg-primary text-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer'
              >
                 <ArrowDownRight size={20} strokeWidth={2.5} />
              </button>
            </MagneticButton>
          </div>

          <div className='flex items-center justify-center gap-8 mt-12 mb-8 translate-y-12'>
            <a href="https://github.com/dharsahan" target="_blank" rel="noreferrer" className="hero-social text-text-muted hover:text-primary transition-colors"><Github size={20} /></a>
            <a href="#" className="hero-social text-text-muted hover:text-primary transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hero-social text-text-muted hover:text-primary transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
