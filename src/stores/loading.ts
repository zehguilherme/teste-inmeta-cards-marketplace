import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const estaCarregando = ref<boolean>(false)
  const mensagem = ref<string>('Carregando...')

  function exibir(mensagemCustomizada?: string) {
    if (mensagemCustomizada) {
      mensagem.value = mensagemCustomizada
    } else {
      mensagem.value = 'Carregando...'
    }

    estaCarregando.value = true
  }

  function esconder() {
    estaCarregando.value = false

    mensagem.value = 'Carregando...'
  }

  return { estaCarregando, mensagem, exibir, esconder }
})
