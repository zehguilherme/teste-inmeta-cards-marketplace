import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import type { User } from '@/types/User'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

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
  user: User
}

export const useAuthStore = defineStore('auth', () => {
  const usuario = ref<User | null>(null)

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
      const { data } = await api.post<RespostaAuth>('/login', credenciais)

      definirToken(data.token)

      usuario.value = data.user

      return true
    } catch (error) {
      limparToken()

      usuario.value = null

      throw error
    }
  }

  const cadastrarUsuario = async (dados: DadosRegistro) => {
    try {
      const { data } = await api.post<RespostaAuth>('/register', dados)

      definirToken(data.token)

      usuario.value = data.user

      return true
    } catch (error) {
      limparToken()

      usuario.value = null

      throw error
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
      const { data } = await api.get<User>('/me', {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })

      usuario.value = data
    } catch {
      logout()
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
