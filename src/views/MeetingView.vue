<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import LoadState from '@/components/LoadState.vue'
import MarkdownBlock from '@/components/MarkdownBlock.vue'
import AppIcon from '@/components/AppIcon.vue'
import { useAsync } from '@/composables/useAsync'
import { fetchMeeting } from '@/api'
import { formatDate, formatDotDate } from '@/utils/format'

const route = useRoute()
const id = computed(() => String(route.params.id))
const { data: meeting, loading, error, reload } = useAsync(() => fetchMeeting(id.value), id)

watchEffect(() => {
    if (meeting.value) document.title = `${meeting.value.title} · [○○전도회]`
})
</script>

<template>
  <LoadState
    :loading="loading"
    :error="error"
    :empty="!meeting"
    empty-text="해당 모임 안내를 찾을 수 없습니다."
    @retry="reload"
  >
    <template v-if="meeting">
      <!-- 제목 영역 -->
      <section class="bg-brand-300 text-on-brand">
        <div class="mx-auto flex max-w-4xl flex-col gap-3 px-4 pt-4 pb-14 md:px-6 md:pt-8 md:pb-16">
          <RouterLink to="/" class="flex min-h-11 w-fit items-center gap-1 text-sm text-on-brand/80 hover:text-on-brand">
            <AppIcon name="arrow-left" />홈으로
          </RouterLink>
          <span
            class="w-fit rounded-full px-2.5 py-0.5 text-[13px] font-bold"
            :class="meeting.tone === 'special' ? 'bg-accent-100 text-accent-800' : 'bg-white/50 text-on-brand'"
          >
            {{ meeting.cycle }}
          </span>
          <h1 class="text-[28px] font-bold md:text-4xl">{{ meeting.title }} 진행 가이드</h1>
          <p class="text-[15px] text-on-brand/80 md:text-base">{{ meeting.summary }}</p>
        </div>
      </section>

      <main class="mx-auto -mt-8 flex max-w-4xl flex-col gap-6 px-4 pb-12 md:gap-8 md:px-6 md:pb-20">
        <!-- 기본 정보 -->
        <section class="grid grid-cols-1 rounded-2xl bg-white shadow-sm md:grid-cols-4">
          <div class="info-cell">
            <span class="info-label">다음 일정</span>
            <span class="info-value">{{ meeting.nextDate ? formatDate(meeting.nextDate) : meeting.nextDateText }}</span>
          </div>
          <div class="info-cell">
            <span class="info-label">일시</span><span class="info-value">{{ meeting.schedule }}</span>
          </div>
          <div class="info-cell">
            <span class="info-label">장소</span><span class="info-value">{{ meeting.place }}</span>
          </div>
          <div class="info-cell">
            <span class="info-label">담당</span><span class="info-value">{{ meeting.owner }}</span>
          </div>
        </section>

        <!-- 준비 체크리스트 (체크 표시는 저장되지 않습니다) -->
        <section class="card bg-tint-1">
          <h2 class="card-title">준비 체크리스트</h2>
          <label
            v-for="(c, i) in meeting.checklist"
            :key="i"
            class="flex cursor-pointer items-start gap-3 border-t border-on-brand/15 py-3.5 text-[15px] md:text-base"
          >
            <input type="checkbox" class="mt-1 size-5 shrink-0 accent-brand-700" />
            <span><b class="mr-1.5 text-brand-700">{{ c.when }}</b>{{ c.task }}</span>
          </label>
        </section>

        <!-- 진행 순서 -->
        <section class="card bg-tint-2">
          <h2 class="card-title">진행 순서</h2>
          <ol class="ml-2 border-l-2 border-brand-700">
            <li v-for="(p, i) in meeting.program" :key="i" class="pb-4 pl-5 last:pb-0">
              <b>{{ p.title }}</b>
              <span v-if="p.note" class="block text-[15px] text-muted md:ml-2 md:inline">{{ p.note }}</span>
            </li>
          </ol>
        </section>

        <!-- 전임자 메모 -->
        <section v-if="meeting.memo" class="rounded-2xl bg-accent-100 p-5 text-accent-900 md:p-7">
          <h2 class="mb-1 text-lg font-bold">전임자 메모</h2>
          <MarkdownBlock :source="meeting.memo" class="text-accent-900" />
        </section>

        <!-- 첨부 자료 -->
        <section v-if="meeting.files.length" class="card bg-tint-3">
          <h2 class="card-title">첨부 자료</h2>
          <div class="flex flex-col gap-2.5 md:flex-row md:flex-wrap">
            <a
              v-for="f in meeting.files"
              :key="f.label"
              :href="f.url"
              target="_blank"
              rel="noopener"
              class="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-on-brand/15 bg-white/60 px-4 font-medium hover:border-brand-700"
            >
              {{ f.label }}<AppIcon name="download" class="text-brand-700" />
            </a>
          </div>
        </section>

        <p class="text-center text-sm text-muted">
          마지막 수정 {{ formatDotDate(meeting.updatedAt) }} · {{ meeting.updatedBy }}
        </p>
      </main>
    </template>
  </LoadState>
</template>

<style scoped>
@reference "../style.css";

.info-cell {
  @apply flex justify-between gap-3 border-b border-line px-5 py-3.5 last:border-b-0 md:flex-col md:justify-start md:gap-1 md:border-r md:border-b-0 md:py-5 md:last:border-r-0;
}
.info-label {
  @apply text-sm text-muted;
}
.info-value {
  @apply text-right text-[15px] font-bold md:text-left md:text-base;
}
.card {
  @apply rounded-2xl p-5 md:p-7;
}
.card-title {
  @apply mb-3 text-lg font-bold md:text-xl;
}
</style>
