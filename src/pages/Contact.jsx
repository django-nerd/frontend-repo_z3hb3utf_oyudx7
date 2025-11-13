import React, { useState } from 'react'

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', company:'', budget:'', needs:[], desc:'' })
  const budgets = ['<$25k/mo', '$25k–$50k/mo', '$50k–$100k/mo', '$100k+/mo']
  const needs = ['Paid Media','Content','AI Optimization','Full-Service']
  const [submitted, setSubmitted] = useState(false)

  const toggleNeed = (n)=> setForm(f=> ({...f, needs: f.needs.includes(n)? f.needs.filter(x=>x!==n) : [...f.needs, n]}))
  const onSubmit = (e)=>{ e.preventDefault(); setSubmitted(true) }

  return (
    <main className="pt-24 bg-cream texture-cream text-chocolate">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-8">
          <div className="text-sage text-sm tracking-widest">Contact · book your strategy call</div>
          <h1 className="font-serif text-5xl uppercase">Let's Talk</h1>
          <div className="font-script text-sage text-3xl -mt-2">book your strategy call</div>
          <p className="text-chocolate/80 mt-4 max-w-2xl">On the call, we’ll audit your current growth engine, identify opportunity areas, and map a 90‑day plan. No fluff.</p>
        </div>

        <div className="grid md:grid-cols-12 gap-10">
          <form onSubmit={onSubmit} className="md:col-span-7 bg-cream border border-sage/40 rounded-sm p-8 shadow-elevate">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-sage mb-1">Name</label>
                <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full border border-sage/40 rounded-sm px-3 py-2 focus:border-cherry outline-none"/>
              </div>
              <div>
                <label className="block text-sm text-sage mb-1">Email</label>
                <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full border border-sage/40 rounded-sm px-3 py-2 focus:border-cherry outline-none"/>
              </div>
              <div>
                <label className="block text-sm text-sage mb-1">Company</label>
                <input value={form.company} onChange={e=>setForm({...form, company:e.target.value})} className="w-full border border-sage/40 rounded-sm px-3 py-2 focus:border-cherry outline-none"/>
              </div>
              <div>
                <label className="block text-sm text-sage mb-1">Monthly Marketing Budget</label>
                <select required value={form.budget} onChange={e=>setForm({...form, budget:e.target.value})} className="w-full border border-sage/40 rounded-sm px-3 py-2 focus:border-cherry outline-none bg-transparent">
                  <option value="">Select</option>
                  {budgets.map(b=> <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <div className="block text-sm text-sage mb-1">What You Need Help With</div>
              <div className="flex flex-wrap gap-3">
                {needs.map(n=> (
                  <button type="button" key={n} onClick={()=>toggleNeed(n)} className={form.needs.includes(n)? 'px-4 py-2 rounded-full bg-cherry text-cream' : 'px-4 py-2 rounded-full bg-cream border border-sage/40'}>{n}</button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-sage mb-1">Brief Project Description</label>
              <textarea required value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} rows={6} className="w-full border border-sage/40 rounded-sm px-3 py-2 focus:border-cherry outline-none"/>
            </div>

            <button className="mt-6 bg-cherry text-cream px-6 py-3 rounded-sm hover:shadow-elevate-md">Book Strategy Call</button>
            {submitted && <div className="mt-3 text-sage">Thanks—We’ll be in touch within 24 hours.</div>}
          </form>

          <aside className="md:col-span-5 space-y-6">
            <div className="bg-cream border border-sage/40 rounded-sm p-6 shadow-elevate">
              <div className="font-serif text-lg">Other ways to reach us</div>
              <div className="mt-3 space-y-2">
                <a href="mailto:hello@rws.agency" className="text-cherry underline">hello@rws.agency</a>
                <div className="text-chocolate/80">Calendly: <a className="underline" href="#">Book a time</a></div>
              </div>
            </div>
            <div className="bg-cream border border-sage/40 rounded-sm p-6 shadow-elevate">
              <div className="font-serif text-lg">Office</div>
              <div className="text-chocolate/80">New York, NY</div>
            </div>
            <div className="bg-cream border border-sage/40 rounded-sm p-6 shadow-elevate">
              <div className="font-serif text-lg mb-3">FAQs</div>
              {Array.from({length:5}).map((_,i)=> (
                <details key={i} className="border-t border-sage/30 py-3">
                  <summary className="cursor-pointer font-serif">How do engagements work?</summary>
                  <p className="text-chocolate/80 mt-2">Month one builds foundations. Months two and three scale and refine. We aim for 8-week payback windows.</p>
                </details>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
