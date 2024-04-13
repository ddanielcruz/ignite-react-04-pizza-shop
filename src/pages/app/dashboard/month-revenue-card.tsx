import { useQuery } from '@tanstack/react-query'
import { DollarSignIcon } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function MonthRevenueCard() {
  const { data: monthRevenue } = useQuery({
    queryKey: ['metrics', 'month-revenue-amount'],
    queryFn: getMonthRevenue,
  })
  const diffFromLastMonth = monthRevenue?.diffFromLastMonth ?? 0

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSignIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {monthRevenue && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={cn(
                  'text-emerald-500 dark:text-emerald-400',
                  diffFromLastMonth < 0 && 'text-rose-500 dark:text-rose-400',
                )}
              >
                {diffFromLastMonth > 0 && '+'}
                {diffFromLastMonth}%
              </span>{' '}
              em relação ao mês passado
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
