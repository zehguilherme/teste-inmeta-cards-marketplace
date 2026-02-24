<template>
  <svg
    v-bind="$attrs"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 6v6l4 2"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
</template>

<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})
</script>

<style></style>
