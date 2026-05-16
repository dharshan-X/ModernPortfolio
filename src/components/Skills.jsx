import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box, Code2, Database, Layout, Smartphone, Zap } from 'lucide-react'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    category: 'Architecture',
    icon: Box,
    skills: ['Microservices', 'System Design', 'Domain Driven Design'],
    span: 'md:col-span-2 md:row-span-1',
    color: '#ffffff'
  },
  {
    category: 'Core Engine',
    icon: Code2,
    skills: ['React 19', 'TypeScript', 'Rust (Wasm)', 'Node.js'],
    span: 'md:col-span-1 md:row-span-2',
    color: '#d4d4d8'
  },
  {
    category: 'Interface',
    icon: Layout,
    skills: ['GSAP', 'R3F / Three.js', 'Tailwind v4', 'Framer Motion'],
    span: 'md:col-span-1 md:row-span-1',
    color: '#a1a1aa'
  },
  {
    category: 'Data Layer',
    icon: Database,
    skills: ['PostgreSQL', 'Redis', 'GraphQL', 'Prisma'],
    span: 'md:col-span-1 md:row-span-1',
    color: '#71717a'
  },
  {
    category: 'Platform',
    icon: Smartphone,
    skills: ['AWS', 'Docker', 'Vercel Edge', 'CI/CD Pipelines'],
    span: 'md:col-span-2 md:row-span-1',
    color: '#ffffff'
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
        <div className="flex items-end justify-between mb-24 border-b border-black/5 pb-12">
            <div>
                <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Competencies</p>
                <TextReveal as="h2" className="text-[40px] sm:text-[50px] md:text-[80px] font-display font-bold leading-none">TECH STACK</TextReveal>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-text-muted text-lg max-w-[300px]">Engineered for high-availability and extreme performance.</p>
            </div>
        </div>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {skillGroups.map((group, i) => (
            <div 
                key={group.category} 
                className={`bento-item glass p-8 rounded-[2.5rem] group relative overflow-hidden transition-all duration-500 hover:border-black/10 hover:bg-black/[0.02] ${group.span}`}
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: group.color }}
              />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div 
                        className="p-3 rounded-2xl bg-black/5 border border-black/5 text-text transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                        style={{ color: group.color }}
                    >
                        <group.icon size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Type_0{i+1}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-text mb-4">{group.category}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <span key={skill} className="text-[11px] font-medium px-3 py-1 bg-black/5 rounded-lg border border-black/5 text-text-muted group-hover:text-text group-hover:border-black/10 transition-colors">
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
