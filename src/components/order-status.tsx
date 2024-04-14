import { cn } from '@/lib/utils'

export type OrderStatusType =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered'

interface OrderStatusProps {
  status: OrderStatusType
}

const orderStatusMap: Record<
  OrderStatusType,
  { label: string; color: string }
> = {
  pending: {
    label: 'Pendente',
    color: 'bg-slate-400',
  },
  canceled: {
    label: 'Cancelado',
    color: 'bg-rose-500',
  },
  processing: {
    label: 'Em preparo',
    color: 'bg-amber-500',
  },
  delivering: {
    label: 'Em entrega',
    color: 'bg-amber-500',
  },
  delivered: {
    label: 'Entregue',
    color: 'bg-emerald-500',
  },
}

export function OrderStatus({ status }: OrderStatusProps) {
  const { label, color } = orderStatusMap[status]
  return (
    <div className="flex items-center gap-2">
      <span className={cn('size-2 rounded-full', color)} data-testid="badge" />
      <span className="font-medium text-muted-foreground">{label}</span>
    </div>
  )
}
