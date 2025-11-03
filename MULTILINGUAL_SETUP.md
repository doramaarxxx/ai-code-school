# 다국어 설정 가이드

## ✅ 완료된 작업

### 1. 다국어 시스템 구축
- **LanguageContext** 생성 완료 (`src/contexts/LanguageContext.jsx`)
  - URL 파라미터 (`?lang=ko` 또는 `?lang=en`)로 언어 감지
  - localStorage에 선택한 언어 저장
  - `toggleLanguage()` 함수로 언어 전환

### 2. 번역 데이터
- **translations.js** 파일 생성 완료 (`src/translations/translations.js`)
  - 한글/영어 번역 데이터 포함
  - Header, Hero, Courses, Blog, Contact, Footer 등 모든 UI 텍스트

### 3. Header 언어 토글 버튼
- **Desktop**: 우측 상단에 지구본 아이콘 + "EN" 또는 "한글" 버튼
- **Mobile**: 메뉴 하단에 언어 전환 버튼

### 4. Supabase 테이블 확장
- **SQL 스크립트** 준비 완료 (`supabase_add_korean_columns.sql`)
  - `courses` 테이블에 `title_ko`, `description_ko`, `short_description_ko`, `about_ko` 추가
  - `course_sections` 테이블에 `title_ko` 추가
  - `course_lessons` 테이블에 `title_ko` 추가
  - `course_tools` 테이블에 `name_ko`, `description_ko` 추가
  - `blogs` 테이블에 `title_ko`, `excerpt_ko`, `content_ko` 추가

### 5. Supabase 함수 업데이트
- `getCourses(language)`: 언어별 코스 데이터 반환
- `getCourseBySlug(slug, language)`: 언어별 코스 상세 정보 반환
- `getAllBlogs(limit, language)`: 언어별 블로그 데이터 반환
- `getBlogBySlug(slug, language)`: 언어별 블로그 상세 정보 반환

### 6. 컴포넌트 업데이트 (부분 완료)
- ✅ `main.jsx`: LanguageProvider 적용
- ✅ `Header.jsx`: 다국어 메뉴 + 언어 토글 버튼
- ✅ `Hero.jsx`: 다국어 텍스트 적용
- ✅ `Courses.jsx`: 다국어 텍스트 적용 (부분)
- ✅ `Blog.jsx`: language 파라미터 전달

## 🔧 Supabase 설정 방법

### Step 1: SQL 스크립트 실행
1. Supabase Dashboard → SQL Editor
2. `supabase_add_korean_columns.sql` 파일 내용 복사/붙여넣기
3. **Run** 클릭

### Step 2: 데이터 확인
SQL 실행 후 다음 내용이 자동으로 추가됩니다:
- 코스 2개의 한글 데이터
- 블로그 1개의 한글 데이터

## 🚀 사용 방법

### 1. 개발 서버 실행
```bash
npm run dev
```

### 2. 언어 전환
- **방법 1**: 헤더 우측 상단의 언어 토글 버튼 클릭
- **방법 2**: URL에 `?lang=ko` 또는 `?lang=en` 추가
  - `http://localhost:5173/?lang=ko` (한글)
  - `http://localhost:5173/?lang=en` (영어)

### 3. 컴포넌트에서 사용
```jsx
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../translations/translations'

function MyComponent() {
  const { language } = useLanguage()
  
  return (
    <div>
      <h1>{t(language, 'hero.title')}</h1>
      <p>{t(language, 'hero.subtitle')}</p>
    </div>
  )
}
```

### 4. Supabase 데이터 가져오기
```jsx
import { getCourses } from '../lib/supabase'
import { useLanguage } from '../contexts/LanguageContext'

function CoursesPage() {
  const { language } = useLanguage()
  const [courses, setCourses] = useState([])
  
  useEffect(() => {
    async function fetchData() {
      const data = await getCourses(language) // 언어 전달
      setCourses(data)
    }
    fetchData()
  }, [language]) // language 변경 시 재로딩
}
```

## ⚠️ 남은 작업

아직 다국어가 적용되지 않은 컴포넌트들:
1. `Contact.jsx` - Contact 페이지 폼 라벨 및 메시지
2. `Footer.jsx` - 푸터 섹션 제목 및 링크
3. `CourseDetail.jsx` - 코스 상세 페이지 UI 텍스트
4. `Blogs.jsx` - 블로그 목록 페이지 Hero 섹션
5. `BlogDetail.jsx` - 블로그 상세 페이지 텍스트
6. `CoachingModal.jsx` - 코칭 모달 텍스트

이 컴포넌트들은 위의 **"3. 컴포넌트에서 사용"** 예제를 참고하여 업데이트하면 됩니다.

## 🎯 핵심 포인트

1. **URL 파라미터 우선**: `?lang=ko`를 URL에 추가하면 바로 한글로 전환
2. **localStorage 저장**: 한 번 선택한 언어는 브라우저에 저장되어 유지
3. **DB 데이터 자동 전환**: Supabase 함수가 language 파라미터에 따라 자동으로 `_ko` 컬럼 반환
4. **Fallback**: 한글 데이터가 없으면 자동으로 영문 데이터 반환

## 📝 추가 번역이 필요한 경우

`src/translations/translations.js` 파일을 열어서 번역 추가:

```javascript
export const translations = {
  en: {
    mySection: {
      title: 'My Title',
      subtitle: 'My Subtitle',
    }
  },
  ko: {
    mySection: {
      title: '내 제목',
      subtitle: '내 부제목',
    }
  }
}
```

사용:
```jsx
{t(language, 'mySection.title')}
```

---

다국어 시스템이 성공적으로 구축되었습니다! 🎉

