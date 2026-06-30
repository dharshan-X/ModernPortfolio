import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import TextReveal from './TextReveal'

gsap.registerPlugin(ScrollTrigger)

// Each project renders a typographic poster: a solid brand surface, the
// index, the title, and a small inline motif that signals what the
// project actually does. Section 4.8 bans decorative SVGs AND fake
// product screenshots, so the motifs are tight, monoline, and act as
// labels rather than stand-ins for screenshots.
//
// All entries are original work on github.com/dharshan-X. Forks, old
// portfolio iterations, duplicates, scratch work, and docs were
// filtered out. The first three are verified against their real
// READMEs; the rest carry short, name-derived summaries because the
// public repos do not yet ship with a description.
const projects = [
  {
    title: 'Project Yolo',
    summary: 'Autonomous AI agent with cognitive loop, GUI perception, and stealth browsing.',
    difficulty: 'advanced',
    tags: ['Python', 'AI Agent', 'LLM Router'],
    kind: 'agent',
    url: 'https://github.com/dharshan-X/ProjectYolo',
  },
  {
    title: 'Active GraphRAG',
    summary: 'Autonomous GraphRAG agent on a unified Neo4j vector and knowledge graph.',
    difficulty: 'advanced',
    tags: ['Python', 'Neo4j', 'FastAPI'],
    kind: 'graph',
    url: 'https://github.com/dharshan-X/ActiveRag_Model',
  },
  {
    title: 'NetGuard Pro',
    summary: 'Live network threat detection with ML anomaly scoring and auto-block.',
    difficulty: 'advanced',
    tags: ['Python', 'Scapy', 'scikit-learn'],
    kind: 'flow',
    url: 'https://github.com/dharshan-X/Netguard-pro',
  },
  {
    title: 'Hackathon',
    summary: 'Community-tested TypeScript hackathon build with three forks of traction.',
    difficulty: 'intermediate',
    tags: ['TypeScript', 'Hackathon', 'Web App'],
    kind: 'terminal',
    url: 'https://github.com/dharshan-X/hackaton',
  },
  {
    title: 'Nemotron 70B',
    summary: 'Experiments and tooling around the NVIDIA Nemotron-70B model family.',
    difficulty: 'advanced',
    tags: ['Python', 'LLM', 'Inference'],
    kind: 'doc',
    url: 'https://github.com/dharshan-X/Nemotron70b',
  },
  {
    title: 'Skylab',
    summary: 'TypeScript web application - early-stage product work.',
    difficulty: 'intermediate',
    tags: ['TypeScript', 'Web App'],
    kind: 'terminal',
    url: 'https://github.com/dharshan-X/Skylab',
  },
  {
    title: 'FileAI',
    summary: 'AI tooling for file-level understanding and processing.',
    difficulty: 'intermediate',
    tags: ['Python', 'AI/LLM', 'Files'],
    kind: 'doc',
    url: 'https://github.com/dharshan-X/Fileai',
  },
  {
    title: 'Video Processor',
    summary: 'Utility for programmatic video processing tasks.',
    difficulty: 'beginner',
    tags: ['Media', 'Pipeline'],
    kind: 'media',
    url: 'https://github.com/dharshan-X/videoprocessor',
  },
  {
    title: 'Version Controll',
    summary: 'Python tooling for lightweight version control workflows.',
    difficulty: 'beginner',
    tags: ['Python', 'DevTools'],
    kind: 'git',
    url: 'https://github.com/dharshan-X/version-controll',
  },
  {
    title: 'AR Simulate',
    summary: 'Augmented-reality simulation experiment in Python.',
    difficulty: 'intermediate',
    tags: ['Python', 'AR', 'Experiment'],
    kind: 'ar',
    url: 'https://github.com/dharshan-X/ar-sumulate',
  },
  {
    title: 'Inventory AI',
    summary: 'AI-assisted inventory tracking and management system.',
    difficulty: 'advanced',
    tags: ['AI', 'Inventory'],
    kind: 'warehouse',
    url: 'https://github.com/dharshan-X/Inventory_management_ai',
  },
  {
    title: 'MyOwnLanguage',
    summary: 'A custom programming language implemented in Rust.',
    difficulty: 'advanced',
    tags: ['Rust', 'Compiler', 'Languages'],
    kind: 'lang',
    url: 'https://github.com/dharshan-X/MyOwnLanguage',
  },
  {
    title: 'Edutrack Service',
    summary: 'JavaScript backend service for the Edutrack platform.',
    difficulty: 'beginner',
    tags: ['JavaScript', 'Backend', 'Service'],
    kind: 'terminal',
    url: 'https://github.com/dharshan-X/testEdutrack_service',
  },
].sort((a, b) => {
  const difficultyRank = { advanced: 3, intermediate: 2, beginner: 1 }
  return difficultyRank[b.difficulty] - difficultyRank[a.difficulty]
})

