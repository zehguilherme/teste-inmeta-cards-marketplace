<template>
  <img
    loading="lazy"
    :src="imageUrl"
    :alt="imageAlternativeText"
    class="w-full max-w-50 rounded-lg"
  />
</template>

<script lang="ts" setup>
interface CardHomeProps {
  imageUrl: string
  imageAlternativeText: string
}

defineProps<CardHomeProps>()
</script>

<style></style>
