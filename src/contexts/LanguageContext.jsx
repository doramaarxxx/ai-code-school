import React, { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    // URL 파라미터에서 언어 확인
    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get('lang')
    
    // localStorage에서 저장된 언어 확인
    const savedLang = localStorage.getItem('language')
    
    // 우선순위: URL > localStorage > 기본값(en)
    const initialLang = urlLang || savedLang || 'en'
    
    if (initialLang === 'ko' || initialLang === 'en') {
      setLanguage(initialLang)
      localStorage.setItem('language', initialLang)
    }
  }, [])

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ko' : 'en'
    setLanguage(newLang)
    localStorage.setItem('language', newLang)
    
    // URL 파라미터 업데이트
    const url = new URL(window.location)
    url.searchParams.set('lang', newLang)
    window.history.pushState({}, '', url)
  }

  const changeLanguage = (lang) => {
    if (lang === 'ko' || lang === 'en') {
      setLanguage(lang)
      localStorage.setItem('language', lang)
      
      // URL 파라미터 업데이트
      const url = new URL(window.location)
      url.searchParams.set('lang', lang)
      window.history.pushState({}, '', url)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

