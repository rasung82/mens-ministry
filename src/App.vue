<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import BottomTabBar from '@/components/BottomTabBar.vue'
</script>

<template>
  <AppHeader />
  <!-- 모바일에서는 하단 탭 바 높이만큼 아래 여백 -->
  <div class="pb-20 md:pb-0">
    <RouterView />
  </div>
  <BottomTabBar />
</template>
