import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', async () => {
  return HttpResponse.json({
    id: 'any-restaurant-id',
    name: 'Pizza Shop',
    description: 'The best pizza in town',
    managerId: 'any-manager-id',
    createdAt: new Date('2024-04-01T12:00:00Z'),
    updatedAt: new Date('2024-04-01T12:00:00Z'),
  })
})
