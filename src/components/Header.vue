<template>
  <header class="border-b-gray1 border border-x-0 border-t-0 bg-white p-4">
    <div class="mx-auto max-w-342">
      <nav class="flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2">
          <Logo class="text-black1 h-6 w-6" />

          <p class="text-black1 text-[20px] font-bold">CardSwap</p>
        </RouterLink>

        <Button>Entrar</Button>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Button from './Button.vue'
import Logo from './icons/Logo.vue'
</script>

<style></style>
