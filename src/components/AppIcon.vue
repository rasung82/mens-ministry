<script setup lang="ts">
/** 하단 탭·버튼에 쓰는 선 아이콘. 새 아이콘은 paths에 추가하세요. */
defineProps<{ name: 'home' | 'calendar' | 'flame' | 'music' | 'book' | 'board' | 'phone' | 'download' | 'arrow-left' }>()
</script>

<template>
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="name === 'home'"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></template>
    <template v-else-if="name === 'calendar'">
      <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" />
    </template>
    <template v-else-if="name === 'flame'"><path d="M12 3c-3 4-5 6.5-5 10a5 5 0 0 0 10 0c0-3.5-2-6-5-10z" /></template>
    <template v-else-if="name === 'music'">
      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </template>
    <template v-else-if="name === 'book'"><path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z" /></template>
    <template v-else-if="name === 'board'"><path d="M4 4h16v12H8l-4 4z" /></template>
    <template v-else-if="name === 'phone'">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </template>
    <template v-else-if="name === 'download'"><path d="M12 4v12M6 11l6 6 6-6M5 20h14" /></template>
    <template v-else-if="name === 'arrow-left'"><path d="M19 12H5M11 6l-6 6 6 6" /></template>
  </svg>
</template>
