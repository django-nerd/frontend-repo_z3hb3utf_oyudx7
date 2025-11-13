import React from 'react'
import { Link } from 'react-router-dom'

const cases = [
  { slug: 'maison-v', client: 'Maison V.', title: 'Scaling a heritage-inspired DTC brand', metric: '473% ROAS', image: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1600&auto=format&fit=crop', cat: ['Paid Media','E-commerce'] },
  { slug: 'atlas-beauty', client: 'Atlas Beauty', title: 'From plateau to profitable scale', metric: '$2.3M Revenue', image: 'https://images.unsplash.com/photo-1568738800568-a3a07688204d?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxTY2FsaW5nJTIwYSUyMGhlcml0YWdlLWluc3BpcmVkJTIwRFRDfGVufDB8MHx8fDE3NjI5OTc5MDh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80', cat: ['Content','B2C'] },
  { slug: 'field-forge', client: 'Field & Forge', title: 'Building a content engine that feeds paid', metric: '+156% CTR', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop', cat: ['Content','Paid Media'] },
  { slug: 'atelier-home', client: 'Atelier Home', title: 'CRO and personalization for luxury home', metric: 'CVR +28%', image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?q=80&w=1600&auto=format&fit=crop', cat: ['AI Optimization','B2C'] },
]

export default function Work(){
  const [active, setActive] = React.useState('All')
  const categories = ['All','Paid Media','Content','AI Optimization','E-commerce','B2B']
  const filtered = active==='All' ? cases : cases.filter(c=> c.cat.includes(active))

  return (
    <main className="pt-24 bg-cream texture-cream text-chocolate min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="mb-10">
          <div className="text-sage text-sm tracking-widest">Work · real growth stories</div>
          <h1 className="font-serif text-5xl uppercase">Work</h1>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat=> (
            <button key={cat} onClick={()=>setActive(cat)} className={active===cat ? 'bg-cherry text-cream px-4 py-2 rounded-full' : 'bg-cream border border-sage/40 text-chocolate px-4 py-2 rounded-full'}>{cat}</button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-x-[60px] gap-y-[80px]">
          {filtered.map(cs=> (
            <Link key={cs.slug} to={`/work/${cs.slug}`} className="group block bg-cream rounded-sm shadow-elevate hover:shadow-elevate-md overflow-hidden border border-sage/30">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={cs.image} alt={cs.client} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"/>
              </div>
              <div className="p-6">
                <div className="text-sage uppercase text-xs tracking-widest">{cs.client}</div>
                <div className="font-serif text-2xl mt-1">{cs.title}</div>
                <div className="text-cherry font-serif mt-2">{cs.metric}</div>
                <div className="mt-4 text-chocolate/80">Premium performance program across creative, paid, and CRO.</div>
                <div className="mt-4 text-cherry underline">View Case Study</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-24">
          <div className="font-serif text-2xl">Have a challenge to solve?</div>
          <Link to="/contact" className="inline-flex mt-4 bg-cherry text-cream px-6 py-3 rounded-sm hover:shadow-elevate-md">Contact Us</Link>
        </div>
      </div>
    </main>
  )
}
