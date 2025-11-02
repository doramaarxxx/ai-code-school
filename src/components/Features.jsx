import React from 'react'

const Features = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      title: "Work with AI Code Editors",
      description: "Learn how to use the latest AI-powered code editors like Windsurf and Cursor. Get instant feedback and insights to improve your coding skills."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
          <path d="M3 12A9 3 0 0 0 21 12"></path>
        </svg>
      ),
      title: "Integrate the Latest Databases",
      description: "Integrate your frontend with popular databases like Supabase or Convex, and build scalable and secure applications with user-friendly interfaces."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Experience Hands-on Learning",
      description: "Learn in a live interactive environment with real-time feedback and guidance. Gain access to private bootcamp spaces."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
        </svg>
      ),
      title: "Build a Real Project",
      description: "Build a production ready app with a high performance and secure tech stack, that's ready to deploy within 4-6 weeks. No experience necessary."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
        </svg>
      ),
      title: "Integrate SaaS Features",
      description: "Hook into industry leading payment providers like Stripe to take one off or subscriptions based payments from your customers."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      ),
      title: "Deploy with Version Control",
      description: "Learn essential Git and GitHub workflows to track changes, collaborate effectively, and safely deploy your code."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
        </svg>
      ),
      title: "Build with Security in Mind",
      description: "Learn essential security principles and best practices for building secure, robust applications. Protect your users and data with industry-standard security measures."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
        </svg>
      ),
      title: "Optimize Performance",
      description: "Learn techniques for building high-performance applications. Learn optimization strategies for faster load times and better user experience."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      ),
      title: "Deploy to Production",
      description: "By the end of the bootcamp, you'll have a production-ready app ready to deploy and also the confidence of experiencing the full end to end developer lifecycle."
    }
  ]

  return (
    <section className="py-32 bg-white dark:bg-background border-b dark:border-gray-800">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex justify-center mb-3 px-4">
          <div className="inline-flex items-center rounded-full text-xs font-semibold transition-colors text-foreground px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            Up to Date Curriculum
          </div>
        </div>
        <h2 className="max-w-[640px] mx-auto mb-6 text-4xl lg:text-6xl font-semibold tracking-tight text-center text-gray-900 dark:text-white px-4">
          Structured learning
        </h2>
        <p className="text-[20px] text-[#0f0f0f] dark:text-gray-300 mb-16 max-w-[576px] mx-auto text-center px-4">
          Stay ahead with thoughtfully structured lessons and interactive learning that evolves with industry trends
        </p>
        
        <div className="grid gap-8 px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl sm:p-6">
                  <div className="flex items-center mb-6 px-4 sm:px-0 pt-4 sm:pt-0">
                    <div className="h-10 w-10 flex items-center justify-center border dark:border-gray-700 rounded-lg bg-white dark:bg-gray-700 shadow-sm text-gray-700 dark:text-gray-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="p-4 sm:p-0">
                    <h3 className="text-2xl font-medium mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
