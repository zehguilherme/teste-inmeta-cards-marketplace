import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import UserCards from '../pages/UserCards.vue'
import NewCard from '../pages/NewCard.vue'
import NewTrade from '../pages/NewTrade.vue'
import NotFound from '../pages/NotFound.vue'

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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
  {
    path: '/404',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

const rotasProtegidas = ['/minhas-cartas', '/minhas-cartas/nova-carta', '/nova-troca']

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (rotasProtegidas.includes(to.path) && !authStore.autenticado) {
    return '/'
  }
})

export default router
