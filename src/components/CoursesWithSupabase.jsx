import React, { useEffect, useState } from 'react'
import { getCourses } from '../lib/supabase'

const CoursesWithSupabase = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getCourses()
        setCourses(data)
      } catch (error) {
        console.error('Error loading courses:', error)
        // Fallback to default data if Supabase fails
        setCourses([
          {
            id: 1,
            title: "Build a full stack Next.js app with Cursor",
            description: "Build a full-stack blog publishing platform using Cursor 2.0",
            image: "https://yehamphespdhvghjwgwc.supabase.co/storage/v1/object/public/public/bootcamps/admin/kC-BjE1p_npJENF5RwO3H.avif",
            release_date: "December 2025",
            slug: "build-a-full-stack-app-with-nextjs-and-cursor",
            tools: ["Next.js", "Supabase", "Stripe"]
          }
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) {
    return (
      <section className="pt-24 pb-32 bg-background dark:bg-background border-b dark:border-gray-800">
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading courses...</p>
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
              Featured Courses
            </div>
          </div>
          <h2 className="max-w-[640px] mx-auto mb-6 text-4xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Comprehensive courses for all levels
          </h2>
          <p className="text-[20px] text-[#0f0f0f] dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Expert-led, project-based learning to build real-world skills.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pb-8">
          {courses.map((course) => (
            <div key={course.id} className="w-full">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 relative border dark:border-transparent cursor-pointer h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
                  <img
                    src={course.cover_image_url || course.image}
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
                      <span>Released {course.release_date || course.releaseDate}</span>
                    </div>
                    
                    <div className="text-[16px] text-[#626262] dark:text-gray-400">
                      {course.description}
                    </div>
                  </div>
                  
                  <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                      <a
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border hover:text-accent-foreground h-11 rounded-full px-6 py-2 text-base font-medium bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                        href={`/courses/${course.slug}`}
                      >
                        View
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CoursesWithSupabase
