import { api } from '@/lib/axios'

export interface SignInBody {
  email: string
}

export async function signIn(body: SignInBody): Promise<void> {
  await api.post('/authenticate', body)
}
