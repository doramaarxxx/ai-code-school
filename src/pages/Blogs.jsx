import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getAllBlogs } from '../lib/supabase'

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getAllBlogs(20) // 블로그 목록 페이지에는 최대 20개 표시
      if (data && data.length > 0) {
        setBlogPosts(data)
      } else {
        // Fallback data
        setBlogPosts([
          {
            id: 1,
            title: "Code Smarter, Not Harder: Meet Cursor",
            excerpt: "Cursor is a fully featured code editor powered by AI. Built on top of VS Code, it does way more than autocomplete—it sees your entire project, understands what you're working on, and helps you write, fix, and refactor code like you've got an expert pair programmer sitting next to you (who also happens to never sleep).",
            cover_image_url: "https://yehamphespdhvghjwgwc.supabase.co/storage/v1/object/public/public//Cursor-editor.avif",
            author_name: "Hyunjun Park",
            published_date: "2025-04-11",
            slug: "code-smarter-not-harder-meet-cursor"
          }
        ])
      }
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const month = date.toLocaleString('en-US', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-background">
        {/* Hero Section */}
        <section className="border-b dark:border-gray-800">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full text-xs font-semibold transition-colors text-foreground px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6">
                Latest Insights
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6">
                Learn from our blog
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Insights, tutorials, and best practices from our community of builders
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={`/blogs/${post.slug}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
                          <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {post.author_name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {post.author_name}
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(post.published_date)}
                        </time>
                        <span className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Blogs

