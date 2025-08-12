import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

export const sendMessage = (token, message) => axios.post(`${API_BASE_URL}/chat`, { message }, { headers: { Authorization: `Bearer ${token}` } })