import React from 'react'
import FluidGradient from './FluidGradient'

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FluidGradient />
        <div className="absolute inset-0 bg-[url('/Hyunjun-Park-hero.jpg')] bg-cover bg-center opacity-30"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full p-4 sm:p-6 md:p-8 lg:p-12" style={{ paddingBottom: '2rem' }}>
        <div className="flex flex-col items-center sm:items-start gap-4 w-full">
          <div className="flex flex-col w-full items-center sm:items-start gap-6 text-center sm:text-left mb-4">
            <div className="flex flex-col gap-4 w-full pt-2">
              <div className="flex justify-center sm:justify-start mb-3">
                <div
                  className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full inline-flex items-center gap-1.5"
                  style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 text-white"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span className="text-xs text-white font-medium">Community learning</span>
                </div>
              </div>
              
              <h1 className="text-[3.75rem] font-medium tracking-tight text-white md:text-[5rem] lg:text-[7rem] leading-[1.02] text-center sm:text-left max-w-[1000px] w-full">
                Learn the future of coding, with ai
              </h1>
              
              <p className="text-xl text-white/90 text-center sm:text-left mb-6 max-w-[600px] mx-auto sm:mx-0">
                Courses, guides, workshops and a thriving community to help you on your AI coding journey
              </p>
              
              <div className="flex w-full justify-center sm:justify-start gap-5">
                <a
                  href="/courses"
                  className="w-full sm:w-auto"
                  style={{ textDecoration: 'none' }}
                >
                  <button
                    className="group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 text-white bg-black/50 backdrop-blur-sm rounded-full transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px w-full sm:w-auto px-8 py-3 text-base font-medium hover:bg-black/70"
                  >
                    <span className="text-white relative z-10">Explore Courses</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
