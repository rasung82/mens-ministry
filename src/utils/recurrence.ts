import type { Meeting } from '@/types'

type Rule = { month?: number; week: number; weekday: number }

const pad = (n: number) => String(n).padStart(2, '0')
const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

/** year년 month월(0~11)의 week번째 weekday(0=일요일) 날짜 */
function nthWeekday(year: number, month: number, rule: Rule): Date {
    const first = new Date(year, month, 1)
    const offset = (rule.weekday - first.getDay() + 7) % 7
    return new Date(year, month, 1 + offset + (rule.week - 1) * 7)
}

/** 오늘(포함) 이후 가장 가까운 날짜를 'YYYY-MM-DD'로. rule.month가 있으면 매년, 없으면 매월 반복입니다. */
export function nextOccurrence(rule: Rule, today: Date = new Date()): string {
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    for (let i = 0; i < 24; i++) {
        const d =
            rule.month === undefined
                ? nthWeekday(start.getFullYear(), start.getMonth() + i, rule)
                : nthWeekday(start.getFullYear() + i, rule.month - 1, rule)
        if (d >= start) return toIso(d)
    }
    return ''
}

/** repeat 규칙이 있는 모임은 nextDate를 오늘 기준으로 자동 계산해 채웁니다. */
export function withNextDate(meeting: Meeting, today: Date = new Date()): Meeting {
    return meeting.repeat ? { ...meeting, nextDate: nextOccurrence(meeting.repeat, today) } : meeting
}
