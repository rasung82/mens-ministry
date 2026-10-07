<script setup lang="ts">
/** 로딩·오류·없음 상태를 한곳에서 표시 */
defineProps<{ loading: boolean; error?: unknown; empty?: boolean; emptyText?: string }>()
defineEmits<{ retry: [] }>()
</script>

<template>
  <div v-if="loading" class="py-16 text-center text-muted">불러오는 중…</div>
  <div v-else-if="error" class="flex flex-col items-center gap-3 py-16 text-center">
    <p class="text-body">데이터를 불러오지 못했습니다.</p>
    <button
      type="button"
      class="min-h-11 rounded-lg border border-brand-700 px-5 font-medium text-brand-700"
      @click="$emit('retry')"
    >
      다시 시도
    </button>
  </div>
  <div v-else-if="empty" class="py-16 text-center text-muted">{{ emptyText ?? '내용이 없습니다.' }}</div>
  <slot v-else />
</template>
