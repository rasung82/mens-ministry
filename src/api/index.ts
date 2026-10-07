import { http } from './client'
import type { Meeting, Officer, Post } from '@/types'

/*
 * 화면은 이 함수들만 호출합니다.
 * 데이터 출처가 바뀌어도(정적 JSON → API 서버) 이 파일만 고치면 됩니다.
 */

let meetingsCache: Promise<Meeting[]> | null = null

export function fetchMeetings(): Promise<Meeting[]> {
    // 메뉴·하단 탭·홈에서 여러 번 쓰므로 한 번만 불러와 재사용
    meetingsCache ??= http.get<Meeting[]>('meetings.json').then((r) => r.data)
    meetingsCache.catch(() => (meetingsCache = null))
    return meetingsCache
}

export async function fetchMeeting(id: string): Promise<Meeting | undefined> {
    const list = await fetchMeetings()
    return list.find((m) => m.id === id)
}

export async function fetchPosts(): Promise<Post[]> {
    const { data } = await http.get<Post[]>('posts.json')
    return [...data].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
}

export async function fetchPost(id: number): Promise<Post | undefined> {
    const list = await fetchPosts()
    return list.find((p) => p.id === id)
}

export async function fetchOfficers(): Promise<Officer[]> {
    const { data } = await http.get<Officer[]>('officers.json')
    return data
}
