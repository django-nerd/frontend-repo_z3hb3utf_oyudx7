import React, { useState } from 'react'

const sections = {
  'paid-media': {
    title: 'Paid Media',
    subtitle: 'turn ad dollars into assets',
    intro: 'For brands ready to scale with intention. We orchestrate full-funnel systems across Meta, Google, and TikTok with creative iteration informed by data—not guesswork.',
    bullets: [
      'Full-funnel account architecture and offer strategy',
      'Creative testing sprints and winning concept libraries',
      'Budget pacing, MER guardrails, and scenario planning',
      'Landing page CRO and post-click optimization',
      'Audience development and remarketing systems',
      'Board-ready reporting and insights cadence',
    ],
    tools: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'GA4', 'Northbeam', 'Triple Whale'],
    results: [
      { label: 'ROAS', value: '473%' },
      { label: 'Added Rev', value: '$2.3M' },
      { label: 'CAC Down', value: '34%' },
    ],
    faq: [
      { q: 'How fast can we see results?', a: 'Most accounts stabilize within 2–3 weeks. Material scale typically happens in 6–8 weeks once creative and offers align.' },
      { q: 'Do you handle creative?', a: 'Yes. We run creative testing sprints and produce net-new concepts or adapt brand assets for performance.' },
      { q: 'What budgets do you work with?', a: 'From $20k/mo to $500k+/mo. We scale pacing against MER and payback windows.' },
    ],
  },
  'content-creative': {
    title: 'Content & Creative',
    subtitle: 'editorial craft at growth speed',
    intro: 'We pair art direction with performance heuristics to ship creative that converts without cheapening the brand.',
    bullets: [
      'Modular content systems for paid + organic',
      'UGC sourcing and direction pipelines',
      'Editorial production standards for DTC',
      'Messaging and angles library tied to outcomes',
      'Design language and brand kits for performance',
    ],
    tools: ['Figma', 'Premiere', 'After Effects', 'CapCut', 'Copy systems'],
    results: [
      { label: 'CTR Lift', value: '+156%' },
      { label: 'CPM Efficiency', value: '−22%' },
      { label: 'Win Rate', value: '1 in 4' },
    ],
    faq: [
      { q: 'Can you match our brand aesthetic?', a: 'Absolutely. We begin with visual language mapping and a taste alignment workshop to set the bar.' },
      { q: 'Do you deliver monthly?', a: 'Yes—most teams prefer a monthly cadence with weekly drops and reviews.' },
      { q: 'Who owns the files?', a: 'You do. We deliver organized source files and final exports.' },
    ],
  },
  'ai-optimization': {
    title: 'AI Optimization',
    subtitle: 'systems that compound',
    intro: 'Applied AI for growth: conversion optimization, personalization, and forecasting without the buzzword soup.',
    bullets: [
      'A/B and multivariate CRO program',
      'Personalization streams (offers, bundles, content)',
      'Predictive LTV and cohort modeling',
      'Insights automation and anomaly detection',
      'Recommendations and on-site messaging',
    ],
    tools: ['Optimizely', 'VWO', 'Segment', 'dbt', 'Python'],
    results: [
      { label: 'CVR Lift', value: '+28%' },
      { label: 'AOV Increase', value: '+14%' },
      { label: 'Payback', value: '8 weeks' },
    ],
    faq: [
      { q: 'Do we need a data team?', a: 'No. We integrate with your stack and handle implementation with light engineering support from your side.' },
      { q: 'How do you measure impact?', a: 'We triangulate platform data, GA4, and finance to ensure the signal is clear and trusted.' },
      { q: 'Is this custom or off-the-shelf?', a: 'A mix—rapid wins using existing tools, then bespoke layers where leverage is highest.' },
    ],
  }
}

export default function ServiceDetail({ slug }){
  const data = sections[slug]
  const [open, setOpen] = useState(null)
  if(!data) return null

  return (
    <main className="pt-24 bg-cream texture-cream text-chocolate">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-sage text-sm tracking-widest mb-6">Services · {data.title}</div>
        <div className="grid md:grid-cols-12 gap-10 items-center mb-16">
          <div className="md:col-span-7 space-y-6">
            <h1 className="font-serif text-5xl uppercase">{data.title}</h1>
            <div className="font-script text-sage text-4xl -mt-2">{data.subtitle}</div>
            <p className="text-chocolate/80 max-w-xl">{data.intro}</p>
            <div className="flex gap-4 pt-2">
              <a className="bg-cherry text-cream px-6 py-3 rounded-sm hover:shadow-elevate-md">Book a Strategy Call</a>
              <a href="/work" className="text-chocolate underline-cherry">View Case Studies</a>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="h-[320px] rounded-sm shadow-elevate-lg bg-sage/10" />
          </div>
        </div>

        <section className="mb-24">
          <h2 className="font-serif text-2xl uppercase mb-6">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.bullets.map((b, i)=> (
              <div key={i} className="relative bg-cream border border-sage/40 rounded-sm p-6 shadow-elevate">
                <div className="absolute -top-4 left-5 text-cherry font-serif text-3xl">{String(i+1).padStart(2,'0')}</div>
                <p className="text-chocolate/80">{b}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-serif text-2xl uppercase mb-6">Our Process</h2>
          <div className="grid md:grid-cols-5 gap-6 items-start">
            {[1,2,3,4,5].map((n)=> (
              <div key={n} className="relative bg-cream border border-sage/40 rounded-sm p-6 shadow-elevate">
                <div className="text-cherry font-serif text-2xl">{n}</div>
                <div className="font-serif uppercase mt-2">Step {n}</div>
                <p className="text-chocolate/80 text-sm mt-2">We align on objectives, design experiments, and implement fast with weekly review cycles.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-serif text-2xl uppercase mb-6">Tools & Capabilities</h2>
          <div className="flex flex-wrap gap-3">
            {data.tools.map((t)=> (
              <span key={t} className="px-4 py-2 rounded-full bg-sage/20 text-chocolate text-sm border border-sage/30">{t}</span>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-serif text-2xl uppercase mb-6">Results</h2>
          <div className="grid md:grid-cols-3 gap-8 bg-chocolate texture-chocolate rounded-sm p-8">
            {data.results.map((r)=> (
              <div key={r.label} className="text-center">
                <div className="text-5xl font-serif text-cream">{r.value}</div>
                <div className="text-sage mt-2">{r.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-serif text-2xl uppercase mb-6">FAQ</h2>
          <div className="divide-y divide-sage/30 border border-sage/30 rounded-sm bg-cream shadow-elevate">
            {data.faq.map((f, i)=> (
              <div key={i}>
                <button className="w-full text-left px-6 py-5 flex items-center justify-between" onClick={()=> setOpen(open===i? null : i)}>
                  <span className="font-serif text-lg text-chocolate">{f.q}</span>
                  <span className={open===i? 'text-cherry' : 'text-sage'}>{open===i? '−' : '+'}</span>
                </button>
                {open===i && (
                  <div className="px-6 pb-6 text-chocolate/80">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-chocolate texture-chocolate text-cream rounded-sm p-10 text-center shadow-elevate-lg">
          <div className="font-serif text-2xl uppercase">Ready to Scale {data.title}?</div>
          <button className="mt-5 bg-cherry text-cream px-6 py-3 rounded-sm hover:shadow-elevate-md">Book Strategy Call</button>
        </section>
      </div>
    </main>
  )
}
