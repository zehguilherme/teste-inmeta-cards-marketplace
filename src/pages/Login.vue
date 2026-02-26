<template>
  <main class="flex flex-1 flex-col items-center justify-center gap-8 bg-white px-4 py-8">
    <ErrorModal
      v-model:model-value="modalErroAberta"
      :titulo="tituloErro"
      :mensagem="mensagemErro"
    />

    <div class="flex flex-col items-center">
      <span class="bg-black1 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
        <Logo class="text-white1 h-7 w-7" />
      </span>

      <h1 class="text-black2 mb-1 text-center text-[24px] font-bold">CardSwap</h1>

      <p class="text-gray2 text-center text-[14px]">Sua plataforma de trocas de cartas</p>
    </div>

    <section
      class="border-gray1 flex w-full max-w-[384px] flex-col items-center rounded-lg border p-6"
    >
      <Form
        novalidate
        @submit="logarUsuario"
        :validation-schema="userSchema"
        v-slot="{ isSubmitting, errors, isValidating, meta }"
        class="mb-6 flex w-full flex-col gap-4"
      >
        <Input
          id="email"
          name="email"
          label="E-mail"
          placeholder="Ex: meuemail@dominio.com"
          type="email"
          v-model="modelEmail"
          required
        />

        <Input
          id="password"
          name="password"
          label="Senha"
          type="password"
          v-model="modelSenha"
          required
        />

        <Button
          :disabled="!formularioEstaValido(isSubmitting, isValidating, errors, meta)"
          type="submit"
          class="h-10 w-full text-[14px] font-semibold"
        >
          Entrar
        </Button>
      </Form>

      <hr class="text-gray1 mb-6 w-full" />

      <RouterLink
        to="/cadastro"
        class="text-gray2 text-center text-[12px] font-medium hover:opacity-70"
      >
        Ainda não tem conta? Cadastre-se
      </RouterLink>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Form, type FormMeta, type GenericObject } from 'vee-validate'
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import { AxiosError } from 'axios'

import Button from '@/components/Button.vue'
import Input from '@/components/form/Input.vue'
import Logo from '@/components/icons/Logo.vue'
import ErrorModal from '@/components/ErrorModal.vue'
import { useLoadingStore } from '@/stores/loading'
import { useAuthStore } from '@/stores/auth'

const modelEmail = ref('')
const modelSenha = ref('')

const modalErroAberta = ref<boolean>(false)
const tituloErro = ref<string>('')
const mensagemErro = ref<string>('')

const loadingStore = useLoadingStore()
const authStore = useAuthStore()

const router = useRouter()

const toast = useToast()

const userSchema = yup.object({
  email: yup.string().required('Campo obrigatório').email('Informe um e-mail válido').trim(),
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .trim(),
})

type User = yup.InferType<typeof userSchema>

const formularioEstaValido = (
  isSubmitting: boolean,
  isValidating: boolean,
  errors: Partial<Record<string, string | undefined>>,
  meta: FormMeta<GenericObject>,
) => {
  return (
    !isSubmitting && !isValidating && Object.keys(errors).length === 0 && meta.dirty && meta.valid
  )
}

const logarUsuario = async (values: GenericObject | User) => {
  try {
    loadingStore.exibir('Realizando login...')

    const loginRealizadoComSucesso = await authStore.login({
      email: values.email,
      password: values.password,
    })

    if (!loginRealizadoComSucesso) {
      modalErroAberta.value = true

      tituloErro.value = 'Erro'

      mensagemErro.value = 'Ocorreu um erro ao logar! Verifique os dados e tente novamente!'

      return
    }

    toast.success(`Seja bem-vindo(a) ${authStore.usuario?.name}!`)

    modelEmail.value = ''
    modelSenha.value = ''

    router.push('/')
  } catch (error) {
    modalErroAberta.value = true

    tituloErro.value = 'Erro'

    if (error instanceof AxiosError) {
      mensagemErro.value =
        error.response?.data?.message ||
        'Ocorreu um erro ao logar! Verifique os dados e tente novamente!'
    } else if (error instanceof Error) {
      mensagemErro.value =
        error.message || 'Ocorreu um erro ao logar! Verifique os dados e tente novamente!'
    } else {
      mensagemErro.value = 'Ocorreu um erro ao logar! Verifique os dados e tente novamente!'
    }
  } finally {
    loadingStore.esconder()
  }
}
</script>

<style></style>
