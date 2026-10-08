/** public/data/meetings.json 의 항목 하나 */
export interface Meeting {
    /** 주소에 쓰이는 영문 id (예: monthly → /meetings/monthly) */
    id: string
    title: string
    /** 메뉴·하단 탭에 쓰는 짧은 이름 */
    navLabel: string
    /** 하단 탭 아이콘 */
    icon: 'calendar' | 'flame' | 'music' | 'book'
    /** 배지에 표시되는 주기 (예: 매월, 매주 금요일, 연 1회) */
    cycle: string
    /** 배지 색: regular = 남색(정기), special = 호박색(연간 행사) */
    tone: 'regular' | 'special'
    /** 다음 일정 (YYYY-MM-DD). 정해지지 않았으면 nextDateText 사용 */
    nextDate?: string
    /**
     * 반복 규칙. 있으면 nextDate를 오늘 기준으로 자동 계산합니다. weekday는 0=일요일.
     * 매년: 11월 셋째 주 일요일 → { month: 11, week: 3, weekday: 0 }
     * 매월: 둘째 주 일요일 → { week: 2, weekday: 0 } (month 생략)
     * 비정기 모임은 repeat와 nextDate를 모두 비워 두면 다음 일정이 표시되지 않습니다.
     */
    repeat?: { month?: number; week: number; weekday: number }
    nextDateText?: string
    schedule: string
    place: string
    owner: string
    summary: string
    checklist: { when: string; task: string; /** 행사일 며칠 전인지. 비우면 when 문구('2주 전' 등)에서 읽습니다 */ daysBefore?: number }[]
    /** 진행 순서 영역의 제목. 비우면 "진행 순서" */
    programTitle?: string
    /** true면 진행 영역 위에 준비 시기별 타임라인 그림을 함께 보여줍니다 */
    timeline?: boolean
    program: { title: string; note?: string }[]
    /** 전임자 메모 — 마크다운으로 자유롭게 작성 */
    memo?: string
    files: { label: string; url: string }[]
    updatedAt: string
    updatedBy: string
}

export type PostCategory = '공지' | '인수인계' | '자료'

/** public/data/posts.json 의 항목 하나 */
export interface Post {
    id: number
    category: PostCategory
    title: string
    author: string
    date: string
    /** 마크다운 본문 */
    body: string
}

/** public/data/officers.json 의 항목 하나 */
export interface Officer {
    role: string
    name: string
    /** 비워두면 전화 버튼이 표시되지 않습니다 */
    phone?: string
}
