<template>
  <div class="flex items-center justify-center gap-4">
    <Button variant="ghost" :disabled="paginaAnteriorEstaDesabilitada" @click="retrocederPagina">
      Anterior
    </Button>

    <span class="text-gray2 text-sm">{{ page }}</span>

    <Button variant="ghost" :disabled="proximaPaginaEstaDesabilitada" @click="avancarPagina">
      Próxima
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import Button from './Button.vue'

interface PaginationProps {
  page: number
  more: boolean
}

const props = defineProps<PaginationProps>()

const emit = defineEmits<{
  'avancar-pagina': []
  'retroceder-pagina': []
}>()

const avancarPagina = () => {
  emit('avancar-pagina')
}

const retrocederPagina = () => {
  emit('retroceder-pagina')
}

const paginaAnteriorEstaDesabilitada = computed(() => props.page <= 1)

const proximaPaginaEstaDesabilitada = computed(() => !props.more)
</script>
