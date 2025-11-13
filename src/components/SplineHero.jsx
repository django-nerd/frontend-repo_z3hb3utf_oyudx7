import React, { useCallback, useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

// Lazy load Spline once
const LazySpline = React.lazy(() => import('@splinetool/react-spline').then(m => ({ default: m.default || m })))

function useMouseTilt(enabled = true, max = 8) {
  const ref = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      setRot({ x: dy * -max, y: dx * max })
    }
    const onLeave = () => setRot({ x: 0, y: 0 })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, max])

  return { ref, rot }
}

function useCoarsePointer(){
  const [coarse, setCoarse] = useState(false)
  useEffect(()=>{
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setCoarse(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  },[])
  return coarse
}

class SplineErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(){
    return { hasError: true }
  }
  componentDidCatch(err){
    if (import.meta?.env?.MODE === 'development') {
      // eslint-disable-next-line no-console
      console.error('Spline error:', err)
    }
  }
  render(){
    if (this.state.hasError){
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}

export default function SplineHero({ scene, className = '', poster }) {
  const prefersReduced = useReducedMotion()
  const isCoarse = useCoarsePointer()
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const parallaxRot = useTransform(scrollYProgress, [0, 1], [0, 6])
  const y = useSpring(parallaxY, { stiffness: 80, damping: 20, mass: 0.6 })
  const r = useSpring(parallaxRot, { stiffness: 80, damping: 20, mass: 0.6 })

  const tiltEnabled = !prefersReduced && !isCoarse
  const { ref, rot } = useMouseTilt(tiltEnabled, 6)

  const [isLoaded, setLoaded] = useState(false)
  const [isVisible, setVisible] = useState(true)
  const [retry, setRetry] = useState(0) // force remount on retry

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const overlay = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 mix-blend-soft-light opacity-[0.08] bg-[radial-gradient(45%_60%_at_50%_0%,#ffffff_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(90,56,46,0.25)_0%,rgba(233,219,201,0.08)_40%,rgba(90,56,46,0.25)_100%)] opacity-[0.08]" />
    </div>
  ), [])

  const motionStyle = prefersReduced
    ? {}
    : {
        rotateX: rot.x,
        rotateY: rot.y,
      }

  const posterUI = (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-sage/10">
      <div className="text-center">
        {poster ? (
          <img src={poster} alt="3D preview" className="max-h-full max-w-full object-contain opacity-90" />
        ) : (
          <div className="text-chocolate/70 text-sm">
            <div className="mb-2">3D unavailable</div>
            <div className="text-xs opacity-70">Rendering gracefully disabled</div>
          </div>
        )}
        <button onClick={()=>{ setRetry(v=>v+1); setLoaded(false); }} className="mt-4 inline-flex items-center bg-cherry text-cream text-xs tracking-wide px-3 py-1.5 rounded-sm shadow-elevate-sm active:scale-[0.99]">Retry</button>
      </div>
    </div>
  )

  return (
    <motion.div
      ref={ref}
      style={prefersReduced ? undefined : { y, rotate: r, ...motionStyle, perspective: 900 }}
      className={`relative rounded-xl shadow-elevate-lg overflow-hidden will-change-transform ${className}`}
      aria-label="Interactive brand sculpture"
    >
      {/* Base surface */}
      <div className="absolute inset-0 bg-sage/10 z-0" />
      {overlay}

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <SplineErrorBoundary fallback={posterUI}>
          <Suspense fallback={<div className="absolute inset-0 animate-pulse bg-sage/20" /> }>
            <LazySpline
              key={`spline-${retry}`}
              scene={scene}
              onLoad={() => setLoaded(true)}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </Suspense>
        </SplineErrorBoundary>
      </div>

      {/* Top glint */}
      <div className="pointer-events-none absolute -top-1 inset-x-0 h-20 bg-gradient-to-b from-white/20 to-transparent z-20" />

      {/* Status badges */}
      {!isLoaded && (
        <div className="absolute bottom-3 right-3 z-20 text-[11px] tracking-widest uppercase text-chocolate/60 bg-cream/70 backdrop-blur px-2 py-1 rounded-sm shadow">
          Loading…
        </div>
      )}
      {!isVisible && (
        <div className="absolute bottom-3 left-3 z-20 text-[11px] tracking-widest uppercase text-chocolate/60 bg-cream/70 backdrop-blur px-2 py-1 rounded-sm shadow">
          Paused
        </div>
      )}

      {/* Subtle float if motion allowed */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0 z-0"
          aria-hidden
          initial={{ y: 0 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </motion.div>
  )
}
