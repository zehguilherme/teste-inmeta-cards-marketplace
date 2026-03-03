<template>
  <label
    class="w-full max-w-50 cursor-pointer rounded-lg hover:border-4 hover:border-red-700 hover:p-2"
    :class="isSelected && 'border-4 border-red-700 p-2'"
  >
    <input type="checkbox" :checked="isSelected" class="sr-only" @change="toggleCard" />

    <img :src="card.imageUrl" :alt="card.description" class="rounded-lg" />
  </label>
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
