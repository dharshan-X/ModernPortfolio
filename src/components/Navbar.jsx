import { useRef, useState, useEffect } from 'react'
import { Home, User, Briefcase, Code, FolderOpen, Mail } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const navLinks = [
  { label: 'Home', href: '#hero', icon: Home },
  { label: 'About', href: '#about', icon: User },
  { label: 'Experience', href: '#experience', icon: Briefcase },
  { label: 'Skills', href: '#skills', icon: Code },
  { label: 'Projects', href: '#projects', icon: FolderOpen },
  { label: 'Contact', href: '#contact', icon: Mail },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('#hero')
  const [isHovered, setIsHovered] = useState(null)
  const navContainerRef = useRef(null)
  const activePillRef = useRef(null)
  const linkRefs = useRef([])

  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, navLinks.length)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`)
        }
      })
    }, observerOptions)

    document.querySelectorAll('section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    const activeIndex = navLinks.findIndex(link => link.href === activeSection)
    if (activeIndex !== -1 && linkRefs.current[activeIndex] && activePillRef.current && navContainerRef.current) {
      const targetLink = linkRefs.current[activeIndex]
      const containerRect = navContainerRef.current.getBoundingClientRect()
      const linkRect = targetLink.getBoundingClientRect()
      
      const targetX = linkRect.left - containerRect.left
      
      gsap.to(activePillRef.current, {
        x: targetX,
        width: linkRect.width,
        duration: 0.6,
        ease: 'elastic.out(1, 0.8)',
      })
    }
  }, [activeSection])

  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) {
      window.scrollTo({
        top: el.offsetTop,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[5000] flex justify-center w-full pointer-events-none px-4">
      <div 
        ref={navContainerRef}
        className='glass rounded-full p-1.5 flex items-center gap-1 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-visible pointer-events-auto translate-y-6'
      >
        {/* Animated Active Background */}
        <div 
          ref={activePillRef}
          className="absolute left-0 top-1.5 bottom-1.5 bg-primary/15 border border-primary/30 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.2)] pointer-events-none z-0"
          style={{ width: 0 }}
        />

        {navLinks.map((link, index) => {
          const isActive = activeSection === link.href
          return (
            <a
              key={link.href}
              ref={el => linkRefs.current[index] = el}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              onMouseEnter={() => setIsHovered(link.href)}
              onMouseLeave={() => setIsHovered(null)}
              className={`relative p-2.5 md:p-3 rounded-full transition-colors duration-500 group z-10 flex items-center justify-center
                ${isActive ? 'text-primary' : 'text-text-muted hover:text-text'}`}
            >
              <link.icon 
                size={18} 
                className={`relative z-10 transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:-translate-y-0.5'}`} 
              />
              
              {/* Tooltip */}
              <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl bg-surface-light border border-white/10 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none shadow-2xl z-[100]
                ${isHovered === link.href ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'}`}>
                {link.label}
              </div>

              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
              )}
            </a>
          )
        })}
      </div>
    </nav>
  );
}
