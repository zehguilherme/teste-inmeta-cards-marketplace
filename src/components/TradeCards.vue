<template>
  <section class="border-gray1 flex-1 rounded-lg border p-5">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-black2 text-[18px] font-bold">{{ title }}</h2>

      <span class="text-gray2 text-[12px] font-bold">
        {{ selectedCardsQuantity }}/{{ allCardsQuantity }}
      </span>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-4 md:justify-start">
      <CardCheckbox
        v-for="carta in listaCartas"
        :key="carta.id"
        :card="carta"
        v-model="selectedCards"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { Card } from '@/types/Card'
import CardCheckbox from './CardCheckbox.vue'

defineProps<{
  title: string
  selectedCardsQuantity: number
  allCardsQuantity: number
  listaCartas: Card[]
}>()

const selectedCards = defineModel<string[]>({ default: [] })
</script>

<style></style>
