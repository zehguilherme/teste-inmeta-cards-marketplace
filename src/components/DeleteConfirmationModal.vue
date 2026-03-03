<template>
  <dialog
    ref="referenciaModal"
    @click="aoClicarFora"
    @close="fecharModal"
    class="border-white1 fixed top-1/2 left-1/2 m-0 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white p-0 drop-shadow-md backdrop:bg-black/50"
  >
    <div class="p-6 shadow-xl">
      <h2 class="text-black1 mb-2 text-[18px]/[28px] font-semibold">
        Excluir solicitação de troca
      </h2>

      <p class="text-black1 mb-4 text-[14px]/[20px] font-normal">
        Deseja realmente excluir esta solicitação de troca?
      </p>

      <div class="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button variant="ghost" @click="fecharModal" class="order-1 sm:order-0">Cancelar</Button>

        <Button @click="excluirSolicitacaoTroca">Remover</Button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import Button from './Button.vue'

interface ErrorModalProps {
  modelValue: boolean
}

const props = defineProps<ErrorModalProps>()

const emit = defineEmits<{
  (evento: 'update:modelValue', valor: boolean): void
  (evento: 'excluirSolicitacaoTroca'): void
}>()

const referenciaModal = ref<HTMLDialogElement | null>(null)

watch(
  () => props.modelValue,
  (estaAberta) => {
    const modal = referenciaModal.value

    if (!modal) {
      return
    }

    if (estaAberta) {
      if (!modal.open) {
        modal.showModal()
      }
    } else {
      if (modal.open) {
        modal.close()
      }
    }
  },
  { immediate: true },
)

const excluirSolicitacaoTroca = () => {
  emit('excluirSolicitacaoTroca')
}

const fecharModal = () => {
  emit('update:modelValue', false)
}

const aoClicarFora = (evento: MouseEvent) => {
  const modal = referenciaModal.value

  if (!modal) {
    return
  }

  const elementoModalEmTela = modal.getBoundingClientRect()

  const clicouDentroDaModal =
    elementoModalEmTela.top <= evento.clientY &&
    evento.clientY <= elementoModalEmTela.bottom &&
    elementoModalEmTela.left <= evento.clientX &&
    evento.clientX <= elementoModalEmTela.right

  if (!clicouDentroDaModal) {
    fecharModal()
  }
}
</script>
