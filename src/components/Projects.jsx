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
    size: 'large'
  },
  {
    title: 'ActiveRAG Model',
    desc: 'Enhanced Retrieval-Augmented Generation system for optimized LLM performance and dynamic context handling.',
    tags: ['Python', 'AI/LLM', 'Vector DB'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=800&fit=crop',
    size: 'small'
  },
  {
    title: 'NetGuard Pro',
    desc: 'Network security and monitoring dashboard for enterprise-grade threat detection.',
    tags: ['TypeScript', 'Security', 'React'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=800&fit=crop',
    size: 'small'
  },
  {
    title: 'Skylabs',
    desc: 'Cloud-native infrastructure and deployment automation platform built for performance.',
    tags: ['TypeScript', 'Cloud', 'DevOps'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
    size: 'large'
  },
]

export default function Projects() {
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      },
      y: 100,
      autoAlpha: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: 'power4.out',
    })

    // Parallax effect on project images
    const images = gsap.utils.toArray('.project-card img')
    images.forEach((img) => {
      gsap.fromTo(img,
        { y: '-12%' },
        {
          y: '12%',
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
                <TextReveal as="h2" className="text-[40px] sm:text-[50px] md:text-[80px] font-display font-bold leading-none mb-2 md:mb-4 uppercase">Selected</TextReveal>
                <TextReveal as="h2" className="text-[40px] sm:text-[50px] md:text-[80px] font-display font-bold leading-none mb-2 md:mb-4 uppercase gradient-text">Artifacts</TextReveal>
            </div>
            <p className="max-w-md text-text-muted text-base md:text-lg leading-relaxed text-left md:text-right">
              A showcase of my recent work in AI, Security, and Cloud-native systems.
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, i) => (
            <div 
                key={project.title} 
                className={`project-card group relative overflow-hidden rounded-[3rem] cursor-pointer
                    ${project.size === 'large' ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'}`}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="flex items-end justify-between gap-8">
                    <div className="max-w-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-3xl md:text-5xl font-display font-bold text-text mb-4">{project.title}</h3>
                        <p className="text-text-muted text-lg line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            {project.desc}
                        </p>
                    </div>
                    
                    <div className="w-16 h-14 md:w-20 md:h-20 glass rounded-full flex items-center justify-center -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        <ArrowUpRight size={32} className="text-text" />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
