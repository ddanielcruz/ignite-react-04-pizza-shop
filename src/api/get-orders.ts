import type { OrderStatusType } from '@/components/order-status'
import { api } from '@/lib/axios'

export interface GetOrdersRequest {
  pageIndex: number | null
  customerName?: string | null
  orderId?: string | null
  status?: string | null
}

export type GetOrdersOrder = {
  orderId: string
  createdAt: string
  status: OrderStatusType
  customerName: string
  total: number
}

export interface GetOrdersResponse {
  orders: Array<GetOrdersOrder>
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersRequest) {
  const response = await api.get<GetOrdersResponse>('/orders', {
    params: {
      pageIndex: pageIndex ?? 0,
      customerName,
      orderId,
      status,
    },
  })

  return response.data
}
