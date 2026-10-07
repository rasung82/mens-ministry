<script setup lang="ts">
import { computed, ref } from 'vue'
import PostRow from '@/components/PostRow.vue'
import LoadState from '@/components/LoadState.vue'
import { useAsync } from '@/composables/useAsync'
import { fetchPosts } from '@/api'
import type { PostCategory } from '@/types'

const { data: posts, loading, error, reload } = useAsync(fetchPosts)

const categories: ('전체' | PostCategory)[] = ['전체', '공지', '인수인계', '자료']
const selected = ref<(typeof categories)[number]>('전체')

const filtered = computed(() =>
    (posts.value ?? []).filter((p) => selected.value === '전체' || p.category === selected.value),
)
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-5 px-4 py-6 md:px-6 md:py-10">
    <div class="flex flex-col gap-1">
      <h1 class="text-2xl font-bold md:text-3xl">게시판</h1>
      <p class="text-[15px] text-body">공지, 인수인계 메모, 자료를 기록으로 남깁니다.</p>
    </div>

    <div role="group" aria-label="분류" class="flex gap-2 overflow-x-auto">
      <button
        v-for="c in categories"
        :key="c"
        type="button"
        class="min-h-10 shrink-0 rounded-full px-4 text-[15px]"
        :class="selected === c ? 'bg-brand-700 font-bold text-white' : 'border border-line bg-white text-ink'"
        :aria-pressed="selected === c"
        @click="selected = c"
      >
        {{ c }}
      </button>
    </div>

    <section class="rounded-2xl bg-white px-5 pb-2 md:px-7">
      <LoadState
        :loading="loading"
        :error="error"
        :empty="filtered.length === 0"
        empty-text="해당 분류의 글이 없습니다."
        @retry="reload"
      >
        <div class="-mt-px">
          <PostRow v-for="p in filtered" :key="p.id" :post="p" />
        </div>
      </LoadState>
    </section>

    <p class="text-sm text-muted">
      글 추가·수정은 <code class="rounded bg-white px-1">public/data/posts.json</code>을 고친 뒤 배포하면 반영됩니다.
    </p>
  </main>
</template>
