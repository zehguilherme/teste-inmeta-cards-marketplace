<template>
  <header class="border-b-gray1 border border-x-0 border-t-0 bg-white p-4">
    <div class="mx-auto max-w-342">
      <nav class="flex flex-col items-center justify-between md:flex-row">
        <RouterLink to="/" class="mb-5 flex items-center gap-2 hover:opacity-70 md:mb-0">
          <Logo class="text-black1 h-6 w-6" />

          <p class="text-black1 text-[20px] font-bold">CardSwap</p>
        </RouterLink>

        <div class="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            v-if="usuarioEstaLogado"
            variant="ghost"
            @click="() => router.push('/minhas-cartas')"
          >
            Minhas cartas
          </Button>

          <Button v-if="usuarioEstaLogado">
            <template v-slot:icon>
              <PlusCircle class="h-4 w-4" />
            </template>

            Nova solicitação de troca
          </Button>

          <span v-if="usuarioEstaLogado" class="text-gray2 flex items-center gap-2">
            <Person class="h-4 w-4" />

            <span class="text-[14px] font-medium">{{ authStore.usuario?.name }}</span>
          </span>

          <Button
            v-if="usuarioEstaLogado"
            variant="ghost"
            @click="authStore.logout"
            class="text-gray2"
          >
            <template v-slot:icon>
              <Logout class="h-4 w-4" />
            </template>

            Sair
          </Button>

          <div class="flex items-center gap-4">
            <Button v-if="!usuarioEstaLogado" @click="() => router.push('/login')">Entrar</Button>

            <Button
              v-if="!usuarioEstaLogado"
              variant="ghost"
              @click="() => router.push('/cadastro')"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'

import Button from './Button.vue'
import Logo from './icons/Logo.vue'
import PlusCircle from './icons/PlusCircle.vue'
import Person from './icons/Person.vue'
import Logout from './icons/Logout.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()

const authStore = useAuthStore()

const usuarioEstaLogado = computed(() => {
  if (!authStore.autenticado || authStore.usuario === null) {
    return false
  }

  return true
})
</script>

<style></style>
