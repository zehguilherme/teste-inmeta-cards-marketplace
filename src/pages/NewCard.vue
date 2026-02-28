<template>
  <div class="bg-white px-4 py-8">
    <ErrorModal
      v-model:model-value="modalErroAberta"
      :titulo="tituloErro"
      :mensagem="mensagemErro"
    />

    <div class="mx-auto max-w-342">
      <header class="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div class="mb-2 flex flex-col gap-2 sm:mb-0">
          <h1 class="text-black2 text-3xl font-bold">Nova carta</h1>

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
          class="h-10 px-4 py-2 text-[14px] font-semibold"
          @click="adicionarCartaListaUsuario"
        >
          Confirmar escolha
        </Button>
      </header>

      <main class="flex flex-wrap items-center justify-center gap-4 md:justify-start">
        <label
          v-for="carta in listaTodasCartasExistentes"
          :key="carta.id"
          class="w-full max-w-50 cursor-pointer rounded-lg hover:border-4 hover:border-red-700 hover:p-2"
          :class="listaCartasSelecionadas.includes(carta.id) && 'border-4 border-red-700 p-2'"
        >
          <input
            v-model="listaCartasSelecionadas"
            type="checkbox"
            :value="carta.id"
            class="sr-only"
          />

          <img :src="carta.imageUrl" :alt="carta.description" class="rounded-lg" />
        </label>
      </main>
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

const carregarTodasCartasExistentes = async () => {
  try {
    loadingStore.exibir('Carregando cartas...')

    const response = await axios.get<CardsListResponse>(
      `${import.meta.env.VITE_API_URL}/cards?rpp=9999&page=1`,
    )

    if (response.status !== 200) {
      modalErroAberta.value = true

      tituloErro.value = 'Erro'
      mensagemErro.value = 'Ocorreu um erro ao carregar as cartas do sistema!'

      return
    }

    listaTodasCartasExistentes.value = response.data.list
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
    loadingStore.exibir('Adicionando carta(s)...')

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
        ? 'Carta(s) adicionada(s) com sucesso!'
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

onMounted(() => {
  carregarTodasCartasExistentes()
})
</script>

<style></style>
