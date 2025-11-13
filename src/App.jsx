import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SplineHero from './components/SplineHero'

// Utility: reveal on scroll
function useInViewAnimation(threshold = 0.2) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

// Counter animation with optional decimals
function CountUp({ target, duration = 1600, prefix = '', suffix = '', decimals = 0 }) {
  const { ref, inView } = useInViewAnimation(0.3)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start
    const animate = (t) => {
      if (!start) start = t
      const progress = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  const formatted = React.useMemo(() => {
    const factor = Math.pow(10, decimals)
    const rounded = Math.round(value * factor) / factor
    if (decimals > 0) return `${prefix}${rounded.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`
    return `${prefix}${Math.floor(rounded).toLocaleString()}${suffix}`
  }, [value, prefix, suffix, decimals])

  return (
    <div ref={ref} className="tabular-nums">{formatted}</div>
  )
}

export default function App() {
  // Parallax for subtle content motions
  const { scrollYProgress } = useScroll({ container: undefined })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 3])
  const y = useTransform(scrollYProgress, [0, 1], [0, -20])

  const services = useMemo(
    () => [
      {
        title: 'Paid Media',
        desc: 'Performance-first campaigns across Meta, Google, and TikTok. Creative iteration guided by data.',
        accent: '01'
      },
      {
        title: 'Content & Creative',
        desc: 'Editorial-quality production with UGC speed. Systems that feed your funnel consistently.',
        accent: '02'
      },
      {
        title: 'AI Optimization',
        desc: 'CRO, personalization, and predictive analytics that compound returns as you scale.',
        accent: '03'
      },
    ],
    []
  )

  const testimonials = useMemo(() => (
    [
      {
        quote: 'Their work gave us premium taste with ruthless performance. We tripled revenue without discounting the brand.',
        name: 'Alexandra P.',
        role: 'Founder, Atelier Home'
      },
      {
        quote: 'Board-ready reporting, creative that converts, and calm execution. Best partners we’ve had.',
        name: 'Marcus V.',
        role: 'CEO, Maison V.'
      },
      {
        quote: 'From stalled to scaling in 8 weeks. CAC down 34%, MER up. The craft shows in every detail.',
        name: 'Rina S.',
        role: 'CMO, Atlas Beauty'
      },
      {
        quote: 'They built systems, not hacks. Our content engine now feeds paid and retention seamlessly.',
        name: 'Daniel K.',
        role: 'Head of Growth, Field & Forge'
      },
    ]
  ), [])

  return (
    <div className="min-h-screen bg-cream text-chocolate texture-cream">
      {/* Hero */}
      <section className="relative pt-28 md:pt-36 pb-24 md:pb-32" style={{ minHeight: '90vh' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          {/* Left 60% content column */}
          <div className="md:col-span-7 space-y-8">
            <div className="space-y-5">
              <div className="font-serif text-[12px] tracking-[0.35em] text-chocolate/80 uppercase">Running With Strategy</div>
              <h1 className="font-serif text-chocolate text-4xl sm:text-5xl md:text-6xl leading-[1.05] uppercase">
                Editorial taste. Data-driven growth.
              </h1>
              <p className="font-script text-sage text-3xl sm:text-4xl md:text-5xl -mt-2">where strategy meets execution</p>
            </div>
            <p className="text-chocolate/80 max-w-xl leading-relaxed">
              A full-service marketing partner across content, paid media, and AI optimization. We blend heritage-level design with modern performance systems to scale brands with intention.
            </p>
            <div className="flex items-center gap-8">
              <a href="#cta" className="inline-flex items-center gap-2 bg-cherry text-cream px-7 py-3.5 rounded-sm tracking-wide hover:shadow-elevate-md active:scale-[0.99] transition-all duration-300 group">
                <span>Book a Strategy Call</span>
                <span className="block h-[1px] w-0 bg-cream transition-all duration-300 group-hover:w-10" />
              </a>
              <a href="#work" className="relative text-chocolate/80 hover:text-chocolate underline-cherry">
                <span>View our work</span>
              </a>
            </div>
          </div>

          {/* Right 40% 3D sculpture */}
          <div className="md:col-span-5 relative">
            <motion.div style={{ rotate, y }} className="relative h-[420px] sm:h-[500px] md:h-[580px]">
              <SplineHero
                scene="https://prod.spline.design/5mJ0u7bH9v1P4k1m/scene.splinecode"
                className="absolute inset-0"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar with differentiated metrics */}
      <section className="bg-sage/15 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sage/80 text-xs tracking-widest uppercase gap-6">
          <div className="flex-1 text-center">4.8/5 Client Rating</div>
          <div className="hidden sm:block w-px h-6 bg-cherry/40" />
          <div className="flex-1 text-center">98% Retention Rate</div>
          <div className="hidden sm:block w-px h-6 bg-cherry/40" />
          <div className="flex-1 text-center">8-Week Avg Payback</div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <div className="font-serif text-[12px] tracking-[0.35em] text-chocolate/80 uppercase">Services</div>
            <div className="font-script text-sage text-3xl md:text-4xl -mt-1">that scale</div>
          </div>
          <div className="grid md:grid-cols-3 gap-[72px]">
            {services.map((s) => (
              <div key={s.title} className="group relative bg-cream border border-sage/40 rounded-sm p-10 shadow-elevate hover:shadow-elevate-md transition-all duration-300 will-change-transform hover:-translate-y-1.5">
                {/* Large accent number */}
                <div className="absolute -top-5 left-6 font-serif text-[56px] text-cherry/90 select-none">{s.accent}</div>
                {/* Card surface */}
                <div className="shadow-inner-soft paper-sheen rounded-sm">
                  <h4 className="font-serif text-2xl uppercase mt-6 mb-3">{s.title}</h4>
                  <p className="text-chocolate/80 leading-relaxed pr-2">{s.desc}</p>
                </div>
                {/* Edge hint */}
                <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-sage/40" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-sage/40 via-sage/30 to-sage/40" />
                <span className="absolute left-10 -bottom-[1px] h-[2px] w-0 bg-cherry transition-all duration-300 group-hover:w-[140px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data showcase */}
      <section className="relative bg-chocolate texture-chocolate py-20 md:py-28" style={{ minHeight: '50vh' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-14">
            <div className="font-serif text-[12px] tracking-[0.35em] text-cream/80 uppercase">Proven Results</div>
            <div className="font-script text-sage text-3xl md:text-4xl -mt-1">by the numbers</div>
          </div>
          <div className="grid grid-cols-3 gap-8 items-start">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-cream">
                <CountUp target={847} suffix="%" />
              </div>
              <div className="text-sage mt-3">Average ROAS</div>
            </div>
            <div className="hidden sm:flex items-center justify-center"><div className="w-px h-28 bg-cherry/60" /></div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-cream">
                <CountUp target={2.3} prefix="$" suffix="M" decimals={1} />
              </div>
              <div className="text-sage mt-3">Client Revenue</div>
            </div>
            <div className="hidden sm:flex items-center justify-center"><div className="w-px h-28 bg-cherry/60" /></div>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-cream">
                <CountUp target={23} />
              </div>
              <div className="text-sage mt-3">Brands Scaled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-36">
          <div>
            <div className="font-serif text-[12px] tracking-[0.35em] text-chocolate/80 uppercase">Case Studies</div>
            <div className="font-script text-sage text-3xl md:text-4xl -mt-1">real growth stories</div>
          </div>

          {/* Case 1: image left 60% */}
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-elevate-lg">
                <img src="https://images.unsplash.com/photo-1759342405113-9ca429c4bbe1?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjI5OTcyNjl8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Case study 1" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-5 space-y-6">
              <div className="text-sage tracking-widest text-xs uppercase">Maison V.</div>
              <h4 className="font-serif text-3xl uppercase">Scaling a heritage-inspired DTC brand</h4>
              <div className="bg-cream border-l-4 border-cherry shadow-elevate p-5">
                <span className="text-cherry font-serif text-2xl">473% ROAS</span>
                <p className="text-chocolate/80 mt-1">Full-funnel restructure, creative testing sprints, and CRO uplift delivered sustainable efficiency.</p>
              </div>
              <a className="inline-flex items-center gap-2 text-chocolate underline-cherry">
                <span>View Case Study</span>
              </a>
            </div>
          </div>

          {/* Case 2: image right 60% */}
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 order-2 md:order-1 space-y-6">
              <div className="text-sage tracking-widest text-xs uppercase">Atlas Beauty</div>
              <h4 className="font-serif text-3xl uppercase">From plateau to profitable scale</h4>
              <div className="bg-cherry text-cream shadow-elevate p-5">
                <span className="font-serif text-2xl">$2.3M Added Rev</span>
                <p className="text-cream/90 mt-1">Creative engine + offer testing unlocked new audiences without sacrificing MER.</p>
              </div>
              <a className="inline-flex items-center gap-2 text-chocolate underline-cherry">
                <span>View Case Study</span>
              </a>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-elevate-lg">
                <img src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop" alt="Case study 2" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sage/10 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <div className="font-serif text-[12px] tracking-[0.35em] text-chocolate/80 uppercase">Client Love</div>
            <div className="font-script text-sage text-3xl md:text-4xl -mt-1">in their words</div>
          </div>
          <div className="grid md:grid-cols-2 gap-14">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`relative bg-cream p-10 rounded-sm shadow-elevate ${idx % 2 === 0 ? 'md:mt-8' : 'md:-mt-4'}`}>
                {/* Embossed quote mark */}
                <div className="absolute -top-6 left-6 text-cherry/90 text-6xl select-none" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.6), 0 -1px 0 rgba(41,5,2,0.08)' }}>“</div>
                <p className="italic font-serif text-xl mt-4">
                  {t.quote}
                </p>
                <div className="mt-6 text-sage font-script text-2xl">{t.name}</div>
                <div className="text-chocolate/70 text-sm">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="relative bg-chocolate texture-chocolate py-28 md:py-36" style={{ minHeight: '50vh' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-serif text-[12px] tracking-[0.35em] text-cream/80 uppercase">Ready to Scale?</div>
          <div className="font-script text-sage text-3xl md:text-4xl -mt-1">let's run</div>
          <p className="text-sage/90 max-w-2xl mx-auto mt-5">
            Book a strategy call to audit your current growth engine and map a path to profitable scale.
          </p>
          <div className="mt-10 flex items-center justify-center gap-8">
            <a className="inline-flex bg-cherry text-cream px-7 py-3.5 tracking-wide rounded-sm hover:shadow-elevate-md active:scale-[0.99] transition-all">Book Your Call</a>
            <a href="#work" className="text-sage underline decoration-cherry/0 hover:decoration-cherry transition-colors">View Our Work</a>
          </div>
        </div>
        {/* Simplified static signature shape (SVG) */}
        <div className="absolute right-6 bottom-6 w-[22vw] max-w-[360px] opacity-70 pointer-events-none">
          <svg viewBox="0 0 600 300" className="w-full h-auto" aria-hidden>
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#3a0b06" />
                <stop offset="1" stopColor="#1f0704" />
              </linearGradient>
            </defs>
            <path d="M10 200 C 120 80, 260 260, 380 140 S 560 80, 590 180" fill="none" stroke="url(#g)" strokeWidth="14" strokeLinecap="round" opacity="0.9" />
            <path d="M10 210 C 120 90, 260 270, 380 150 S 560 90, 590 190" fill="none" stroke="#A73737" strokeWidth="2" opacity="0.9" />
          </svg>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-chocolate/60">
        © {new Date().getFullYear()} Running With Strategy. All rights reserved.
      </footer>
    </div>
  )
}
