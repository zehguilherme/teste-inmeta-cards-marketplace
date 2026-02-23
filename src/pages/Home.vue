<template>
  <div class="bg-white px-4 py-8">
    <div class="mx-auto max-w-342">
      <header class="mb-10 flex flex-col gap-2">
        <h1 class="text-black2 text-3xl font-bold">Marketplace</h1>

        <p class="text-gray2 text-[16px]">
          Explore as solicitações de troca abertas pela comunidade.
        </p>
      </header>

      <main class="flex flex-col gap-4">
        <SwapSolicitation />

        <SwapSolicitation />

        <SwapSolicitation />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SwapSolicitation from '@/components/SwapSolicitation.vue'
</script>

<style></style>
