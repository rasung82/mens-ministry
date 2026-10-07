<script setup lang="ts">
import { computed } from 'vue'
import { renderMarkdown } from '@/utils/format'

const props = defineProps<{ source: string }>()
const html = computed(() => renderMarkdown(props.source))
</script>

<template>
  <!-- renderMarkdown 안에서 DOMPurify로 정화하므로 v-html 사용이 안전합니다 -->
  <div class="prose-md" v-html="html" />
</template>
