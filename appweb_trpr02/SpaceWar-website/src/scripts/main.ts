import { createApp } from 'vue'
import '../css/style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

import App from '../App.vue'
import router from '../router'


router.beforeEach((to, from, next) => {
  if (from !== null && from.name === 'BattleScene' && to.meta.confirmNavigation) {
      const confirmation = confirm("Are you sure you want to leave this page?");
      if (confirmation) {
          next();
      } else {
          next(false);
      }
  } else {
      next();
  }
});

const app = createApp(App)

app.use(router)

app.mount('#app')