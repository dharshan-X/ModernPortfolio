import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    year: '2022',
    company: 'Stripe',
    role: 'Senior Frontend Engineer',
    period: 'Present',
    desc: 'Redefining the global design system. Architecting high-performance components used by millions, focusing on accessibility and sub-millisecond render times.',
    tags: ['Design Systems', 'React', 'Performance']
  },
  {
    year: '2020',
    company: 'Vercel',
    role: 'Frontend Developer',
    period: '2 Years',
    desc: 'Built core features for the Vercel Dashboard. Optimized deployment pipelines and real-time visualization engines used by 50k+ daily active users.',
    tags: ['Next.js', 'Turbopack', 'Analytics']
  },
  {
    year: '2018',
    company: 'Figma',
    role: 'Product Engineer',
    period: '2 Years',
    desc: 'Pioneered multiplayer cursor synchronization and prototype playback logic. Reduced browser memory footprint by 30% through custom GLSL shaders.',
    tags: ['C++', 'Wasm', 'WebGL']
  },
]

export default function Experience() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray('.milestone-card')
    
    cards.forEach((card, i) => {
      gsap.from(card.querySelector('.milestone-num'), {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      })

      gsap.from(card.querySelector('.milestone-content'), {
        scrollTrigger: {
          trigger: card,
          start: 'top 70%',
        },
        x: i % 2 === 0 ? 50 : -50,
        autoAlpha: 0,
        duration: 1.5,
        ease: 'power4.out',
      })
    })
  }, { scope: containerRef })

  return (
    <section id="experience" ref={containerRef} className="bg-bg py-32 md:py-64 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-40">
            <h2 className="text-[12vw] md:text-[180px] font-display font-bold leading-[0.8] uppercase opacity-5 select-none absolute left-0 right-0 text-center pointer-events-none">
                HISTORY
            </h2>
            <div className="relative z-10 text-center">
                <p className="text-primary font-bold tracking-[0.4em] uppercase text-sm mb-4">The Journey</p>
                <h2 className="text-5xl md:text-8xl font-display font-bold">MILESTONES</h2>
            </div>
        </div>

        <div className="space-y-32 md:space-y-64">
          {experiences.map((exp, i) => (
            <div key={exp.company} className="milestone-card relative grid lg:grid-cols-12 gap-12 items-center">
              {/* Giant Year background */}
              <div className="milestone-num absolute -left-10 lg:left-0 top-1/2 -translate-y-1/2 text-[120px] md:text-[240px] font-display font-bold text-white/5 select-none z-0">
                {exp.year}
              </div>

              <div className={`lg:col-span-6 z-10 ${i % 2 === 0 ? 'lg:order-1' : 'lg:col-start-7 lg:order-2'}`}>
                <div className="milestone-content space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-primary" />
                    <span className="text-primary font-mono text-sm tracking-widest uppercase font-bold">{exp.period}</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-display font-bold text-text group-hover:text-primary transition-colors leading-tight">
                    {exp.company}
                  </h3>
                  
                  <p className="text-accent text-lg font-bold uppercase tracking-widest">{exp.role}</p>
                  
                  <p className="text-text-muted text-xl md:text-2xl leading-relaxed max-w-xl">
                    {exp.desc}
                  </p>

                  <div className="flex flex-wrap gap-3 pt-4">
                    {exp.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 bg-white/5 border border-white/10 rounded-full text-text-muted">
                            {tag}
                        </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative visual element */}
              <div className={`hidden lg:block lg:col-span-5 ${i % 2 === 0 ? 'lg:col-start-8 order-2' : 'lg:order-1'}`}>
                <div className="relative group">
                    <div className="aspect-[4/5] bg-surface-light rounded-[3rem] border border-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-40 group-hover:opacity-60 transition-opacity duration-700" />
                        {/* Placeholder for dynamic art/mesh */}
                        <div className="w-full h-full flex items-center justify-center p-12">
                            <div className="w-full h-full border border-white/5 rounded-2xl flex items-center justify-center">
                                <span className="text-[100px] grayscale opacity-20">0{i+1}</span>
                            </div>
                        </div>
                    </div>
                    {/* Floating accent */}
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 glass rounded-3xl -z-10 blur-2xl bg-primary/20 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
