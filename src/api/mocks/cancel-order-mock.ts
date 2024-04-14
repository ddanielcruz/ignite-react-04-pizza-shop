import { http, HttpResponse } from 'msw'

import { CancelOrderRequest } from '../cancel-order'

export const cancelOrderMock = http.patch<CancelOrderRequest>(
  '/orders/:orderId/cancel',
  ({ params }) => {
    if (params.orderId === 'error-order-id') {
      return new HttpResponse(null, { status: 400 })
    }

    return new HttpResponse(null, { status: 204 })
  },
)
