import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop'
import CookieBanner from '../components/CookieBanner'

export default function SiteLayout({ children }){
  return (
    <div className="min-h-screen bg-cream text-chocolate texture-cream">
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
      <Footer />
      <ScrollTop />
      <CookieBanner />
    </div>
  )
}
