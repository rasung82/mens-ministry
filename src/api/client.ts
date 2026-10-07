import axios from 'axios'

/**
 * 모든 데이터 요청은 이 인스턴스를 거칩니다.
 *
 * 지금은 public/data/*.json 정적 파일을 읽습니다.
 * 나중에 API 서버가 생기면 baseURL과 각 api 파일의 경로만 바꾸면 됩니다.
 *   예) baseURL: '/api',  http.get('/meetings')
 */
export const http = axios.create({
    baseURL: `${import.meta.env.BASE_URL}data/`,
    timeout: 10_000,
})

http.interceptors.response.use(
    (res) => res,
    (err) => {
        console.error('[데이터 불러오기 실패]', err?.config?.url, err?.message)
        return Promise.reject(err)
    },
)
