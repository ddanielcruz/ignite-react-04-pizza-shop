import { UtensilsIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayOrdersAmountCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <UtensilsIcon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">4</span>
        <p className="text-xs text-muted-foreground">
          <span className="text-rose-500 dark:text-rose-400">-6%</span> em
          relação à ontem
        </p>
      </CardContent>
    </Card>
  )
}
