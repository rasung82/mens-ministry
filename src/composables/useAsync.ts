import { ref, watch, type Ref, type WatchSource } from 'vue'

/**
 * 데이터를 불러오는 동안의 loading / error 상태를 함께 관리합니다.
 * deps를 넘기면 그 값(예: 라우트 id)이 바뀔 때 다시 불러옵니다.
 */
export function useAsync<T>(loader: () => Promise<T>, deps?: WatchSource) {
    const data = ref<T>() as Ref<T | undefined>
    const loading = ref(true)
    const error = ref<unknown>(null)

    async function run() {
        loading.value = true
        error.value = null
        try {
            data.value = await loader()
        } catch (e) {
            error.value = e
        } finally {
            loading.value = false
        }
    }

    if (deps) watch(deps, run, { immediate: true })
    else run()

    return { data, loading, error, reload: run }
}
