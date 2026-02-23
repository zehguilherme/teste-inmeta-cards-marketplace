<template>
  <header class="border-b-gray1 flex items-center justify-between border border-x-0 border-t-0 p-4">
    <RouterLink to="/" class="flex items-center gap-2">
      <Logo class="text-black1 h-6 w-6" />

      <h1 class="text-black1 text-[20px] font-bold">CardSwap</h1>
    </RouterLink>

    <Button>Entrar</Button>
  </header>
</template>

<script lang="ts" setup>
import Button from './Button.vue'
import Logo from './icons/Logo.vue'
</script>

<style></style>
