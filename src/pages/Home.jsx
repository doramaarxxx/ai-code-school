import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Courses from '../components/Courses'
import Testimonials from '../components/Testimonials'
import Features from '../components/Features'
import Community from '../components/Community'
import Blog from '../components/Blog'
import Tools from '../components/Tools'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Courses />
        <Testimonials />
        <Features />
        <Community />
        <Blog />
        <Tools />
        <FAQ />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="h-px bg-border my-8" aria-hidden="true"></div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Home

