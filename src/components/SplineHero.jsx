import React, { useCallback, useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

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

export default function SplineHero({ scene, className = '' }) {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const parallaxRot = useTransform(scrollYProgress, [0, 1], [0, 6])
  const y = useSpring(parallaxY, { stiffness: 80, damping: 20, mass: 0.6 })
  const r = useSpring(parallaxRot, { stiffness: 80, damping: 20, mass: 0.6 })

  const { ref, rot } = useMouseTilt(!prefersReduced, 6)

  const [isLoaded, setLoaded] = useState(false)
  const [isVisible, setVisible] = useState(true)

  useEffect(() => {
    const onVis = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const overlay = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none">
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

  return (
    <motion.div
      ref={ref}
      style={prefersReduced ? undefined : { y, rotate: r }}
      className={`relative rounded-xl shadow-elevate-lg overflow-hidden ${className}`}
      aria-label="Interactive brand sculpture"
    >
      <div className="absolute inset-0 bg-sage/10" />
      {overlay}
      <Suspense fallback={<div className="absolute inset-0 animate-pulse bg-sage/20" /> }>
        <LazySpline
          scene={scene}
          onLoad={() => setLoaded(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>

      {/* Top glint */}
      <div className="pointer-events-none absolute -top-1 inset-x-0 h-20 bg-gradient-to-b from-white/20 to-transparent" />

      {/* Pause hint/loader */}
      {!isLoaded && (
        <div className="absolute bottom-3 right-3 text-[11px] tracking-widest uppercase text-chocolate/60 bg-cream/70 backdrop-blur px-2 py-1 rounded-sm shadow">
          Loading…
        </div>
      )}
      {!isVisible && (
        <div className="absolute bottom-3 left-3 text-[11px] tracking-widest uppercase text-chocolate/60 bg-cream/70 backdrop-blur px-2 py-1 rounded-sm shadow">
          Paused
        </div>
      )}

      {/* Subtle float if motion allowed */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0"
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
