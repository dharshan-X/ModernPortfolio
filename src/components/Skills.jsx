import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box, Code2, Database, Layout, Smartphone } from 'lucide-react'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  {
    category: 'Architecture',
    icon: Box,
    skills: ['Microservices', 'System Design', 'Domain Driven Design', 'Event-Driven Architecture'],
    desc: 'Designing highly-available, distributed system topologies and decoupling core application domain contexts.'
  },
  {
    category: 'Core Engine',
    icon: Code2,
    skills: ['React 19', 'TypeScript', 'Rust (Wasm)', 'Node.js', 'Go', 'Python', 'Java', 'C'],
    desc: 'Compiling performant WASM scripts and optimizing high-performance code pipelines for execution speed.'
  },
  {
    category: 'Interface',
    icon: Layout,
    skills: ['GSAP', 'R3F / Three.js', 'Tailwind v4', 'Framer Motion', 'WebGL'],
    desc: 'Choreographing custom spring-physics transitions, hardware accelerated layouts, and kinetic animations.'
  },
  {
    category: 'Data Layer',
    icon: Database,
    skills: ['PostgreSQL', 'Redis', 'GraphQL', 'Prisma', 'Vector Indexing'],
    desc: 'Optimizing database queries, designing relational graph resolver nodes, and querying vector indexes.'
  },
  {
    category: 'Platform',
    icon: Smartphone,
    skills: ['AWS', 'Docker', 'Vercel Edge', 'CI/CD Pipelines', 'Kubernetes'],
    desc: 'Containerizing services and running distributed pipelines across global serverless and edge nodes.'
  }
]

