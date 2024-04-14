import { http, HttpResponse } from 'msw'

import { DeliverOrderRequest } from '../deliver-order'

export const deliverOrderMock = http.patch<DeliverOrderRequest>(
  '/orders/:orderId/deliver',
  ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
