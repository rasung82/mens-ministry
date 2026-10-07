import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const md = new MarkdownIt({ linkify: true, breaks: true })

/** 마크다운 → 안전한 HTML (스크립트 등 위험한 코드는 DOMPurify가 제거) */
export function renderMarkdown(src: string): string {
    return DOMPurify.sanitize(md.render(src))
}

/** '2026-10-19' → '10월 19일 (월)' */
export function formatDate(iso: string, withWeekday = true): string {
    const d = new Date(`${iso}T00:00:00`)
    if (Number.isNaN(d.getTime())) return iso
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const base = `${d.getMonth() + 1}월 ${d.getDate()}일`
    return withWeekday ? `${base} (${days[d.getDay()]})` : base
}

/** '2026-10-19' → '2026.10.19' */
export function formatDotDate(iso: string): string {
    return iso.replaceAll('-', '.')
}

/** 전화번호에서 숫자만 남겨 tel: 링크로 */
export function telHref(phone: string): string {
    return `tel:${phone.replace(/[^0-9+]/g, '')}`
}
