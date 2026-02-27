<template>
  <div :class="['flex w-full flex-col', containerClassName]">
    <div class="flex w-full flex-col gap-3.25">
      <label
        v-if="label"
        :for="id"
        :class="[
          disabled ? 'cursor-not-allowed' : '',
          'text-black1 text-[14px]/[14px] font-medium',
          labelClassName,
        ]"
      >
        {{ label }}
        <span v-if="required">*</span>
      </label>

      <div class="relative w-full">
        <!-- Slot para ícone -->
        <div v-if="$slots.default" class="text-black1 absolute top-1/2 left-3 w-4 -translate-y-1/2">
          <slot />
        </div>

        <Field
          v-bind="$attrs"
          :name="name"
          :id="id"
          :type="type"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="handleInput"
          :class="[
            disabled ? 'border-gray1 text-gray1 cursor-not-allowed' : '',
            'outline-black1 border-gray1 text-black1 placeholder:text-gray2 h-10 w-full rounded-md border bg-white py-3 text-[14px] font-normal placeholder:text-[14px] placeholder:font-normal',
            $slots.default ? 'pr-3.25 pl-10.25' : 'px-3.25',
            inputClassName,
          ]"
        />
      </div>
    </div>

    <ErrorMessage :name="name" class="mt-1 text-sm text-red-600" />
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, Field } from 'vee-validate'

type InputType = 'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url'

interface InputProps {
  label?: string
  id: string
  name: string
  modelValue: string | undefined
  placeholder?: string
  type: InputType
  disabled?: boolean
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  required?: boolean
}

defineProps<InputProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', event: Event): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newValue = target.value

  emit('update:modelValue', newValue)

  emit('change', event)
}
</script>

<style></style>
