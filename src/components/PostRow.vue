<script setup lang="ts">
import type { Post } from '@/types'
import { formatDotDate } from '@/utils/format'

defineProps<{ post: Post }>()
</script>

<template>
  <RouterLink
    :to="`/board/${post.id}`"
    class="flex flex-col gap-0.5 border-t border-line py-3.5 hover:bg-brand-50 md:flex-row md:items-center md:justify-between md:gap-4"
  >
    <span class="text-[15px] md:text-base">
      <b class="font-medium text-brand-700">[{{ post.category }}]</b> {{ post.title }}
    </span>
    <span class="shrink-0 text-[13px] text-muted md:text-sm">{{ formatDotDate(post.date) }}</span>
  </RouterLink>
</template>
