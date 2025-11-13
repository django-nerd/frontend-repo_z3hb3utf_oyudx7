import React from 'react'
import { Link, useParams } from 'react-router-dom'

const data = {
  'maison-v': {
    client: 'Maison V.',
    title: 'Scaling a heritage-inspired DTC brand',
    hero: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop',
    challenge: `Growth stalled as paid channels saturated and creative lagged behind evolving customer taste. The brand needed a system that respected its premium positioning while driving efficient new customer acquisition.`,
    approach: [
      { title: 'Rebuilt the funnel', image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop', note: '+156% CTR after creative pivot' },
      { title: 'Offer + message testing', image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop', note: 'MER stabilized in 3 weeks' },
      { title: 'CRO & personalization', image: 'https://images.unsplash.com/photo-1723202594698-417247952a2c?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxSZWJ1aWx0JTIwdGhlJTIwZnVubmVsfGVufDB8MHx8fDE3NjI5OTc5MDl8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', note: 'AOV +14%' },
    ],
    results: [
      { label: 'ROAS', value: '473%' },
      { label: 'Added Revenue', value: '$2.3M' },
      { label: 'CAC', value: '−34%' },
      { label: 'Payback', value: '8 Weeks' },
    ]
  },
}

export default function CaseStudy(){
  const { slug } = useParams()
  const cs = data[slug] || data['maison-v']

  return (
    <main className="pt-24 bg-cream texture-cream text-chocolate">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="text-sage text-sm tracking-widest mb-3">Work · {cs.client}</div>
      </div>
      <section className="relative">
        <img src={cs.hero} alt={cs.client} className="w-full max-h-[70vh] object-cover"/>
        <div className="max-w-5xl mx-auto px-6 lg:px-10 -mt-16 relative z-10">
          <div className="bg-cream/95 backdrop-blur shadow-elevate-lg p-8 rounded-sm border border-sage/30">
            <div className="text-sage uppercase text-xs tracking-widest">{cs.client}</div>
            <h1 className="font-serif text-4xl mt-1">{cs.title}</h1>
            <div className="text-cherry font-serif mt-2">Key Metric: 473% ROAS</div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="font-serif text-2xl uppercase mb-4">The Challenge</h2>
        <p className="text-chocolate/80 leading-relaxed">{cs.challenge}</p>
        <blockquote className="italic font-serif text-xl text-chocolate/80 border-l-4 border-cherry pl-5 mt-6">“We needed partners who respected our brand while pushing performance.”</blockquote>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-8">
        <h2 className="font-serif text-2xl uppercase mb-6">Our Approach</h2>
        <div className="space-y-14">
          {cs.approach.map((a,i)=> (
            <div key={i} className={`grid md:grid-cols-12 gap-8 items-center ${i%2? '' : ''}`}>
              <div className={i%2? 'md:col-span-5 order-2 md:order-1' : 'md:col-span-5'}>
                <h3 className="font-serif text-xl">{a.title}</h3>
                <p className="text-chocolate/80 mt-2">Specific channel tests, creative angles, and optimization loops were designed to isolate signal quickly.</p>
                <div className="text-cherry mt-3 font-serif">{a.note}</div>
              </div>
              <div className={i%2? 'md:col-span-7 order-1 md:order-2' : 'md:col-span-7'}>
                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-elevate-lg">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-chocolate texture-chocolate text-cream py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <h2 className="font-serif text-2xl uppercase mb-8">The Results</h2>
          <div className="grid md:grid-cols-4 gap-8 items-start">
            {cs.results.map(r=> (
              <div key={r.label} className="text-center">
                <div className="text-5xl font-serif">{r.value}</div>
                <div className="text-sage mt-2">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="bg-cream border border-sage/40 rounded-sm p-8 shadow-elevate">
            <div className="font-script text-sage text-3xl">“Best partners we’ve had.”</div>
            <div className="text-sage/80 text-sm">— Marcus V., CEO, Maison V.</div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sage uppercase text-xs tracking-widest">Next Project</div>
            <Link to="/work/atlas-beauty" className="font-serif text-2xl underline-cherry">Atlas Beauty</Link>
          </div>
          <Link to="/contact" className="bg-cherry text-cream px-6 py-3 rounded-sm hover:shadow-elevate-md">Book Your Strategy Call</Link>
        </div>
      </section>
    </main>
  )
}
