import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
export const setupProfile = (token, formData) => axios.post(`${API_BASE_URL}/profile/setup`, formData, { headers:{ Authorization:`Bearer ${token}`, 'Content-Type':'multipart/form-data' } })