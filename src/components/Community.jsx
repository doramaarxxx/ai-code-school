import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../translations/translations'

const Community = () => {
  const { language } = useLanguage()
  
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
        </svg>
      ),
      titleKey: "community.discussionsTitle",
      descKey: "community.discussionsDesc"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
      ),
      titleKey: "community.liveSessionsTitle",
      descKey: "community.liveSessionsDesc"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <path d="M12 17h.01"></path>
        </svg>
      ),
      titleKey: "community.supportTitle",
      descKey: "community.supportDesc"
    }
  ]

  return (
    <section id="community-section" className="py-32 bg-white dark:bg-background border-b dark:border-gray-800">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex justify-center mb-3 px-4">
          <div className="inline-flex items-center rounded-full text-xs font-semibold transition-colors text-foreground px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            {t(language, "community.badge")}
          </div>
        </div>
        <h2 className="max-w-[640px] mx-auto mb-6 text-4xl lg:text-6xl font-semibold tracking-tight text-center text-gray-900 dark:text-white px-4">
          {t(language, "community.title")}
        </h2>
        <p className="text-[20px] text-[#0f0f0f] dark:text-gray-300 mb-16 max-w-[576px] mx-auto text-center px-4">
          {t(language, "community.subtitle")}
        </p>
        
        <div className="grid gap-8 px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:p-6">
                  <div className="flex items-center mb-6 px-4 sm:px-0 pt-4 sm:pt-0">
                    <div className="h-10 w-10 flex items-center justify-center border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 shadow-sm text-gray-700 dark:text-gray-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="p-4 sm:p-0">
                    <h3 className="text-2xl font-medium mb-2 text-gray-900 dark:text-white">
                      {t(language, feature.titleKey)}
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {t(language, feature.descKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <div className="relative w-[350px] h-[350px] md:w-[600px] md:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400 text-center px-4">
                Network visualization showing connected nodes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Community
