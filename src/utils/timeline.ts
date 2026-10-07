import type { Meeting } from '@/types'

type ChecklistItem = Meeting['checklist'][number]

export type StepState = 'past' | 'current' | 'upcoming'

export interface TimelineStep {
    when: string
    task: string
    /** 이 단계를 시작해야 하는 날 (행사 날짜를 모르면 undefined) */
    date?: Date
    state: StepState
}

const DAY = 24 * 60 * 60 * 1000

/** '2개월 전' '6주 전' '3일 전' '당일' '다음 날' → 행사일 기준 며칠 전인지 (모르면 null) */
export function daysBefore(when: string): number | null {
    const text = when.trim()
    if (text === '당일') return 0
    if (text === '다음 날') return -1
    const m = text.match(/^(\d+)\s*(개월|달|주|일)\s*전$/)
    if (!m) return null
    const n = Number(m[1])
    return m[2] === '주' ? n * 7 : m[2] === '일' ? n : n * 30
}

export function parseIso(iso: string): Date {
    const [y, m, d] = iso.split('-').map(Number)
    return new Date(y, m - 1, d)
}

export function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

/** 행사일까지 남은 일수 (지났으면 음수) */
export function daysUntil(event: Date, today: Date): number {
    return Math.round((startOfDay(event).getTime() - startOfDay(today).getTime()) / DAY)
}

/**
 * 오늘 날짜를 기준으로 각 단계가 지났는지(past), 지금 진행 중인지(current), 아직인지(upcoming) 정합니다.
 * 진행 중 = 시작일이 오늘 이전인 단계 중 가장 늦은 것.
 */
export function buildTimeline(items: ChecklistItem[], eventDate: Date | undefined, today: Date): TimelineStep[] {
    const steps: TimelineStep[] = items.map((item) => {
        const days = item.daysBefore ?? daysBefore(item.when)
        const date = eventDate && days !== null ? new Date(eventDate.getTime() - days * DAY) : undefined
        return { when: item.when, task: item.task, date, state: 'upcoming' }
    })
    const now = startOfDay(today).getTime()
    let current = -1
    steps.forEach((s, i) => {
        if (s.date && startOfDay(s.date).getTime() <= now) current = i
    })
    // 행사일이 지났으면 모든 단계를 끝난 것으로 봅니다.
    const finished = eventDate !== undefined && daysUntil(eventDate, today) < 0
    steps.forEach((s, i) => {
        if (!s.date) return
        s.state = finished || i < current ? 'past' : i === current ? 'current' : 'upcoming'
    })
    return steps
}