// One hairline motif per project. Each is a tight, single-stroke SVG
// that labels what the project does, not a fake product screenshot.
function ProjectMotif({ kind }) {
  // terminal - a code window: title bar with three dots, two text lines
  if (kind === 'terminal') {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <rect x="14" y="28" width="92" height="64" rx="3" />
        <line x1="14" y1="42" x2="106" y2="42" />
        <circle cx="22" cy="35" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="28" cy="35" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="34" cy="35" r="1.4" fill="currentColor" stroke="none" />
        <line x1="24" y1="58" x2="38" y2="58" />
        <line x1="24" y1="70" x2="58" y2="70" />
        <line x1="24" y1="82" x2="46" y2="82" />
      </svg>
    )
  }
  // doc - a document with horizontal text lines
  if (kind === 'doc') {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <path d="M 30 18 L 78 18 L 96 36 L 96 102 L 30 102 Z" />
        <path d="M 78 18 L 78 36 L 96 36" />
        <line x1="40" y1="52" x2="86" y2="52" />
        <line x1="40" y1="64" x2="86" y2="64" />
        <line x1="40" y1="76" x2="74" y2="76" />
        <line x1="40" y1="88" x2="82" y2="88" />
      </svg>
    )
  }
  // media - a play button inside a frame
  if (kind === 'media') {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <rect x="18" y="30" width="84" height="60" rx="3" />
        <path d="M 54 48 L 54 72 L 74 60 Z" fill="currentColor" stroke="none" />
        <line x1="18" y1="98" x2="102" y2="98" />
        <line x1="36" y1="98" x2="36" y2="104" />
        <line x1="84" y1="98" x2="84" y2="104" />
      </svg>
    )
  }
  // git - a branch / commit graph
  if (kind === 'git') {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <line x1="32" y1="22" x2="32" y2="98" />
        <line x1="76" y1="22" x2="76" y2="98" />
        <line x1="32" y1="56" x2="76" y2="56" />
        <line x1="76" y1="56" x2="76" y2="78" />
        <line x1="76" y1="78" x2="48" y2="78" />
        <circle cx="32" cy="22" r="4" fill="currentColor" stroke="none" />
        <circle cx="32" cy="56" r="4" fill="currentColor" stroke="none" />
        <circle cx="32" cy="98" r="4" fill="currentColor" stroke="none" />
        <circle cx="76" cy="22" r="4" fill="currentColor" stroke="none" />
        <circle cx="76" cy="56" r="4" fill="currentColor" stroke="none" />
        <circle cx="76" cy="98" r="4" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  // ar - a viewport with a target reticle (augmented reality)
  if (kind === 'ar') {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <rect x="20" y="22" width="80" height="76" rx="2" />
        <circle cx="60" cy="60" r="14" />
        <line x1="60" y1="46" x2="60" y2="74" />
        <line x1="46" y1="60" x2="74" y2="60" />
        <line x1="20" y1="40" x2="14" y2="40" />
        <line x1="20" y1="60" x2="14" y2="60" />
        <line x1="20" y1="80" x2="14" y2="80" />
        <line x1="100" y1="40" x2="106" y2="40" />
        <line x1="100" y1="60" x2="106" y2="60" />
        <line x1="100" y1="80" x2="106" y2="80" />
      </svg>
    )
  }
  // warehouse - a stack of inventory rows
  if (kind === 'warehouse') {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <rect x="18" y="22" width="84" height="76" rx="2" />
        <line x1="18" y1="42" x2="102" y2="42" />
        <line x1="18" y1="62" x2="102" y2="62" />
        <line x1="18" y1="82" x2="102" y2="82" />
        <rect x="30" y="30" width="14" height="6" fill="currentColor" stroke="none" />
        <rect x="50" y="30" width="22" height="6" fill="currentColor" stroke="none" />
        <rect x="30" y="50" width="20" height="6" fill="currentColor" stroke="none" />
        <rect x="56" y="50" width="14" height="6" fill="currentColor" stroke="none" />
        <rect x="30" y="70" width="10" height="6" fill="currentColor" stroke="none" />
        <rect x="46" y="70" width="26" height="6" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  // lang - braces with a token: custom language motif
  if (kind === 'lang') {
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <path d="M 42 30 Q 28 30 28 44 L 28 54 Q 28 60 22 60 Q 28 60 28 66 L 28 76 Q 28 90 42 90" />
        <path d="M 78 30 Q 92 30 92 44 L 92 54 Q 92 60 98 60 Q 92 60 92 66 L 92 76 Q 92 90 78 90" />
        <line x1="54" y1="46" x2="66" y2="46" />
        <line x1="50" y1="60" x2="70" y2="60" />
        <line x1="54" y1="74" x2="66" y2="74" />
      </svg>
    )
  }
  if (kind === 'agent') {
    // Cognitive loop: a central node with three labelled branches
    // looping back to itself - a think-act-observe cycle.
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        <circle cx="60" cy="60" r="6" fill="currentColor" stroke="none" />
        <circle cx="22" cy="30" r="4" fill="currentColor" stroke="none" />
        <circle cx="98" cy="30" r="4" fill="currentColor" stroke="none" />
        <circle cx="60" cy="100" r="4" fill="currentColor" stroke="none" />
        <path d="M 60 60 Q 35 45 22 30" />
        <path d="M 60 60 Q 85 45 98 30" />
        <path d="M 60 60 Q 60 80 60 100" />
        <path d="M 30 28 L 22 30 L 24 22" />
        <path d="M 106 28 L 98 30 L 100 22" />
        <path d="M 60 92 L 56 100 L 64 100" />
      </svg>
    )
  }
  if (kind === 'graph') {
    // Knowledge graph: nodes and edges, with one extra-spoken central
    // node suggesting a hub of multi-hop relationships.
    const nodes = [
      { x: 22, y: 24, r: 3 },
      { x: 96, y: 22, r: 3 },
      { x: 18, y: 62, r: 2.5 },
      { x: 102, y: 60, r: 2.5 },
      { x: 28, y: 100, r: 2.5 },
      { x: 92, y: 100, r: 2.5 },
      { x: 60, y: 60, r: 5 },
    ]
    const edges = [
      [0, 6],
      [1, 6],
      [2, 6],
      [3, 6],
      [4, 6],
      [5, 6],
      [0, 1],
      [2, 4],
      [3, 5],
    ]
    return (
      <svg
        viewBox="0 0 120 120"
        className="w-24 h-24 text-text"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        aria-hidden="true"
      >
        {edges.map(([a, b], i) => {
          const A = nodes[a]
          const B = nodes[b]
          return (
            <line
              key={i}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
            />
          )
        })}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="currentColor"
            stroke="none"
          />
        ))}
      </svg>
    )
  }
  // flow - packet capture pipeline with branching detection engines
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-24 h-24 text-text"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <line x1="14" y1="60" x2="48" y2="60" />
      <rect x="48" y="52" width="20" height="16" rx="2" />
      <line x1="68" y1="60" x2="84" y2="60" />
      <line x1="84" y1="60" x2="100" y2="34" />
      <line x1="84" y1="60" x2="100" y2="60" />
      <line x1="84" y1="60" x2="100" y2="86" />
      <line x1="100" y1="34" x2="112" y2="34" />
      <line x1="100" y1="60" x2="112" y2="60" />
      <line x1="100" y1="86" x2="112" y2="86" />
      <circle cx="112" cy="34" r="2" fill="currentColor" stroke="none" />
      <circle cx="112" cy="60" r="2" fill="currentColor" stroke="none" />
      <circle cx="112" cy="86" r="2" fill="currentColor" stroke="none" />
      <line x1="20" y1="50" x2="20" y2="70" />
      <line x1="30" y1="54" x2="30" y2="66" />
      <line x1="40" y1="50" x2="40" y2="70" />
    </svg>
  )
}
function useReducedMotionSafe() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Projects() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const reduce = useReducedMotionSafe()
  const [activeIndex, setActiveIndex] = useState(0)
  const [maxIndex, setMaxIndex] = useState(0)

  // Recompute the max scrollable index whenever the card width or
  // the track width changes. (No longer needed for translateX, since
  // native scroll drives the track now - but we still use it to keep
  // the prev/next buttons honest about the right edge.)
  useEffect(() => {
    const compute = () => {
      const track = trackRef.current
      if (!track) return
      const card = track.querySelector('[data-carousel-card]')
      if (!card) return
      const cardWidth = card.getBoundingClientRect().width
      const gap = parseFloat(getComputedStyle(track).columnGap || '0')
      const visibleCards = Math.max(1, Math.floor(track.clientWidth / (cardWidth + gap)))
      setMaxIndex(Math.max(0, projects.length - visibleCards))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  // Mirror the track's native scroll position into activeIndex, so the
  // counter and the prev/next enabled-state stay in sync with whatever
  // the user does (drag, shift+wheel, trackpad swipe, button).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const card = track.querySelector('[data-carousel-card]')
        if (!card) return
        const cardWidth = card.getBoundingClientRect().width
        const gap = parseFloat(getComputedStyle(track).columnGap || '0')
        // round to the nearest card so partial drags still snap to an
        // integer index for the counter
        const next = Math.round(track.scrollLeft / (cardWidth + gap))
        setActiveIndex((cur) => (cur === next ? cur : next))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useGSAP(
    () => {
      if (reduce) {
        gsap.set('.project-card', { opacity: 1, y: 0, rotateX: 0, rotateY: 0 })
        gsap.set('.project-motif', { opacity: 1, scale: 1 })
        gsap.set('.project-title', { y: 0 })
        gsap.set('.project-poster', { '--tilt-y': '0deg' })
        return
      }

      // 1. Header parallax - the body copy drifts up faster than the
      //    "Selected / Artifacts" headings so the section feels like
      //    it has depth as the user scrolls past it.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        })
        .to('.projects-title-a', { y: -40, ease: 'none' }, 0)
        .to('.projects-title-b', { y: -60, ease: 'none' }, 0)
        .to('.projects-body', { y: -90, ease: 'none' }, 0)

      // 2. Card entrance - each card flies up and rotates into place
      //    from a 6-degree X tilt. Stagger is set by card position so
      //    the row reads left-to-right.
      gsap.fromTo(
        '.project-card',
        { y: 90, opacity: 0, rotateX: 6 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      // 3. Motif path-draw on scroll - give every stroke path a
      //    dasharray that matches its length, then reveal by animating
      //    the offset from full to zero. Filled shapes (dots, badges)
      //    fade in alongside so the whole motif assembles in one beat.
      const strokes = gsap.utils.toArray('.project-motif svg [stroke]:not([stroke="none"])')
      const fills = gsap.utils.toArray('.project-motif svg [fill]:not([fill="none"])')
      gsap.set(strokes, { strokeDasharray: 300, strokeDashoffset: 300 })
      gsap.set(fills, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' })
      gsap.to(strokes, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: 'power2.out',
        stagger: 0.04,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
      gsap.to(fills, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(2)',
        stagger: 0.04,
        delay: 0.6,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      // 4. Per-card 3D cursor tilt - on pointer move, the poster tilts
      //    a few degrees on X/Y. Mouse-out springs back. The title
      //    glides up a few px and the card lifts in y, so the whole
      //    row of cards feels reactive. Disabled on touch (no mousemove).
      const posters = gsap.utils.toArray('.project-poster')
      const cards = gsap.utils.toArray('.project-card')
      const tilts = posters.map((el, i) => {
        const card = cards[i]
        const title = el.querySelector('.project-title')
        const onMove = (e) => {
          const r = el.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          gsap.to(el, {
            rotateY: px * 6,
            rotateX: -py * 6,
            transformPerspective: 900,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
          if (title) {
            gsap.to(title, { y: -4, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
          }
          if (card) {
            gsap.to(card, { y: -6, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
          }
        }
        const onLeave = () => {
          gsap.to(el, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.6)',
            overwrite: 'auto',
          })
          if (title) {
            gsap.to(title, { y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
          }
          if (card) {
            gsap.to(card, { y: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
          }
        }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        return () => {
          el.removeEventListener('mousemove', onMove)
          el.removeEventListener('mouseleave', onLeave)
        }
      })

      // 5. Continuous motif breathing - a slow scale loop on every
      //    motif so the section never feels frozen when idle. Each
      //    motif starts at a random phase so they don't pulse in sync.
      gsap.utils.toArray('.project-motif').forEach((el, i) => {
        gsap.to(el, {
          scale: 1.04,
          duration: 2.6 + (i % 4) * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: (i % 5) * 0.25,
        })
      })

      return () => {
        tilts.forEach((cleanup) => cleanup())
      }
    },
    { scope: containerRef, dependencies: [reduce] }
  )

  // Drive the carousel by scrolling the track natively. The browser
  // handles inertia, snap, and trackpad gestures; we just pick the
  // destination card. The scroll event listener above mirrors the
  // resulting scrollLeft back into activeIndex.
  const scrollToIndex = (i) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-carousel-card]')
    if (!card) return
    const cardWidth = card.getBoundingClientRect().width
    const gap = parseFloat(getComputedStyle(track).columnGap || '0')
    const target = track.scrollLeft + (i - activeIndex) * (cardWidth + gap)
    track.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' })
  }

  // Wheel handler: when the wheel event is vertical-dominant AND
  // the user isn't actively shifting, convert it into a horizontal
  // nudge of the track. Horizontal wheels (trackpad swipes) pass
  // through naturally because the track is now overflow-x: auto.
  useEffect(() => {
    if (reduce) return
    const el = containerRef.current
    if (!el) return
    let lock = false
    const onWheel = (e) => {
      // Trackpad horizontal gestures: let the browser handle them.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      // Vertical wheel: convert to a one-card horizontal step.
      e.preventDefault()
      if (lock) return
      lock = true
      if (e.deltaY > 0) scrollToIndex(Math.min(maxIndex, activeIndex + 1))
      else scrollToIndex(Math.max(0, activeIndex - 1))
      window.setTimeout(() => {
        lock = false
      }, 450)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxIndex, activeIndex, reduce])

  const goPrev = () => scrollToIndex(Math.max(0, activeIndex - 1))
  const goNext = () => scrollToIndex(Math.min(maxIndex, activeIndex + 1))

  return (
    <section id="projects" ref={containerRef} className="section-padding bg-bg relative overflow-hidden">
      {/*
        Header is a vertical stack (Section 4.7 Split-Header Ban).
        No eyebrow micro-label, no right-column explainer paragraph.
        Counter + controls live in their own row directly under the body
        to anchor the carousel without splitting the header.
      */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="projects-header mb-12 md:mb-16 max-w-4xl">
          <TextReveal
            as="h2"
            className="projects-title-a text-[34px] sm:text-[52px] md:text-[84px] font-display font-bold leading-[0.95] uppercase"
          >
            Selected
          </TextReveal>
          <TextReveal
            as="h2"
            className="projects-title-b text-[34px] sm:text-[52px] md:text-[84px] font-display font-bold leading-[0.95] uppercase gradient-text -mt-2"
          >
            Artifacts
          </TextReveal>
          <p className="projects-body mt-6 max-w-2xl text-text-muted text-base md:text-lg leading-relaxed">
            Recent work in AI, security, and systems engineering.
          </p>
        </div>
      </div>

      {/*
        Carousel: free-scrolling horizontal track, NOT a scroll-pan.
        Each card is a vertical poster (3:4 aspect) so 2-3 cards are
        visible on desktop and exactly 1 card on mobile.

        Different from Experience.jsx (which pins a track and scrubs
        it against scroll position). Here the user controls the
        carousel directly with prev/next buttons and the wheel.
      */}
      <div className="relative">
        <div
          ref={trackRef}
          data-carousel-track
          className="flex gap-6 md:gap-8 px-6 md:px-12 lg:px-16 will-change-transform overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollPaddingLeft: '24px',
          }}
          role="region"
          aria-label="Selected projects carousel"
        >
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-carousel-card
              aria-label={`${project.title}, view on GitHub`}
              className="project-card group relative flex flex-col gap-5 shrink-0 w-[78vw] sm:w-[60vw] md:w-[42vw] lg:w-[34vw] xl:w-[28vw] snap-start"
            >
              {/* Typographic poster. 3:4 portrait, brand surface tone,
                  oversized title + monoline motif. Hover scales the
                  inner content, not the frame. */}
              <div
                className="project-poster relative overflow-hidden rounded-2xl border border-black/5 bg-surface-light w-full flex flex-col justify-between p-6 md:p-8 will-change-transform"
                style={{ aspectRatio: '3 / 4', transformStyle: 'preserve-3d' }}
              >
                {/* Top row: index + project kind label */}
                <div className="flex items-start justify-between">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-text mix-blend-difference"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-text-muted"
                    aria-hidden="true"
                  >
                    {project.kind}
                  </span>
                </div>

                {/* Middle: motif. GSAP drives the scale breathe + path draw;
                    the inner SVG keeps its own intrinsic monoline weight. */}
                <div className="project-motif flex-1 flex items-center justify-center will-change-transform">
                  <ProjectMotif kind={project.kind} />
                </div>

                {/* Bottom: oversized title. Slips up a few px on card hover. */}
                <h4 className="project-title text-[28px] sm:text-[32px] md:text-[36px] font-display font-bold leading-[0.95] tracking-tight text-text will-change-transform">
                  {project.title}
                </h4>
              </div>

              {/* Text block below the poster, no border-top on every row
                  (Section 9.F "border-t on every row" tell). */}
              <div className="flex flex-col gap-3 px-1">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-text group-hover:text-primary transition-colors leading-tight">
                  {project.title}
                </h3>

                <p className="text-text-muted text-sm md:text-base leading-relaxed">
                  {project.summary}
                </p>

                <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-text group-hover:text-primary transition-colors">
                  View case
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/*
          Controls row: counter on the left, prev/next pair on the right.
          Sits below the track on mobile (the track is full-width and
          has its own padding), inline on desktop.

          One CTA intent = "View case" on every card. Prev/Next buttons
          are navigation controls, not CTAs, so they do not violate
          the "no duplicate CTA intent" rule.
        */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 mt-10 md:mt-14 flex items-center justify-between gap-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
            <span className="text-text font-bold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="mx-2 opacity-50">/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="w-11 h-11 rounded-full border border-black/10 bg-surface-light text-text flex items-center justify-center transition-all duration-300 hover:border-black/30 hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex >= maxIndex}
              aria-label="Next project"
              className="w-11 h-11 rounded-full border border-black/10 bg-surface-light text-text flex items-center justify-center transition-all duration-300 hover:border-black/30 hover:bg-surface disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
