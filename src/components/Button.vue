<template>
  <button v-bind="attrs" :disabled="isDisabled" :class="classes">
    <span v-if="loading">Carregando...</span>

    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import type { ButtonHTMLAttributes } from 'vue'

type ButtonVariant = 'primary' | 'ghost'

interface OwnProps {
  loading?: boolean
  disabled?: boolean
  variant?: ButtonVariant
}

type ButtonProps = OwnProps & /* @vue-ignore */ ButtonHTMLAttributes

const props = withDefaults(defineProps<ButtonProps>(), {
  loading: false,
  disabled: false,
  variant: 'primary',
})

const attrs = useAttrs()

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-black1 text-white1 hover:opacity-70',
  ghost: 'bg-transparent text-black1 hover:opacity-70',
}

const isDisabled = computed(() => props.disabled || props.loading)

const classes = computed(() => {
  return [
    'flex h-8 items-center justify-center rounded-md p-3 text-[12px] font-medium',
    isDisabled.value
      ? 'cursor-not-allowed border border-gray1 text-gray1 opacity-90'
      : `${variantClasses[props.variant]} transition cursor-pointer`,
    attrs.class,
  ]
})
</script>

<style></style>
