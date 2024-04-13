import type { OrderStatusType } from '@/components/order-status'
import { api } from '@/lib/axios'

export interface GetOrderDetailsRequest {
  orderId: string
}

export interface GetOrderDetailsResponse {
  id: string
  createdAt: string
  status: OrderStatusType
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: Array<{
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }>
}

export async function getOrderDetails({ orderId }: GetOrderDetailsRequest) {
  const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

  return response.data
}
