import { api } from '@/lib/axios'

export interface GetOrdersAmountResponse {
  amount: number
  diffFromYesterday: number
}

export async function getDayOrdersAmount() {
  const response = await api.get<GetOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  )

  return response.data
}
