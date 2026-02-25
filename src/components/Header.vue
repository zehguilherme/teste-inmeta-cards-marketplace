<template>
  <header class="border-b-gray1 border border-x-0 border-t-0 bg-white p-4">
    <div class="mx-auto max-w-342">
      <nav class="flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 hover:opacity-70">
          <Logo class="text-black1 h-6 w-6" />

          <p class="text-black1 text-[20px] font-bold">CardSwap</p>
        </RouterLink>

        <div class="flex items-center gap-4">
          <Button>Entrar</Button>

          <Button variant="ghost" @click="() => router.push('/cadastro')">Cadastrar</Button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import Button from './Button.vue'
import Logo from './icons/Logo.vue'

const router = useRouter()
</script>

<style></style>
