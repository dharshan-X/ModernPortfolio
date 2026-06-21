import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    year: '2026',
    company: 'Agent Ecosystem',
    role: 'Creator of ProjectYolo',
    period: 'Present',
    desc: 'Architecting ProjectYolo, an autonomous AI agent for desktop control and software engineering. Integrating real-time computer vision with LLM decision-making engines.',
    tags: ['Autonomous Agents', 'AI', 'Desktop Control']
  },
  {
    year: '2026',
    company: 'Cloud Innovations',
    role: 'Skylabs Founder',
    period: 'Major Release',
    desc: 'Launched Skylabs, a high-performance cloud infrastructure suite built with TypeScript. Optimized for ultra-fast deployment pipelines and scalable resource management.',
    tags: ['TypeScript', 'Cloud Infra', 'Architecture']
  },
  {
    year: '2025',
    company: 'AI Research Lab',
    role: 'Lead Developer',
    period: '1 Year',
    desc: 'Developed ActiveRAG, a specialized Retrieval-Augmented Generation model. Built NetGuard Pro, an enterprise-level network security dashboard for threat detection.',
    tags: ['Python', 'RAG', 'Cybersecurity']
  },
  {
    year: '2024',
    company: 'Core Systems',
    role: 'Software Engineer',
    period: '2 Years',
    desc: 'Mastered memory management and low-level systems engineering. Built a foundation of 50+ open-source repositories exploring Python, Rust, and systems architecture.',
    tags: ['Rust', 'Systems Engineering', 'Python']
  },
]

