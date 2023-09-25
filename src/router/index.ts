import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/thread/:id',
      name: 'thread',
      component: () => import('../forum/View.vue')
    }
  ]
})

export default router
