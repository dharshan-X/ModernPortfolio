import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowDown, ArrowRight } from 'lucide-react'

export default function Hero() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

    tl.from('.hero-badge', {
      y: 20,
      opacity: 0,
      duration: 1.2,
    })
    .from('.hero-hello', {
      y: 100,
      opacity: 0,
      duration: 1.5,
    }, '-=1')
    .from('.hero-subtext', {
      y: 30,
      opacity: 0,
    }, '-=1.2')
    .from('.hero-cta', {
      y: 30,
      opacity: 0,
    }, '-=1.3')
    .from('.hero-stat-item', {
      y: 40,
      opacity: 0,
      stagger: 0.15,
    }, '-=1.4')
    .from('.hero-scroll', {
      opacity: 0,
    }, '-=1')
    .from('.hero-right-visual', {
      scale: 1.05,
      opacity: 0,
      duration: 2,
    }, '-=2')

    // Cinematic Scroll Animation - Smooth Parallax without pinning
    gsap.to('.hero-right-visual img', {
      scale: 3,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=125%', // Animate over the span of one viewport height
        scrub: 0.5, // Reduced smoothing so it's more responsive to scroll
      }
    })
  }, { scope: containerRef })

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen grid lg:grid-cols-2 overflow-hidden">
      
      {/* Hero Left - Coordinates and Spacing based on JSON */}
      <div className="bg-[#eaeaea] px-6 md:px-24 flex flex-col justify-start pt-[60px] relative">
                {/* Heading: Hello at y:259 */}
        <div className="relative mb-20">
          <h1 className="hero-hello text-[110px] md:text-[130px] font-sans font-medium leading-none tracking-tighter text-text">
            Hello,
          </h1>
          
          <div className="hero-subtext mt-8 max-w-lg">
            <p className="text-xl md:text-2xl font-medium tracking-tight text-text-muted leading-relaxed">
              Hi, I'm <span className="text-text italic font-semibold">Dharshan</span>. 
              An aspiring <span className="text-text italic font-semibold">Software Engineer</span> dedicated to building elegant, scalable, and user-centric digital experiences.
            </p>
          </div>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-6">
            <a href="#work" className="group relative px-6 py-3 font-medium text-text overflow-hidden rounded-full border border-black/20 hover:border-black transition-colors flex items-center gap-2 bg-transparent hover:bg-black hover:text-white duration-300">
              View My Work <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="text-sm font-semibold uppercase tracking-widest text-text-muted hover:text-text transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-text after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100">
              Get in touch
            </a>
          </div>
        </div>
        

        <div className="flex gap-16 md:gap-24 mb-20 lg:mb-32">
          <div className="hero-stat-item">
            <p className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-text">500<span className="text-text-muted">+</span></p>
            <p className="text-[11px] md:text-[12px] text-text-muted uppercase tracking-wider font-semibold mt-2 opacity-80">Contributions</p>
          </div>
          <div className="hero-stat-item">
            <p className="text-4xl md:text-5xl font-sans font-bold tracking-tighter text-text">50<span className="text-text-muted">+</span></p>
            <p className="text-[11px] md:text-[12px] text-text-muted uppercase tracking-wider font-semibold mt-2 opacity-80">Repositories</p>
          </div>
        </div>

        {/* Scroll CTA */}
        <div className="hero-scroll absolute bottom-8 left-6 md:left-24 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.4em] text-text-muted opacity-60">
           Scroll down <ArrowDown size={16} className="animate-bounce" />
        </div>
      </div>

      {/* Hero Right - Unified light bg with the left side */}
      <div className="hero-right-visual bg-[#eaeaea] relative flex items-center justify-center min-h-[50vh] lg:min-h-screen">
         <div className="w-full h-full flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent z-10 mix-blend-overlay"></div>
            <img 
                src="/hero-portrait.png" 
                alt="Dharshan Portrait"
                className="w-full h-full object-cover object-center"
             />
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&display=swap');
        .font-sans {
          font-family: 'Inter', sans-serif !important;
        }
      `}} />
    </section>
  );
}
