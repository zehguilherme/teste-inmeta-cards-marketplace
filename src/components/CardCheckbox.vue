<template>
  <button
    type="button"
    class="w-full max-w-50 cursor-pointer touch-manipulation rounded-lg select-none"
    :class="
      isSelected
        ? 'border-4 border-red-700 p-2'
        : 'sm:hover:border-4 sm:hover:border-red-700 sm:hover:p-2'
    "
    style="-webkit-tap-highlight-color: transparent"
    @click="toggleCard"
  >
    <img
      :src="card.imageUrl"
      :alt="card.description"
      loading="lazy"
      class="pointer-events-none rounded-lg"
    />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { Card } from '@/types/Card'

const props = defineProps<{
  card: Card
  modelValue: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const isSelected = computed(() => props.modelValue.includes(props.card.id))

const toggleCard = () => {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(props.card.id)

  if (index === -1) {
    newValue.push(props.card.id)
  } else {
    newValue.splice(index, 1)
  }

  emit('update:modelValue', newValue)
}
</script>
