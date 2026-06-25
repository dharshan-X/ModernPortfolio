import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ArrowUpRight } from 'lucide-react'
import TextReveal from './TextReveal'

const projects = [
  {
    title: 'ProjectYolo',
    desc: 'Real-time object detection and computer vision implementation using Python and advanced ML frameworks.',
    tags: ['Python', 'Computer Vision', 'PyTorch'],
    image: 'https://images.unsplash.com/photo-1527430253228-e90321c3340b?w=1200&h=800&fit=crop',
    size: 'large',
    url: 'https://github.com/dharshan-X/ProjectYolo'
  },
  {
    title: 'ActiveRAG',
    desc: 'Enhanced Retrieval-Augmented Generation system for optimized LLM performance and dynamic context handling.',
    tags: ['Python', 'AI/LLM', 'Vector DB'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop',
    size: 'small',
    url: 'https://github.com/dharshan-X/ActiveRAG'
  },
  {
    title: 'NetGuard',
    desc: 'Network security and monitoring dashboard for enterprise-grade threat detection.',
    tags: ['TypeScript', 'Security', 'React'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=800&fit=crop',
    size: 'small',
    url: 'https://github.com/dharshan-X/NetGuard'
  },
]

export default function Projects() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Staggered entrance animation for cards
    gsap.fromTo('.project-card',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.project-card',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
      }
    )

    // Parallax effect on project images
    const images = gsap.utils.toArray('.project-card img')
    images.forEach((img) => {
      gsap.fromTo(img,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.project-card'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    })
  }, { scope: containerRef })

  return (
    <section id="projects" ref={containerRef} className="section-padding bg-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
            <div>
                <TextReveal as="h2" className="text-[32px] sm:text-[50px] md:text-[80px] font-display font-bold leading-none mb-2 md:mb-4 uppercase">Selected</TextReveal>
                <TextReveal as="h2" className="text-[32px] sm:text-[50px] md:text-[80px] font-display font-bold leading-none mb-2 md:mb-4 uppercase gradient-text">Artifacts</TextReveal>
            </div>
            <p className="max-w-md text-text-muted text-base md:text-lg leading-relaxed text-left md:text-right">
              A showcase of my recent work in AI, Security, and Systems engineering.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => {
            const isLarge = project.size === 'large'
            return (
              <a 
                key={project.title} 
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`project-card group bg-surface-light border border-black/5 hover:border-black/15 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] rounded-2xl md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 flex flex-col justify-between gap-6 overflow-hidden
                    ${isLarge ? 'md:col-span-2 md:flex-row md:gap-10' : 'md:col-span-1'}`}
              >
                {/* Image Wrapper - Aspect Ratio Locked to prevent height collapse */}
                <div className={`overflow-hidden rounded-2xl border border-black/5 aspect-[16/10] relative shrink-0 ${isLarge ? 'md:w-3/5' : 'w-full'}`}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-[120%] absolute top-[-10%] left-0 object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Glass highlight overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none z-10" />
                </div>

                {/* Text Content */}
                <div className={`flex flex-col justify-between flex-1 ${isLarge ? 'md:py-2' : ''}`}>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono font-bold uppercase tracking-wider text-text-muted bg-black/5 border border-black/5 px-3 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-text group-hover:text-primary transition-colors leading-tight">
                      {project.title}
                    </h3>
                    
                    <p className="text-text-muted text-base md:text-lg leading-relaxed">
                      {project.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-black/5 mt-6 shrink-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-text hover:text-black transition-colors flex items-center gap-2 group/btn">
                      Explore Project 
                      <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </span>
                    <span className="text-[10px] font-mono text-text-muted font-medium">0{i+1} / 03</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
