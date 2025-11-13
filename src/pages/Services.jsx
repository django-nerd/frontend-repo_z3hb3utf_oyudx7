import React from 'react'
import { Link } from 'react-router-dom'

export default function Services(){
  const services = [
    { key: 'paid-media', name: 'Paid Media', desc: 'Performance-first campaigns across Meta, Google, and TikTok with creative iteration guided by data.' },
    { key: 'content-creative', name: 'Content & Creative', desc: 'Editorial-quality production with UGC speed. Systems that feed your funnel consistently.' },
    { key: 'ai-optimization', name: 'AI Optimization', desc: 'CRO, personalization, and predictive analytics that compound returns as you scale.' },
  ]

  return (
    <main className="pt-24 texture-cream min-h-screen bg-cream text-chocolate">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="mb-16">
          <div className="text-sage text-sm tracking-widest">Breadcrumbs · Services</div>
          <h1 className="font-serif text-5xl uppercase">Services</h1>
          <p className="font-script text-sage text-3xl -mt-2">tailored to your growth</p>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map(s=> (
            <Link key={s.key} to={`/services/${s.key}`} className="group bg-cream border border-sage/40 rounded-sm p-10 shadow-elevate hover:shadow-elevate-md transition-all hover:-translate-y-1">
              <div className="font-serif text-2xl uppercase mb-3">{s.name}</div>
              <p className="text-chocolate/80">{s.desc}</p>
              <span className="block mt-6 text-cherry underline">View {s.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
