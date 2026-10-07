<script setup lang="ts">
import { currentSeason } from '@/utils/season'

/** 십자가와 계절 장식을 담은 상징 그림. 색은 테마 변수를 따라가므로 계절마다 자동으로 바뀝니다. */
const leaves = [
    { x: 38, y: 44, r: -30, c: 'fill-accent-800' },
    { x: 124, y: 58, r: 40, c: 'fill-brand-700' },
    { x: 112, y: 112, r: -15, c: 'fill-accent-800' },
    { x: 44, y: 104, r: 25, c: 'fill-brand-700' },
]
const petals = [0, 72, 144, 216, 288]
const rays = [0, 45, 90, 135, 180, 225, 270, 315]
const flakes = [
    { x: 40, y: 48, s: 0.8 },
    { x: 122, y: 56, s: 1 },
    { x: 118, y: 112, s: 0.7 },
    { x: 42, y: 106, s: 0.9 },
]
</script>

<template>
  <svg viewBox="0 0 160 160" role="img" :aria-label="'십자가와 ' + currentSeason + ' 장식'">
    <defs>
      <clipPath id="emblem-clip"><circle cx="80" cy="80" r="76" /></clipPath>
    </defs>
    <circle cx="80" cy="80" r="76" class="fill-white/60" />

    <g clip-path="url(#emblem-clip)">
      <!-- 언덕 -->
      <path d="M0 128 Q80 98 160 128 V160 H0 Z" class="fill-brand-400" />

      <!-- 가을: 낙엽 -->
      <template v-if="currentSeason === 'autumn'">
        <g v-for="(l, i) in leaves" :key="i" :transform="`translate(${l.x} ${l.y}) rotate(${l.r})`">
          <path d="M0 -13 C9 -8 11 2 0 13 C-11 2 -9 -8 0 -13Z" :class="l.c" />
          <path d="M0 -8 V17" class="stroke-white/70" stroke-width="1.5" fill="none" />
        </g>
      </template>

      <!-- 봄: 꽃 -->
      <template v-else-if="currentSeason === 'spring'">
        <g v-for="(f, i) in flakes" :key="i" :transform="`translate(${f.x} ${f.y}) scale(${f.s})`">
          <circle v-for="a in petals" :key="a" cx="0" cy="-7" r="5.5" class="fill-accent-800/70" :transform="`rotate(${a})`" />
          <circle r="3.5" class="fill-accent-100" />
        </g>
      </template>

      <!-- 여름: 햇살 -->
      <template v-else-if="currentSeason === 'summer'">
        <g transform="translate(124 42)">
          <circle r="12" class="fill-accent-800/80" />
          <path v-for="a in rays" :key="a" d="M0 -17 V-23" class="stroke-accent-800/80" stroke-width="3" stroke-linecap="round" :transform="`rotate(${a})`" />
        </g>
      </template>

      <!-- 겨울: 눈 결정 -->
      <template v-else>
        <g v-for="(f, i) in flakes" :key="i" :transform="`translate(${f.x} ${f.y}) scale(${f.s})`" class="stroke-brand-700" stroke-width="2.5" stroke-linecap="round" fill="none">
          <path d="M0 -10 V10 M-8.7 -5 L8.7 5 M-8.7 5 L8.7 -5" />
        </g>
      </template>
    </g>

    <!-- 십자가 -->
    <rect x="74" y="34" width="12" height="84" rx="3" class="fill-on-brand" />
    <rect x="52" y="58" width="56" height="12" rx="3" class="fill-on-brand" />
  </svg>
</template>
