<template>
  <transition name="fade">
    <div
      v-if="store.estaCarregando"
      class="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/50"
    >
      <div
        class="flex h-full w-full flex-col items-center justify-center gap-4 bg-white p-6 shadow-lg"
      >
        <Spinner class="text-black1 h-8 w-8" />

        <p class="text-black1 text-base font-medium">{{ store.mensagem }}</p>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'
import Spinner from './icons/Spinner.vue'

const store = useLoadingStore()
</script>

<style></style>
