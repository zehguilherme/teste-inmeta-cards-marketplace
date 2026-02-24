<template>
  <div class="w-full">
    <div class="mx-auto max-w-342">
      <header
        class="border-gray1 flex items-center gap-2 rounded-lg rounded-b-none border bg-zinc-50 p-4"
      >
        <span class="bg-black1 flex h-8 w-8 items-center justify-center rounded-full">
          <span class="text-white1 text-[10px] font-bold">{{ iniciaisNomeUsuario }}</span>
        </span>

        <div>
          <h2 class="text-black2 text-[14px] font-semibold">{{ user.name }}</h2>

          <span class="text-gray2 flex items-center gap-1">
            <Clock class="h-3 w-3" />

            <span class="text-[10px]">{{ dataCriacaoFormatada }}</span>
          </span>
        </div>
      </header>

      <main
        class="border-gray1 flex flex-wrap items-center justify-center gap-6 rounded-b-lg border border-t-0 bg-white p-4 md:justify-start"
      >
        <CardHome
          v-for="carta in listaCartas"
          :key="carta.id"
          :image-url="carta.card.imageUrl"
          :image-alternative-text="carta.card.description"
          :action-text="carta.type"
        />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import CardHome from './CardHome.vue'
import Clock from './icons/Clock.vue'
import type { Trade, TradeCard } from '@/types/Trade'

import { format } from 'date-fns'

const { createdAt, user, tradeCards } = defineProps<Trade>()

const listaCartas = ref<TradeCard[]>([])

const iniciaisNomeUsuario = computed(() => {
  const arrayPartesNome = user.name.trim().split(/\s+/)

  if (arrayPartesNome.length === 0) {
    return ''
  }

  // só um nome
  if (arrayPartesNome.length === 1) {
    return arrayPartesNome[0]?.charAt(0).toUpperCase()
  }

  // dois ou mais: primeira letra do primeiro e do último
  const primeiraLetra = arrayPartesNome[0]?.charAt(0)
  const ultimaLetra = arrayPartesNome[arrayPartesNome.length - 1]?.charAt(0)

  return ((primeiraLetra || '') + (ultimaLetra || '')).toUpperCase()
})

const dataCriacaoFormatada = computed(() => {
  return format(new Date(createdAt), "dd/MM/yyyy 'às' HH:mm")
})

onMounted(() => {
  listaCartas.value = tradeCards
})
</script>

<style></style>
