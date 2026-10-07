<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from './AppIcon.vue'
import { useAsync } from '@/composables/useAsync'
import { fetchMeetings } from '@/api'

const { data: meetings } = useAsync(fetchMeetings)

// 하단 탭은 칸이 좁으므로 모임은 앞에서 3개까지만 표시합니다.
// 나머지 모임은 홈 화면 카드에서 들어갈 수 있습니다.
const tabMeetings = computed(() => (meetings.value ?? []).slice(0, 3))
</script>

<template>
  <nav
    aria-label="하단 메뉴"
    class="fixed inset-x-0 bottom-0 z-10 grid h-[68px] auto-cols-fr grid-flow-col border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
  >
    <RouterLink to="/" class="tab" exact-active-class="tab-active">
      <AppIcon name="home" />홈
    </RouterLink>
    <RouterLink
      v-for="m in tabMeetings"
      :key="m.id"
      :to="`/meetings/${m.id}`"
      class="tab"
      active-class="tab-active"
    >
      <AppIcon :name="m.icon" />{{ m.navLabel }}
    </RouterLink>
    <RouterLink to="/board" class="tab" active-class="tab-active">
      <AppIcon name="board" />게시판
    </RouterLink>
  </nav>
</template>

<style scoped>
@reference "../style.css";

.tab {
  @apply flex flex-col items-center justify-center gap-0.5 text-xs text-muted;
}
.tab-active {
  @apply font-bold text-brand-700;
}
</style>
