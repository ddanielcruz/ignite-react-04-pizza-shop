import { useQuery } from '@tanstack/react-query'
import { UtensilsIcon } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function MonthOrdersAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })
  const diffFromLastMonth = monthOrdersAmount?.diffFromLastMonth ?? 0

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (mês)</CardTitle>
        <UtensilsIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn(
                  'text-emerald-500 dark:text-emerald-400',
                  diffFromLastMonth < 0 && 'text-rose-500 dark:text-rose-400',
                )}
              >
                {diffFromLastMonth}%
              </span>{' '}
              relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
