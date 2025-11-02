import React from 'react'

const Tools = () => {
  const tools = [
    { name: "Next.js", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nextjs-YSLQe2KnKsURAmR6tm6WtbuK5O4pk3.png" },
    { name: "Supabase", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Supabase-iweDM2c5DZ4FbvtC6ulSm3auYfPuKl.png" },
    { name: "OpenAI", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OpenAI-MJNTeYzDinAFQwVGzt02WDUW5SsHyX.png" },
    { name: "Stripe", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Stripe-4dBB6mmbb4t6AMvHbwG8S3qoyioZH8.png" },
    { name: "Resend", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Resend-B5YOAkgL5wiRTsJGo6WvGMuB3lXP54.png" },
    { name: "GitHub", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Github-1FEL9RmWlYW7ozbxrXjz7XtGwBU3xI.png" },
    { name: "Cursor", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cursor-iJ3gAuow8Xfnzn5ciqR7Zvjz0MCfPJ.png" },
    { name: "Vercel", logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vercel-ZzrFnGR7PhQvb5tFoJi6wvZRnhw0uP.png" }
  ]

  return (
    <section className="py-32 bg-white dark:bg-background border-b dark:border-gray-800">
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[800px] text-center mb-16">
          <div className="max-w-[576px] mx-auto">
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center rounded-full text-xs font-semibold transition-colors text-foreground px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                Modern Stack
              </div>
            </div>
            <h2 className="max-w-[640px] mx-auto mb-6 text-4xl lg:text-6xl font-semibold tracking-tight text-[#0f0f0f] dark:text-white">
              Leverage tools that work for you
            </h2>
          </div>
          <p className="text-[20px] text-[#0f0f0f] dark:text-gray-300 mb-8 max-w-[576px] mx-auto">
            Learn to work with the leading AI, database, email, payment, design and analytics tools.
          </p>
          
          <div className="block md:hidden mb-12">
            <div className="grid grid-cols-2 gap-6 place-items-center">
              {tools.map((tool, index) => (
                <div key={index} className="flex flex-col items-center gap-3 w-full">
                  <div className="w-full aspect-square flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4">
                    <img src={tool.logo} alt={tool.name} className="w-14 h-14 object-contain" />
                  </div>
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 hover:shadow-md transition-shadow">
                    <img src={tool.logo} alt={tool.name} className="w-14 h-14 object-contain" />
                  </div>
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tools
