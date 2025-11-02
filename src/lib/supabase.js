import { createClient } from '@supabase/supabase-js'

// 환경 변수에서 Supabase 설정 가져오기
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jonxszdcvnjslsxieeko.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Supabase 클라이언트 생성 (키가 없으면 null 반환)
let supabase = null
if (supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.error('Error creating Supabase client:', error)
  }
}

// 예제: 코스 데이터 가져오기
export const getCourses = async () => {
  if (!supabase) {
    console.warn('Supabase not initialized. Returning empty array.')
    return []
  }
  
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }
  
  return data || []
}

// 슬러그로 특정 코스 가져오기 (섹션, 레슨, 도구 포함)
export const getCourseBySlug = async (slug) => {
  if (!supabase) {
    console.warn('Supabase not initialized. Returning null.')
    return null
  }
  
  // 코스 기본 정보 가져오기
  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single()
  
  if (courseError || !course) {
    console.error('Error fetching course:', courseError)
    return null
  }

  // 섹션과 레슨 가져오기
  const { data: sections, error: sectionsError } = await supabase
    .from('course_sections')
    .select(`
      *,
      course_lessons (
        *
      )
    `)
    .eq('course_id', course.id)
    .order('order_index', { ascending: true })
  
  // 각 섹션의 레슨들을 order_index로 정렬
  if (sections) {
    sections.forEach(section => {
      if (section.course_lessons) {
        section.course_lessons.sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
      }
    })
  }

  if (sectionsError) {
    console.error('Error fetching sections:', sectionsError)
  }

  // 도구 가져오기
  const { data: tools, error: toolsError } = await supabase
    .from('course_tools')
    .select(`
      tools (*)
    `)
    .eq('course_id', course.id)

  if (toolsError) {
    console.error('Error fetching tools:', toolsError)
  }

  // 데이터 정리
  return {
    ...course,
    sections: sections || [],
    tools: (tools || []).map(t => t.tools).filter(Boolean)
  }
}

// 모든 블로그 포스트 가져오기
export const getAllBlogs = async (limit = 10) => {
  if (!supabase) {
    console.warn('Supabase not initialized. Returning empty array.')
    return []
  }
  
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, excerpt, cover_image_url, author_name, author_title, published_date')
    .eq('is_published', true)
    .order('published_date', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching blogs:', error)
    return []
  }
  
  return data || []
}

// 슬러그로 특정 블로그 포스트 가져오기
export const getBlogBySlug = async (slug) => {
  if (!supabase) {
    console.warn('Supabase not initialized. Returning null.')
    return null
  }
  
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  
  if (error) {
    console.error('Error fetching blog by slug:', error)
    return null
  }
  
  return data
}

// 예제: 테스티모니얼 가져오기
export const getTestimonials = async () => {
  if (!supabase) {
    return []
  }
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  
  return data || []
}

// 예제: 스토리지에서 이미지 URL 가져오기
export const getStorageUrl = (bucket, path) => {
  if (!supabase) {
    return ''
  }
  
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

// Coaching 문의 저장
export const submitCoachingInquiry = async (inquiry) => {
  if (!supabase) {
    return { error: { message: 'Supabase not initialized' } }
  }
  
  const { data, error } = await supabase
    .from('coaching_inquiry')
    .insert([inquiry])
    .select()
  
  if (error) {
    console.error('Error submitting coaching inquiry:', error)
  }
  
  return { data, error }
}

// Supabase 클라이언트 export (null일 수 있음)
export { supabase }
