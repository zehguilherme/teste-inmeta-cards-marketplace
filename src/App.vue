<template>
  <Loading />

  <div class="font-display flex h-screen flex-col">
    <Header />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import Header from './components/Header.vue'
import Loading from './components/Loading.vue'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.carregarUsuarioAutenticado()
})
</script>

<style scoped></style>
