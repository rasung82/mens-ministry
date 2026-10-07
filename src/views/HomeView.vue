<script setup lang="ts">
import { computed } from 'vue'
import MeetingCard from '@/components/MeetingCard.vue'
import PostRow from '@/components/PostRow.vue'
import LoadState from '@/components/LoadState.vue'
import AppIcon from '@/components/AppIcon.vue'
import SeasonEmblem from '@/components/SeasonEmblem.vue'
import { useAsync } from '@/composables/useAsync'
import { fetchMeetings, fetchOfficers, fetchPosts } from '@/api'
import { telHref } from '@/utils/format'

const meetings = useAsync(fetchMeetings)
const posts = useAsync(fetchPosts)
const officers = useAsync(fetchOfficers)

const recentPosts = computed(() => (posts.data.value ?? []).slice(0, 4))
</script>

<template>
  <!-- 상단 소개 (헤더와 같은 남색으로 이어짐) -->
  <section class="bg-brand-300 text-on-brand">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pt-6 pb-16 md:px-6 md:pt-10 md:pb-20">
      <div class="flex flex-col gap-3">
        <h1 class="text-[28px] leading-snug font-bold md:text-[38px]">
          새로 맡으셨나요?<br class="md:hidden" />
          여기서 시작하세요.
        </h1>
        <p class="max-w-xl text-[15px] text-on-brand/80 md:text-base">
          전도회의 정기 모임과 행사를 어떻게 준비하는지, 전임자가 남긴 기록을 한곳에 모았습니다.
        </p>
      </div>
      <SeasonEmblem class="size-20 shrink-0 self-start md:size-44 md:self-center" />
    </div>
  </section>

  <main class="mx-auto -mt-10 flex max-w-6xl flex-col gap-8 px-4 pb-12 md:gap-12 md:px-6 md:pb-20">
    <!-- 모임 카드: meetings.json에 항목을 추가하면 카드가 자동으로 늘어납니다 -->
    <LoadState :loading="meetings.loading.value" :error="meetings.error.value" @retry="meetings.reload">
      <section class="grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] md:gap-5">
        <MeetingCard v-for="(m, i) in meetings.data.value" :key="m.id" :meeting="m" :index="i" />
      </section>
    </LoadState>

    <section class="flex flex-col gap-6 md:flex-row md:items-start">
      <!-- 게시판 최근 글 -->
      <div class="flex min-w-0 flex-col rounded-2xl bg-white p-5 md:flex-[2] md:p-7">
        <div class="flex items-center justify-between gap-3 pb-1">
          <h2 class="text-lg font-bold md:text-xl">게시판 · 최근 글</h2>
          <RouterLink to="/board" class="py-3 text-sm text-brand-700 md:text-[15px]">전체 보기</RouterLink>
        </div>
        <LoadState
          :loading="posts.loading.value"
          :error="posts.error.value"
          :empty="recentPosts.length === 0"
          empty-text="아직 글이 없습니다."
          @retry="posts.reload"
        >
          <PostRow v-for="p in recentPosts" :key="p.id" :post="p" />
        </LoadState>
      </div>

      <aside class="flex flex-col gap-4 md:flex-1">
        <!-- 인수인계 순서 -->
        <div class="flex flex-col gap-2 rounded-2xl bg-accent-100 p-5 text-accent-900 md:order-2 md:p-6">
          <h2 class="text-[17px] font-bold">인수인계 순서</h2>
          <ol class="list-decimal pl-5 text-[15px]">
            <li>이 페이지 읽기</li>
            <li>전임자와 30분 통화</li>
            <li>자료실 양식 내려받기</li>
          </ol>
        </div>

        <!-- 올해 임원 -->
        <div class="flex flex-col rounded-2xl bg-tint-4 p-5 md:order-1 md:p-6">
          <h2 class="mb-2 text-lg font-bold">올해 임원</h2>
          <LoadState :loading="officers.loading.value" :error="officers.error.value" @retry="officers.reload">
            <div
              v-for="o in officers.data.value"
              :key="o.role"
              class="flex min-h-12 items-center justify-between gap-3 border-t border-on-brand/15 text-[15px]"
            >
              <span><span class="inline-block w-11 text-muted">{{ o.role }}</span>{{ o.name }}</span>
              <a
                v-if="o.phone"
                :href="telHref(o.phone)"
                class="flex min-h-11 items-center gap-1 font-medium text-brand-700"
                :aria-label="`${o.role} ${o.name}에게 전화`"
              >
                <AppIcon name="phone" />전화
              </a>
            </div>
          </LoadState>
        </div>
      </aside>
    </section>
  </main>
</template>
