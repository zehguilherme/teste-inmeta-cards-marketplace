<template>
  <Loading />

  <div class="font-display h-screen">
    <Header />

    <Home />
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Home from './pages/Home.vue'
import Loading from './components/Loading.vue'
</script>

<style scoped></style>
