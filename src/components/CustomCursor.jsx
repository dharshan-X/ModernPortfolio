import { useRef, useEffect } from 'react'
import gsap from 'gsap'

// 2nd-order Spring-Mass-Damping system node update for trailing droplets
const updateTrailNode = (
  pos,
  vel,
  anchorPos,          // anchor point on the streamline path
  neighborPos,        // neighbor node (e.g. dot or trail1) for coalescence
  neighborVel,        // neighbor velocity for matching
  stiffness,
  baseDamp,
  coalescenceLimit,
  snapThreshold,      // Rayleigh-Plateau snap limit
  bridgeStiffness,    // tension resistance of the liquid bridge
  maxForce,
  wobbleAmpRef,
  wobbleAngleRef,
  parentWobbleAmpRef, // parent wobble to propagate merging impacts
  wasCoalescedRef,    // coalescence state tracker
  wasSnappedRef,      // snap state tracker
  trailScaleRef,
  trailOpacityRef,
  targetScale,
  targetOpacity,
  el
) => {
  const dax = anchorPos.x - pos.x
  const day = anchorPos.y - pos.y
  const distAnchor = Math.sqrt(dax * dax + day * day) || 0.001

  const dnx = neighborPos.x - pos.x
  const dny = neighborPos.y - pos.y
  const distNeighbor = Math.sqrt(dnx * dnx + dny * dny) || 0.001

  // Liquid Bridge (Necking) and Coalescence States
  const isCoalesced = distNeighbor < coalescenceLimit
  const isNecking = distNeighbor >= coalescenceLimit && distNeighbor <= snapThreshold
  const isSnapped = distNeighbor > snapThreshold

  const wasCoalesced = wasCoalescedRef.current
  const wasSnapped = wasSnappedRef.current

  let damp = baseDamp
  let bridgeForceX = 0
  let bridgeForceY = 0

  if (isCoalesced) {
    wasSnappedRef.current = false
    if (!wasCoalesced) {
      // Coalescence Impact: The droplet has just merged!
      wobbleAmpRef.current = Math.min(wobbleAmpRef.current + 0.28, 0.35)
      parentWobbleAmpRef.current = Math.min(parentWobbleAmpRef.current + 0.12, 0.3)

      // Momentum transfer: push parent node in direction of impact (opposite side shake)
      neighborPos.x += vel.x * 0.45
      neighborPos.y += vel.y * 0.45

      wasCoalescedRef.current = true
    }

    const t = distNeighbor / coalescenceLimit
    damp = baseDamp + (0.85 - baseDamp) * (1 - t)
  } else if (isNecking) {
    wasCoalescedRef.current = false
    wasSnappedRef.current = false

    // In the necking zone, the liquid bridge resists stretching:
    // 1. Viscosity (damping) increases to represent shear resistance of the thin neck
    const t = (distNeighbor - coalescenceLimit) / (snapThreshold - coalescenceLimit)
    damp = baseDamp + (0.75 - baseDamp) * (1 - t)

    // 2. Bridge tension force pulls the node back towards the neighbor (parent)
    const bridgeForceMag = (1 - t) * bridgeStiffness * distNeighbor
    bridgeForceX = (dnx / distNeighbor) * bridgeForceMag
    bridgeForceY = (dny / distNeighbor) * bridgeForceMag
  } else if (isSnapped) {
    wasCoalescedRef.current = false
    if (!wasSnapped) {
      // Rayleigh-Plateau Pinch-off: Bridge snapped!
      // Excite snap wobbles in both droplets
      wobbleAmpRef.current = Math.min(wobbleAmpRef.current + 0.30, 0.40)
      parentWobbleAmpRef.current = Math.min(parentWobbleAmpRef.current + 0.18, 0.35)
      wasSnappedRef.current = true
    }
  }

  // 1. Calculate Spring / Surface Tension Force pulling to streamline anchor
  let forceMag = distAnchor * stiffness
  if (forceMag > maxForce) {
    forceMag = maxForce
  }
  const forceX = (dax / distAnchor) * forceMag + bridgeForceX
  const forceY = (day / distAnchor) * forceMag + bridgeForceY

  const prevVx = vel.x
  const prevVy = vel.y

  // Update velocity and position
  if (isCoalesced) {
    const relVelX = vel.x - neighborVel.x
    const relVelY = vel.y - neighborVel.y
    vel.x = neighborVel.x + relVelX * (1 - damp) + forceX
    vel.y = neighborVel.y + relVelY * (1 - damp) + forceY
  } else {
    vel.x = vel.x * (1 - damp) + forceX
    vel.y = vel.y * (1 - damp) + forceY
  }

  // Move position
  pos.x += vel.x
  pos.y += vel.y

  // 3. Smoothly interpolate scale & opacity
  trailScaleRef.current += (targetScale - trailScaleRef.current) * 0.2
  trailOpacityRef.current += (targetOpacity - trailOpacityRef.current) * 0.2

  // 4. Deformations: Velocity Stretch + Capillary Wobble
  const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y)
  const angle = Math.atan2(vel.y, vel.x) * 180 / Math.PI

  const acceleration = Math.sqrt((vel.x - prevVx) ** 2 + (vel.y - prevVy) ** 2)
  const stretchExcitation = Math.max(0, distNeighbor - coalescenceLimit) * 0.005
  wobbleAmpRef.current = Math.min(wobbleAmpRef.current + acceleration * 0.025 + stretchExcitation, 0.3)

  wobbleAmpRef.current *= 0.91 // decay wobble by 9% per frame
  wobbleAngleRef.current += 0.35

  const wobble = Math.sin(wobbleAngleRef.current) * wobbleAmpRef.current
  const stretch = Math.min(speed * 0.035, 0.4) // cap velocity stretch

  const scaleX = Math.max(0.001, trailScaleRef.current * (1 + stretch + wobble))
  const scaleY = Math.max(0.001, trailScaleRef.current / (1 + stretch + wobble))

  gsap.set(el, {
    x: pos.x,
    y: pos.y,
    rotate: angle,
    scaleX: scaleX,
    scaleY: scaleY,
    opacity: trailOpacityRef.current
  })
}

