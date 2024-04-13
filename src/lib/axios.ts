import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
})

if (env.VITE_ENABLE_API_DELAY) {
  const MAXIMUM_TIMEOUT_IN_MS = 2000

  api.interceptors.request.use(async (config) => {
    const timeout = Math.round(Math.random() * MAXIMUM_TIMEOUT_IN_MS)
    await new Promise((resolve) => setTimeout(resolve, timeout))

    return config
  })
}
