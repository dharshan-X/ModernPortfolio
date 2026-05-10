import { Mail, Github, Twitter, MessageSquare, Linkedin, ArrowRight } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-bg relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="mb-24">
          <h2 className="text-[60px] md:text-[120px] font-display font-bold leading-none mb-8 uppercase">Let's build</h2>
          <h2 className="text-[60px] md:text-[120px] font-display font-bold leading-none mb-12 uppercase gradient-text">Together.</h2>
          
          <p className="max-w-2xl mx-auto text-text-muted text-xl md:text-2xl leading-relaxed mb-16">
            Currently accepting new projects and collaborations. If you have an ambitious idea in 
            AI or Cloud-native engineering, I'd love to help you bring it to life.
          </p>

          <a 
            href="mailto:dharsahanbalaji@gmail.com"
            className="inline-flex items-center gap-6 px-12 py-6 rounded-full bg-primary text-black text-2xl font-display font-bold hover:scale-105 transition-transform group"
          >
            SAY HELLO
            <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-24 border-t border-white/5">
          <div className="flex gap-8">
            <a href="https://github.com/dharsahan" target="_blank" rel="noreferrer" className="text-text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1"><Github size={24} /></a>
            <a href="#" className="text-text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1"><Linkedin size={24} /></a>
            <a href="#" className="text-text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1"><Twitter size={24} /></a>
            <a href="mailto:dharsahanbalaji@gmail.com" className="text-text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1"><Mail size={24} /></a>
          </div>

          <div className="flex flex-wrap justify-center gap-12 text-[10px] text-mute uppercase tracking-[0.3em] font-bold">
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
