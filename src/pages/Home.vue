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
        <SwapSolicitation
          v-for="solicitacao in listaSolicitacoesTrocaComputed"
          :key="solicitacao.id"
          :id="solicitacao.id"
          :user-id="solicitacao.userId"
          :created-at="solicitacao.createdAt"
          :user="solicitacao.user"
          :trade-cards="solicitacao.tradeCards"
        />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

import SwapSolicitation from '@/components/SwapSolicitation.vue'
import type { Trade } from '@/types/Trade'

interface TradeListResponse {
  list: Trade[]
  rpp: number
  page: number
  more: boolean
}

const listaSolicitacoesTroca = ref<Trade[]>([])

const carregarSolicitacoesTroca = async () => {
  try {
    const response = await axios.get<TradeListResponse>(
      `${import.meta.env.VITE_API_URL}/trades?rpp=10&page=1`,
    )

    if (response.status !== 200) {
      throw new Error('Erro ao carregar as solicitações de troca')
    }

    listaSolicitacoesTroca.value = response.data.list
  } catch (error) {}
}

const listaSolicitacoesTrocaComputed = computed(() => {
  return listaSolicitacoesTroca.value
})

onMounted(() => {
  carregarSolicitacoesTroca()
})
</script>

<style></style>
