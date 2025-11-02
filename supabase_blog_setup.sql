-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  author_name TEXT NOT NULL DEFAULT 'Hyunjun Park',
  author_title TEXT DEFAULT 'AICode School Founder',
  author_avatar_url TEXT,
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);

-- Create index on published_date for sorting
CREATE INDEX IF NOT EXISTS blogs_published_date_idx ON blogs(published_date DESC);

-- Enable Row Level Security
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published blogs
CREATE POLICY "Enable read access for published blogs" ON blogs
  FOR SELECT
  USING (is_published = true);

-- Create policy to allow authenticated users to insert/update/delete
CREATE POLICY "Enable insert for authenticated users only" ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON blogs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only" ON blogs
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert existing blog post
INSERT INTO blogs (
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  author_name,
  author_title,
  published_date
) VALUES (
  'Code Smarter, Not Harder: Meet Cursor',
  'code-smarter-not-harder-meet-cursor',
  'Cursor is a fully featured code editor powered by AI. Built on top of VS Code, it does way more than autocomplete—it sees your entire project, understands what you''re working on, and helps you write, fix, and refactor code like you''ve got an expert pair programmer sitting next to you.',
  '# Code Smarter, Not Harder: Meet Cursor

Coding used to mean doing everything manually—from digging through docs to writing boilerplate and debugging bugs that made you want to throw your laptop. But what if your code editor actually helped you? Like, really helped you?

That''s the magic of **Cursor**.

Cursor is a fully featured code editor powered by AI. Built on top of VS Code, it does way more than autocomplete—it sees your entire project, understands what you''re working on, and helps you write, fix, and refactor code like you''ve got an expert pair programmer sitting next to you (who also happens to never sleep).

Whether you''re new to development or leading an engineering team, Cursor adapts to your skill level and workflow, helping you build better software, faster.

## What Makes Cursor So Powerful?

Cursor isn''t just another AI tool that guesses your next line of code. It''s a context-aware development environment that understands your entire codebase and helps you work smarter at every step.

### 1. **Built by Devs, for Devs**
Cursor is built on top of VS Code, so if you''re already comfortable with VS Code, you''ll feel right at home. All your favorite extensions, keybindings, and workflows work exactly the same—but with AI superpowers layered on top.

### 2. **Context-Aware AI Assistance**
Unlike basic autocomplete, Cursor can see your entire project. It understands the relationships between files, functions, and libraries, which means it can suggest context-aware edits that actually make sense.

### 3. **AI Chat That Actually Helps**
Need to understand a complex function? Want to refactor a messy component? Just ask Cursor in plain English. It''ll explain what''s happening, suggest improvements, or even write the code for you.

### 4. **Inline Code Generation**
Start typing, and Cursor suggests entire blocks of code—not just single lines. It learns your patterns and adapts to your coding style over time.

### 5. **Debug Like a Pro**
Cursor can analyze error messages, suggest fixes, and even rewrite buggy code for you. It''s like having a senior developer looking over your shoulder.

## Key Features You''ll Actually Use

### **Composer Mode**
This is where Cursor really shines. Composer lets you have a conversational back-and-forth with the AI while it helps you build features, debug issues, or refactor code—all without leaving your editor.

### **Multi-File Editing**
Cursor can make coordinated changes across multiple files at once. Need to rename a function that''s used in 10 different places? Cursor handles it.

### **Codebase Indexing**
Cursor indexes your entire project, so it can pull relevant context from anywhere in your codebase when making suggestions. It''s not just looking at the current file—it understands the big picture.

### **Terminal Integration**
Run commands, see outputs, and get AI help with terminal errors—all in one place.

## Cursor for Web Devs

Building web apps? Cursor is a game-changer. Whether you''re working with React, Next.js, or vanilla JavaScript, Cursor understands modern web frameworks and can help you scaffold components, write hooks, and debug rendering issues.

## Cursor for Mobile Devs

React Native? Flutter? Swift? Cursor works great for mobile development too. It understands platform-specific APIs and can help you navigate the quirks of iOS and Android development.

## New to Code? Cursor Has Your Back

If you''re just starting out, Cursor is like having a mentor who never gets tired of explaining things. It can help you understand error messages, suggest best practices, and teach you how to write cleaner code as you go.

## Experienced Dev? This Is Your Time Machine

For experienced developers, Cursor is all about velocity. It handles the tedious stuff (writing boilerplate, fixing imports, updating tests) so you can focus on solving hard problems and shipping features.

## Teams Love Cursor Too

Cursor isn''t just for solo developers. Teams using Cursor report faster onboarding, fewer bugs, and more consistent codebases. When everyone on the team has access to AI-powered development tools, the whole team levels up.

## Getting Started

Ready to try Cursor? Here''s how to get started:

1. **Download Cursor** from [cursor.sh](https://cursor.sh)
2. **Import your VS Code settings** (it''s literally one click)
3. **Open a project** and start coding
4. **Press Cmd+K** (or Ctrl+K) to open the AI command palette
5. **Ask Cursor anything** and watch it work

## Tips for Power Users

- Use **@** mentions in chat to reference specific files or functions
- Press **Cmd+L** to open a quick chat window
- Use **Composer mode** for complex, multi-file tasks
- Enable **auto-indexing** for better context awareness
- Explore **custom rules** to teach Cursor your team''s conventions

## Final Thoughts

Cursor isn''t replacing developers—it''s making us better. It handles the boring stuff, helps us learn faster, and lets us focus on what actually matters: building great software.

If you''re tired of wrestling with your editor and want a tool that actually understands what you''re trying to do, give Cursor a shot. It might just change how you code forever.

---

**Ready to level up?** Check out our course on building full-stack apps with Cursor—where we go deep on real-world development workflows, best practices, and how to get the most out of AI-powered coding.',
  'https://yehamphespdhvghjwgwc.supabase.co/storage/v1/object/public/public//Cursor-editor.avif',
  'Hyunjun Park',
  'AICode School Founder',
  '2025-04-11'
);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_blogs_timestamp
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_blogs_updated_at();

