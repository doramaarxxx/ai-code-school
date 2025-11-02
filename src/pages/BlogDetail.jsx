import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { getBlogBySlug } from '../lib/supabase'

function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlog() {
      try {
        const data = await getBlogBySlug(slug)
        if (data) {
          setBlog(data)
        } else {
          // Fallback data
          setBlog({
            title: "Code Smarter, Not Harder: Meet Cursor",
            excerpt: "Cursor is a fully featured code editor powered by AI.",
            content: "# Code Smarter, Not Harder: Meet Cursor\n\nCursor is a fully featured code editor powered by AI...",
            cover_image_url: "https://yehamphespdhvghjwgwc.supabase.co/storage/v1/object/public/public//Cursor-editor.avif",
            author_name: "Hyunjun Park",
            author_title: "AICode School Founder",
            published_date: "2025-04-11",
            slug: "code-smarter-not-harder-meet-cursor"
          })
        }
      } catch (error) {
        console.error('Error loading blog:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBlog()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-[1280px] mx-auto py-10 px-4">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-[1280px] mx-auto py-10 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog post not found</h1>
            <Link to="/blogs" className="text-primary hover:underline">Return to blogs</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const month = date.toLocaleString('en-US', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    return `${month} ${day}, ${year}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <article className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
              {blog.author_avatar_url ? (
                <img 
                  src={blog.author_avatar_url} 
                  alt={blog.author_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-lg font-medium text-gray-700 dark:text-gray-300">
                  {blog.author_name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{blog.author_name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{blog.author_title}</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            {blog.title}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-400">
            <span>{blog.author_name}</span>
            <span>—</span>
            <time>{formatDate(blog.published_date)}</time>
          </div>

          {/* Cover Image */}
          {blog.cover_image_url && (
            <div className="mb-12 rounded-lg overflow-hidden">
              <img 
                src={blog.cover_image_url} 
                alt={blog.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-gray-800 dark:prose-p:text-gray-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-blue-600 dark:prose-code:text-blue-400 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          {/* Back to blogs link */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link 
              to="/blogs"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              Back to all blogs
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default BlogDetail

