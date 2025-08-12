import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
export const fetchFestivals = (token) => axios.get(`${API_BASE_URL}/festivals`, { headers:{ Authorization:`Bearer ${token}` } })