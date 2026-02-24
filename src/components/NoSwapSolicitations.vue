<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <p class="text-gray2 text-lg">
      {{ mensagem }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  message: string
}>()

const mensagem = computed(() => props.message ?? 'Nenhum item encontrado')
</script>

<style></style>
