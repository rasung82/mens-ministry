<script setup lang="ts">
import { computed } from 'vue'
import type { Meeting } from '@/types'
import AppIcon from '@/components/AppIcon.vue'
import { buildTimeline, daysUntil, parseIso } from '@/utils/timeline'

const props = defineProps<{
    items: Meeting['checklist']
    /** 행사 날짜 (YYYY-MM-DD). 있으면 오늘 기준으로 지금 단계를 표시합니다. */
    eventDate?: string
}>()

const today = new Date()
const event = computed(() => (props.eventDate ? parseIso(props.eventDate) : undefined))
const steps = computed(() => buildTimeline(props.items, event.value, today))

const dday = computed(() => {
    if (!event.value) return ''
    const n = daysUntil(event.value, today)
    return n > 0 ? `D-${n}` : n === 0 ? 'D-DAY' : '행사 종료'
})

const shortDate = (d?: Date) => (d ? `${d.getMonth() + 1}/${d.getDate()}` : '')
</script>

<template>
  <div>
    <p v-if="dday" class="mb-4 flex items-center gap-2 text-sm text-on-brand/80">
      <span class="rounded-full bg-on-brand px-3 py-1 text-[13px] font-bold tracking-wide text-white">{{ dday }}</span>
      <span v-if="event">{{ event.getMonth() + 1 }}월 {{ event.getDate() }}일 행사까지</span>
    </p>

    <ol>
      <li v-for="(s, i) in steps" :key="i" class="step" :data-state="s.state">
        <div class="rail">
          <span class="node">
            <span v-if="s.state === 'current'" class="pulse"></span>
            <AppIcon v-if="s.state === 'past'" name="check" class="relative size-[18px]" />
            <span v-else class="relative">{{ i + 1 }}</span>
          </span>
          <span class="line"></span>
        </div>

        <div class="body">
          <div class="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span class="when">{{ s.when }}</span>
            <span v-if="s.date" class="text-[13px] text-muted">{{ shortDate(s.date) }}</span>
            <span v-if="s.state === 'current'" class="now"><i></i>진행 중</span>
          </div>
          <p class="task">{{ s.task }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
@reference "../style.css";

.step {
  @apply grid grid-cols-[auto_1fr] gap-x-3.5 md:gap-x-4;
}
.rail {
  @apply flex flex-col items-center;
}
.node {
  @apply relative flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-700/35 bg-white/80 text-sm font-bold text-muted;
}
.line {
  @apply my-1 w-0 flex-1 border-l-2 border-dashed border-brand-700/30;
}
.step:last-child .line {
  @apply hidden;
}
.body {
  @apply pb-5;
}
.step:last-child .body {
  @apply pb-0;
}
.when {
  @apply rounded-full bg-white/80 px-2.5 py-0.5 text-[13px] font-bold text-on-brand;
}
.task {
  @apply rounded-2xl bg-white/55 px-4 py-3 text-[15px] md:text-base;
}

/* 지난 단계 */
.step[data-state='past'] .node {
  @apply border-brand-700 bg-brand-700 text-white;
}
.step[data-state='past'] .line {
  @apply border-solid border-brand-700;
}
.step[data-state='past'] .task {
  @apply text-muted;
}

/* 지금 단계: 눈에 띄게 + 깜빡임 */
.step[data-state='current'] .node {
  @apply border-brand-700 bg-white text-brand-700 shadow-md;
}
.step[data-state='current'] .when {
  @apply bg-brand-700 text-white;
}
.step[data-state='current'] .task {
  @apply bg-white font-medium shadow-md ring-2 ring-brand-700/50;
}
.pulse {
  @apply absolute -inset-1 rounded-full bg-brand-700/35;
  animation: ripple 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.now {
  @apply inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-700;
}
.now i {
  @apply size-2 rounded-full bg-brand-700;
  animation: blink 1.2s ease-in-out infinite;
}
@keyframes ripple {
  0% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.7);
    opacity: 0;
  }
}
@keyframes blink {
  50% {
    opacity: 0.25;
  }
}
@media (prefers-reduced-motion: reduce) {
  .pulse,
  .now i {
    animation: none;
  }
}
</style>
