import React, { useState } from 'react'
import { createPortal } from 'react-dom'

const CoachingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) {
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { supabase } = await import('../lib/supabase')
      
      if (!supabase) {
        alert('Error: Supabase not initialized. Please check your configuration.')
        setLoading(false)
        return
      }

      const insertData = {
        name: formData.name,
        email: formData.email,
        message: formData.message
      }

      const { data, error } = await supabase
        .from('coaching_inquiry')
        .insert([insertData])
        .select()

      if (error) {
        console.error('Error submitting inquiry:', error)
        alert(`Failed to send message: ${error.message || 'Please try again later.'}`)
      } else {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          setSubmitted(false)
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting coaching inquiry:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Portal 사용: 모달을 body에 직접 렌더링 (다른 컴포넌트의 CSS 영향 받지 않음)
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal - 화면 중앙 정렬 */}
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden z-10 flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10 bg-white dark:bg-gray-900 rounded-full p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shadow-sm"
          aria-label="Close modal"
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
            className="w-6 h-6"
          >
            <path d="M18 6 6 18"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        </button>

        {/* Content - 스크롤 가능 영역 (스크롤바 숨김) */}
        <div className="p-8 overflow-y-auto overflow-x-hidden flex-1 scrollbar-hide">
          {/* Image and Title */}
          <div className="mb-6">
            <div className="-mx-8 -mt-8 mb-4">
              <img
                src="/Hyunjun-Park-hero.jpg"
                alt="Hyunjun Park"
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // 이미지가 없으면 placeholder 표시
                  e.target.style.display = 'none'
                  if (!e.target.nextElementSibling) {
                    const placeholder = document.createElement('div')
                    placeholder.className = 'w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-t-xl'
                    placeholder.textContent = 'Hyunjun Park'
                    e.target.parentElement.appendChild(placeholder)
                  }
                }}
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Coaching</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Book 1-1 video time with me to help with your project
            </p>
          </div>

          {/* Specialties and Price */}
          <div className="mb-6 space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Specialties:</span> Next.js, React Native, Supabase, Stripe, Mobile apps
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Price:</span> $125 per hour
            </p>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-green-600 dark:text-green-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <p className="text-gray-900 dark:text-white font-medium">Message sent successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Send me a message
              </h3>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project and what you need help with..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body  // Portal: body에 직접 렌더링
  )
}

export default CoachingModal

