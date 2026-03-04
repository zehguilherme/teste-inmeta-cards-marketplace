<template>
  <main class="flex flex-1 flex-col items-center justify-center bg-white px-4 py-8">
    <div class="flex flex-col items-center gap-6 text-center">
      <Logo class="text-black1 h-20 w-20" />

      <div class="flex flex-col gap-2">
        <h1 class="text-black2 text-4xl font-bold">404</h1>

        <p class="text-gray2 text-lg">Página não encontrada!</p>
      </div>

      <Button @click="navegarParaHome">Voltar para a Home</Button>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import Logo from '@/components/icons/Logo.vue'
import Button from '@/components/Button.vue'

const router = useRouter()

const navegarParaHome = () => {
  router.push('/')
}
</script>

<style></style>
