import { createRouter, createWebHistory } from 'vue-router'
import Acceuil from '../component/Acceuil.vue'
import Leaderboard from '../component/Leaderboard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Acceuil
    },
    {
      path: '/about',
      name: 'about',
      component: Leaderboard
    }
  ]
})

export default router
