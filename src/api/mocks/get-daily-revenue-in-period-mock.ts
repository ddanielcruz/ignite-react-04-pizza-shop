import { http, HttpResponse } from 'msw'

import { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    {
      date: '2024-04-01',
      receipt: 1000,
    },
    {
      date: '2024-04-02',
      receipt: 1300,
    },
    {
      date: '2024-04-03',
      receipt: 700,
    },
    {
      date: '2024-04-04',
      receipt: 850,
    },
    {
      date: '2024-04-05',
      receipt: 1050,
    },
    {
      date: '2024-04-06',
      receipt: 900,
    },
    {
      date: '2024-04-07',
      receipt: 1500,
    },
  ])
})
