import { useQuery } from '@tanstack/react-query'
import { UtensilsIcon } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function DayOrdersAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })
  const diffFromYesterday = dayOrdersAmount?.diffFromYesterday ?? 0

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <UtensilsIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {dayOrdersAmount.amount.toLocaleString('pt-BR')}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn(
                  'text-emerald-500 dark:text-emerald-400',
                  diffFromYesterday < 0 && 'text-rose-500 dark:text-rose-400',
                )}
              >
                {diffFromYesterday > 0 && '+'}
                {diffFromYesterday}%
              </span>{' '}
              em relação à ontem
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
