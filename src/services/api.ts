import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL
const REQUEST_TIMEOUT_MS = 10_000
const AUTH_TOKEN_KEY = 'auth_token'

const retrieveAuthToken = (): string | null =>
  localStorage.getItem(AUTH_TOKEN_KEY)

const injectAuthorizationHeader = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = retrieveAuthToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

const handleResponseError = (error: AxiosError): Promise<never> => {
  const statusCode = error.response?.status

  if (statusCode === 401) {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    window.location.href = '/login'
  }

  return Promise.reject(error)
}

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(injectAuthorizationHeader)
api.interceptors.response.use((response) => response, handleResponseError)
