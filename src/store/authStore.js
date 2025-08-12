import { create } from 'zustand'
import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  setUser: (u) => set({ user: u }),

  loginUser: async ({ email, password }) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password })
    localStorage.setItem('token', res.data.token)
    set({ user: res.data.user, token: res.data.token })
  },

  registerUser: async ({ name, email, password }) => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password })
    localStorage.setItem('token', res.data.token)
    set({ user: res.data.user, token: res.data.token })
  },

  logout: () => { localStorage.removeItem('token'); set({ user: null, token: null }) }
}))