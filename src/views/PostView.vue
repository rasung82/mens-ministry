<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LoadState from '@/components/LoadState.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import AppIcon from '@/components/AppIcon.vue'
import { useAsync } from '@/composables/useAsync'
import { fetchPost } from '@/api'
import { formatDotDate } from '@/utils/format'

const route = useRoute()
const id = computed(() => Number(route.params.id))
const { data: post, loading, error, reload } = useAsync(() => fetchPost(id.value), id)
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-4 md:px-6 md:py-10">
    <RouterLink to="/board" class="flex min-h-11 w-fit items-center gap-1 text-sm text-brand-700">
      <AppIcon name="arrow-left" />목록으로
    </RouterLink>

    <LoadState :loading="loading" :error="error" :empty="!post" empty-text="글을 찾을 수 없습니다." @retry="reload">
      <article v-if="post" class="flex flex-col gap-4 rounded-2xl bg-white p-5 md:p-8">
        <header class="flex flex-col gap-2 border-b border-line pb-4">
          <span class="w-fit rounded-full bg-brand-100 px-2.5 py-0.5 text-[13px] font-bold text-brand-700">
            {{ post.category }}
          </span>
          <h1 class="text-[22px] leading-snug font-bold md:text-[28px]">{{ post.title }}</h1>
          <span class="text-sm text-muted">{{ post.author }} · {{ formatDotDate(post.date) }}</span>
        </header>
        <MarkdownBlock :source="post.body" />
      </article>
    </LoadState>
  </main>
</template>
