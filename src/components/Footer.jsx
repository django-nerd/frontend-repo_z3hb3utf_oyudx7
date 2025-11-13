import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

export default function Footer(){
  return (
    <footer className="bg-chocolate texture-chocolate text-cream mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-serif uppercase tracking-[0.25em]">Running With Strategy</div>
          <div className="font-script text-sage text-2xl mt-3">old money, modern growth</div>
          <p className="text-sage/80 mt-3 max-w-sm">We blend editorial taste with data-first systems to scale brands with intention.</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="text-sage/80 uppercase text-xs tracking-widest mb-4">Services</div>
            <ul className="space-y-2 text-sage">
              <li><Link to="/services/paid-media" className="hover:text-cherry">Paid Media</Link></li>
              <li><Link to="/services/content-creative" className="hover:text-cherry">Content & Creative</Link></li>
              <li><Link to="/services/ai-optimization" className="hover:text-cherry">AI Optimization</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-sage/80 uppercase text-xs tracking-widest mb-4">Company</div>
            <ul className="space-y-2 text-sage">
              <li><Link to="/work" className="hover:text-cherry">Work</Link></li>
              <li><Link to="/insights" className="hover:text-cherry">Insights</Link></li>
              <li><Link to="/about" className="hover:text-cherry">About</Link></li>
              <li><Link to="/contact" className="hover:text-cherry">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div>
          <div className="font-serif text-lg">Stay Sharp</div>
          <form className="mt-4 flex gap-3" onSubmit={(e)=>e.preventDefault()}>
            <input type="email" required placeholder="Your email" className="flex-1 bg-transparent border border-sage/40 rounded-sm px-4 py-3 text-cream placeholder:text-sage/60 focus:outline-none focus:border-cherry"/>
            <button className="bg-cherry text-cream px-5 rounded-sm hover:shadow-elevate-md">Subscribe</button>
          </form>
          <div className="flex items-center gap-4 mt-5 text-sage">
            <a className="hover:text-cherry" aria-label="Facebook"><Facebook size={18}/></a>
            <a className="hover:text-cherry" aria-label="Twitter"><Twitter size={18}/></a>
            <a className="hover:text-cherry" aria-label="LinkedIn"><Linkedin size={18}/></a>
            <a className="hover:text-cherry" aria-label="Instagram"><Instagram size={18}/></a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between text-cream/80 text-sm">
          <div>© {new Date().getFullYear()} Running with Strategy. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-cherry">Privacy</Link>
            <Link to="/terms" className="hover:text-cherry">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
