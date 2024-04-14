import { http, HttpResponse } from 'msw'

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', async ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+1234567890',
    },
    totalInCents: 2500,
    orderItems: [
      {
        id: 'order-item-1',
        priceInCents: 1500,
        quantity: 1,
        product: {
          name: 'Product 1',
        },
      },
      {
        id: 'order-item-2',
        priceInCents: 1000,
        quantity: 1,
        product: {
          name: 'Product 2',
        },
      },
    ],
    status: 'pending',
    createdAt: new Date().toISOString(),
  })
})
