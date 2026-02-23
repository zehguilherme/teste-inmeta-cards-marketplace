<template>
  <div>
    <div class="mx-auto max-w-342">
      <header
        class="border-gray1 flex items-center gap-2 rounded-lg rounded-b-none border bg-zinc-50 p-4"
      >
        <img
          src="https://placehold.co/32"
          alt="Imagem da pessoa que fiz a solicitação de troca"
          class="rounded-full"
        />

        <div>
          <h2 class="text-black2 text-[14px] font-semibold">Nome da solicitação de troca</h2>

          <span class="text-gray2 flex items-center gap-1">
            <Clock class="h-3 w-3" />

            <span class="text-[10px]">Há menos de um minuto</span>
          </span>
        </div>
      </header>

      <main
        class="border-gray1 flex items-center gap-6 rounded-b-lg border border-t-0 bg-white p-4"
      >
        <CardHome action-text="Dá" />

        <span class="bg-gray4 border-gray1 rounded-full border p-2.5">
          <ArrowLeftRight class="h-5 w-5" />
        </span>

        <CardHome action-text="Recebe" />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardHome from './CardHome.vue'
import ArrowLeftRight from './icons/ArrowLeftRight.vue'
import Clock from './icons/Clock.vue'
</script>

<style></style>
