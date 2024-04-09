import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Posts',
      component: () => import('../component/Acceuil.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../component/BattleScene.vue'),
      props: true
    },
    {
      path: '/posts/:id',
      name: 'PostDetail',
      component: () => import('../component/Leaderboard.vue'),
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