import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import UserCards from '../pages/UserCards.vue'
import NewCard from '../pages/NewCard.vue'
import NewTrade from '../pages/NewTrade.vue'

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
  {
    path: '/minhas-cartas',
    component: UserCards,
  },
  {
    path: '/minhas-cartas/nova-carta',
    component: NewCard,
  },
  {
    path: '/nova-troca',
    component: NewTrade,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
