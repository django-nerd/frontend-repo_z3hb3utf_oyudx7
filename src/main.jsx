import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import './index.css'

import SiteLayout from './layouts/SiteLayout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Work from './pages/Work'
import CaseStudy from './pages/CaseStudy'
import Insights from './pages/Insights'
import Article from './pages/Article'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'

function ServiceDetailRoute(){
  const { slug } = useParams()
  return <ServiceDetail slug={slug} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SiteLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetailRoute />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<Article />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </SiteLayout>
    </BrowserRouter>
  </React.StrictMode>,
)
