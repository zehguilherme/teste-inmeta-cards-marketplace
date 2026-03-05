<template>
  <div class="bg-white px-4 py-8">
    <ErrorModal
      v-model:model-value="modalErroAberta"
      :titulo="tituloErro"
      :mensagem="mensagemErro"
    />

    <DeleteConfirmationModal
      v-model:model-value="modalExclusaoSolicitacaoAberta"
      @excluir-solicitacao-troca="excluirSolicitacaoTroca(modelSolicitacaoTroca?.id || '')"
    />

    <div class="mx-auto max-w-342">
      <div class="mb-10 flex flex-col gap-2">
        <h1 class="text-black2 text-3xl font-bold">Marketplace para troca de cartas</h1>

        <p class="text-gray2 text-[16px]">
          Explore as solicitações de troca abertas pela comunidade.
        </p>
      </div>

      <section class="flex flex-col gap-4">
        <template v-if="listaSolicitacoesTrocaComputed.length > 0">
          <SwapSolicitation
            v-for="solicitacao in listaSolicitacoesTrocaComputed"
            :key="solicitacao.id"
            :id="solicitacao.id"
            :user-id="solicitacao.userId"
            :created-at="solicitacao.createdAt"
            :user="solicitacao.user"
            :trade-cards="solicitacao.tradeCards"
            @remover-solicitacao-troca="abrirModalConfirmacaoExclusaoSolicitacao(solicitacao)"
          />
        </template>

        <NoSwapSolicitations v-else message="Ainda não há solicitações de troca" />

        <Pagination
          v-if="listaSolicitacoesTrocaComputed.length > 0"
          :page="page"
          :more="hasMore"
          @retroceder-pagina="retrocederPagina"
          @avancar-pagina="avancarPagina"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import axios, { AxiosError } from 'axios'
import { useToast } from 'vue-toastification'

import SwapSolicitation from '@/components/SwapSolicitation.vue'
import ErrorModal from '@/components/ErrorModal.vue'
import NoSwapSolicitations from '@/components/NoSwapSolicitations.vue'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue'
import Pagination from '@/components/Pagination.vue'
import { useLoadingStore } from '@/stores/loading'
import { useAuthStore } from '@/stores/auth'
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

const modalExclusaoSolicitacaoAberta = ref<boolean>(false)

const modelSolicitacaoTroca = ref<Trade>()

const listaSolicitacoesTroca = ref<Trade[]>([])

const loadingStore = useLoadingStore()
const authStore = useAuthStore()

const toast = useToast()

const page = ref(1)
const hasMore = ref(false)

const retrocederPagina = async () => {
  page.value--

  await carregarSolicitacoesTroca()
}

const avancarPagina = async () => {
  page.value++

  await carregarSolicitacoesTroca()
}

const abrirModalConfirmacaoExclusaoSolicitacao = (solicitacaoTroca: Trade) => {
  modalExclusaoSolicitacaoAberta.value = true

  modelSolicitacaoTroca.value = solicitacaoTroca
}

const excluirSolicitacaoTroca = async (idSolicitacaoTroca: string) => {
  try {
    loadingStore.exibir('Removendo solicitação de troca...')

    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/trades/${idSolicitacaoTroca}`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    if (response.status !== 200) {
      modalErroAberta.value = true

      tituloErro.value = 'Erro'
      mensagemErro.value = 'Ocorreu um erro ao remover a solicitação de troca!'

      return
    }

    toast.success('Solicitação de troca removida com sucesso!')

    modalExclusaoSolicitacaoAberta.value = false

    await carregarSolicitacoesTroca()
  } catch (error) {
    modalErroAberta.value = true

    tituloErro.value = 'Erro'

    if (error instanceof AxiosError) {
      mensagemErro.value =
        error.response?.data?.message || 'Ocorreu um erro ao remover a solicitação de troca!'
    } else if (error instanceof Error) {
      mensagemErro.value = error.message || 'Ocorreu um erro ao remover a solicitação de troca!'
    } else {
      mensagemErro.value = 'Ocorreu um erro ao remover a solicitação de troca!'
    }
  } finally {
    loadingStore.esconder()
  }
}

const carregarSolicitacoesTroca = async () => {
  try {
    loadingStore.exibir('Carregando solicitações de troca...')

    const response = await axios.get<TradeListResponse>(
      `${import.meta.env.VITE_API_URL}/trades?rpp=5&page=${page.value}`,
    )

    if (response.status !== 200) {
      modalErroAberta.value = true

      tituloErro.value = 'Erro'
      mensagemErro.value = 'Ocorreu um erro ao carregar as solicitações de troca!'

      return
    }

    listaSolicitacoesTroca.value = response.data.list

    hasMore.value = response.data.more
  } catch (error) {
    modalErroAberta.value = true

    tituloErro.value = 'Erro'

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

onMounted(async () => {
  await carregarSolicitacoesTroca()
})
</script>

<style></style>
