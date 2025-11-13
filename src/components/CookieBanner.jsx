import React, { useEffect, useState } from 'react'

export default function CookieBanner(){
  const [open, setOpen] = useState(false)
  useEffect(()=>{
    const accepted = localStorage.getItem('cookies-accepted')
    if(!accepted) setTimeout(()=> setOpen(true), 500)
  },[])
  if(!open) return null
  return (
    <div className="fixed bottom-0 inset-x-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 mb-6 bg-cream border border-sage/40 shadow-elevate rounded-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="text-chocolate/90">We use cookies to improve your experience. Manage preferences anytime.</div>
        <div className="flex items-center gap-3">
          <button onClick={()=> setOpen(false)} className="text-chocolate underline">Customize</button>
          <button onClick={()=> { localStorage.setItem('cookies-accepted','1'); setOpen(false)}} className="bg-cherry text-cream px-4 py-2 rounded-sm hover:shadow-elevate-md">Accept</button>
        </div>
      </div>
    </div>
  )
}
