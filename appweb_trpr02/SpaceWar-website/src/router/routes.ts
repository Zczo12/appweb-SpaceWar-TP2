import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Accueil',
      component: () => import('../component/Acceuil.vue'),
      props: true
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('../component/Leaderboard.vue'),
      props: true
    },
    {
      path: '/battle_scene/:player_name/:ship_name',
      name: 'BattleScene',
      component: () => import('../component/BattleScene.vue'),
      props: true
    },
    {
      //TODO 
      //add a notFound page for error Handling
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../component/Acceuil.vue')
    }
  ]
  
  export default routes