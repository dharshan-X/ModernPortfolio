import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box, Code2, Database, Layout, Smartphone, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    category: 'Architecture',
    icon: Box,
    skills: ['Microservices', 'System Design', 'Domain Driven Design'],
    span: 'col-span-2 row-span-1',
    color: '#10b981'
  },
  {
    category: 'Core Engine',
    icon: Code2,
    skills: ['React 19', 'TypeScript', 'Rust (Wasm)', 'Node.js'],
    span: 'col-span-1 row-span-2',
    color: '#06b6d4'
  },
  {
    category: 'Interface',
    icon: Layout,
    skills: ['GSAP', 'R3F / Three.js', 'Tailwind v4', 'Framer Motion'],
    span: 'col-span-1 row-span-1',
    color: '#6366f1'
  },
  {
    category: 'Data Layer',
    icon: Database,
    skills: ['PostgreSQL', 'Redis', 'GraphQL', 'Prisma'],
    span: 'col-span-1 row-span-1',
    color: '#8b5cf6'
  },
  {
    category: 'Platform',
    icon: Smartphone,
    skills: ['AWS', 'Docker', 'Vercel Edge', 'CI/CD Pipelines'],
    span: 'col-span-2 row-span-1',
    color: '#f59e0b'
  }
]

export default function Skills() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo('.bento-item', 
      { 
        y: 50, 
        autoAlpha: 0 
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 0,
        autoAlpha: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
      }
    )
  }, { scope: sectionRef })

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-24 border-b border-white/5 pb-12">
            <div>
                <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Competencies</p>
                <h2 className="text-[50px] md:text-[80px] font-display font-bold leading-none">TECH STACK</h2>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-text-muted text-lg max-w-[300px]">Engineered for high-availability and extreme performance.</p>
            </div>
        </div>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {skillGroups.map((group, i) => (
            <div 
                key={group.category} 
                className={`bento-item glass p-8 rounded-[2.5rem] group relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] ${group.span}`}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: group.color }}
              />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div 
                        className="p-3 rounded-2xl bg-white/5 border border-white/10 text-text transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ color: group.color }}
                    >
                        <group.icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-mute uppercase tracking-widest">Type_0{i+1}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text mb-4">{group.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <span key={skill} className="text-[11px] font-medium px-3 py-1 bg-white/5 rounded-lg border border-white/5 text-text-muted group-hover:text-text group-hover:border-white/10 transition-colors">
                        {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