function SkillActiveVisual({ index }) {
  const [activeLang, setActiveLang] = useState('rs')

  if (index === 0) {
    // Architecture microservices topology diagram
    return (
      <div className="w-full h-full bg-white/50 rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
          <span className="font-bold">TOPOLOGY: MICROSERVICES</span>
          <span className="text-black text-[8px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            DISTRIBUTED
          </span>
        </div>
        
        <div className="flex-1 relative flex items-center justify-center">
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 120">
            {/* Grid overlay for blueprint feel */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" opacity="0.03" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            <path d="M 30 60 L 90 30" stroke="black" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <path d="M 30 60 L 90 60" stroke="black" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <path d="M 30 60 L 90 90" stroke="black" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <path d="M 90 30 L 160 60" stroke="black" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <path d="M 90 90 L 160 60" stroke="black" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            
            <circle r="1.5" fill="black">
              <animateMotion dur="3s" repeatCount="indefinite" path="M 30 60 L 90 30 L 160 60" />
            </circle>
            <circle r="1.5" fill="black">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 30 60 L 90 90 L 160 60" />
            </circle>

            <circle cx="30" cy="60" r="10" fill="white" stroke="black" strokeWidth="1.2" />
            <text x="30" y="63" textAnchor="middle" fill="black" fontSize="5.5" fontWeight="bold">Gateway</text>
            
            <circle cx="90" cy="30" r="10" fill="white" stroke="black" strokeWidth="1.2" />
            <text x="90" y="33" textAnchor="middle" fill="black" fontSize="5.5" fontWeight="bold">Auth</text>

            <circle cx="90" cy="60" r="10" fill="white" stroke="black" strokeWidth="1.2" />
            <text x="90" y="63" textAnchor="middle" fill="black" fontSize="5.5" fontWeight="bold">Core</text>

            <circle cx="90" cy="90" r="10" fill="white" stroke="black" strokeWidth="1.2" />
            <text x="90" y="93" textAnchor="middle" fill="black" fontSize="5.5" fontWeight="bold">Worker</text>

            <circle cx="160" cy="60" r="12" fill="#c0bfbd" stroke="black" strokeWidth="1.2" />
            <text x="160" y="63" textAnchor="middle" fill="black" fontSize="5.5" fontWeight="bold">DB Pod</text>
          </svg>
        </div>
        
        <div className="border-t border-black/10 pt-2 flex justify-between items-center opacity-70 text-[8px] shrink-0">
          <span>GATEWAY_LOAD: 2.1k req/s</span>
          <span>REPLICAS: 3</span>
        </div>
      </div>
    )
  }

  if (index === 1) {
    // Core Engine compiler mockup (monochrome code editor)
    const fileTabs = [
      { id: 'rs', name: 'optimizer.rs' },
      { id: 'py', name: 'predict.py' },
      { id: 'c', name: 'kernel.c' },
      { id: 'java', name: 'Worker.java' },
    ]

    return (
      <div className="w-full h-full bg-white/50 rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black/85 select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
        
        {/* Editor Tab Bar */}
        <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
          <div className="flex gap-1.5 items-center">
            <div className="w-2 h-2 rounded-full bg-black/10" />
            <div className="w-2 h-2 rounded-full bg-black/20" />
            <div className="w-2 h-2 rounded-full bg-black/40" />
          </div>
          
          <div className="flex gap-1.5 ml-4">
            {fileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.stopPropagation() // Prevent tab change on parent
                  setActiveLang(tab.id)
                }}
                className={`px-2 py-0.5 rounded-[4px] text-[7.5px] border transition-all duration-200 cursor-pointer font-bold ${
                  activeLang === tab.id
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-transparent text-black/40 border-transparent hover:text-black/70 hover:bg-black/5'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Code Content */}
        <div className="flex-1 text-left space-y-1 overflow-hidden py-1 text-[8px] xl:text-[8.5px] leading-relaxed">
          {activeLang === 'rs' && (
            <>
              <div><span className="text-black font-extrabold">use</span> wasm_bindgen::prelude::*;</div>
              <div className="text-black/40 italic">// optimize data threads using SIMD</div>
              <div><span className="text-accent underline decoration-dotted decoration-black/25">#[wasm_bindgen]</span></div>
              <div><span className="text-black font-extrabold">pub fn</span> <span className="text-black font-semibold">process_buffer</span>(buf: &amp;[<span className="text-accent">u8</span>]) -&gt; <span className="text-accent">Vec</span>&lt;<span className="text-accent">u8</span>&gt; &#123;</div>
              <div className="pl-3 text-black/85">buf.iter().map(|&amp;x| x.wrapping_mul(<span className="font-bold">13</span>)).collect()</div>
              <div>&#125;</div>
            </>
          )}

          {activeLang === 'py' && (
            <>
              <div className="text-black/40 italic"># async tensor pipeline engine</div>
              <div><span className="text-black font-extrabold">import</span> asyncio</div>
              <div><span className="text-black font-extrabold">async def</span> <span className="text-black font-semibold">predict_async</span>(model, tensor):</div>
              <div className="pl-3 text-black/85">output = <span className="text-black font-extrabold">await</span> model.forward(tensor)</div>
              <div className="pl-3 text-black/85"><span className="text-black font-extrabold">return</span> output.softmax(dim=-<span className="font-bold">1</span>)</div>
            </>
          )}

          {activeLang === 'c' && (
            <>
              <div className="text-black/40 italic">/* low-level matrix vector product */</div>
              <div><span className="text-black font-extrabold">void</span> <span className="text-black font-semibold">gemv</span>(<span className="text-black font-extrabold">const float</span> *A, <span className="text-black font-extrabold">const float</span> *x, <span className="text-black font-extrabold">float</span> *y, <span className="text-black font-extrabold">int</span> m, <span className="text-black font-extrabold">int</span> n) &#123;</div>
              <div className="pl-3 text-black/85"><span className="text-black font-extrabold">for</span>(<span className="text-black font-extrabold">int</span> i = <span className="font-bold">0</span>; i &lt; m; ++i) &#123;</div>
              <div className="pl-6 text-black/85"><span className="text-black font-extrabold">for</span>(<span className="text-black font-extrabold">int</span> j = <span className="font-bold">0</span>; j &lt; n; ++j) y[i] += A[i*n + j] * x[j];</div>
              <div className="pl-3">&#125;</div>
              <div>&#125;</div>
            </>
          )}

          {activeLang === 'java' && (
            <>
              <div className="text-black/40 italic">// high-throughput virtual thread executor</div>
              <div><span className="text-black font-extrabold">public class</span> <span className="text-black font-semibold">ThreadPool</span> &#123;</div>
              <div className="pl-3 text-black/85"><span className="text-black font-extrabold">public void</span> <span className="text-black font-semibold">dispatch</span>(Runnable task) &#123;</div>
              <div className="pl-6 text-black/85"><span className="text-black font-extrabold">try</span> (var executor = Executors.newVirtualThreadPerTaskExecutor()) &#123;</div>
              <div className="pl-9 text-black/85">executor.submit(task);</div>
              <div className="pl-6">&#125;</div>
              <div className="pl-3">&#125;</div>
              <div>&#125;</div>
            </>
          )}

          <div className="text-black/60 flex items-center gap-1 mt-1">
            <span>$ cargo build --target wasm32-unknown-unknown</span>
            <span className="w-1.5 h-3 bg-black animate-[blink_1s_infinite_steps(1)] inline-block" />
          </div>
        </div>

        <div className="border-t border-black/10 pt-2 flex justify-between items-center opacity-70 text-[8px] shrink-0">
          <span>COMPILER: rustc / gcc / javac</span>
          <span className="text-black font-bold uppercase tracking-wider">COMPILING STABLE</span>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}} />
      </div>
    )
  }

  if (index === 2) {
    // Interface physics spring simulator
    return (
      <div className="w-full h-full bg-white/50 rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
          <span className="font-bold">MOTION: SPRING_DYNAMICS</span>
          <span className="text-black text-[8px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            INTERACTIVE
          </span>
        </div>

        <div className="flex-1 relative flex items-center justify-center">
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 120">
            {/* Grid overlay for blueprint feel */}
            <defs>
              <pattern id="grid-spring" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" opacity="0.03" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-spring)" />

            <line x1="20" y1="90" x2="180" y2="90" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            <line x1="20" y1="20" x2="180" y2="20" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            <path d="M 20 60 C 50 10, 80 110, 110 40 C 130 75, 150 55, 180 60" fill="none" stroke="black" strokeWidth="1.5" />
            <circle cx="180" cy="60" r="3" fill="black" />
            <circle cx="180" cy="60" r="8" fill="none" stroke="black" strokeWidth="1" className="animate-ping" style={{ animationDuration: '3s' }} />

            <circle r="4" fill="black">
              <animateMotion dur="4s" repeatCount="indefinite" path="M 20 60 C 50 10, 80 110, 110 40 C 130 75, 150 55, 180 60" />
            </circle>

            <text x="30" y="30" fill="rgba(0,0,0,0.6)" fontSize="6" fontWeight="bold">Stiffness: 100</text>
            <text x="30" y="42" fill="rgba(0,0,0,0.6)" fontSize="6" fontWeight="bold">Damping: 20</text>
          </svg>
        </div>

        <div className="border-t border-black/10 pt-2 flex justify-between items-center opacity-70 text-[8px] shrink-0">
          <span>FPS: 60 / GPU_BOUND</span>
          <span>GSAP_SPRING</span>
        </div>
      </div>
    )
  }

  if (index === 3) {
    // Data Layer relational connection schema
    return (
      <div className="w-full h-full bg-white/50 rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
          <span className="font-bold">QUERY: DATA_GRAPH_SCHEMA</span>
          <span className="text-black text-[8px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            POOL: ACTIVE
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center p-1">
          <div className="w-full grid grid-cols-3 gap-2 text-center text-[6.5px] leading-tight">
            <div className="border border-black/15 bg-white p-1.5 rounded relative flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="font-bold text-[7px] text-black border-b border-black/10 pb-1 mb-1 tracking-wider">CLIENT</div>
              <div>POST /graphql</div>
              <div className="text-black/50">query &#123; user &#125;</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            </div>
            
            <div className="border border-black/15 bg-white p-1.5 rounded flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="font-bold text-[7px] text-black border-b border-black/10 pb-1 mb-1 tracking-wider">RESOLVER</div>
              <div>FindMany()</div>
              <div className="text-black/50">Prisma Client</div>
              <div className="bg-black text-white px-1 py-0.5 rounded-[3px] text-[5px] font-bold uppercase tracking-widest mt-1 mx-auto shrink-0 self-center">CACHE HIT</div>
            </div>

            <div className="border border-black/15 bg-white p-1.5 rounded flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="font-bold text-[7px] text-black border-b border-black/10 pb-1 mb-1 tracking-wider">POSTGRES</div>
              <div>SELECT *</div>
              <div className="text-black/50">Indexed (PK)</div>
              <div className="text-black/50 font-bold">t: 0.4ms</div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-2 flex justify-between items-center opacity-70 text-[8px] shrink-0">
          <span>POOL_CONN: 12/50</span>
          <span>INDEX: GIN_VECTOR</span>
        </div>
      </div>
    )
  }

  // index === 4: Platform deploy stages Actions pipeline
  return (
    <div className="w-full h-full bg-white/50 rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
      <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
        <span className="font-bold">PIPELINE: GITHUB_ACTIONS</span>
        <span className="text-black text-[8px] font-bold uppercase tracking-wider">● STABLE</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2 px-1">
        {[
          { stage: 'LINT', status: 'SUCCESS', isRunning: false, pct: 'w-full bg-black' },
          { stage: 'BUILD', status: 'SUCCESS', isRunning: false, pct: 'w-full bg-black' },
          { stage: 'TEST', status: 'SUCCESS', isRunning: false, pct: 'w-full bg-black' },
          { stage: 'DEPLOY', status: 'RUNNING', isRunning: true, pct: 'w-[70%] bg-black' },
        ].map((step, i) => (
          <div key={i} className="flex items-center justify-between text-[7px] border border-black/10 bg-white p-1 rounded shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-2 w-1/4">
              <span className="w-2.5 h-2.5 rounded-full bg-black/5 border border-black/20 flex items-center justify-center font-bold text-[5px] text-black">{i+1}</span>
              <span className="font-bold text-black">{step.stage}</span>
            </div>
            
            <div className="flex-1 mx-3 h-1 bg-black/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${step.pct} ${step.isRunning ? 'animate-pulse' : ''}`} />
            </div>

            <div className={`font-bold uppercase w-[50px] text-right ${step.isRunning ? 'text-black animate-pulse' : 'text-black/60'}`}>
              {step.status}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 pt-2 flex justify-between items-center opacity-70 text-[8px] shrink-0">
        <span>NODE: VERCEL_EDGE</span>
        <span>DEPLOYED: v14.0.2</span>
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeGroup = skillGroups[activeIndex]

  useGSAP(() => {
    // Initial Stagger Reveal of category tabs
    gsap.fromTo('.skill-tab-item', 
      { x: -30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        x: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1,
        ease: 'power3.out',
      }
    )
    
    // Initial reveal of showcase card
    gsap.fromTo('.skill-showcase-card',
      { scale: 0.98, opacity: 0 },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      }
    )
  }, { scope: sectionRef })

  const handleTabChange = (index) => {
    if (index === activeIndex) return

    const tl = gsap.timeline()
    
    // Smooth transition between tabs
    tl.to('.skill-showcase-content', {
      opacity: 0,
      y: 12,
      duration: 0.25,
      ease: 'power2.in',
    })
    .call(() => {
      setActiveIndex(index)
    })
    .to('.skill-showcase-content', {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  return (
    <section id="skills" ref={sectionRef} className="section-padding bg-bg relative select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-24 border-b border-black/5 pb-12">
          <div>
            <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Competencies</p>
            <TextReveal as="h2" className="text-[40px] sm:text-[50px] md:text-[80px] font-display font-bold leading-none uppercase">TECH STACK</TextReveal>
          </div>
          <div className="text-left md:text-right">
            <p className="text-text-muted text-base md:text-lg max-w-[320px] leading-relaxed">Engineered for high-availability and extreme performance.</p>
          </div>
        </div>

        {/* Tabbed Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Vertical Segmented Tab List (Desktop) / Horizontal Tabs (Mobile) */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5 w-full">
            {/* Desktop vertical layout */}
            <div className="hidden lg:flex flex-col gap-10 py-6">
              {skillGroups.map((group, index) => (
                <button
                  key={group.category}
                  onMouseEnter={() => handleTabChange(index)}
                  onClick={() => handleTabChange(index)}
                  className="text-left group relative py-2 focus:outline-none"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="skill-tab-item font-mono text-xs text-accent/60 group-hover:text-primary transition-colors">
                      0{index + 1}
                    </span>
                    <span className={`skill-tab-item font-display text-2xl sm:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black uppercase tracking-tighter transition-all duration-300 ${
                      activeIndex === index 
                        ? 'text-primary translate-x-4 scale-[1.03]' 
                        : 'text-text-muted opacity-40 hover:opacity-75'
                    }`}>
                      {group.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Mobile horizontal scrolling tabs wrapper */}
            <div className="lg:hidden flex overflow-x-auto gap-4 pb-4 scrollbar-none snap-x pointer-events-auto">
              {skillGroups.map((group, index) => (
                <button
                  key={group.category}
                  onClick={() => handleTabChange(index)}
                  className={`snap-center shrink-0 uppercase px-4 py-2 border rounded-full font-mono text-[10px] font-bold tracking-wider transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-black text-white border-black' 
                      : 'bg-transparent text-text-muted border-black/10 hover:border-black/30'
                  }`}
                >
                  0{index + 1} {group.category}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Double-Bezel Showcase Card */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-7 w-full skill-showcase-card">
            <div className="rounded-[2.5rem] bg-black/5 p-2 border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              
              {/* Inner core container */}
              <div className="rounded-[calc(2.5rem-0.5rem)] bg-surface p-8 md:p-12 lg:p-14 border border-black/10 min-h-[500px] md:min-h-[580px] lg:min-h-[640px] flex flex-col justify-between gap-10 md:gap-14 relative overflow-hidden">
                
                {/* Dynamic animated showcase visual */}
                <div className="skill-showcase-content h-[220px] md:h-[260px] lg:h-[290px] w-full shrink-0 flex items-center justify-center z-10 relative">
                  <SkillActiveVisual index={activeIndex} />
                </div>

                {/* Showcased Content Details */}
                <div className="skill-showcase-content flex-1 flex flex-col justify-between gap-6 z-10">
                  <div className="space-y-4 md:space-y-5">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-primary font-mono text-[9px] tracking-widest uppercase font-bold">Category_0{activeIndex+1}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-text leading-none uppercase">
                      {activeGroup.category} Overview
                    </h3>
                    <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-xl">
                      {activeGroup.desc}
                    </p>
                  </div>

                  {/* Competency tags */}
                  <div className="flex flex-wrap gap-3 border-t border-black/5 pt-8 mt-6">
                    {activeGroup.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="text-[9px] md:text-[10px] font-bold tracking-wider uppercase px-3.5 py-2 bg-black/5 border border-black/5 rounded-md text-text-muted hover:text-text hover:border-black/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
