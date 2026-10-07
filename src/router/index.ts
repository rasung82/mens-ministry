import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomeView, meta: { title: '홈' } },
        {
            path: '/meetings/:id',
            name: 'meeting',
            component: () => import('@/views/MeetingView.vue'),
        },
        {
            path: '/board',
            name: 'board',
            component: () => import('@/views/BoardView.vue'),
            meta: { title: '게시판' },
        },
        {
            path: '/board/:id',
            name: 'post',
            component: () => import('@/views/PostView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],
    scrollBehavior: (_to, _from, saved) => saved ?? { top: 0 },
})
