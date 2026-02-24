<template>
  <div>
    <h3 class="text-gray2 mb-3 text-[10px] font-bold uppercase">{{ textoAcaoTraduzido }}</h3>

    <img :src="imageUrl" :alt="imageAlternativeText" class="w-full max-w-50 rounded-lg" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface CardHomeProps {
  actionText: 'OFFERING' | 'RECEIVING'
  imageUrl: string
  imageAlternativeText: string
}

const props = defineProps<CardHomeProps>()

const textoAcaoTraduzido = computed(() => {
  if (props.actionText === 'OFFERING') {
    return 'Oferecendo'
  } else {
    return 'Recebendo'
  }
})
</script>

<style></style>
