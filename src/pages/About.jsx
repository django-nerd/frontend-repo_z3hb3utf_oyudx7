import React from 'react'

export default function About(){
  return (
    <main className="pt-24 bg-cream texture-cream text-chocolate">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-10">
          <div className="text-sage text-sm tracking-widest">About</div>
          <h1 className="font-serif text-5xl uppercase">About</h1>
          <div className="font-script text-sage text-3xl -mt-2">why we build the way we do</div>
        </div>

        <section className="grid md:grid-cols-12 gap-10 items-center mb-24">
          <div className="md:col-span-7 space-y-6">
            <p className="text-chocolate/80 leading-relaxed">We founded Running With Strategy to bridge editorial craft and rigorous performance. We believe taste compounds. And when systems protect taste, growth becomes inevitable—not accidental.</p>
            <p className="text-chocolate/80 leading-relaxed">Our philosophy: design the machine, then feed it. We start with clarity—offers, audiences, and angle libraries—then we build feedback loops that make every week smarter than the last.</p>
            <p className="text-chocolate/80 leading-relaxed">We stay founder-led and selective. Fewer clients, more attention, real accountability. It shows in the work.</p>
          </div>
          <div className="md:col-span-5">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" alt="Team" className="w-full rounded-sm shadow-elevate-lg object-cover"/>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-serif text-2xl uppercase mb-6">What Makes Us Different</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Heritage Meets Performance","Full-Funnel Thinking","Founder-Led Service"].map((t,i)=> (
              <div key={t} className="relative bg-cream border border-sage/40 rounded-sm p-6 shadow-elevate">
                <div className="absolute -top-4 left-5 text-cherry font-serif text-3xl">{String(i+1).padStart(2,'0')}</div>
                <div className="font-serif text-xl">{t}</div>
                <p className="text-chocolate/80 mt-2">Old-money craftsmanship applied to modern growth systems. Strategy, creative, and data under one roof.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-12 gap-10 items-start mb-24">
          <div className="md:col-span-5">
            <img src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop" alt="Founder" className="w-full rounded-sm shadow-elevate-lg object-cover"/>
          </div>
          <div className="md:col-span-7">
            <div className="font-script text-sage text-4xl">Meet Helena Carter</div>
            <div className="text-sage">Founder & Strategy Lead</div>
            <div className="mt-4 space-y-4">
              {Array.from({length:5}).map((_,i)=> (
                <p key={i} className="text-chocolate/80">Helena built growth engines for luxury and performance brands before founding RWS. She cares about craft, clarity, and compounding advantage. She started this to do the work the right way—with taste and accountability.</p>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-serif text-2xl uppercase mb-6">How We Work</h2>
          <div className="grid md:grid-cols-6 gap-6">
            {Array.from({length:6}).map((_,i)=> (
              <div key={i} className="bg-cream border border-sage/40 rounded-sm p-6 shadow-elevate">
                <div className="text-cherry font-serif text-2xl">{i+1}</div>
                <div className="font-serif uppercase mt-2">Step {i+1}</div>
                <p className="text-chocolate/80 text-sm mt-2">From first audit to ongoing optimization, we design a loop that compounds learning every week.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <h2 className="font-serif text-2xl uppercase mb-6">Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {["Taste","Rigor","Clarity","Care"].map(v=> (
              <div key={v} className="bg-cream border border-sage/40 rounded-sm p-6 shadow-elevate">
                <div className="font-serif text-xl">{v}</div>
                <p className="text-chocolate/80 mt-2">We hold the line on quality. We measure what matters. We make it simple. We treat your brand like our own.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-chocolate texture-chocolate text-cream rounded-sm p-10 text-center shadow-elevate-lg">
          <div className="font-serif text-2xl uppercase">Ready to work together?</div>
          <div className="mt-4"><a href="/contact" className="bg-cherry text-cream px-6 py-3 rounded-sm hover:shadow-elevate-md">Book Strategy Call</a> <a href="/work" className="ml-4 underline">View Our Work</a></div>
        </section>
      </div>
    </main>
  )
}
