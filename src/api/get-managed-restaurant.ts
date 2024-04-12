import { api } from '@/lib/axios'

export interface GetManagedRestaurantResponse {
  id: string
  managerId: string | null
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>(
    '/managed-restaurant',
  )

  return response.data
}
