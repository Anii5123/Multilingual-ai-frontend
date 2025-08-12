import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'
export const getPlans = (token)=> axios.get(`${API_BASE_URL}/subscriptions`, { headers:{ Authorization:`Bearer ${token}` } })
export const createOrder = (token, planId)=> axios.post(`${API_BASE_URL}/subscriptions/create-order`, { planId }, { headers:{ Authorization:`Bearer ${token}` } })
export const verifyPayment = (token, payload)=> axios.post(`${API_BASE_URL}/subscriptions/verify-payment`, payload, { headers:{ Authorization:`Bearer ${token}` } })