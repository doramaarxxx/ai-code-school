import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../translations/translations'

const Footer = () => {
  const { language } = useLanguage()
  
  return (
    <div className="relative w-full bg-white dark:bg-background border-t dark:border-gray-800">
      <footer className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight mb-4 text-gray-900 dark:text-white">
              {t(language, "footer.title")}
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300">
              {t(language, "footer.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-1">
              <a className="flex items-center" href="/">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">AICode School</span>
              </a>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                {t(language, "footer.rights")}
              </p>
            </div>

            <div className="col-span-1">
              <h3 className="font-medium text-lg mb-4 text-foreground dark:text-white">{t(language, "footer.courses")}</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-sm text-gray-800 dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors block w-full"
                    href="/courses/build-a-full-stack-app-with-nextjs-and-cursor"
                  >
                    Next.js app with Cursor
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-800 dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors block w-full"
                    href="/courses/build-a-react-native-mobile-app-with-cursor"
                  >
                    React Native mobile app with cursor
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="font-medium text-lg mb-4 text-foreground dark:text-white">{t(language, "footer.company")}</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-sm text-gray-800 dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors block w-full"
                    href="/contact"
                  >
                    {t(language, "footer.contact")}
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-800 dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors block w-full"
                    href="/legal?tab=terms"
                  >
                    {t(language, "footer.terms")}
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-gray-800 dark:text-gray-400 hover:text-foreground dark:hover:text-white transition-colors block w-full"
                    href="/legal?tab=privacy"
                  >
                    {t(language, "footer.privacy")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
