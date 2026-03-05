<template>
  <div class="bg-white px-4 pt-8 pb-28 md:pb-8">
    <ErrorModal
      v-model:model-value="modalErroAberta"
      :titulo="tituloErro"
      :mensagem="mensagemErro"
    />

    <div class="mx-auto max-w-342">
      <div class="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 flex flex-col gap-2 sm:mb-0">
          <h1 class="text-black2 text-3xl font-bold">Nova Carta</h1>

          <p class="text-gray2 text-[16px]">
            Escolha uma ou mais cartas para adicionar ao seu acervo.
          </p>

          <p class="text-gray2 mt-2 text-[16px]">
            Você selecionou {{ listaCartasSelecionadas.length }}
            {{ listaCartasSelecionadas.length === 1 ? 'carta' : 'cartas' }}.
          </p>
        </div>

        <Button
          :disabled="listaCartasSelecionadas.length === 0"
          class="hidden h-10 px-4 py-2 text-[14px] font-semibold md:flex"
          @click="adicionarCartaListaUsuario"
        >
          Confirmar escolha
        </Button>
      </div>

      <section class="mb-10 flex flex-wrap items-center justify-center gap-4 md:justify-start">
        <CardCheckbox
          v-for="carta in listaTodasCartasExistentes"
          :key="carta.id"
          :card="carta"
          v-model="listaCartasSelecionadas"
        />
      </section>

      <Pagination
        v-if="listaTodasCartasExistentes.length > 0"
        :page="page"
        :more="hasMore"
        @retroceder-pagina="retrocederPagina"
        @avancar-pagina="avancarPagina"
      />

      <div
        class="fixed right-0 bottom-0 left-0 bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden"
      >
        <Button
          :disabled="listaCartasSelecionadas.length === 0"
          class="h-12 w-full text-[16px] font-semibold"
          @click="adicionarCartaListaUsuario"
        >
          Confirmar escolha
        </Button>
      </div>
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
import CardCheckbox from '@/components/CardCheckbox.vue'
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

const listaCartasSelecionadas = ref<string[]>([])
const listaTodasCartasExistentes = ref<Card[]>([])

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

const adicionarCartaListaUsuario = async () => {
  try {
    loadingStore.exibir(
      listaCartasSelecionadas.value.length > 1 ? 'Adicionando cartas...' : 'Adicionando carta...',
    )

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/me/cards`,
      {
        cardIds: listaCartasSelecionadas.value,
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    if (response.status !== 200) {
      modalErroAberta.value = true

      tituloErro.value = 'Erro'
      mensagemErro.value = 'Ocorreu um erro ao adicionar a(s) carta(s) ao seu acervo!'

      return
    }

    toast.success(
      listaCartasSelecionadas.value.length > 1
        ? 'Cartas adicionadas com sucesso!'
        : 'Carta adicionada com sucesso!',
    )

    router.push('/minhas-cartas')
  } catch (error) {
    if (error instanceof AxiosError) {
      mensagemErro.value =
        error.response?.data?.message || 'Ocorreu um erro ao adicionar a(s) carta(s) ao seu acervo!'
    } else if (error instanceof Error) {
      mensagemErro.value =
        error.message || 'Ocorreu um erro ao adicionar a(s) carta(s) ao seu acervo!'
    } else {
      mensagemErro.value = 'Ocorreu um erro ao adicionar a(s) carta(s) ao seu acervo!'
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
