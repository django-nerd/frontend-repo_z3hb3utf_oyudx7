import React from 'react'
import { Link } from 'react-router-dom'

const categories = ['All','Paid Media','Content Strategy','AI & Optimization','Industry Insights','Client Stories']

const posts = Array.from({length:9}).map((_,i)=> ({
  slug: `post-${i+1}`,
  title: `Thought piece ${i+1}: Strategy, data, and growth`,
  category: categories[(i% (categories.length-1))+1],
  excerpt: 'A practical framework for moving from channel tactics to system design.',
  author: 'Team RWS',
  date: 'Mar 12, 2025',
  read: `${8+i} min read`,
  image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop'
}))

export default function Insights(){
  const [active, setActive] = React.useState('All')
  const featured = posts[0]
  const filtered = active==='All' ? posts : posts.filter(p=> p.category===active)

  return (
    <main className="pt-24 bg-cream texture-cream text-chocolate">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="mb-8">
          <div className="text-sage text-sm tracking-widest">Insights · strategy, data, and growth</div>
          <h1 className="font-serif text-5xl uppercase">Insights</h1>
        </div>

        <section className="mb-12">
          <div className="bg-cream rounded-sm shadow-elevate-lg border border-sage/30 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover"/>
              <div className="p-8">
                <div className="inline-block px-3 py-1 rounded-full bg-sage/20 text-chocolate text-sm border border-sage/30">{featured.category}</div>
                <h2 className="font-serif text-3xl mt-3">{featured.title}</h2>
                <p className="text-chocolate/80 mt-3">{featured.excerpt}</p>
                <div className="text-sage text-sm mt-4">{featured.author} · {featured.date} · {featured.read}</div>
                <Link to={`/insights/${featured.slug}`} className="inline-block mt-5 text-cherry underline">Read Article</Link>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(cat=> (
            <button key={cat} onClick={()=>setActive(cat)} className={active===cat? 'bg-cherry text-cream px-4 py-2 rounded-full' : 'bg-cream border border-sage/40 text-chocolate px-4 py-2 rounded-full'}>{cat}</button>
          ))}
        </div>

        <section className="grid md:grid-cols-3 gap-8">
          {filtered.map(p=> (
            <Link key={p.slug} to={`/insights/${p.slug}`} className="group bg-cream rounded-sm shadow-elevate hover:shadow-elevate-md border border-sage/30 overflow-hidden">
              <img src={p.image} alt={p.title} loading="lazy" className="w-full aspect-[4/3] object-cover"/>
              <div className="p-6">
                <div className="inline-block px-2 py-1 rounded-full bg-sage/20 text-chocolate text-xs border border-sage/30">{p.category}</div>
                <div className="font-serif text-xl mt-2">{p.title}</div>
                <div className="text-chocolate/80 line-clamp-2 mt-1">{p.excerpt}</div>
                <div className="text-sage text-sm mt-2">{p.author} · {p.date} · {p.read}</div>
              </div>
            </Link>
          ))}
        </section>

        <div className="flex items-center justify-center gap-2 mt-12">
          {[1,2,3,4].map(n=> (
            <button key={n} className={n===1? 'w-8 h-8 rounded bg-cherry text-cream' : 'w-8 h-8 rounded border border-sage/40 text-chocolate'}>{n}</button>
          ))}
        </div>
      </div>
    </main>
  )
}
