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
    nextDateText?: string
    schedule: string
    place: string
    owner: string
    summary: string
    checklist: { when: string; task: string }[]
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