export default function CustomCursor() {
  const dotRef = useRef(null)
  const trail1Ref = useRef(null)

  const blobRef = useRef(null)
  const arrowRef = useRef(null)

  // Tracker refs to store coordinates without triggering re-renders
  const mouse = useRef({ x: -100, y: -100 })
  const dotPos = useRef({ x: -100, y: -100 })
  const trail1Pos = useRef({ x: -100, y: -100 })

  const blobPos = useRef({ x: -100, y: -100 })

  // Path history and undulation timelines for streamline fluid flow
  const dotHistory = useRef([])
  const time = useRef(0)

  // Previous positions for velocity calculations
  const prevDotPos = useRef({ x: -100, y: -100 })
  const prevTrail1Pos = useRef({ x: -100, y: -100 })


  // 2nd-order Spring-Mass-Damping system velocity vectors
  const trail1Vel = useRef({ x: 0, y: 0 })


  // Fluid scaling and opacity states (handled purely via physics to avoid GSAP tween overrides)
  const dotScale = useRef(1.0)
  const dotOpacity = useRef(1.0)
  const trail1Scale = useRef(1.0)
  const trail1Opacity = useRef(1.0)


  // Randomized base scales for trailing droplets (decreased in size along the tail)
  const trail1BaseScale = useRef(0.75 + Math.random() * 0.15) // 0.75 to 0.90 (12px to 14.4px equivalent)

  
  // Capillary wave variables (fluid surface tension resonance)
  const vibrationAmp = useRef(0)
  const wobbleAngle = useRef(0)
  const lastSpeed = useRef(0)

  const trail1WobbleAmp = useRef(0)
  const trail1WobbleAngle = useRef(0)


  // Coalescence state tracking to excite resonance wave on merge impact
  const trail1Coalesced = useRef(true)


  // Snap state tracking for Rayleigh-Plateau pinch-off snapping waves
  const trail1Snapped = useRef(false)


  const isClicked = useRef(false)

  // Fluid splash particle physics states
  const particleEls = useRef([])
  const particles = useRef(
    Array.from({ length: 8 }).map(() => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      scale: 0,
      active: false,
      size: 8
    }))
  )

  // Ripple ring pool for slash effect
  const RIPPLE_COUNT = 12
  const rippleEls = useRef([])
  const ripples = useRef(
    Array.from({ length: RIPPLE_COUNT }).map(() => ({
      x: 0,
      y: 0,
      scale: 0,
      opacity: 0,
      active: false,
      age: 0,
      baseSize: 24,
      maxScale: 2.8,
      expandRate: 0.065
    }))
  )
  const lastRipplePos = useRef({ x: -100, y: -100 })
  const rippleIndex = useRef(0)

  // Snapping/Hover caches to avoid layout thrashing in the requestAnimationFrame loop
  const isHovered = useRef(false)
  const hideDroplets = useRef(false)
  const hoverTarget = useRef(null)
  const magnetChild = useRef(null)
  const hoverRect = useRef({ width: 0, height: 0, docX: 0, docY: 0 })

  useEffect(() => {
    const dot = dotRef.current
    const trail1 = trail1Ref.current
    const blob = blobRef.current
    const arrow = arrowRef.current
    if (!dot || !trail1 || !blob || !arrow) return

    // Position elements initially offscreen and hide the snap box
    gsap.set([dot, trail1, blob], { x: -100, y: -100, xPercent: -50, yPercent: -50 })
    gsap.set(blob, { opacity: 0, scale: 0 })

    // Centering setup for splash particles
    particleEls.current.forEach(el => {
      if (el) gsap.set(el, { xPercent: -50, yPercent: -50, x: -100, y: -100 })
    })

    // Initialize ripple elements offscreen
    rippleEls.current.forEach(el => {
      if (el) gsap.set(el, { xPercent: -50, yPercent: -50, x: -100, y: -100, scale: 0, opacity: 0 })
    })

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')
      
      if (target) {
        if (hoverTarget.current === target) return
        
        // Clear previous target's magnetic content transform
        if (magnetChild.current) {
          gsap.to(magnetChild.current, { x: 0, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
        }

        hoverTarget.current = target
        
        // Cache target inner child for magnetic pull
        magnetChild.current = target.querySelector('span, p, svg, img, h3') || target

        const rect = target.getBoundingClientRect()
        const computedStyle = window.getComputedStyle(target)
        
        // Snapping logic: Small elements snap-wrap; large elements display lens magnifier
        const isSmall = rect.width <= 240 && rect.height <= 240

        hideDroplets.current = true

        if (isSmall) {
          isHovered.current = true
          
          hoverRect.current = {
            width: rect.width,
            height: rect.height,
            docX: rect.left + window.scrollX,
            docY: rect.top + window.scrollY
          }

          // Morph snap box outline around button
          gsap.to(blob, {
            width: rect.width + 12,
            height: rect.height + 12,
            borderRadius: computedStyle.borderRadius || '8px',
            backgroundColor: '#ffffff',
            mixBlendMode: 'difference',
            borderWidth: 0,
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power3.out'
          })

          gsap.to(arrow, {
            scale: 0.5,
            opacity: 0,
            duration: 0.18,
            overwrite: 'auto'
          })
        } else {
          isHovered.current = false
          
          // Lens morph
          gsap.to(blob, {
            width: 72,
            height: 72,
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            mixBlendMode: 'difference',
            borderWidth: 0,
            boxShadow: 'none',
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power3.out'
          })

          gsap.to(arrow, {
            scale: 1,
            opacity: 1,
            duration: 0.25,
            ease: 'power3.out',
            overwrite: 'auto'
          })
        }
      }
    }

    const handleMouseOut = (e) => {
      const exitedTarget = e.target.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]')
      const enteredTarget = e.relatedTarget ? e.relatedTarget.closest('a, button, [role="button"], input, textarea, [data-cursor="pointer"]') : null

      if (exitedTarget && exitedTarget === hoverTarget.current && enteredTarget !== hoverTarget.current) {
        if (magnetChild.current) {
          gsap.to(magnetChild.current, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1.15, 0.45)',
            overwrite: 'auto'
          })
          magnetChild.current = null
        }

        hoverTarget.current = null
        isHovered.current = false
        hideDroplets.current = false

        // Excite capillary waves on re-entry bounce
        vibrationAmp.current = 0.3
        wobbleAngle.current = 0
        trail1WobbleAmp.current = 0.25
        trail1WobbleAngle.current = 0


        // Hide snap box
        gsap.to(blob, {
          width: 0,
          height: 0,
          opacity: 0,
          scale: 0,
          duration: 0.25,
          ease: 'power2.inOut'
        })

        gsap.to(arrow, {
          scale: 0.5,
          opacity: 0,
          duration: 0.18,
          overwrite: 'auto'
        })
      }
    }

    // click liquid splash explosion & squeeze feedback (physics-driven)
    const handleMouseDown = () => {
      const angleStep = (Math.PI * 2) / 8

      // Track cursor velocity at the moment of click to inject momentum into the splash particles
      const mvx = dotPos.current.x - prevDotPos.current.x
      const mvy = dotPos.current.y - prevDotPos.current.y

      particles.current.forEach((p, i) => {
        const angle = angleStep * i + (Math.random() - 0.5) * 0.4
        // Higher speed range to split cleanly from the larger coalesced click-splat
        const speed = 6 + Math.random() * 9

        p.x = mouse.current.x
        p.y = mouse.current.y
        
        // Conservation of momentum: add a fraction of the cursor velocity
        p.vx = mvx * 0.55 + Math.cos(angle) * speed
        p.vy = mvy * 0.55 + Math.sin(angle) * speed
        p.scale = 1.0
        p.size = 7 + Math.random() * 6 // 7px to 13px diameter to survive gooey filter blur
        p.active = true

        const el = particleEls.current[i]
        if (el) {
          gsap.set(el, { x: p.x, y: p.y, scale: 1, opacity: 1 })
        }
      })

      isClicked.current = true
      // Excite high wobble amplitude on compression impact
      vibrationAmp.current = 0.45
      trail1WobbleAmp.current = 0.4

      // Spawn a burst of click ripples (3–5 rings radiating from impact point)
      const clickRippleCount = 3 + Math.floor(Math.random() * 3)
      for (let ri = 0; ri < clickRippleCount; ri++) {
        const idx = rippleIndex.current % RIPPLE_COUNT
        const r = ripples.current[idx]
        // Slight random offset so ripples don't all share the exact same center
        r.x = mouse.current.x + (Math.random() - 0.5) * 10
        r.y = mouse.current.y + (Math.random() - 0.5) * 10
        r.scale = 0.1 + Math.random() * 0.25
        r.opacity = 0.4 + Math.random() * 0.25
        r.active = true
        r.age = -ri * 3  // stagger spawn: each successive ring starts a few frames later
        r.baseSize = 18 + Math.random() * 24
        r.maxScale = 2.5 + Math.random() * 2.0
        r.expandRate = 0.05 + Math.random() * 0.06
        rippleIndex.current++
      }

      gsap.to(blob, { scale: 0.92, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })
    }

    const handleMouseUp = () => {
      isClicked.current = false
      // Excite strong spring back wobble as the splat breaks back into a tail
      vibrationAmp.current = 0.35
      trail1WobbleAmp.current = 0.3


      gsap.to(blob, { scale: 1, duration: 0.45, ease: 'elastic.out(1.1, 0.35)', overwrite: 'auto' })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // GSAP Ticker loop for high performance physics matching frame rate
    const updateCursor = () => {
      // Initialize coords to actual mouse position on first move to prevent starting at 0,0
      if (dotPos.current.x === -100) {
        dotPos.current.x = mouse.current.x
        dotPos.current.y = mouse.current.y
        prevDotPos.current.x = mouse.current.x
        prevDotPos.current.y = mouse.current.y
        
        trail1Pos.current.x = mouse.current.x
        trail1Pos.current.y = mouse.current.y
        prevTrail1Pos.current.x = mouse.current.x
        prevTrail1Pos.current.y = mouse.current.y
        

        
        blobPos.current.x = mouse.current.x
        blobPos.current.y = mouse.current.y
      }

      // Save previous coordinates before updating
      prevDotPos.current.x = dotPos.current.x
      prevDotPos.current.y = dotPos.current.y
      prevTrail1Pos.current.x = trail1Pos.current.x
      prevTrail1Pos.current.y = trail1Pos.current.y


      // Update streamline history queue
      dotHistory.current.unshift({ x: dotPos.current.x, y: dotPos.current.y })
      if (dotHistory.current.length > 40) {
        dotHistory.current.pop()
      }

      // Increment timeline for transverse undulations (shear waves)
      time.current += 0.12

      // Helper to fetch coordinates from history safely
      const getHistoryPos = (idx) => {
        if (dotHistory.current.length === 0) return { x: mouse.current.x, y: mouse.current.y }
        if (idx >= dotHistory.current.length) {
          return dotHistory.current[dotHistory.current.length - 1]
        }
        return dotHistory.current[idx]
      }

      // Helper to calculate anchor position with fluid transverse wave (Kelvin-Helmholtz waves)
      const getAnchorWithWave = (delayIndex, wavePhaseOffset) => {
        const anchor = getHistoryPos(delayIndex)
        const nextAnchor = getHistoryPos(delayIndex + 1)
        const anchorVel = { x: anchor.x - nextAnchor.x, y: anchor.y - nextAnchor.y }
        const speed = Math.sqrt(anchorVel.x * anchorVel.x + anchorVel.y * anchorVel.y) || 0.001
        
        const nx = -anchorVel.y / speed
        const ny = anchorVel.x / speed
        
        // Undulation wave amplitude scales with movement speed
        const waveAmp = Math.min(speed * 0.16, 7)
        const phase = time.current - wavePhaseOffset
        const transverse = Math.sin(phase) * waveAmp
        
        return {
          pos: {
            x: anchor.x + nx * transverse,
            y: anchor.y + ny * transverse
          },
          vel: anchorVel
        }
      }

      const anchor1 = getAnchorWithWave(5, 1.2)


      // 1. Move snap box (outer ring/lens)
      if (isHovered.current && hoverTarget.current) {
        const targetX = hoverRect.current.docX - window.scrollX + hoverRect.current.width / 2
        const targetY = hoverRect.current.docY - window.scrollY + hoverRect.current.height / 2

        // Magnetic drag pull
        const magnetX = targetX + (mouse.current.x - targetX) * 0.18
        const magnetY = targetY + (mouse.current.y - targetY) * 0.18

        blobPos.current.x += (magnetX - blobPos.current.x) * 0.25
        blobPos.current.y += (magnetY - blobPos.current.y) * 0.25

        gsap.set(blob, {
          x: blobPos.current.x,
          y: blobPos.current.y,
          rotate: 0,
          scaleX: 1,
          scaleY: 1
        })

        // 3D Magnetic Text Pull: Pull child text elements toward mouse inside button bounds
        if (magnetChild.current) {
          const dx = mouse.current.x - targetX
          const dy = mouse.current.y - targetY
          gsap.set(magnetChild.current, {
            x: dx * 0.22,
            y: dy * 0.22
          })
        }
      } else {
        const dx = mouse.current.x - blobPos.current.x
        const dy = mouse.current.y - blobPos.current.y
        blobPos.current.x += dx * 0.15
        blobPos.current.y += dy * 0.15

        gsap.set(blob, { x: blobPos.current.x, y: blobPos.current.y })
      }

      // 2. Move main dot (viscosity increased by decreasing tracking speed to 0.125)
      const dxDot = mouse.current.x - dotPos.current.x
      const dyDot = mouse.current.y - dotPos.current.y
      dotPos.current.x += dxDot * 0.125
      dotPos.current.y += dyDot * 0.125
      
      const dotVel = {
        x: dotPos.current.x - prevDotPos.current.x,
        y: dotPos.current.y - prevDotPos.current.y
      }

      // Calculate separation factors s_i based on distance to parent/neighbor
      // limit1, limit2, limit3 represent the coalescence zone boundaries
      const limit1 = isClicked.current ? 32 : 22

      const snapLimit1 = isClicked.current ? 48 : 38

      const dist1 = Math.sqrt(
        (dotPos.current.x - trail1Pos.current.x) ** 2 + 
        (dotPos.current.y - trail1Pos.current.y) ** 2
      )
      const s1 = Math.min(1.0, dist1 / limit1)



      // Mass conservation: main dot shrinks by the volume of separated tail droplets
      const massReduction = s1 * 0.20
      const baseDotTarget = isClicked.current ? 1.55 : 1.0

      // Interpolate scales and opacities based on click/hover states
      const targetDotScale = hideDroplets.current ? 0 : (baseDotTarget - massReduction)
      const targetDotOpacity = hideDroplets.current ? 0 : 1.0
      dotScale.current += (targetDotScale - dotScale.current) * 0.2
      dotOpacity.current += (targetDotOpacity - dotOpacity.current) * 0.2

      // Trail scales grow proportional to separation (budding/splitting visual flow)
      const targetTrail1Scale = hideDroplets.current ? 0 : (isClicked.current ? 1.3 : s1 * trail1BaseScale.current)
      const targetTrail1Opacity = hideDroplets.current ? 0 : 1.0
      


      // Viscous physics parameters (stiffness decreased, base damping increased by another 20%)
      const stiffness1 = isClicked.current ? 0.38 : 0.14
      const damp1 = isClicked.current ? 0.58 : 0.56
      const maxForce1 = isClicked.current ? 12 : 8
      const bridgeStiffness1 = 0.15



      // Update Trail 1 (Anchored to streamline, coalesced to main dot, snaps dynamically)
      updateTrailNode(
        trail1Pos.current,
        trail1Vel.current,
        anchor1.pos,
        dotPos.current,
        dotVel,
        stiffness1,
        damp1,
        limit1,
        snapLimit1,
        bridgeStiffness1,
        maxForce1,
        trail1WobbleAmp,
        trail1WobbleAngle,
        vibrationAmp,      // parentWobbleAmpRef
        trail1Coalesced,   // wasCoalescedRef
        trail1Snapped,     // wasSnappedRef
        trail1Scale,
        trail1Opacity,
        targetTrail1Scale,
        targetTrail1Opacity,
        trail1
      )
      


      // Main dot visual deformation: speed stretch + capillary wave wobble
      const speed = Math.sqrt(dotVel.x * dotVel.x + dotVel.y * dotVel.y)
      const angle = Math.atan2(dotVel.y, dotVel.x) * 180 / Math.PI
      const stretch = Math.min(speed * 0.035, 0.4)

      const jerk = Math.abs(speed - lastSpeed.current)
      lastSpeed.current = speed
      
      if (jerk > 1.2) {
        vibrationAmp.current = Math.min(vibrationAmp.current + jerk * 0.02, 0.25)
      }
      
      vibrationAmp.current *= 0.93
      wobbleAngle.current += 0.38
      const wobble = Math.sin(wobbleAngle.current) * vibrationAmp.current

      const scaleX = Math.max(0.001, dotScale.current * (1 + stretch + wobble))
      const scaleY = Math.max(0.001, dotScale.current / (1 + stretch + wobble))

      gsap.set(dot, {
        x: dotPos.current.x,
        y: dotPos.current.y,
        rotate: angle,
        scaleX: scaleX,
        scaleY: scaleY,
        opacity: dotOpacity.current
      })

      // 5. Update splash particle physics with drag, gravity, and teardrop stretching
      particles.current.forEach((p, i) => {
        if (!p.active) return

        p.vx *= 0.96
        p.vy *= 0.96
        p.vy += 0.22

        p.x += p.vx
        p.y += p.vy
        p.scale -= 0.02

        const el = particleEls.current[i]
        if (el) {
          if (p.scale <= 0) {
            p.active = false
            gsap.set(el, { opacity: 0, scale: 0 })
          } else {
            const pSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
            const pAngle = Math.atan2(p.vy, p.vx) * 180 / Math.PI
            const pStretch = 1 + Math.min(pSpeed * 0.06, 1.2)

            const pScaleX = Math.max(0.001, p.scale * pStretch)
            const pScaleY = Math.max(0.001, p.scale / pStretch)

            gsap.set(el, {
              x: p.x,
              y: p.y,
              rotate: pAngle,
              scaleX: pScaleX,
              scaleY: pScaleY,
              opacity: p.scale,
              width: p.size,
              height: p.size
            })
          }
        }
      })

      // 6. Slash ripple effect — spawn expanding rings when cursor moves fast
      const RIPPLE_SPEED_THRESHOLD = 6    // min speed to trigger ripples
      const RIPPLE_SPACING = 28            // min px between ripple spawns
      const RIPPLE_MAX_AGE = 45            // frames until ripple dies
      const RIPPLE_EXPAND_RATE = 0.065     // scale growth per frame (decelerates)
      const RIPPLE_MAX_SCALE = 2.8         // max ring expansion

      if (speed > RIPPLE_SPEED_THRESHOLD && !hideDroplets.current) {
        const rdx = dotPos.current.x - lastRipplePos.current.x
        const rdy = dotPos.current.y - lastRipplePos.current.y
        const rippleDist = Math.sqrt(rdx * rdx + rdy * rdy)

        if (rippleDist > RIPPLE_SPACING) {
          // Spawn a new ripple from the pool
          const idx = rippleIndex.current % RIPPLE_COUNT
          const r = ripples.current[idx]
          r.x = dotPos.current.x
          r.y = dotPos.current.y
          r.scale = 0.15 + Math.random() * 0.30           // random initial scale 0.15–0.45
          r.opacity = Math.min(speed * 0.04, 0.55)
          r.active = true
          r.age = 0
          r.baseSize = 16 + Math.random() * 20            // random diameter 16–36px
          r.maxScale = 2.0 + Math.random() * 1.6          // random max expansion 2.0–3.6
          r.expandRate = 0.04 + Math.random() * 0.05      // random growth speed 0.04–0.09
          rippleIndex.current++

          lastRipplePos.current.x = dotPos.current.x
          lastRipplePos.current.y = dotPos.current.y
        }
      }

      // Animate all active ripples
      ripples.current.forEach((r, i) => {
        if (!r.active) return

        r.age++
        // Stagger delay: ripple stays dormant while age is negative
        if (r.age <= 0) return

        // Decelerate expansion as the ripple ages (surface tension damping)
        const ageFactor = Math.max(0, 1 - (r.age / RIPPLE_MAX_AGE))
        r.scale += r.expandRate * ageFactor * ageFactor
        if (r.scale > r.maxScale) r.scale = r.maxScale

        // Fade out with eased curve (fast start, slow tail)
        r.opacity *= 0.94

        const el = rippleEls.current[i]
        if (el) {
          if (r.age >= RIPPLE_MAX_AGE || r.opacity < 0.01) {
            r.active = false
            gsap.set(el, { opacity: 0, scale: 0 })
          } else {
            gsap.set(el, {
              x: r.x,
              y: r.y,
              scale: r.scale,
              opacity: r.opacity,
              width: r.baseSize,
              height: r.baseSize
            })
          }
        }
      })
    }

    gsap.ticker.add(updateCursor)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      gsap.ticker.remove(updateCursor)
    }
  }, [])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* SVG gooey liquid filter definition (with crisp contrast values tuned for easier splitting) */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <filter id="cursor-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Snap Box Wrapper (invisible by default, morphs into focus block on hover) */}
      <div
        ref={blobRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center bg-white mix-blend-difference"
        style={{
          transformOrigin: 'center center',
          transition: 'background-color 0.25s, width 0.3s, height 0.3s, border-radius 0.3s, box-shadow 0.3s'
        }}
      >
        {/* Dynamic explore/link Arrow, shown only when hovering large interactive elements */}
        <svg
          ref={arrowRef}
          className="w-4 h-4 text-black opacity-0 scale-50 transition-all duration-300 pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </div>

      {/* Gooey Liquid Droplets (Main dot + trail + splash particles) */}
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-[10000]"
        style={{ filter: 'url(#cursor-goo)', mixBlendMode: 'difference' }}
      >
        <div
          ref={dotRef}
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
        />
        <div
          ref={trail1Ref}
          className="absolute top-0 left-0 w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
        />


        {/* Liquid splash particles rendered INSIDE the gooey filter for necking/splitting */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            ref={el => particleEls.current[i] = el}
            className="absolute top-0 left-0 bg-white rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform cursor-particle opacity-0"
          />
        ))}
      </div>

      {/* Slash ripple rings — rendered OUTSIDE gooey filter for clean ring geometry */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[9998]" style={{ mixBlendMode: 'difference' }}>
        {Array.from({ length: RIPPLE_COUNT }).map((_, i) => (
          <div
            key={`ripple-${i}`}
            ref={el => rippleEls.current[i] = el}
            className="absolute top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform opacity-0"
            style={{
              width: 24,
              height: 24,
              border: '1.5px solid rgba(255, 255, 255, 0.7)',
              background: 'transparent'
            }}
          />
        ))}
      </div>
    </>
  )
}
