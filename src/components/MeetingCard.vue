<script setup lang="ts">
import { computed } from 'vue'
import type { Meeting } from '@/types'
import { formatDate } from '@/utils/format'

const props = defineProps<{ meeting: Meeting; index?: number }>()

// 카드마다 다른 파스텔 바탕을 돌려가며 씁니다.
const tints = ['bg-tint-1', 'bg-tint-2', 'bg-tint-3', 'bg-tint-4']
const tint = tints[(props.index ?? 0) % tints.length]

// 다음 일정이 없으면(비정기 모임 등) 표시하지 않습니다.
const nextSchedule = computed(() =>
    props.meeting.nextDate ? formatDate(props.meeting.nextDate, false) : (props.meeting.nextDateText ?? '').trim(),
)
</script>

<template>
  <article class="flex flex-col gap-3 rounded-2xl p-5 md:gap-4 md:p-7" :class="tint">
    <div class="flex items-center justify-between gap-2">
      <span
        class="rounded-full px-2.5 py-0.5 text-[13px] font-bold"
        :class="meeting.tone === 'special' ? 'bg-accent-100 text-accent-800' : 'bg-white/70 text-on-brand'"
      >
        {{ meeting.cycle }}
      </span>
      <span v-if="nextSchedule" class="text-sm text-muted">
        다음 {{ nextSchedule }}
      </span>
    </div>

    <h2 class="text-[22px] font-bold md:text-2xl">{{ meeting.title }}</h2>
    <p class="text-[15px] text-body md:text-base">{{ meeting.summary }}</p>

    <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[15px]">
      <dt class="text-muted">담당</dt>
      <dd>{{ meeting.owner }}</dd>
      <dt class="text-muted">장소</dt>
      <dd>{{ meeting.place }}</dd>
    </dl>

    <RouterLink
      :to="`/meetings/${meeting.id}`"
      class="mt-auto flex min-h-12 items-center justify-center rounded-lg bg-white/70 font-medium text-on-brand hover:bg-white"
    >
      진행 가이드 보기
    </RouterLink>
  </article>
</template>
