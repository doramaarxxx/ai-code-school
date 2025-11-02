import React from 'react'

const Testimonials = () => {
  const featuredTestimonial = {
    name: "Michael Wade",
    role: "Product Engineer",
    image: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/feedback/Michael%20Wade.png",
    quote: "AICode School has that rare je ne sais quoi—a quiet confidence in its structure that lets you know you'll get your money's worth. It's a masterclass in calm, focused teaching. I didn't just walk away with skills—I walked away amplified."
  }

  const testimonials = [
    {
      name: "Lucas Secerbegovic",
      role: "Product Engineer",
      image: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/feedback/Lucas%20Secerbegovic.png",
      quote: "You're an incredible educator and I'll continue to direct people to your content for learning these topics. Your work has helped me build many projects and make money along the way which I'm very thankful for."
    },
    {
      name: "Jonathan Guerrero",
      role: "Software Builder",
      image: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/feedback/Jonathan%20Guerrero.png",
      quote: "Thank you for all your effort and passion that you gave in this course. I really liked your ability to resolve things as we progressed through the course."
    },
    {
      name: "Michael Rock",
      role: "Novice Builder",
      image: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/feedback/Michael%20Rock.png",
      quote: "Without AICode School courses I would not be as close as I am to getting something out into the world!"
    },
    {
      name: "Faisal Abdulla",
      role: "Developer",
      image: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/feedback/faisal_abdulla.jpeg",
      quote: "As someone without a strong coding background, I was pretty anxious about jumping into AI-assisted coding. This course helped me get past that."
    },
    {
      name: "Carlos Velasquez",
      role: "Product Designer",
      image: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/feedback/Carlos.jpg",
      quote: "In a world of vibe coding, this felt fresh and structured. It gave me real insight into logic, tools, and security — things I wouldn't have picked up just winging it on my own."
    },
    {
      name: "Mahitha Gokulachandra",
      role: "UX/UI designer",
      image: "https://pigecbumjluuzsufaayd.supabase.co/storage/v1/object/public/public/feedback/Mahitha.jpeg",
      quote: "I really enjoy how you teach! There are a lot of challenging concepts but you really make it simple and approachable. As a UX designer and product manager in past lives, I find your approach to design and building really resonates with me."
    }
  ]

  return (
    <section className="py-24 bg-background dark:bg-background border-b dark:border-gray-800">
      <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16 max-w-[576px] mx-auto">
          <div className="flex justify-center mb-3">
            <div className="inline-flex items-center rounded-full text-xs font-semibold transition-colors text-foreground px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              Testimonials
            </div>
          </div>
          <h2 className="max-w-[640px] mx-auto mb-6 text-4xl lg:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white">
            What our students say
          </h2>
          <p className="text-[20px] text-[#0f0f0f] dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied learners building with AI
          </p>
        </div>

        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 relative border dark:border-transparent">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="relative h-20 w-20 rounded-full overflow-hidden">
                  <img
                    alt={featuredTestimonial.name}
                    src={featuredTestimonial.image}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {featuredTestimonial.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {featuredTestimonial.role}
                  </p>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  "{featuredTestimonial.quote}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-full relative border dark:border-transparent flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                    <img
                      alt={testimonial.name}
                      src={testimonial.image}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm flex-grow">
                  "{testimonial.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
