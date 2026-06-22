import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GithubProfileCard from './GithubProfileCard'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const paragraphRef = useRef(null)

  useGSAP(() => {
    if (!paragraphRef.current) return
    
    const words = paragraphRef.current.querySelectorAll('.scrub-word')
    if (!words.length) return
    
    gsap.fromTo(words, 
      { opacity: 0.1 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: 'top 85%',
          end: 'bottom 60%',
          scrub: true,
        }
      }
    )
  }, { scope: paragraphRef })

  const bioText = "Based in Salem, Tamil Nadu, I am a Software Engineer passionate about building systems that scale and interfaces that inspire."
  const bioWords = bioText.split(' ')

  const stats = [
    { label: 'REPOSITORIES', value: '50+' },
    { label: 'CONTRIBUTIONS', value: '500+' },
    { label: 'ACTIVE PROJECTS', value: '12+' },
    { label: 'EXPERIENCE', value: '3Y+' },
  ]

  return (
    <section id="about" className="py-32 md:py-48 bg-bg relative overflow-hidden">
      {/* Background Atmosphere for this section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,0,0,0.015),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Sticky Header Column (Enhanced Original) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 relative z-10">
            <h2 className="text-[50px] sm:text-[70px] md:text-[90px] font-outfit font-black leading-[0.9] tracking-tighter uppercase text-primary mb-6">
              THE <br />
              <span className="text-glow opacity-60">VISION</span>
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full" />
          </div>

          {/* Content Column (Enhanced Original) */}
          <div className="lg:col-span-8 space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              
              {/* Text, Philosophy & Stats */}
              <div className="space-y-8">
                <div className="space-y-6 text-xl text-text-muted leading-relaxed font-outfit font-medium">
                  {/* GSAP Word Reveal Paragraph */}
                  <p ref={paragraphRef} className="text-text select-none">
                    {bioWords.map((word, i) => (
                      <span key={i} className="scrub-word inline-block mr-1.5 transition-colors duration-300">
                        {word}
                      </span>
                    ))}
                  </p>
                  
                  <p className="text-lg text-text-muted font-normal leading-relaxed">
                    My philosophy is simple: <span className="text-text font-bold">"Why use garbage collection when you can manually manage memory and cry?"</span>. 
                    I thrive on low-level optimization and high-level design.
                  </p>
                  
                  <div className="text-base font-normal opacity-85 italic border-l-2 border-black/20 pl-4 py-1">
                    "Brew coffee, write code, introduce bugs, google the error, fix bugs, repeat."
                  </div>
                </div>

                {/* Grid of Stats */}
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-black/10">
                  {stats.map((stat) => (
                    <div key={stat.label} className="group/stat">
                      <p className="text-3xl font-outfit font-black text-primary mb-1 group-hover/stat:translate-x-1 transition-transform duration-300">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-extrabold font-outfit">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Card Wrapper */}
              <div className="w-full hover:scale-[1.01] transition-transform duration-500">
                <GithubProfileCard username="dharshan-X" />
              </div>

            </div>
          </div>
        </div>

        {/* Subtle Tech Marquee */}
        <div className="w-full overflow-hidden py-8 border-y border-black/5 mt-20 relative">
          <div className="flex w-full overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs sm:text-sm font-outfit font-bold tracking-[0.3em] uppercase text-text-muted/50">
              <span>SYSTEM ARCHITECTURE</span>
              <span>•</span>
              <span>LOW-LEVEL OPTIMIZATION</span>
              <span>•</span>
              <span>HIGH-PERFORMANCE API DESIGN</span>
              <span>•</span>
              <span>DISTRIBUTED SYSTEMS</span>
              <span>•</span>
              <span>COMPUTER VISION</span>
              <span>•</span>
              <span>RUST & GO DEVELOPMENT</span>
              <span>•</span>
              <span>ASYNCHRONOUS ENGINE DESIGN</span>
              <span>•</span>
              
              <span>SYSTEM ARCHITECTURE</span>
              <span>•</span>
              <span>LOW-LEVEL OPTIMIZATION</span>
              <span>•</span>
              <span>HIGH-PERFORMANCE API DESIGN</span>
              <span>•</span>
              <span>DISTRIBUTED SYSTEMS</span>
              <span>•</span>
              <span>COMPUTER VISION</span>
              <span>•</span>
              <span>RUST & GO DEVELOPMENT</span>
              <span>•</span>
              <span>ASYNCHRONOUS ENGINE DESIGN</span>
              <span>•</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
