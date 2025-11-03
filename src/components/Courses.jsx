import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../translations/translations'
import { getCourses } from '../lib/supabase'

const Courses = () => {
  const { language } = useLanguage()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses(language)
        setCourses(data)
      } catch (error) {
        console.error('Error loading courses:', error)
        // Fallback to default data if Supabase fails
        setCourses([
          {
            id: '1',
            title: "Build a full stack Next.js app with Cursor",
            description: "Build a full-stack blog publishing platform using Cursor 2.0 and learn to integrate tools like Supabase, Stripe, Resend, AI SDK and Vercel",
            cover_image_url: "https://yehamphespdhvghjwgwc.supabase.co/storage/v1/object/public/public/bootcamps/admin/kC-BjE1p_npJENF5RwO3H.avif",
            release_date: "2025-12-01",
            slug: "build-a-full-stack-app-with-nextjs-and-cursor",
            tools: ["Next.js", "Supabase", "Stripe", "Resend", "Cursor", "AI SDK"]
          },
          {
            id: '2',
            title: "Build a React Native mobile app with Cursor",
            description: "Build a React Native mobile app using Cursor 2.0 and learn to integrate tools like Expo, Supabase, Resend, OpenAI and RevenueCat",
            cover_image_url: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/bootcamps/admin/LLJsw9gUTu-KhSMWNnwyi.avif",
            release_date: "2025-12-14",
            slug: "build-a-react-native-mobile-app-with-cursor",
            tools: ["Cursor", "Expo", "RevenueCat", "Supabase", "AI SDK", "Loops"]
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [language])

  if (loading) {
    return (
      <section className="pt-24 pb-32 bg-background dark:bg-background border-b dark:border-gray-800">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-gray-600 dark:text-gray-400">{t(language, 'common.loading')}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-24 pb-32 bg-background dark:bg-background border-b dark:border-gray-800">
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16 max-w-[576px] mx-auto">
          <div className="flex justify-center mb-3">
            <div className="rounded-full text-xs font-semibold transition-colors text-foreground px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
              {t(language, 'courses.badge')}
            </div>
          </div>
          <h2 className="max-w-[640px] mx-auto mb-6 text-4xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {t(language, 'courses.title')}
          </h2>
          <p className="text-[20px] text-[#0f0f0f] dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {t(language, 'courses.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8">
          {courses.map((course) => {
            // 날짜 포맷팅 함수
            const formatDate = (dateString) => {
              if (!dateString) return "December 2025"
              const date = new Date(dateString)
              const month = date.toLocaleString('en-US', { month: 'long' })
              const year = date.getFullYear()
              return `${month} ${year}`
            }

            // tools가 배열이면 그대로, JSON 문자열이면 파싱
            const courseTools = Array.isArray(course.tools) 
              ? course.tools 
              : (typeof course.tools === 'string' ? JSON.parse(course.tools) : [])

            return (
              <Link key={course.id} to={`/courses/${course.slug}`} className="w-full">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 relative border dark:border-transparent cursor-pointer h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                    <img
                      src={course.cover_image_url}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col">
                    <div className="space-y-3 pt-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-[#0f0f0f] dark:text-white">
                          {course.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center text-[14px] text-[#626262] dark:text-gray-400 font-medium">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-1 mr-2">
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
                            className="w-3 h-3 text-gray-500 dark:text-gray-400"
                          >
                            <path d="M8 2v4"></path>
                            <path d="M16 2v4"></path>
                            <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                            <path d="M3 10h18"></path>
                          </svg>
                        </div>
                        <span>Released {formatDate(course.release_date)}</span>
                      </div>
                      
                      <div className="text-[16px] text-[#626262] dark:text-gray-400">
                        {course.description}
                      </div>
                    </div>
                    
                    <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex gap-2">
                        <div
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border hover:text-accent-foreground h-11 rounded-full px-6 py-2 text-base font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          View
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex items-center gap-1 relative z-20">
                          {courseTools.slice(0, 6).map((tool, index) => (
                            <div
                              key={index}
                              className="relative flex-shrink-0 rounded-full bg-white p-1 border border-gray-100 dark:border-gray-800 dark:bg-gray-800 h-8 w-8"
                              style={{ marginLeft: index > 0 ? '-1.0rem' : 0, zIndex: 10 - index }}
                              title={tool}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                  {tool.charAt(0)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Courses
