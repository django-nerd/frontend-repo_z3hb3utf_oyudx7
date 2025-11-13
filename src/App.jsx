import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'

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

// Counter animation
function CountUp({ target, duration = 1600, prefix = '', suffix = '' }) {
  const { ref, inView } = useInViewAnimation(0.3)
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start
    const animate = (t) => {
      if (!start) start = t
      const progress = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    const raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return (
    <div ref={ref} className="tabular-nums">
      <span>
        {prefix}
        {value.toLocaleString()}
        {suffix}
      </span>
    </div>
  )
}

function SectionHeader({ kicker, script, align = 'left', light = false }) {
  return (
    <div className={`space-y-2 ${align === 'center' ? 'text-center' : ''}`}>
      <h2 className={`font-serif tracking-widest text-[11px] sm:text-xs leading-none ${light ? 'text-cream/90' : 'text-chocolate/80'}`}>{kicker}</h2>
      <h3 className={`font-serif text-chocolate ${light ? 'text-cream' : 'text-chocolate'} text-3xl sm:text-4xl md:text-5xl font-bold uppercase`}>{kicker === ' ' ? '' : ''}</h3>
      {script && (
        <div className={`-mt-5 sm:-mt-6 ${light ? 'text-sage' : 'text-sage'} font-script text-2xl sm:text-3xl`}>{script}</div>
      )}
    </div>
  )
}

export default function App() {
  // Parallax for 3D hero element
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ container: undefined })
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 6])
  const y = useTransform(scrollYProgress, [0, 1], [0, -40])

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

  return (
    <div className="min-h-screen bg-cream text-chocolate">
      {/* Texture overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type=\'table\' tableValues=\'0 0.6\'/%3E%3C/feComponentTransfer%3E%3CfeBlend mode=\'multiply\' in2=\'SourceGraphic\'/%3E%3C/filter%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }} />

      {/* Hero */}
      <section className="relative pt-20 md:pt-28" style={{ minHeight: '85vh' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-4">
              <div className="font-serif text-[12px] tracking-[0.35em] text-chocolate/80 uppercase">Running With Strategy</div>
              <h1 className="font-serif text-chocolate text-4xl sm:text-5xl md:text-6xl leading-[1.05] uppercase">
                Editorial taste. Data-driven growth.
              </h1>
              <p className="font-script text-sage text-2xl sm:text-3xl -mt-2">where strategy meets execution</p>
            </div>
            <p className="text-chocolate/80 max-w-xl leading-relaxed">
              A full-service marketing partner across content, paid media, and AI optimization. We blend heritage-level design with modern performance systems to scale brands with intention.
            </p>
            <div className="flex items-center gap-6">
              <a href="#cta" className="inline-flex items-center gap-2 bg-cherry text-cream px-6 py-3 rounded-sm tracking-wide hover:shadow-elevate transition-shadow duration-300 group">
                <span>Book a Strategy Call</span>
                <span className="block h-[1px] w-0 bg-cream transition-all duration-300 group-hover:w-10" />
              </a>
              <a href="#work" className="relative text-chocolate/80 hover:text-chocolate">
                <span className="border-b border-cherry/0 group-hover:border-cherry transition-colors">View our work</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <motion.div style={{ rotate, y }} className="relative h-[380px] sm:h-[440px] md:h-[520px]">
              <div className="absolute inset-0 rounded-xl shadow-elevate-lg overflow-hidden">
                {/* Spline 3D element */}
                <Spline scene="https://prod.spline.design/5mJ0u7bH9v1P4k1m/scene.splinecode" style={{ width: '100%', height: '100%' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-sage/20 py-6">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between text-sage/70 text-xs tracking-widest uppercase">
          <div className="flex-1 text-center">847% Avg ROAS</div>
          <div className="hidden sm:block w-px h-6 bg-cherry/30" />
          <div className="flex-1 text-center">$2.3M Client Revenue</div>
          <div className="hidden sm:block w-px h-6 bg-cherry/30" />
          <div className="flex-1 text-center">23 Brands Scaled</div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <div className="font-serif text-[12px] tracking-[0.35em] text-chocolate/80 uppercase">Services</div>
            <div className="font-script text-sage text-2xl -mt-1">that scale</div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-[60px]">
            {services.map((s) => (
              <div key={s.title} className="group bg-cream border border-sage/50 p-8 md:p-10 relative transition-transform duration-200 will-change-transform hover:-translate-y-2 hover:shadow-elevate">
                <div className="text-cherry font-serif tracking-wider text-sm mb-6">{s.accent}</div>
                <h4 className="font-serif text-2xl uppercase mb-3">{s.title}</h4>
                <p className="text-chocolate/80 leading-relaxed">{s.desc}</p>
                <span className="absolute left-8 -bottom-[1px] h-[2px] w-0 bg-cherry transition-all duration-300 group-hover:w-[120px]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data showcase */}
      <section className="bg-chocolate py-16 md:py-24" style={{ minHeight: '50vh' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <div className="font-serif text-[12px] tracking-[0.35em] text-cream/80 uppercase">Proven Results</div>
            <div className="font-script text-sage text-2xl -mt-1">by the numbers</div>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-serif text-cream">
                <CountUp target={847} suffix="%" />
              </div>
              <div className="text-sage mt-2">Average ROAS</div>
            </div>
            <div className="hidden sm:flex items-center justify-center"><div className="w-px h-24 bg-cherry/60" /></div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-serif text-cream">
                <span className="tabular-nums">$2.3M</span>
              </div>
              <div className="text-sage mt-2">Client Revenue</div>
            </div>
            <div className="hidden sm:flex items-center justify-center"><div className="w-px h-24 bg-cherry/60" /></div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl md:text-6xl font-serif text-cream">
                <CountUp target={23} />
              </div>
              <div className="text-sage mt-2">Brands Scaled</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-28">
          <div>
            <div className="font-serif text-[12px] tracking-[0.35em] text-chocolate/80 uppercase">Case Studies</div>
            <div className="font-script text-sage text-2xl -mt-1">real growth stories</div>
          </div>

          {/* Card 1 */}
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <div className="aspect-[16/10] bg-sage/30" />
            </div>
            <div className="md:col-span-5 space-y-4">
              <div className="text-sage tracking-widest text-xs uppercase">Maison V.</div>
              <h4 className="font-serif text-3xl uppercase">Scaling a heritage-inspired DTC brand</h4>
              <div className="border border-sage/60 p-4">
                <span className="text-cherry font-serif text-xl">473% ROAS</span>
                <p className="text-chocolate/80 mt-1">Full-funnel restructure, creative testing sprints, and CRO uplift delivered sustainable efficiency.</p>
              </div>
              <a className="inline-flex items-center gap-2 text-chocolate group">
                <span>View Case Study</span>
                <span className="block h-[1px] w-0 bg-cherry transition-all duration-300 group-hover:w-10" />
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5 order-2 md:order-1 space-y-4">
              <div className="text-sage tracking-widest text-xs uppercase">Atlas Beauty</div>
              <h4 className="font-serif text-3xl uppercase">From plateau to profitable scale</h4>
              <div className="border border-sage/60 p-4">
                <span className="text-cherry font-serif text-xl">$2.3M Added Rev</span>
                <p className="text-chocolate/80 mt-1">Creative engine + offer testing unlocked new audiences without sacrificing MER.</p>
              </div>
              <a className="inline-flex items-center gap-2 text-chocolate group">
                <span>View Case Study</span>
                <span className="block h-[1px] w-0 bg-cherry transition-all duration-300 group-hover:w-10" />
              </a>
            </div>
            <div className="md:col-span-7 order-1 md:order-2">
              <div className="aspect-[16/10] bg-sage/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-sage/10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-12">
            <div className="font-serif text-[12px] tracking-[0.35em] text-chocolate/80 uppercase">Client Love</div>
            <div className="font-script text-sage text-2xl -mt-1">in their words</div>
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-10">
            {[1,2,3,4].map((i) => (
              <div key={i} className="bg-cream p-8 shadow-sm">
                <div className="text-cherry text-4xl leading-none">“</div>
                <p className="italic font-serif text-lg mt-2">
                  They brought editorial taste to our brand and coupled it with ruthless performance discipline. We scaled without losing our soul.
                </p>
                <div className="mt-4 text-sage font-script text-xl">Alexandra P.</div>
                <div className="text-chocolate/70 text-sm">Founder, Atelier Home</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="relative bg-chocolate py-24 md:py-32" style={{ minHeight: '45vh' }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="font-serif text-[12px] tracking-[0.35em] text-cream/80 uppercase">Ready to Scale?</div>
          <div className="font-script text-sage text-3xl -mt-1">let's run</div>
          <p className="text-sage/90 max-w-2xl mx-auto mt-4">
            Book a strategy call to audit your current growth engine and map a path to profitable scale.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <a className="inline-flex bg-cherry text-cream px-6 py-3 tracking-wide hover:shadow-elevate transition-shadow">Book Your Call</a>
            <a href="#work" className="text-sage underline decoration-cherry/0 hover:decoration-cherry transition-colors">View Our Work</a>
          </div>
        </div>
        {/* Simplified 3D signature */}
        <div className="absolute right-6 bottom-6 w-40 h-28 opacity-60">
          <Spline scene="https://prod.spline.design/5mJ0u7bH9v1P4k1m/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-chocolate/60">
        © {new Date().getFullYear()} Running With Strategy. All rights reserved.
      </footer>
    </div>
  )
}
