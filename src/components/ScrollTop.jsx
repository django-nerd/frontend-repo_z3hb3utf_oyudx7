import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollTop(){
  const [show, setShow] = useState(false)
  useEffect(()=>{
    const onScroll = ()=> setShow(window.scrollY > 500)
    onScroll();
    window.addEventListener('scroll', onScroll)
    return ()=> window.removeEventListener('scroll', onScroll)
  },[])
  if(!show) return null
  return (
    <button onClick={()=> window.scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-cream text-cherry shadow-elevate-md hover:shadow-elevate-lg flex items-center justify-center z-40" aria-label="Scroll to top">
      <ArrowUp size={18}/>
    </button>
  )
}
