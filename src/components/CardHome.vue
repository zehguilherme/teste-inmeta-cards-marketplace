<template>
  <div>
    <h3 class="text-gray2 mb-3 text-[10px] font-bold uppercase">{{ actionText }}</h3>

    <img src="https://placehold.co/112x160" alt="Imagem de uma carta" class="rounded-lg" />
  </div>
</template>

<script lang="ts" setup>
interface CardHomeProps {
  actionText: 'Dá' | 'Recebe'
}

withDefaults(defineProps<CardHomeProps>(), {})
</script>

<style></style>