function MilestoneVisual({ index }) {
  if (index === 0) {
    // ProjectYolo OS Desktop Control Agent Simulator
    return (
      <div className="w-full h-full bg-[#0d0e12] rounded-2xl relative overflow-hidden flex flex-col p-4 text-[10px] font-mono border border-indigo-500/20 select-none shadow-2xl">
        {/* Mock OS Header */}
        <div className="flex justify-between items-center border-b border-indigo-500/10 pb-2 mb-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse inline-block" />
            <span className="text-indigo-400 font-bold">PROJECT_YOLO_AGENT</span>
          </div>
          <span className="text-zinc-500">MODE: DESKTOP_CONTROL</span>
        </div>
        
        {/* OS Desktop Mockup Workspace */}
        <div className="flex-1 border border-indigo-500/10 rounded relative bg-indigo-500/[0.01] overflow-hidden flex flex-col justify-between p-2">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          {/* Top Mock Window: Web Browser */}
          <div className="border border-indigo-500/20 bg-black/40 rounded p-1.5 text-[8px] z-10 flex flex-col gap-1 relative">
            <div className="flex items-center justify-between border-b border-indigo-500/10 pb-1 text-zinc-500 mb-0.5">
              <span>https://github.com/dharshan-X/projectyolo</span>
              <span className="text-green-500">200 OK</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <span className="text-indigo-400 font-bold">&gt;_</span>
              <span className="text-zinc-300">Searching elements...</span>
            </div>
            
            {/* Visual indicator of the GUI element identification */}
            <div className="absolute top-[3px] right-[40px] border border-green-500 bg-green-500/10 text-[6px] px-1 py-0.5 rounded text-green-400 font-bold flex items-center gap-1 animate-pulse">
              <span>[Button: "Star"]</span>
            </div>
          </div>
          
          {/* Interactive Bounding Overlay representing Screen Segmentation */}
          <div className="flex-1 flex items-center justify-center relative mt-1.5">
            {/* Bounding box around screen coordinate */}
            <div className="absolute top-[10%] left-[20%] w-[55%] h-[60%] border border-dashed border-indigo-400/50 rounded flex flex-col justify-between p-1 bg-indigo-500/5">
              <div className="text-[7px] text-indigo-300 bg-indigo-950/80 px-1 py-0.5 rounded w-max">
                GUI_NODE: IDE_WINDOW
              </div>
              <div className="text-[7px] text-zinc-500 text-right">
                Bounds: (80, 110, 480, 360)
              </div>
            </div>

            {/* Virtual cursor / mouse path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 100">
              <path d="M 10 90 Q 60 70 120 40" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="120" cy="40" r="6" fill="rgba(99,102,241,0.2)" className="animate-ping" />
              <circle cx="120" cy="40" r="2" fill="#6366f1" />
            </svg>
            
            {/* Click Action Indicator label */}
            <div className="absolute top-[20%] left-[62%] bg-indigo-500 text-black font-bold text-[7px] px-1 py-0.5 rounded shadow whitespace-nowrap">
              Action: Click()
            </div>
          </div>

          {/* Agent Thought / Loop panel */}
          <div className="mt-1.5 bg-black/60 border border-indigo-500/10 rounded p-1.5 text-[7px] text-indigo-300 z-10 shrink-0 space-y-0.5 text-left font-mono">
            <div className="flex items-center justify-between font-bold text-indigo-400 border-b border-indigo-500/5 pb-0.5 mb-1">
              <span>AGENT_REASONING_LOOP</span>
              <span className="text-[6px] bg-indigo-500/10 text-indigo-300 px-0.5 rounded">STEP 03</span>
            </div>
            <div><span className="text-zinc-500">THOUGHT:</span> Locate "Star" button on GitHub repository page to authenticate repo setup.</div>
            <div className="text-green-400"><span className="text-zinc-500">ACTION:</span> Mouse.moveTo(120, 40).click()</div>
          </div>
        </div>

        <div className="mt-2 pt-2 border-t border-indigo-500/10 flex justify-between text-[8px] opacity-70">
          <span>SYS_ENGINE: VISION_LLM</span>
          <span>LATENCY: 85ms</span>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Skylabs Shell Interface
    return (
      <div className="w-full h-full bg-[#1c1c1e] rounded-2xl p-4 flex flex-col font-mono text-zinc-300 border border-zinc-800 shadow-2xl relative select-none">
        {/* macOS window controls */}
        <div className="flex gap-1.5 mb-4 items-center border-b border-zinc-800 pb-2 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          <span className="text-[9px] text-zinc-500 ml-2">skylabs-deploy.sh</span>
        </div>
        
        {/* Terminal logs */}
        <div className="flex-1 space-y-1.5 text-[9px] md:text-[10px] text-left overflow-hidden">
          <div className="text-zinc-500">$ npm run deploy --release</div>
          <div className="text-blue-400">➜  skylabs-cli v1.4.2</div>
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">✔</span>
            <span>Auth verified (Salem Node)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">✔</span>
            <span>Vite assets optimized (3.2MB)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">✔</span>
            <span>Server components pre-rendered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">✔</span>
            <span className="text-green-400 font-bold">Successfully deployed to Edge</span>
          </div>
          <div className="pt-1.5 text-zinc-400">
            URL: <span className="underline text-blue-400">https://skylabs.io</span>
          </div>
          <div className="text-zinc-500 flex items-center gap-1">
            <span>dharshan@skylabs:~$_</span>
            <span className="w-1.5 h-3 bg-zinc-400 animate-[blink_1s_infinite_steps(1)] inline-block" />
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}} />
      </div>
    );
  }

  if (index === 2) {
    // ActiveRAG / NetGuard Pro Node Graph
    return (
      <div className="w-full h-full bg-[#0b0c10] rounded-2xl p-4 flex flex-col justify-between border border-blue-500/10 relative overflow-hidden select-none">
        <div className="flex justify-between items-center text-[9px] font-mono text-blue-400 border-b border-blue-500/10 pb-2">
          <span>ActiveRAG ENGINE // RETRIEVAL MAP</span>
          <span className="text-green-400">SIM: 0.942</span>
        </div>
        
        {/* SVG Node Graph */}
        <div className="flex-1 relative flex items-center justify-center">
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 200">
            {/* Connection Paths */}
            <path d="M 40 100 L 100 50" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 40 100 L 100 150" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 100 50 L 160 100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 100 150 L 160 100" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <path d="M 100 50 L 100 150" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
            
            {/* Animated particles */}
            <circle r="2" fill="#3b82f6">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 40 100 L 100 50 L 160 100" />
            </circle>
            <circle r="2" fill="#10b981">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 100 150 L 100 50" />
            </circle>
            
            {/* Nodes */}
            <circle cx="40" cy="100" r="14" fill="#151d30" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="40" y="103" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="bold" fontFamily="monospace">Query</text>
            
            <circle cx="100" cy="50" r="14" fill="#151d30" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="100" y="53" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="bold" fontFamily="monospace">Vector</text>
            
            <circle cx="100" cy="150" r="14" fill="#151d30" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="100" y="153" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="bold" fontFamily="monospace">Doc DB</text>
            
            <circle cx="160" cy="100" r="16" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <text x="160" y="103" textAnchor="middle" fill="#a7f3d0" fontSize="7" fontWeight="bold" fontFamily="monospace">Context</text>
          </svg>
        </div>

        <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
          <span>THREAT: SECURE</span>
          <span>NETGUARD ACTIVE</span>
        </div>
      </div>
    );
  }

  // index === 3: Core Systems Memory Allocator
  return (
    <div className="w-full h-full bg-[#111112] rounded-2xl p-4 flex flex-col font-mono text-zinc-400 border border-zinc-800 shadow-2xl relative select-none">
      <div className="flex justify-between items-center text-[9px] text-zinc-500 border-b border-zinc-800 pb-2 mb-2 shrink-0">
        <span>MEM_MAP // RUST_ALLOCATOR</span>
        <span className="text-zinc-600">0x7ffee3bf8</span>
      </div>

      <div className="flex-1 grid grid-cols-4 gap-2 text-[8px] text-center content-center py-1">
        {[
          { label: '0x0010', type: 'allocated', hex: 'FF A2' },
          { label: '0x0020', type: 'free', hex: '00 00' },
          { label: '0x0030', type: 'allocated', hex: '4E 9C' },
          { label: '0x0040', type: 'allocated', hex: '90 EE' },
          { label: '0x0050', type: 'leak_free', hex: 'A8 F1' },
          { label: '0x0060', type: 'free', hex: '00 00' },
          { label: '0x0070', type: 'allocated', hex: '7C 30' },
          { label: '0x0080', type: 'allocated', hex: '0A 5B' },
        ].map((block, i) => (
          <div 
            key={i} 
            className={`p-1.5 rounded border transition-all duration-300 hover:scale-105 ${
              block.type === 'allocated' 
                ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                : block.type === 'free' 
                ? 'bg-zinc-800/20 border-zinc-800/40 text-zinc-600'
                : 'bg-green-500/10 border-green-500/30 text-green-400'
            }`}
          >
            <div className="text-[6px] opacity-60 mb-0.5">{block.label}</div>
            <div className="font-bold text-[9px] tracking-tight">{block.hex}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-[8px] text-zinc-500 pt-2 border-t border-zinc-800 shrink-0">
        <span>HEAP: 2.4MB / 16MB</span>
        <span className="text-green-400">FRAG: 1.05%</span>
      </div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    const wrap = containerRef.current
    if (!track || !wrap) return

    // Create horizontal scroll logic for screens wider than 1024px
    let mm = gsap.matchMedia()

    mm.add("(min-width: 1024px)", () => {
      const distance = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.1)
      
      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <section id="experience" ref={containerRef} className="bg-bg relative lg:h-screen lg:overflow-hidden flex items-center py-20 lg:py-0 select-none">
      
      {/* Scroll track container */}
      <div 
        ref={trackRef} 
        className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-12 lg:flex-row lg:gap-16 lg:px-[10vw] lg:max-w-none lg:w-max lg:h-full lg:items-center relative flex-nowrap"
      >
        
        {/* Slide 0: Section Intro Card */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col justify-center space-y-4 pr-12 border-b border-black/5 pb-8 lg:border-b-0 lg:pb-0 lg:border-r lg:border-black/5 lg:h-[60dvh]">
          <p className="text-primary font-bold tracking-[0.4em] uppercase text-xs">Technical Roadmap</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-none uppercase">
            MILESTONES
          </h2>
          <p className="text-text-muted text-base leading-relaxed">
            A linear progression of systems, engines, and autonomous tools built over the years.
          </p>
          {/* Visual indicator for desktop users */}
          <div className="hidden lg:block pt-8 text-[10px] font-mono text-text-muted uppercase tracking-widest animate-pulse">
            Scroll down to pan ➜
          </div>
        </div>

        {/* Milestone Slides */}
        {experiences.map((exp, i) => (
          <div 
            key={i} 
            className="w-full lg:w-[600px] shrink-0 bg-surface border border-black/10 rounded-[2.5rem] p-6 md:p-10 flex flex-col justify-between gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:border-black/15 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 lg:h-[70dvh] relative overflow-hidden"
          >
            {/* Year Watermark */}
            <div className="absolute right-8 top-6 text-7xl md:text-9xl font-display font-bold text-black/5 select-none z-0">
              {exp.year}
            </div>

            {/* Top Half: Visual */}
            <div className="h-[200px] md:h-[240px] lg:h-[45%] w-full relative z-10 flex items-center justify-center shrink-0">
              <MilestoneVisual index={i} />
            </div>

            {/* Bottom Half: Content */}
            <div className="space-y-4 relative z-10 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-primary font-mono text-[10px] tracking-widest uppercase font-bold">{exp.period}</span>
                </div>
                
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-text leading-tight truncate">
                  {exp.role}
                </h3>
                
                <p className="text-accent text-xs font-bold uppercase tracking-widest font-mono">{exp.company}</p>
                
                <p className="text-text-muted text-sm md:text-base leading-relaxed line-clamp-3">
                  {exp.desc}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 mt-4 shrink-0">
                {exp.tags.map(tag => (
                  <span key={tag} className="text-[8px] font-bold tracking-wider uppercase px-2.5 py-1 bg-black/5 border border-black/5 rounded-md text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
        
      </div>
    </section>
  )
}
