import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useLoadingStore } from './loading'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export interface Card {
  id: string
  name: string
  description: string
  imageUrl: string
  createdAt: string
}

export interface Usuario {
  id: string
  name: string
  email: string
  cards: Card[]
}

interface CredenciaisLogin {
  email: string
  password: string
}

interface DadosRegistro {
  name: string
  email: string
  password: string
}

interface RespostaAuth {
  token: string
  user: Usuario
}

export const useAuthStore = defineStore('auth', () => {
  const loadingStore = useLoadingStore()

  const usuario = ref<Usuario | null>(null)

  const token = ref<string | null>(localStorage.getItem('auth_token'))

  const autenticado = computed<boolean>(() => !!token.value)

  /**
   * Define token e persiste no localStorage
   */
  const definirToken = (novoToken: string) => {
    token.value = novoToken

    localStorage.setItem('auth_token', novoToken)
  }

  const limparToken = () => {
    token.value = null

    localStorage.removeItem('auth_token')
  }

  const login = async (credenciais: CredenciaisLogin) => {
    try {
      loadingStore.exibir('Realizando login...')

      const { data } = await api.post<RespostaAuth>('/login', credenciais)

      definirToken(data.token)

      usuario.value = data.user

      return true
    } catch (error) {
      limparToken()

      usuario.value = null

      throw error
    } finally {
      loadingStore.esconder()
    }
  }

  const cadastrarUsuario = async (dados: DadosRegistro) => {
    try {
      loadingStore.exibir('Criando conta...')

      const { data } = await api.post<RespostaAuth>('/register', dados)

      definirToken(data.token)

      usuario.value = data.user

      return true
    } catch (error) {
      limparToken()

      usuario.value = null

      throw error
    } finally {
      loadingStore.esconder()
    }
  }

  const logout = () => {
    limparToken()

    usuario.value = null
  }

  /**
   * Carrega usuário autenticado (ex: ao iniciar app)
   */
  const carregarUsuarioAutenticado = async () => {
    if (!token.value) return

    try {
      loadingStore.exibir('Carregando usuário...')

      const { data } = await api.get<Usuario>('/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      usuario.value = data
    } catch {
      logout()
    } finally {
      loadingStore.esconder()
    }
  }

  return {
    usuario,
    token,
    autenticado,
    login,
    cadastrarUsuario,
    logout,
    carregarUsuarioAutenticado,
  }
})
