<script setup lang="ts">
import { useAsync } from '@/composables/useAsync'
import { fetchMeetings } from '@/api'

// 메뉴는 meetings.json 순서대로 자동 생성됩니다.
const { data: meetings } = useAsync(fetchMeetings)
</script>

<template>
  <header class="bg-brand-700 text-white">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4">
      <RouterLink to="/" class="text-lg font-bold md:text-xl">[3남전도회] 운영 안내</RouterLink>

      <!-- 데스크톱 메뉴 (모바일은 하단 탭 바 사용) -->
      <nav aria-label="주 메뉴" class="hidden flex-wrap gap-1 md:flex">
        <RouterLink to="/" class="nav-link" exact-active-class="nav-link-active">홈</RouterLink>
        <RouterLink
          v-for="m in meetings"
          :key="m.id"
          :to="`/meetings/${m.id}`"
          class="nav-link"
          active-class="nav-link-active"
        >
          {{ m.title }}
        </RouterLink>
        <RouterLink to="/board" class="nav-link" active-class="nav-link-active">게시판</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
@reference "../style.css";

.nav-link {
  @apply rounded-md px-3.5 py-2.5 font-medium text-white/90 hover:bg-white/10 hover:text-white;
}
.nav-link-active {
  @apply bg-white/15 text-white;
}
</style>
