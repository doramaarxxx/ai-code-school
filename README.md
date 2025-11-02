# AICode School

A modern, full-stack landing page and course platform built with React, Vite, Tailwind CSS, and Supabase.

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful design with Tailwind CSS
- 🌙 **Dark Mode** - Full dark mode support
- 📱 **Responsive** - Works seamlessly on all devices
- ⚡ **Fast** - Built with Vite for lightning-fast development
- 🎯 **Component-based** - Modular React architecture
- 💾 **Supabase Integration** - Backend database and authentication
- 📝 **Blog System** - Markdown-powered blog with database management
- 🎓 **Course Management** - Dynamic course listings and detail pages
- 💬 **Coaching Modal** - Contact form for coaching inquiries
- 🎨 **WebGL Background** - Stunning fluid gradient animations

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aicode-school.git
   cd aicode-school
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run the SQL scripts in your Supabase SQL Editor:
   - `supabase_blog_setup.sql` - Creates blogs table and policies

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx           # Navigation with coaching modal
│   ├── Hero.jsx             # Hero section with fluid gradient
│   ├── Courses.jsx          # Course listings from Supabase
│   ├── Blog.jsx             # Blog preview section
│   ├── Testimonials.jsx     # Student testimonials
│   ├── Features.jsx         # Platform features
│   ├── Community.jsx        # Community section
│   ├── Tools.jsx            # Tech stack showcase
│   ├── Footer.jsx           # Footer with links
│   ├── CoachingModal.jsx    # Coaching inquiry modal
│   └── FluidGradient.jsx    # WebGL background animation
├── pages/
│   ├── Home.jsx             # Landing page
│   ├── Courses.jsx          # All courses page
│   ├── CourseDetail.jsx     # Individual course page
│   ├── Blogs.jsx            # Blog listing page
│   ├── BlogDetail.jsx       # Individual blog post (with markdown)
│   └── Contact.jsx          # Contact page
├── lib/
│   └── supabase.js          # Supabase client and API functions
├── App.jsx                  # Main app with routing
├── main.jsx                 # Entry point
└── index.css                # Global styles with Tailwind
```

## 🛠 Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Markdown** - Markdown rendering for blog posts
- **Three.js** - WebGL for fluid gradient background

### Backend
- **Supabase** - PostgreSQL database, authentication, and storage
- **Row Level Security (RLS)** - Database security policies

## 🗄 Database Schema

### Tables
- **courses** - Course information (title, description, price, etc.)
- **course_sections** - Course sections with lessons
- **course_lessons** - Individual lessons within sections
- **course_tools** - Tools/technologies used in courses
- **blogs** - Blog posts with markdown content
- **coaching_inquiry** - Coaching form submissions

## 🎨 Customization

### Colors & Theming
- Edit `tailwind.config.js` for custom colors and theme
- Modify `src/index.css` for global styles

### Content
- Update course data in Supabase `courses` table
- Add blog posts in Supabase `blogs` table
- Modify component text in respective `.jsx` files

### Branding
- Replace images in `/public` directory
- Update brand name in components

## 📝 Environment Variables

Required environment variables in `.env`:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- **Netlify**: Works great with Vite
- **Railway**: Full-stack deployment option
- **GitHub Pages**: Static site deployment

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For questions or issues, please open an issue on GitHub or contact through the website.

---

Built with ❤️ by Hyunjun Park
