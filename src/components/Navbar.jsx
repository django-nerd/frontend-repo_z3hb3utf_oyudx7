import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

function classNames(...c){return c.filter(Boolean).join(' ')}

export default function Navbar(){
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(()=>{
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])

  useEffect(()=>{
    if(mobileOpen){
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },[mobileOpen])

  const linkClass = ({isActive}) => classNames(
    'px-3 py-2 text-sm tracking-wide transition-colors relative',
    isActive ? 'text-cherry' : 'text-chocolate',
    'group'
  )

  const Underline = () => (
    <span className="absolute left-3 -bottom-0.5 h-[1px] w-0 bg-cherry transition-all duration-300 group-hover:w-[60%]" />
  )

  return (
    <nav className={classNames(
      'fixed top-0 inset-x-0 z-50 backdrop-blur-sm transition-all',
      scrolled ? 'bg-cream/95 shadow-elevate-sm' : 'bg-cream/80'
    )}>
      <div className="border-b border-sage/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="font-serif text-chocolate uppercase tracking-[0.25em] text-sm">Running With Strategy</Link>
          <div className="hidden md:flex items-center gap-2">
            {/* Services dropdown */}
            <div className="relative" onMouseLeave={()=>setServicesOpen(false)} onMouseEnter={()=>setServicesOpen(true)}>
              <NavLink to="/services" className={linkClass}>
                <span className="inline-flex items-center gap-1">Services <ChevronDown size={16} className="opacity-70"/></span>
                <Underline />
              </NavLink>
              {servicesOpen && (
                <div className="absolute left-0 top-full mt-2 w-64 bg-cream shadow-elevate rounded-sm p-3 border border-sage/30">
                  <div className="flex flex-col">
                    <Link to="/services/paid-media" className="px-3 py-2 rounded-sm hover:bg-sage/10 text-chocolate">Paid Media</Link>
                    <Link to="/services/content-creative" className="px-3 py-2 rounded-sm hover:bg-sage/10 text-chocolate">Content & Creative</Link>
                    <Link to="/services/ai-optimization" className="px-3 py-2 rounded-sm hover:bg-sage/10 text-chocolate">AI Optimization</Link>
                    <Link to="/services" className="px-3 py-2 rounded-sm text-cherry hover:underline mt-1">View All Services</Link>
                  </div>
                </div>
              )}
            </div>
            <NavLink to="/work" className={linkClass}>
              Work
              <Underline />
            </NavLink>
            <NavLink to="/insights" className={linkClass}>
              Insights
              <Underline />
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About
              <Underline />
            </NavLink>
            <Link to="/contact" className="ml-2 inline-flex items-center bg-cherry text-cream text-sm px-4 py-2 rounded-sm hover:shadow-elevate-md transition-all">Contact</Link>
          </div>
          <button className="md:hidden p-2" onClick={()=>setMobileOpen(true)} aria-label="Open Menu">
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-cream z-50">
          <div className="h-16 flex items-center justify-between px-6 border-b border-sage/20">
            <Link to="/" onClick={()=>setMobileOpen(false)} className="font-serif text-chocolate uppercase tracking-[0.25em] text-sm">Running With Strategy</Link>
            <button className="p-2" onClick={()=>setMobileOpen(false)} aria-label="Close Menu"><X/></button>
          </div>
          <div className="pt-10 px-6 flex flex-col items-center gap-6 text-xl">
            <Link to="/services" onClick={()=>setMobileOpen(false)} className="text-chocolate hover:text-cherry">Services</Link>
            <Link to="/work" onClick={()=>setMobileOpen(false)} className="text-chocolate hover:text-cherry">Work</Link>
            <Link to="/insights" onClick={()=>setMobileOpen(false)} className="text-chocolate hover:text-cherry">Insights</Link>
            <Link to="/about" onClick={()=>setMobileOpen(false)} className="text-chocolate hover:text-cherry">About</Link>
            <Link to="/contact" onClick={()=>setMobileOpen(false)} className="inline-flex items-center bg-cherry text-cream px-5 py-3 rounded-sm hover:shadow-elevate-md">Contact</Link>
          </div>
        </div>
      )}
      <div className="h-px w-full bg-sage/20" />
    </nav>
  )
}
