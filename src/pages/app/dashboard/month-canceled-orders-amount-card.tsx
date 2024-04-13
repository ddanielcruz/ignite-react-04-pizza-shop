import { useQuery } from '@tanstack/react-query'
import { DollarSignIcon } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmountCard() {
  const { data: monthCanceledOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })
  const diffFromLastMonth = monthCanceledOrdersAmount?.diffFromLastMonth ?? 0

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <DollarSignIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthCanceledOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">8</span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn(
                  'text-emerald-500 dark:text-emerald-400',
                  diffFromLastMonth > 0 && 'text-rose-500 dark:text-rose-400',
                )}
              >
                {diffFromLastMonth > 0 && '+'}
                {diffFromLastMonth}%
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
