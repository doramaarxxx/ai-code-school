import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getCourseBySlug } from '../lib/supabase'

function CourseDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openSections, setOpenSections] = useState({})

  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await getCourseBySlug(slug)
        if (data) {
          setCourse(data)
        } else {
          // Fallback data
          const fallbackCourses = {
            'build-a-full-stack-app-with-nextjs-and-cursor': {
              id: '1',
              title: "Build a full stack Next.js app with Cursor",
              description: "Build a full-stack blog publishing platform using Cursor 2.0 and learn to integrate tools like Supabase, Stripe, Resend, AI SDK and Vercel",
              cover_image_url: "https://yehamphespdhvghjwgwc.supabase.co/storage/v1/object/public/public/bootcamps/admin/kC-BjE1p_npJENF5RwO3H.avif",
              release_date: "2025-12-01",
              slug: "build-a-full-stack-app-with-nextjs-and-cursor",
              difficulty: "Beginner",
              tools: ["Next.js", "Supabase", "Stripe", "Resend", "Cursor", "AI SDK"],
              about: "You'll learn a step-by-step, in-depth approach to building a feature-rich blog publishing platform that look great on both web and mobile. Each section of the course focuses on a core component of app building—including design, authentication, UX, databases, payments, emails, and AI integrations. We'll pay special attention to UX design to ensure your app provides a smooth user experience.\n\nThe core idea of this course is to teach you the full end to end process of building a full stack app, so that you can leverage what you learn, to build any app of your choice. It follow professional developer practises, including how to work with version control using Git and Github.\n\nNo prior coding experience is needed—this course is designed for those of you who want to learn full stack mobile development using Cursor. The knowledge in this course is transferred to Windsurf, Cline or any AI powered IDE of your choice.",
              what_youll_learn: [
                "Creating consistent responsive designs",
                "Authentication, data, storage and edge functions with Supabase",
                "Setting up transactional emails with Resend",
                "Setting up payments with Stripe",
                "Building an admin dashboard",
                "Deploying to live customers",
                "Building a blog publishing platform with Cursor",
                "Integrating AI functionality with AI SDK"
              ]
            },
            'build-a-react-native-mobile-app-with-cursor': {
              id: '2',
              title: "Build a React Native mobile app with Cursor",
              description: "Build a React Native mobile app using Cursor 2.0 and learn to integrate tools like Expo, Supabase, Resend, OpenAI and RevenueCat",
              cover_image_url: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/bootcamps/admin/LLJsw9gUTu-KhSMWNnwyi.avif",
              release_date: "2025-12-14",
              slug: "build-a-react-native-mobile-app-with-cursor",
              difficulty: "Beginner",
              tools: ["Cursor", "Expo", "RevenueCat", "Supabase", "AI SDK", "Loops"],
              about: "Learn to build a React Native mobile app using Cursor 2.0 and integrate modern tools and services.",
              what_youll_learn: [
                "Building React Native apps with Expo",
                "Integrating Supabase for backend",
                "Using RevenueCat for subscriptions",
                "AI integrations with OpenAI"
              ]
            }
          }
          const fallback = fallbackCourses[slug]
          if (fallback) {
            setCourse(fallback)
          }
        }
      } catch (error) {
        console.error('Error loading course:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-[1280px] mx-auto py-10 px-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading course...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-[1280px] mx-auto py-10 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Course not found</h1>
            <Link to="/" className="text-primary hover:underline">Return to home</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return "December 2025"
    const date = new Date(dateString)
    const month = date.toLocaleString('en-US', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  // 도구 데이터 처리 - DB에서 가져온 객체 배열 또는 fallback
  const courseTools = course.tools && Array.isArray(course.tools) && course.tools.length > 0 && typeof course.tools[0] === 'object'
    ? course.tools
    : (Array.isArray(course.tools) 
      ? course.tools.map(name => ({ name, description: '', icon_url: '' }))
      : (typeof course.tools === 'string' ? JSON.parse(course.tools).map(name => ({ name, description: '', icon_url: '' })) : []))

  const whatYoullLearn = Array.isArray(course.what_youll_learn) 
    ? course.what_youll_learn 
    : (typeof course.what_youll_learn === 'string' ? JSON.parse(course.what_youll_learn) : [])

  // 전체 레슨 수 및 총 시간 계산
  const sections = course.sections || []
  const totalLessons = sections.reduce((sum, section) => sum + (section.course_lessons?.length || 0), 0)
  const totalDuration = sections.reduce((sum, section) => {
    const lessonDuration = (section.course_lessons || []).reduce((s, lesson) => s + (lesson.duration || 0), 0)
    return sum + lessonDuration
  }, 0)
  
  const formatDuration = (minutes) => {
    if (!minutes) return '0 min'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0 && mins > 0) return `${hours} hr ${mins} min`
    if (hours > 0) return `${hours} hr`
    return `${mins} min`
  }

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="max-w-[1280px] mx-auto bg-background dark:bg-background md:px-4 sm:px-0">
          <div className="container relative flex gap-8 py-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 bg-background">
            <div className="w-full max-w-3xl space-y-8 lg:pr-8">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb" className="mb-6">
                <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                  <li className="inline-flex items-center gap-1.5">
                    <Link to="/" className="transition-colors hover:text-foreground">Home</Link>
                  </li>
                  <li role="presentation" aria-hidden="true" className="[&>svg]:w-3.5 [&>svg]:h-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Link to="/" className="transition-colors hover:text-foreground">Courses</Link>
                  </li>
                  <li role="presentation" aria-hidden="true" className="[&>svg]:w-3.5 [&>svg]:h-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <span className="text-muted-foreground">{course.title}</span>
                  </li>
                </ol>
              </nav>

              {/* Course Title */}
              <h1 className="text-[3rem] leading-[1.1] font-semibold tracking-tight lg:text-6xl mb-4 text-gray-900 dark:text-white">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                {course.description}
              </p>

              {/* Course Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="py-5 pr-4 md:border-r border-gray-200/80 dark:border-gray-600">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1 text-center">LAUNCH DATE</p>
                  <p className="text-base font-medium text-center">{formatDate(course.release_date)}</p>
                </div>
                <div className="py-5 px-4 md:border-r border-gray-200/80 dark:border-gray-600">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1 text-center">LESSONS</p>
                  <p className="text-base font-medium text-center">{totalLessons || '-'}</p>
                </div>
                <div className="py-5 px-4 md:border-r border-gray-200/80 dark:border-gray-600">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1 text-center">DIFFICULTY</p>
                  <p className="text-base font-medium text-center">{course.difficulty || 'Beginner'}</p>
                </div>
                <div className="py-5 px-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1 text-center">DURATION</p>
                  <p className="text-base font-medium text-center">{totalDuration > 0 ? formatDuration(totalDuration) : 'Self-paced'}</p>
                </div>
              </div>

              {/* Course Image */}
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden mt-8">
                <div className="aspect-[3/2] w-full">
                  <img 
                    src={course.cover_image_url} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* About This Course */}
              {course.about && (
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-xl font-semibold leading-none tracking-tight">About This Course</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                      {course.about}
                    </p>
                  </div>
                </div>
              )}

              {/* What You'll Learn */}
              {whatYoullLearn.length > 0 && (
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <h3 className="text-xl font-semibold leading-none tracking-tight">What You'll Learn</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-1 gap-4">
                      {whatYoullLearn.map((item, index) => (
                        <div key={index} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big w-5 h-5 text-primary mr-2 flex-shrink-0 mt-0.5">
                            <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                            <path d="m9 11 3 3L22 4"></path>
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Course Content */}
              {sections.length > 0 && (
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6 pb-2">
                    <h3 className="text-xl font-semibold leading-none tracking-tight">Course Content</h3>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="text-sm text-muted-foreground mb-2">
                      <span className="hidden sm:inline">{sections.length} sections • {totalLessons} lessons • {formatDuration(totalDuration)} total</span>
                      <span className="sm:hidden">{sections.length} sections • {formatDuration(totalDuration)}</span>
                    </div>
                    <div className="w-full space-y-0">
                      {sections.map((section) => {
                        const isOpen = openSections[section.id]
                        const lessons = section.course_lessons || []
                        return (
                          <div key={section.id} className="border-b border-none">
                            <button
                              type="button"
                              className="flex flex-1 items-center justify-between font-medium transition-all hover:no-underline py-2 w-full text-left"
                              onClick={() => toggleSection(section.id)}
                            >
                              <div className="w-full flex items-center justify-between pr-4">
                                <div className="text-left font-medium">{section.title}</div>
                                <div className="text-sm text-muted-foreground hidden sm:block">
                                  {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
                                </div>
                              </div>
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
                                className={`lucide lucide-chevron-down h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                              >
                                <path d="m6 9 6 6 6-6"></path>
                              </svg>
                            </button>
                            <div
                              className={`overflow-hidden text-sm transition-all ${
                                isOpen ? 'max-h-[2000px] pb-4' : 'max-h-0'
                              }`}
                            >
                              {lessons.length > 0 && (
                                <div className="space-y-2 pt-2 pl-4">
                                  {lessons.map((lesson) => (
                                    <div key={lesson.id} className="flex items-center justify-between text-gray-700 dark:text-gray-300">
                                      <span>{lesson.title}</span>
                                      {lesson.duration && (
                                        <span className="text-sm text-muted-foreground ml-4">{lesson.duration} min</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Tools You'll Learn */}
              {courseTools.length > 0 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Tools You'll Learn</h2>
                    <p className="text-muted-foreground">Master these cutting-edge tools and technologies during the course.</p>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {courseTools.map((tool, index) => (
                      <div key={tool.id || index} className="rounded-lg border text-card-foreground shadow-sm overflow-hidden bg-white dark:bg-gray-800">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
                            <div className="relative h-12 w-12 ml-0 flex-shrink-0 rounded-full bg-white dark:bg-gray-700 p-2 shadow-sm overflow-hidden border border-gray-100 dark:border-gray-600 flex items-center justify-center">
                              {tool.icon_url ? (
                                <img
                                  src={tool.icon_url}
                                  alt={tool.name}
                                  className="object-contain rounded-full w-full h-full"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-full h-full">
                                  <span className="text-xl font-medium text-gray-600 dark:text-gray-300">
                                    {tool.name.charAt(0)}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="text-left">
                              <h3 className="font-medium dark:text-white">{tool.name}</h3>
                              {tool.description && (
                                <p className="text-base text-gray-800 dark:text-gray-300 mt-1">{tool.description}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Checkout Summary */}
            <div className="hidden lg:block sticky top-[88px] h-fit bg-background w-[380px]">
              <div className="text-card-foreground h-auto w-full rounded-lg border border-border bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 bg-white dark:bg-gray-800">
                  <div className="w-full space-y-6">
                    <div className="space-y-4">
                      <div className="pb-0">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold tracking-tight dark:text-white mb-0">Checkout Summary</h2>
                        </div>
                      </div>
                      <div className="shrink-0 bg-border h-[1px] w-full my-4"></div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium text-gray-900 dark:text-white">Price</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">$199.00</span>
                              <span className="text-2xl font-bold text-gray-900 dark:text-white">$99.50</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Launch date</span>
                            <span>{formatDate(course.release_date)}</span>
                          </div>
                        </div>
                        <div>
                          <div className="space-y-4">
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full relative overflow-hidden group" disabled>
                              <span className="relative z-10">Coming Soon</span>
                            </button>
                            <p className="text-xs text-center text-muted-foreground">Refund within 48hrs. No questions asked.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                    <div className="w-full space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-normal dark:text-white mb-4">Your course includes</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor-play h-5 w-5 shrink-0 mt-0.5 text-primary">
                              <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"></path>
                              <path d="M12 17v4"></path>
                              <path d="M8 21h8"></path>
                              <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                            </svg>
                            <div className="space-y-0.5">
                              <span className="text-sm font-medium block dark:text-white">Expert-led lessons</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">Over a decades worth experience building products.</span>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-code h-5 w-5 shrink-0 mt-0.5 text-primary">
                              <path d="M10 12.5 8 15l2 2.5"></path>
                              <path d="m14 12.5 2 2.5-2 2.5"></path>
                              <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"></path>
                            </svg>
                            <div className="space-y-0.5">
                              <span className="text-sm font-medium block dark:text-white">Latest tools and AI services</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">We teach world-class tools and AI services.</span>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-5 w-5 shrink-0 mt-0.5 text-primary">
                              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                            </svg>
                            <div className="space-y-0.5">
                              <span className="text-sm font-medium block dark:text-white">Lesson support</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">Ask questions and get help from the instructor.</span>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar h-5 w-5 shrink-0 mt-0.5 text-primary">
                              <path d="M8 2v4"></path>
                              <path d="M16 2v4"></path>
                              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                              <path d="M3 10h18"></path>
                            </svg>
                            <div className="space-y-0.5">
                              <span className="text-sm font-medium block dark:text-white">Updates and new lessons</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300">Regular updates and new lessons included.</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CourseDetail

