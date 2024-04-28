import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Accueil',
      component: () => import('../views/Accueil.vue'),
      meta: {
        confirmNavigation: true
      }
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('../views/LeaderboardView.vue'),
      meta: {
        confirmNavigation: true
      }
    },
    {
      path: '/battle_scene/:player_name/:ship_name',
      name: 'BattleScene',
      component: () => import('../component/BattleScene.vue'),
      props: true,
    }
  ]
  
  export default routes