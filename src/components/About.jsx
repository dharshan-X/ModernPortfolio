export default function About() {
  return (
    <section id="about" className="section-padding bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32 relative about-title-reveal z-10">
            <h2 className="text-[40px] sm:text-[60px] md:text-[80px] font-display font-bold leading-none mb-4 uppercase">
              THE <br />
              <span className="gradient-text">VISION</span>
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </div>

          <div className="lg:col-span-8 space-y-12 about-content-reveal">
            <div className="space-y-8 text-lg sm:text-xl md:text-2xl text-text-muted leading-relaxed font-medium">
              <p>
                Based in <span className="text-text">Salem, Tamil Nadu</span>, I am a Software Engineer
                passionate about building systems that scale and interfaces that inspire. 
              </p>
              <p>
                My philosophy is simple: <span className="text-text">"Why use garbage collection when you can manually manage memory and cry?"</span>.
                I thrive on the challenge of low-level optimization and the elegance of high-level design.
              </p>
              <p className="text-lg md:text-xl font-normal opacity-80 italic">
                "Brew coffee, write code, introduce bugs, google the error, fix bugs, repeat."
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
              {[
                { label: 'Repositories', value: '50+' },
                { label: 'Contributions', value: '500+' },
                { label: 'Active Projects', value: '12+' },
                { label: 'Experience', value: '3Y+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-display font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
