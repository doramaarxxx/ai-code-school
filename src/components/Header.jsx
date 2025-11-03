import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../translations/translations'
import CoachingModal from './CoachingModal'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [coachingModalOpen, setCoachingModalOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  const navItems = [
    { name: t(language, 'header.courses'), href: '/courses' },
    { name: t(language, 'header.blogs'), href: '/blogs' },
    { name: t(language, 'header.coaching'), href: '#', onClick: () => setCoachingModalOpen(true) },
    { name: t(language, 'header.contact'), href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-transparent bg-transparent transition-all duration-300 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex h-16 items-center">
          <Link className="mr-12 flex items-center gap-2" to="/">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">AICode School</span>
            <span className="sr-only">Home</span>
          </Link>
          
          <nav aria-label="Main" className="relative z-10 flex-1 items-center justify-center hidden md:flex">
            <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.onClick ? (
                    <button
                      className="group inline-flex h-9 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-base font-medium hover:font-semibold transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none"
                      onClick={item.onClick}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="group inline-flex h-9 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-base font-medium hover:font-semibold transition-colors hover:text-accent-foreground focus:text-accent-foreground focus:outline-none"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center space-x-4">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-900 dark:text-white"
              aria-label="Toggle language"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>{language === 'en' ? 'EN' : '한글'}</span>
            </button>

            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 w-10 md:hidden hover:bg-accent hover:text-accent-foreground"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={() => {
                    item.onClick()
                    setMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-4 py-2 text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-base font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>{language === 'en' ? 'English' : '한국어'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Coaching Modal */}
      <CoachingModal 
        isOpen={coachingModalOpen} 
        onClose={() => setCoachingModalOpen(false)} 
      />
    </header>
  )
}

export default Header
