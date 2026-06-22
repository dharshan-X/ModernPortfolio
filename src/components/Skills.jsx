import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Box, Code2, Database, Layout, Smartphone } from 'lucide-react'

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
      <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
          <span className="font-bold tracking-wider">TOPOLOGY: DISTRIBUTED</span>
          <span className="text-black text-[8px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            STABLE
          </span>
        </div>
        
        <div className="flex-1 relative flex items-center justify-center">
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 120">
            <defs>
              <pattern id="grid-topology" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" opacity="0.03" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-topology)" />

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
          <span>REPLICAS: 3 ACTIVE</span>
        </div>
      </div>
    )
  }

  if (index === 1) {
    const fileTabs = [
      { id: 'rs', name: 'optimizer.rs' },
      { id: 'py', name: 'predict.py' },
      { id: 'c', name: 'kernel.c' },
      { id: 'java', name: 'Worker.java' },
    ]

    return (
      <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black/85 select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
          <div className="flex gap-1 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-black/15" />
            <div className="w-1.5 h-1.5 rounded-full bg-black/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-black/50" />
          </div>
          
          <div className="flex gap-1 ml-4">
            {fileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveLang(tab.id)
                }}
                className={`px-1.5 py-0.5 rounded-[4px] text-[7.5px] border transition-all duration-200 cursor-pointer font-bold ${
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
        
        <div className="flex-1 text-left space-y-1 overflow-hidden py-1 text-[8px] xl:text-[8.5px] leading-relaxed">
          {activeLang === 'rs' && (
            <>
              <div><span className="text-black font-extrabold">use</span> wasm_bindgen::prelude::*;</div>
              <div className="text-black/40 italic">// optimize data threads using SIMD</div>
              <div><span className="text-black/70 underline decoration-dotted decoration-black/25">#[wasm_bindgen]</span></div>
              <div><span className="text-black font-extrabold">pub fn</span> <span className="text-black font-semibold">process_buffer</span>(buf: &amp;[<span className="text-black/80">u8</span>]) -&gt; <span className="text-black/80">Vec</span>&lt;<span className="text-black/80">u8</span>&gt; &#123;</div>
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
          <span>COMPILER: RUSTC / GCC</span>
          <span className="text-black font-bold uppercase tracking-wider">COMPILED SUCCESSFUL</span>
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
      <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
          <span className="font-bold tracking-wider">MOTION: SPRING_DYNAMICS</span>
          <span className="text-black text-[8px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            GPU-ACCELERATED
          </span>
        </div>

        <div className="flex-1 relative flex items-center justify-center">
          <svg className="w-full h-full absolute inset-0" viewBox="0 0 200 120">
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
          <span>TARGET_FPS: 60 / WebGL</span>
          <span>GSAP_EASE_SPLINE</span>
        </div>
      </div>
    )
  }

  if (index === 3) {
    // Data Layer relational connection schema
    return (
      <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
        <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
          <span className="font-bold tracking-wider">QUERY: DATALAYER_RESOLVER</span>
          <span className="text-black text-[8px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
            ACTIVE
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center p-1">
          <div className="w-full grid grid-cols-3 gap-2 text-center text-[6.5px] leading-tight">
            <div className="border border-black/15 bg-white p-1.5 rounded relative flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="font-bold text-[7px] text-black border-b border-black/10 pb-1 mb-1 tracking-wider">GraphQL</div>
              <div>POST /query</div>
              <div className="text-black/50">schema &#123; node &#125;</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            </div>
            
            <div className="border border-black/15 bg-white p-1.5 rounded flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="font-bold text-[7px] text-black border-b border-black/10 pb-1 mb-1 tracking-wider">ORMCache</div>
              <div>findMany()</div>
              <div className="text-black/50">Redis Pipeline</div>
              <div className="bg-black text-white px-1 py-0.5 rounded-[3px] text-[5px] font-bold uppercase tracking-widest mt-1 mx-auto shrink-0 self-center">CACHE_HIT</div>
            </div>

            <div className="border border-black/15 bg-white p-1.5 rounded flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="font-bold text-[7px] text-black border-b border-black/10 pb-1 mb-1 tracking-wider">Postgres</div>
              <div>SELECT idx</div>
              <div className="text-black/50">Indexed GIN</div>
              <div className="text-black/50 font-bold">t: 0.22ms</div>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-2 flex justify-between items-center opacity-70 text-[8px] shrink-0">
          <span>POOL_ACTIVE: 12/50</span>
          <span>INDEX: GIN_VECTOR</span>
        </div>
      </div>
    )
  }

  // index === 4: Platform deploy stages Actions pipeline
  return (
    <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between border border-black/10 font-mono text-[9px] text-black select-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] relative overflow-hidden">
      <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2 shrink-0">
        <span className="font-bold tracking-wider">CI_CD: GITHUB_RUNNER</span>
        <span className="text-black text-[8px] font-bold uppercase tracking-wider">RUNNING</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-1.5 px-1">
        {[
          { stage: 'LINT', status: 'SUCCESS', isRunning: false, pct: 'w-full bg-black' },
          { stage: 'BUILD', status: 'SUCCESS', isRunning: false, pct: 'w-full bg-black' },
          { stage: 'TEST', status: 'SUCCESS', isRunning: false, pct: 'w-full bg-black' },
          { stage: 'DEPLOY', status: 'RUNNING', isRunning: true, pct: 'w-[70%] bg-black' },
        ].map((step, i) => (
          <div key={i} className="flex items-center justify-between text-[7px] border border-black/10 bg-white p-1 rounded shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-1.5 w-1/4">
              <span className="w-2.5 h-2.5 rounded-full bg-black/5 border border-black/20 flex items-center justify-center font-bold text-[5px] text-black">{i+1}</span>
              <span className="font-bold text-black">{step.stage}</span>
            </div>
            
            <div className="flex-1 mx-2 h-1 bg-black/5 rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${step.pct} ${step.isRunning ? 'animate-pulse' : ''}`} />
            </div>

            <div className={`font-bold uppercase w-[40px] text-right ${step.isRunning ? 'text-black animate-pulse' : 'text-black/60'}`}>
              {step.status}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-black/10 pt-2 flex justify-between items-center opacity-70 text-[8px] shrink-0">
        <span>RUNNER: EDGE_PIPELINE</span>
        <span>DEPLOY_VER: v14.0.2</span>
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const revealParagraphRef = useRef(null)
  const accordionRef = useRef(null)
  const [expandedIndex, setExpandedIndex] = useState(0)

  const introText = "Architecting resilient distributed engines, crafting high-performance code pipelines, and choreography of custom hardware-accelerated user interfaces to build scalable, inspired developer ecosystems."
  const introWords = introText.split(' ')

  useGSAP(() => {
    // 1. Scrubbing Text Reveal
    if (revealParagraphRef.current) {
      const words = revealParagraphRef.current.querySelectorAll('.scrub-word')
      gsap.fromTo(words,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: revealParagraphRef.current,
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: true,
          }
        }
      )
    }

    // 2. Vertical slices entry stagger reveal
    if (accordionRef.current) {
      const slices = accordionRef.current.querySelectorAll('.accordion-slice')
      gsap.fromTo(slices,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 85%',
          }
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section id="skills" ref={sectionRef} className="py-32 md:py-48 bg-bg relative overflow-x-hidden w-full max-w-full select-none border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Pinned Sidebar Header & Intro Text */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-10">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-text-muted">SYSTEM CAPABILITIES</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-[48px] font-satoshi font-black leading-[1.05] tracking-tighter uppercase text-primary max-w-sm">
                ENGINEERING HIGH-CALIBER SYSTEMS THAT SCALE.
              </h2>
            </div>

            <p ref={revealParagraphRef} className="text-[17px] text-text-muted font-satoshi leading-relaxed max-w-md">
              {introWords.map((word, i) => (
                <span key={i} className="scrub-word inline-block mr-1.5 opacity-10 transition-opacity duration-300">
                  {word}
                </span>
              ))}
            </p>
          </div>

          {/* Right Column: Interactive Horizontal/Vertical Accordion */}
          <div ref={accordionRef} className="lg:col-span-8 w-full space-y-4">
            
            {/* Desktop Horizontal Accordion Layout */}
            <div className="hidden lg:flex h-[520px] w-full gap-3 overflow-hidden">
              {skillGroups.map((group, index) => {
                const isExpanded = expandedIndex === index
                const Icon = group.icon
                
                return (
                  <div
                    key={group.category}
                    onMouseEnter={() => setExpandedIndex(index)}
                    className={`accordion-slice relative h-full border rounded-3xl p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer ${
                      isExpanded 
                        ? 'flex-[4] bg-surface border-black/20 shadow-[0_30px_60px_rgba(0,0,0,0.03)]' 
                        : 'flex-[1] bg-surface/30 border-black/5 hover:bg-surface/50 hover:border-black/10'
                    }`}
                  >
                    {/* Collapsed State Visual */}
                    <div className={`absolute inset-0 flex flex-col items-center justify-between py-10 transition-opacity duration-500 pointer-events-none ${
                      isExpanded ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}>
                      <span className="font-mono text-xs text-text-muted font-bold">0{index + 1}</span>
                      <div className="flex flex-col items-center gap-8">
                        <Icon className="w-5 h-5 text-text-muted" />
                        <span 
                          className="font-satoshi text-lg font-black uppercase tracking-widest text-text-muted/50 whitespace-nowrap select-none"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          {group.category}
                        </span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-black/20" />
                    </div>

                    {/* Expanded State Visual */}
                    <div className={`h-full flex flex-col justify-between transition-all duration-500 delay-100 ${
                      isExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
                    }`}>
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-primary font-bold">0{index + 1}</span>
                            <div className="px-2.5 py-0.5 bg-black text-white text-[8px] font-bold tracking-widest rounded-full uppercase">
                              Active
                            </div>
                          </div>
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        
                        <h3 className="text-2xl font-satoshi font-black tracking-tight uppercase text-primary">
                          {group.category}
                        </h3>
                        
                        <p className="text-sm text-text-muted font-satoshi leading-relaxed max-w-md">
                          {group.desc}
                        </p>
                      </div>

                      {/* Custom Dynamic Visual component */}
                      <div className="my-6 h-[200px] w-full relative rounded-2xl overflow-hidden bg-bg/40 border border-black/5 hover:border-black/10 transition-colors duration-300">
                        <SkillActiveVisual index={index} />
                      </div>

                      {/* Capabilities pill tags */}
                      <div className="space-y-2 shrink-0">
                        <span className="font-mono text-[9px] tracking-widest text-text-muted uppercase font-bold">CORE SKILLS</span>
                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => (
                            <span 
                              key={skill} 
                              className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 bg-black/5 border border-black/5 rounded-md text-text-muted hover:text-text hover:border-black/10 transition-colors duration-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Mobile Vertical Accordion Layout */}
            <div className="lg:hidden flex flex-col gap-3">
              {skillGroups.map((group, index) => {
                const isExpanded = expandedIndex === index
                const Icon = group.icon
                
                return (
                  <div
                    key={group.category}
                    onClick={() => setExpandedIndex(isExpanded ? -1 : index)}
                    className="border border-black/10 rounded-2xl bg-surface p-5 transition-all duration-300 overflow-hidden"
                  >
                    <div className="flex justify-between items-center cursor-pointer">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-text-muted">0{index + 1}</span>
                        <h4 className="text-base font-satoshi font-black uppercase text-primary">{group.category}</h4>
                      </div>
                      <Icon className="w-5 h-5 text-text-muted" />
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-5 space-y-6">
                        <p className="text-sm text-text-muted leading-relaxed">{group.desc}</p>
                        
                        <div className="h-[180px] w-full relative rounded-xl overflow-hidden bg-bg/50 border border-black/5">
                          <SkillActiveVisual index={index} />
                        </div>
                        
                        <div className="space-y-2">
                          <span className="font-mono text-[9px] tracking-widest text-text-muted uppercase font-bold">CORE SKILLS</span>
                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                              <span 
                                key={skill} 
                                className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 bg-black/5 border border-black/5 rounded text-text-muted"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

          </div>
        </div>

        {/* Dynamic Infinite Marquee at the bottom of the section */}
        <div className="w-full overflow-hidden py-6 border-y border-black/5 mt-24 relative select-none">
          <div className="flex w-full overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex gap-12 text-xs font-satoshi font-black tracking-[0.3em] uppercase text-text-muted/30">
              <span>DISTRIBUTED SYSTEMS</span>
              <span>•</span>
              <span>LOW-LEVEL OPTIMIZATION</span>
              <span>•</span>
              <span>HIGH-PERFORMANCE COMPILERS</span>
              <span>•</span>
              <span>RUST & GO PARADIGMS</span>
              <span>•</span>
              <span>HARDWARE-ACCELERATED MOTION</span>
              <span>•</span>
              <span>GRAPH RESOLVER NODES</span>
              <span>•</span>
              <span>HYPER-SCALING TOPOLOGIES</span>
              <span>•</span>
              
              <span>DISTRIBUTED SYSTEMS</span>
              <span>•</span>
              <span>LOW-LEVEL OPTIMIZATION</span>
              <span>•</span>
              <span>HIGH-PERFORMANCE COMPILERS</span>
              <span>•</span>
              <span>RUST & GO PARADIGMS</span>
              <span>•</span>
              <span>HARDWARE-ACCELERATED MOTION</span>
              <span>•</span>
              <span>GRAPH RESOLVER NODES</span>
              <span>•</span>
              <span>HYPER-SCALING TOPOLOGIES</span>
              <span>•</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
