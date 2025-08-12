import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

export const authAPI = {
  login: (payload) => axios.post(`${API_BASE_URL}/auth/login`, payload),
  register: (payload) => axios.post(`${API_BASE_URL}/auth/register`, payload),
}