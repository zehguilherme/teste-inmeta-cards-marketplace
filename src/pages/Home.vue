<template>
  <div class="bg-white px-4 py-8">
    <ErrorModal
      v-model:model-value="modalErroAberta"
      :titulo="tituloErro"
      :mensagem="mensagemErro"
    />

    <div class="mx-auto max-w-342">
      <header class="mb-10 flex flex-col gap-2">
        <h1 class="text-black2 text-3xl font-bold">Marketplace</h1>

        <p class="text-gray2 text-[16px]">
          Explore as solicitações de troca abertas pela comunidade.
        </p>
      </header>

      <main class="flex flex-col gap-4">
        <template v-if="listaSolicitacoesTrocaComputed.length > 0">
          <SwapSolicitation
            v-for="solicitacao in listaSolicitacoesTrocaComputed"
            :key="solicitacao.id"
            :id="solicitacao.id"
            :user-id="solicitacao.userId"
            :created-at="solicitacao.createdAt"
            :user="solicitacao.user"
            :trade-cards="solicitacao.tradeCards"
          />
        </template>

        <NoSwapSolicitations v-else message="Ainda não há solicitações de troca" />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import axios, { AxiosError } from 'axios'

import SwapSolicitation from '@/components/SwapSolicitation.vue'
import ErrorModal from '@/components/ErrorModal.vue'
import NoSwapSolicitations from '@/components/NoSwapSolicitations.vue'
import { useLoadingStore } from '@/stores/loading'
import type { Trade } from '@/types/Trade'

interface TradeListResponse {
  list: Trade[]
  rpp: number
  page: number
  more: boolean
}

const modalErroAberta = ref<boolean>(false)
const tituloErro = ref<string>('')
const mensagemErro = ref<string>('')

const listaSolicitacoesTroca = ref<Trade[]>([])

const loadingStore = useLoadingStore()

const carregarSolicitacoesTroca = async () => {
  try {
    loadingStore.exibir('Carregando solicitações de troca...')

    const response = await axios.get<TradeListResponse>(
      `${import.meta.env.VITE_API_URL}/trades?rpp=10&page=1`,
    )

    if (response.status !== 200) {
      modalErroAberta.value = true

      tituloErro.value = 'Erro'
      mensagemErro.value = 'Ocorreu um erro ao carregar as solicitações de troca!'

      return
    }

    listaSolicitacoesTroca.value = response.data.list
  } catch (error) {
    if (error instanceof AxiosError) {
      mensagemErro.value =
        error.response?.data?.message || 'Ocorreu um erro ao carregar as solicitações de troca!'
    } else if (error instanceof Error) {
      mensagemErro.value = error.message || 'Ocorreu um erro ao carregar as solicitações de troca!'
    } else {
      mensagemErro.value = 'Ocorreu um erro ao carregar as solicitações de troca!'
    }
  } finally {
    loadingStore.esconder()
  }
}

const listaSolicitacoesTrocaComputed = computed(() => {
  return listaSolicitacoesTroca.value
})

onMounted(() => {
  carregarSolicitacoesTroca()
})
</script>

<style></style>
