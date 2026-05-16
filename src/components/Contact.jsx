import { useState } from 'react'
import { Mail, Github, MessageSquare, Linkedin, ArrowRight, MousePointerClick } from 'lucide-react'
import TextReveal from './TextReveal'
import MagneticButton from './MagneticButton'
import MiniBrowser from './MiniBrowser'

export default function Contact() {
  const [activePlatform, setActivePlatform] = useState(null);

  const handleSocialClick = (e, platform) => {
    e.preventDefault();
    setActivePlatform(platform);
  };

  return (
    <section id="contact" className="section-padding bg-bg relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-8 md:mb-12 text-center">
          <TextReveal as="h2" className="text-[40px] sm:text-[60px] md:text-[120px] font-display font-bold leading-none mb-2 md:mb-4 uppercase">Let's build</TextReveal>
          <TextReveal as="h2" className="text-[40px] sm:text-[60px] md:text-[120px] font-display font-bold leading-none uppercase [&_.text-reveal-inner]:text-transparent [&_.text-reveal-inner]:bg-clip-text [&_.text-reveal-inner]:bg-gradient-to-r [&_.text-reveal-inner]:from-black [&_.text-reveal-inner]:to-accent">Together.</TextReveal>
        </div>

        <div className="flex flex-col items-center justify-center mb-16 md:mb-24">
          
          {/* Text & CTA */}
          <div className="flex flex-col justify-center text-center max-w-2xl mx-auto mb-16">
            <p className="text-text-muted text-xl md:text-[22px] leading-relaxed mb-10">
              Currently accepting new projects and collaborations. If you have an ambitious idea in 
              AI or Cloud-native engineering, I'd love to help you bring it to life.
            </p>

            <MagneticButton strength={0.3} className="inline-block mx-auto">
              <a
                href="mailto:dharshanbalaji83@gmail.com"
                className="inline-flex items-center gap-4 md:gap-6 px-8 md:px-12 py-4 md:py-5 rounded-full bg-primary text-white text-xl font-display font-bold hover:scale-105 transition-transform group"
              >
                SAY HELLO
                <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
              </a>
            </MagneticButton>
          </div>

        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 md:pt-12 border-t border-black/5 gap-8">
          
          {/* Social Icons & Popup */}
          <div className="flex flex-col items-center md:items-start relative">
            
            {/* Dynamic Mini Browser Popup */}
            {activePlatform && (
              <div className="absolute bottom-full left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 mb-8 w-[320px] md:w-[360px] origin-bottom md:origin-bottom-left animate-in zoom-in-50 fade-in duration-300 z-50">
                <MiniBrowser url={`/social-embed.html?platform=${activePlatform}`} onClose={() => setActivePlatform(null)} />
              </div>
            )}

            <div className="flex justify-center md:justify-start gap-8">
              <a href="https://github.com/dharshan-X" onClick={(e) => handleSocialClick(e, "github")} className={`transition-all duration-300 hover:-translate-y-1 ${activePlatform === "github" ? "text-primary scale-110" : "text-text-muted hover:text-primary"}`}><Github size={24} /></a>
              <a href="https://linkedin.com/in/dharshan-balaji-a72a67308" onClick={(e) => handleSocialClick(e, "linkedin")} className={`transition-all duration-300 hover:-translate-y-1 ${activePlatform === "linkedin" ? "text-primary scale-110" : "text-text-muted hover:text-primary"}`}><Linkedin size={24} /></a>
              <a href="mailto:dharshanbalaji83@gmail.com" onClick={(e) => handleSocialClick(e, "mail")} className={`transition-all duration-300 hover:-translate-y-1 ${activePlatform === "mail" ? "text-primary scale-110" : "text-text-muted hover:text-primary"}`}><Mail size={24} /></a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-12 text-[10px] text-text-muted uppercase tracking-[0.3em] font-bold">
            <a href="#hero" className="hover:text-primary transition-colors">Back to top</a>
            <a href="#about" className="hover:text-primary transition-colors">Vision</a>
            <a href="#projects" className="hover:text-primary transition-colors">Artifacts</a>
            <span className="opacity-40">© 2026 Dharshan Balaji</span>
          </div>
        </div>
      </div>
    </section>
  )
}
