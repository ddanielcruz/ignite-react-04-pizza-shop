import { http, HttpResponse } from 'msw'

import { OrderStatusType } from '@/components/order-status'

import { GetOrdersOrder, GetOrdersResponse } from '../get-orders'

const statuses: OrderStatusType[] = [
  'pending',
  'processing',
  'canceled',
  'delivering',
  'delivered',
]

const orders = Array.from({ length: 60 }).map<GetOrdersOrder>((_, index) => {
  return {
    orderId: `order-${index + 1}`,
    customerName: `Customer ${index + 1}`,
    status: statuses[index % statuses.length],
    total: Math.floor(Math.random() * 10_000),
    createdAt: new Date().toISOString(),
  }
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex')
      ? Number(searchParams.get('pageIndex'))
      : 0
    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status') as OrderStatusType | undefined

    const filteredOrders = orders.filter((order) => {
      if (orderId && order.orderId !== orderId) {
        return false
      }

      if (customerName && !order.customerName.includes(customerName)) {
        return false
      }

      if (status && order.status !== status) {
        return false
      }

      return true
    })
    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
      orders: paginatedOrders,
    })
  },
)
