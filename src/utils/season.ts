import { ref } from 'vue'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter']

/** 현재 적용 중인 계절. 화면에서 계절별 그림을 고를 때 씁니다. */
export const currentSeason = ref<Season>(seasonOf())

/** 월(0~11)로 계절을 구합니다. 3~5월 봄, 6~8월 여름, 9~11월 가을, 12~2월 겨울 */
export function seasonOf(date: Date = new Date()): Season {
    const month = date.getMonth() + 1
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'autumn'
    return 'winter'
}

/**
 * 현재 계절을 <html data-season="..."> 에 반영합니다.
 * 미리보기용으로 주소에 ?season=winter 를 붙이면 그 계절로 강제됩니다.
 */
export function applySeason(): Season {
    const forced = new URLSearchParams(window.location.search).get('season')
    const season = SEASONS.find((s) => s === forced) ?? seasonOf()
    document.documentElement.dataset.season = season
    currentSeason.value = season
    return season
}
