import { useState, useCallback, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import SmoothScroll from './components/SmoothScroll'
import LoadingScreen from './components/LoadingScreen'
import ScrollVelocitySkew from './components/ScrollVelocitySkew'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [loading, setLoading] = useState(true)
  const mainRef = useRef(null)

  const handleLoadingComplete = useCallback(() => setLoading(false), [])

  useGSAP(() => {
    if (loading) return
    
    // Recalculate ScrollTrigger positions once content is rendered and visible
    ScrollTrigger.refresh()
    
    // Select all sections except hero and experience (which has horizontal scroll pinning)
    const sections = gsap.utils.toArray('section:not(#hero):not(#experience)')
    
    sections.forEach((section, i) => {
      gsap.fromTo(section, 
        { 
          x: i % 2 === 0 ? (window.innerWidth < 640 ? 40 : 150) : (window.innerWidth < 640 ? -40 : -150), 
          autoAlpha: 0 
        },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 95%',
            end: 'top 30%',
            scrub: 1,
          },
          x: 0,
          autoAlpha: 1,
          ease: 'none',
          clearProps: 'transform' // Clear props so nested fixed elements/transforms don't break
        }
      )
    })
  }, [loading], { scope: mainRef })

  return (
    <div className="relative min-h-screen bg-bg selection:bg-primary selection:text-white" ref={mainRef}>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <CustomCursor />
      
      <SmoothScroll>
        <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar />
          <ScrollVelocitySkew>
            <main className="overflow-x-hidden">
              <Hero />
              <About />
              <Experience />
              <Skills />
              <Projects />
              <Contact />
            </main>
          </ScrollVelocitySkew>
        </div>
      </SmoothScroll>
    </div>
  )
}

export default App
