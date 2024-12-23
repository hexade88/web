import { createWebHistory, createRouter } from 'vue-router'
import routes from './routes.js'

const router = new createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
