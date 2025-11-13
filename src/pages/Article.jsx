import React from 'react'
import { useParams, Link } from 'react-router-dom'

const mock = {
  'post-1': {
    title: 'Thought piece 1: Strategy, data, and growth',
    category: 'Paid Media',
    author: 'Team RWS',
    date: 'Mar 12, 2025',
    read: '9 min read',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop',
    body: Array.from({length:10}).map(()=> 'We move beyond channel tactics to design systems that compound. Strategy sets the constraints. Data gives the map. Creative drives the attention required for efficient growth.'),
  }
}

export default function Article(){
  const { slug } = useParams()
  const post = mock[slug] || mock['post-1']

  return (
    <main className="pt-24 bg-cream texture-cream text-chocolate">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
        <div className="text-sage text-sm tracking-widest mb-3">Insights · {post.category} · {post.title}</div>
        <h1 className="font-serif text-6xl uppercase leading-tight max-w-3xl">{post.title}</h1>
        <div className="text-sage mt-2">{post.author} · {post.date} · {post.read}</div>
      </div>
      <img src={post.image} alt={post.title} className="w-full max-h-[60vh] object-cover"/>
      <article className="max-w-5xl mx-auto px-6 lg:px-10 py-12 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-8">
          {post.body.map((p,i)=> (
            <p key={i} className="mb-6 text-[18px] leading-[1.7] max-w-[680px]">{p}</p>
          ))}
          <blockquote className="italic font-serif text-xl text-chocolate/80 border-l-4 border-cherry pl-5 my-8">“Focus on the system, not the spike.”</blockquote>
          <div className="bg-cream border border-sage/40 p-6 rounded-sm shadow-elevate max-w-[680px]">
            <div className="text-cherry font-serif">Stat highlight</div>
            <div className="text-chocolate/80">Teams that implement weekly creative testing cadence see +25–40% increase in win rate.</div>
          </div>
          <section className="mt-12 flex items-center gap-4">
            <img src="https://i.pravatar.cc/80" alt="Author" className="w-12 h-12 rounded-full"/>
            <div>
              <div className="font-serif">Team RWS</div>
              <div className="text-sage text-sm">We blend editorial taste with data-first systems.</div>
            </div>
          </section>
        </div>
        <aside className="md:col-span-4">
          <div className="bg-cream border border-sage/40 p-6 rounded-sm shadow-elevate">
            <div className="font-serif text-lg">Subscribe</div>
            <form className="mt-3 flex gap-2" onSubmit={(e)=>e.preventDefault()}>
              <input type="email" placeholder="Email" className="flex-1 border border-sage/40 rounded-sm px-3 py-2 focus:border-cherry outline-none"/>
              <button className="bg-cherry text-cream px-4 rounded-sm">Join</button>
            </form>
          </div>
          <div className="mt-6">
            <div className="font-serif text-lg mb-3">Popular Posts</div>
            {[1,2,3].map(n=> (
              <Link key={n} to={`/insights/post-${n}`} className="block bg-cream border border-sage/40 p-4 rounded-sm shadow-elevate hover:shadow-elevate-md mb-3">Thought piece {n}</Link>
            ))}
          </div>
        </aside>
      </article>
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-12">
        <div className="font-serif text-2xl mb-4">Related Articles</div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map(n=> (
            <Link key={n} to={`/insights/post-${n}`} className="bg-cream border border-sage/40 p-6 rounded-sm shadow-elevate hover:shadow-elevate-md">Thought piece {n}</Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <div className="font-serif text-xl">Ready to apply these strategies?</div>
          <Link to="/contact" className="inline-flex mt-4 bg-cherry text-cream px-6 py-3 rounded-sm hover:shadow-elevate-md">Contact</Link>
        </div>
      </section>
    </main>
  )
}
