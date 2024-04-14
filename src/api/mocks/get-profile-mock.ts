import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  async () => {
    return HttpResponse.json({
      id: 'any-manager-id',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: null,
      role: 'manager',
      createdAt: new Date('2024-04-01T12:00:00Z'),
      updatedAt: new Date('2024-04-01T12:00:00Z'),
    })
  },
)
