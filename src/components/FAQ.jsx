import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../translations/translations'

const FAQ = () => {
  const { language } = useLanguage()
  const [openItems, setOpenItems] = useState({})

  const faqData = {
    "Getting Started": [
      {
        question: "What is AICode School?",
        answer: "AICode School is a coding-with-ai focussed community and learning platform. We offer structured courses, hands-on projects, and a supportive community to accelerate your learning journey."
      },
      {
        question: "Who is AICode School for?",
        answer: "AICode School is perfect for both beginners and new developers looking to level up their skills in AI-powered development. Whether you're starting your coding journey or wanting to integrate AI into your existing skillset, our courses are designed to meet you where you are."
      },
      {
        question: "What prerequisites do I need?",
        answer: "For our beginner courses, no prior coding experience is required. For intermediate courses, it would be advantageous to have at least 2+ years working with no-code or logic based platforms."
      }
    ],
    "Courses": [
      {
        question: "How are the courses structured and what will I learn?",
        answer: "Our courses are hands-on and follow a structured curriculum. With each course, you'll be building production ready web or mobile apps while learning how to implement Saas based architecture. You'll learn how to integrate AI, payments, emails and more"
      },
      {
        question: "How much time should I commit?",
        answer: "Courses are self paced, but we recommend dedicating 4-6 hours per week if you want to make meaningful progress and keep the information fresh in your mind."
      }
    ],
    "Technology & Tools": [
      {
        question: "What technologies will I use?",
        answer: "You'll work with cutting-edge tools including Next.js, React, TypeScript, Expo, Lovable, Bolt, Tailwind CSS, Supabase, OpenAI's APIs, Vercel, and more. We carefully select tools that are both powerful and actively maintained by the developer community."
      }
    ],
    "Support & Community": [
      {
        question: "What kind of support is available?",
        answer: "All lessons have Q&A sections to ask questions. Our community is active and supportive, always ready to help you overcome challenges."
      },
      {
        question: "How can I connect with other students?",
        answer: "Our community platform enables you to connect with fellow students, alumni, and mentors."
      }
    ],
    "Pricing": [
      {
        question: "What payment options are available?",
        answer: "We offer 2 types of payments, a per course payment and a yearly plan. The per course payment is individually priced per course and the yearly plan is $400 per year. The yearly plan unlocks all courses."
      },
      {
        question: "Is there a refund if I feel the content doesn't suit me",
        answer: "Yes, we offer a no questions asked full refund as long as it less than 48hrs after purchase."
      },
      {
        question: "Do you offer PPP (Purchasing Power Parity)?",
        answer: "We are competitively priced and offer a lot of value compared to others. Therefore we don't offer PPP for subscriptions"
      }
    ]
  }

  const toggleItem = (section, index) => {
    const key = `${section}-${index}`
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <section className="py-24 bg-background dark:bg-background">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center rounded-full text-xs font-semibold transition-colors text-foreground px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            {t(language, "faq.badge")}
          </div>
        </div>
        <h2 className="max-w-[640px] mx-auto mb-6 text-4xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
          {t(language, "faq.title")}
        </h2>
        <p className="text-[20px] text-[#0f0f0f] dark:text-gray-300 mb-16 max-w-3xl mx-auto text-center">
          {t(language, "faq.subtitle")}
        </p>

        {Object.entries(faqData).map(([section, items]) => (
          <div key={section} className="mb-16 last:mb-0">
            <h2 className="text-lg text-gray-600 dark:text-gray-400 mb-4">{section}</h2>
            <div className="space-y-0">
              {items.map((item, index) => {
                const key = `${section}-${index}`
                const isOpen = openItems[key]
                return (
                  <div key={index} className="border-b border-gray-200 dark:border-gray-700">
                    <button
                      className="flex w-full items-center justify-between py-6 text-left text-lg font-medium text-gray-900 dark:text-white"
                      onClick={() => toggleItem(section, index)}
                    >
                      {item.question}
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
                        className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                      }`}
                    >
                      <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
