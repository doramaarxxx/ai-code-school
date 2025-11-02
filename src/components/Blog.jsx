import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllBlogs } from '../lib/supabase'

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([])

  useEffect(() => {
    async function fetchBlogs() {
      const data = await getAllBlogs(1) // 홈 페이지에는 최신 1개만 표시
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
    <section className="py-32 bg-white dark:bg-background border-b dark:border-gray-800">
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full text-xs font-semibold transition-colors text-foreground px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            Latest Insights
          </div>
          <h2 className="max-w-[640px] mx-auto mb-6 text-4xl lg:text-6xl font-semibold tracking-tight text-[#0f0f0f] dark:text-white">
            Learn from our blog
          </h2>
          <p className="text-[20px] text-[#0f0f0f] dark:text-gray-300 mb-8 max-w-[576px] mx-auto">
            Insights, tutorials, and best practices from our community of builders
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-12">
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
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex shrink-0 overflow-hidden rounded-full h-6 w-6">
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {post.author_name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {post.author_name}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Link className="hover:underline" to={`/blogs/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(post.published_date)}
                  </time>
                  <Link
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                    to={`/blogs/${post.slug}`}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <a href="/blogs">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8 bg-white dark:bg-gray-800">
              View all posts
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
                className="ml-2 h-4 w-4"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blog
