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
          <h1 class="text-black2 text-3xl font-bold">Minhas Cartas</h1>

          <p class="text-gray2 text-[16px]">
            Você possui {{ listaCartas?.length }} cartas em seu acervo.
          </p>
        </div>

        <Button
          class="h-10 px-4 py-2 text-[14px] font-semibold"
          @click="() => router.push('/minhas-cartas/nova-carta')"
        >
          <template v-slot:icon>
            <Plus class="h-4 w-4" />
          </template>

          Nova Carta
        </Button>
      </header>

      <main class="flex flex-col gap-4">
        <template v-if="listaCartas?.length > 0">
          <div class="flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <img
              v-for="carta in listaCartas"
              :key="carta.id"
              :src="carta.imageUrl"
              :alt="carta.description"
              class="w-full max-w-50 rounded-lg"
            />
          </div>
        </template>

        <NoUserCards v-else />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'

import ErrorModal from '@/components/ErrorModal.vue'
import NoUserCards from '@/components/NoUserCards.vue'
import Button from '@/components/Button.vue'
import Plus from '@/components/icons/Plus.vue'
import { useLoadingStore } from '@/stores/loading'
import { useAuthStore } from '@/stores/auth'
import type { Card } from '@/types/Card'

const modalErroAberta = ref<boolean>(false)
const tituloErro = ref<string>('')
const mensagemErro = ref<string>('')

const listaCartas = ref<Card[]>([])

const loadingStore = useLoadingStore()
const authStore = useAuthStore()

const router = useRouter()

const carregarCartasUsuario = async () => {
  try {
    loadingStore.exibir('Carregando suas cartas...')

    const response = await axios.get<Card[]>(
      `${import.meta.env.VITE_API_URL}/me/cards`,

      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      },
    )

    listaCartas.value = response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      mensagemErro.value =
        error.response?.data?.message || 'Ocorreu um erro ao carregar as suas cartas!'
    } else if (error instanceof Error) {
      mensagemErro.value = error.message || 'Ocorreu um erro ao carregar as suas cartas!'
    } else {
      mensagemErro.value = 'Ocorreu um erro ao carregar as suas cartas!'
    }
  } finally {
    loadingStore.esconder()
  }
}

onMounted(async () => {
  await carregarCartasUsuario()
})
</script>

<style></style>
