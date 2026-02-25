import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/cadastro',
    component: Register,
  },
  {
    path: '/login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
