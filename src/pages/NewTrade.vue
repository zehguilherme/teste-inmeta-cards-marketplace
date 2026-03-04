<template>
  <div class="bg-white px-4 py-8">
    <ErrorModal
      v-model:model-value="modalErroAberta"
      :titulo="tituloErro"
      :mensagem="mensagemErro"
    />

    <div class="mx-auto max-w-342">
      <div class="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 flex flex-col gap-2 sm:mb-0">
          <h1 class="text-black2 text-3xl font-bold">Nova Solicitação de Troca</h1>

          <p class="text-gray2 text-[16px]">Selecione as cartas para negociar.</p>
        </div>

        <Button
          :disabled="
            listaCartasUsuarioPossuiSelecionadas.length === 0 ||
            listaCartasUsuarioBuscaSelecionadas.length === 0
          "
          class="h-10 px-4 py-2 text-[14px] font-semibold"
          @click="criarNovaSolicitacaoTroca"
        >
          Publicar Troca
        </Button>
      </div>

      <section class="flex flex-col flex-wrap gap-8 sm:flex-row">
        <TradeCards
          title="Suas Cartas"
          :selected-cards-quantity="listaCartasUsuarioPossuiSelecionadas.length"
          :lista-cartas="authStore.usuario?.cards || []"
          v-model="listaCartasUsuarioPossuiSelecionadas"
        />

        <div class="flex flex-1 flex-col gap-4">
          <TradeCards
            title="O que você busca?"
            :selected-cards-quantity="listaCartasUsuarioBuscaSelecionadas.length"
            :lista-cartas="listaTodasCartasExistentes || []"
            v-model="listaCartasUsuarioBuscaSelecionadas"
          />

          <Pagination
            v-if="listaTodasCartasExistentes.length > 0"
            :page="page"
            :more="hasMore"
            @retroceder-pagina="retrocederPagina"
            @avancar-pagina="avancarPagina"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios, { AxiosError } from 'axios'

import ErrorModal from '@/components/ErrorModal.vue'
import Button from '@/components/Button.vue'
import TradeCards from '@/components/TradeCards.vue'
import Pagination from '@/components/Pagination.vue'
import { useLoadingStore } from '@/stores/loading'
import { useAuthStore } from '@/stores/auth'
import type { Card } from '@/types/Card'

interface CardsListResponse {
  list: Card[]
  rpp: number
  page: number
  more: boolean
}

const modalErroAberta = ref<boolean>(false)
const tituloErro = ref<string>('')
const mensagemErro = ref<string>('')

const listaTodasCartasExistentes = ref<Card[]>([])
const listaCartasUsuarioPossuiSelecionadas = ref<string[]>([])
const listaCartasUsuarioBuscaSelecionadas = ref<string[]>([])

const loadingStore = useLoadingStore()
const authStore = useAuthStore()

const toast = useToast()

const router = useRouter()

const page = ref(1)
const hasMore = ref(false)

const retrocederPagina = async () => {
  page.value--

  await carregarTodasCartasExistentes()
}

const avancarPagina = async () => {
  page.value++

  await carregarTodasCartasExistentes()
}

const carregarTodasCartasExistentes = async () => {
  try {
    loadingStore.exibir('Carregando cartas...')

    const response = await axios.get<CardsListResponse>(
      `${import.meta.env.VITE_API_URL}/cards?rpp=10&page=${page.value}`,
    )

    if (response.status !== 200) {
      modalErroAberta.value = true

      tituloErro.value = 'Erro'
      mensagemErro.value = 'Ocorreu um erro ao carregar as cartas do sistema!'

      return
    }

    listaTodasCartasExistentes.value = response.data.list

    hasMore.value = response.data.more
  } catch (error) {
    if (error instanceof AxiosError) {
      mensagemErro.value =
        error.response?.data?.message || 'Ocorreu um erro ao carregar as cartas do sistema!'
    } else if (error instanceof Error) {
      mensagemErro.value = error.message || 'Ocorreu um erro ao carregar as cartas do sistema!'
    } else {
      mensagemErro.value = 'Ocorreu um erro ao carregar as cartas do sistema!'
    }
  } finally {
    loadingStore.esconder()
  }
}

const criarNovaSolicitacaoTroca = async () => {
  try {
    loadingStore.exibir('Criando nova solicitação de troca...')

    const cards = [
      ...listaCartasUsuarioPossuiSelecionadas.value.map((cardId) => ({
        cardId: cardId,
        type: 'OFFERING',
      })),
      ...listaCartasUsuarioBuscaSelecionadas.value.map((cardId) => ({
        cardId: cardId,
        type: 'RECEIVING',
      })),
    ]

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/trades`,
      {
        cards: cards,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    if (response.status !== 201) {
      modalErroAberta.value = true

      tituloErro.value = 'Erro'
      mensagemErro.value = 'Ocorreu um erro ao adicionar ao criar a solicitação de troca!'

      return
    }

    toast.success('Solicitação de troca criada com sucesso!')

    router.push('/')
  } catch (error) {
    if (error instanceof AxiosError) {
      mensagemErro.value =
        error.response?.data?.message ||
        'Ocorreu um erro ao adicionar ao criar a solicitação de troca!'
    } else if (error instanceof Error) {
      mensagemErro.value =
        error.message || 'Ocorreu um erro ao adicionar ao criar a solicitação de troca!'
    } else {
      mensagemErro.value = 'Ocorreu um erro ao adicionar ao criar a solicitação de troca!'
    }
  } finally {
    loadingStore.esconder()
  }
}

onMounted(async () => {
  await carregarTodasCartasExistentes()
})
</script>

<style></style>
