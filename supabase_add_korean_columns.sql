-- Add Korean columns to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS title_ko TEXT,
ADD COLUMN IF NOT EXISTS description_ko TEXT,
ADD COLUMN IF NOT EXISTS short_description_ko TEXT,
ADD COLUMN IF NOT EXISTS about_ko TEXT;

-- Add Korean columns to course_sections table
ALTER TABLE course_sections 
ADD COLUMN IF NOT EXISTS title_ko TEXT;

-- Add Korean columns to course_lessons table
ALTER TABLE course_lessons 
ADD COLUMN IF NOT EXISTS title_ko TEXT;

-- Add Korean columns to course_tools table (if exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE tablename = 'course_tools') THEN
    ALTER TABLE course_tools 
    ADD COLUMN IF NOT EXISTS name_ko TEXT,
    ADD COLUMN IF NOT EXISTS description_ko TEXT;
  END IF;
END $$;

-- Add Korean columns to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS title_ko TEXT,
ADD COLUMN IF NOT EXISTS excerpt_ko TEXT,
ADD COLUMN IF NOT EXISTS content_ko TEXT;

-- Update existing courses with Korean data
UPDATE courses 
SET 
  title_ko = CASE slug
    WHEN 'build-a-full-stack-app-with-nextjs-and-cursor' THEN 'Cursor로 Next.js 풀스택 앱 만들기'
    WHEN 'build-a-react-native-mobile-app-with-cursor' THEN 'Cursor로 React Native 모바일 앱 만들기'
    ELSE title
  END,
  description_ko = CASE slug
    WHEN 'build-a-full-stack-app-with-nextjs-and-cursor' THEN 'AI 기반 코딩 도구인 Cursor를 사용하여 처음부터 풀스택 Next.js 애플리케이션을 구축하는 방법을 배우세요. 실습 프로젝트를 통해 현대적인 웹 개발 기술을 마스터하세요.'
    WHEN 'build-a-react-native-mobile-app-with-cursor' THEN 'Cursor의 AI 지원을 활용하여 크로스 플랫폼 모바일 앱을 만드는 방법을 배우세요. 이 강의는 React Native 개발의 모든 측면을 실용적이고 프로젝트 기반 접근 방식으로 다룹니다.'
    ELSE description
  END,
  short_description_ko = CASE slug
    WHEN 'build-a-full-stack-app-with-nextjs-and-cursor' THEN 'AI 기반 개발로 풀스택 Next.js 앱 구축 마스터하기'
    WHEN 'build-a-react-native-mobile-app-with-cursor' THEN 'AI 도구로 크로스 플랫폼 모바일 앱 만들기'
    ELSE short_description
  END,
  about_ko = CASE slug
    WHEN 'build-a-full-stack-app-with-nextjs-and-cursor' THEN '이 종합 강의에서는 Cursor의 AI 지원을 활용하여 풀스택 Next.js 애플리케이션을 처음부터 구축하는 과정을 안내합니다. 최신 웹 개발 관행, AI 기반 코딩 기술, 실제 프로젝트 구현을 배우게 됩니다.'
    WHEN 'build-a-react-native-mobile-app-with-cursor' THEN '이 실습 강의에서는 Cursor를 사용하여 React Native 모바일 애플리케이션을 만드는 방법을 배웁니다. 모바일 UI/UX, 네이티브 기능, API 통합 등을 다루며, AI가 개발 속도를 높이는 방법을 배웁니다.'
    ELSE about
  END
WHERE slug IN ('build-a-full-stack-app-with-nextjs-and-cursor', 'build-a-react-native-mobile-app-with-cursor');

-- Add sample Korean data for blogs
UPDATE blogs 
SET 
  title_ko = '더 스마트하게 코딩하기: Cursor 만나보기',
  excerpt_ko = 'Cursor는 AI로 구동되는 완전한 기능을 갖춘 코드 에디터입니다. VS Code 위에 구축되어 자동완성 이상의 기능을 제공합니다. 전체 프로젝트를 보고, 작업 중인 내용을 이해하며, 옆에 앉아 있는 전문가 페어 프로그래머처럼 코드를 작성, 수정, 리팩토링하는 데 도움을 줍니다(그것도 절대 잠들지 않는).',
  content_ko = E'# Cursor란 무엇인가요?\n\nCursor는 AI로 구동되는 완전한 기능을 갖춘 코드 에디터입니다.\n\n## 주요 기능\n\n1. **AI 코드 완성**: 컨텍스트를 이해하는 지능형 제안\n2. **자연어 편집**: 원하는 것을 설명하면 AI가 작성합니다\n3. **코드베이스 이해**: AI가 전체 프로젝트를 알고 있습니다\n\n이것은 미래의 코딩 방식입니다.'
WHERE slug = 'code-smarter-not-harder-meet-cursor';

