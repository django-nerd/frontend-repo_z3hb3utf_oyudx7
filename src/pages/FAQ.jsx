import React, { useState } from 'react'

const groups = {
  General: [
    { q: 'How quickly will we see results?', a: 'Most teams see stability in 2–3 weeks and material scale in 6–8 weeks, depending on creative and offers.' },
    { q: 'Do you work with our in-house team?', a: 'Yes. We integrate with in-house or other partners and set clear swimlanes.' },
  ],
  Services: [
    { q: 'Do you handle creative production?', a: 'We do—from UGC sourcing to editorial production standards for DTC.' },
    { q: 'Budgets you work with?', a: 'From $20k/mo to $500k+/mo with pacing tied to MER and payback.' },
  ],
  Process: [
    { q: 'What does onboarding look like?', a: 'Week 1 foundations: tracking, baselines, offer mapping. Week 2 creative sprint. Week 3 go-live.' },
    { q: 'How do you report?', a: 'Weekly insights and board-ready monthly rollups with clear storylines.' },
  ],
  Pricing: [
    { q: 'How do you charge?', a: 'Fixed monthly with performance incentives aligned to the right metrics for your stage.' },
    { q: 'Is there a minimum term?', a: 'Three months to ensure the system compounds.' },
  ],
  Results: [
    { q: 'Do you guarantee outcomes?', a: 'We guarantee the system and the rigor. Outcomes follow from disciplined execution and creative quality.' },
    { q: 'How do you handle attribution?', a: 'We triangulate platform, GA4, and finance. We avoid single-source myopia.' },
  ],
}

export default function FAQ(){
  const [open, setOpen] = useState({})
  return (
    <main className="pt-24 bg-cream texture-cream text-chocolate">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-8">
          <div className="text-sage text-sm tracking-widest">FAQs</div>
          <h1 className="font-serif text-5xl uppercase">Frequently Asked Questions</h1>
        </div>

        {Object.entries(groups).map(([category, items])=> (
          <section key={category} className="mb-10">
            <h2 className="font-serif text-2xl mb-4">{category}</h2>
            <div className="bg-cream border border-sage/40 rounded-sm shadow-elevate divide-y divide-sage/30">
              {items.map((it, idx)=> {
                const id = `${category}-${idx}`
                const isOpen = !!open[id]
                return (
                  <div key={id}>
                    <button onClick={()=> setOpen(s=> ({...s, [id]: !s[id]}))} className="w-full text-left px-6 py-5 flex items-center justify-between">
                      <span className="font-serif text-lg">{it.q}</span>
                      <span className={isOpen? 'text-cherry' : 'text-sage'}>{isOpen? '−' : '+'}</span>
                    </button>
                    {isOpen && <div className="px-6 pb-6 text-chocolate/80">{it.a}</div>}
                  </div>
                )
              })}
            </div>
          </section>
        ))}

        <div className="text-center mt-12">
          <div className="font-serif text-xl">Still have questions?</div>
          <a href="/contact" className="inline-flex mt-4 bg-cherry text-cream px-6 py-3 rounded-sm hover:shadow-elevate-md">Schedule a Call</a>
        </div>
      </div>
    </main>
  )
}
