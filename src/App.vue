<template>
  <Loading />

  <div class="font-display h-screen">
    <Header v-if="exibirHeader" />

    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

import Header from './components/Header.vue'
import Loading from './components/Loading.vue'

const router = useRouter()

const exibirHeader = computed(() => {
  const rotasSemHeader = ['/cadastro', '/login']

  return !rotasSemHeader.includes(router.currentRoute.value.path)
})
</script>

<style scoped></style>
