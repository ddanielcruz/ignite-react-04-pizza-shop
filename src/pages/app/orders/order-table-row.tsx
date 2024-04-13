import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import type { GetOrdersOrder, GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus, type OrderStatusType } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
  order: GetOrdersOrder
}

const CANCELLABLE_STATUS: OrderStatusType[] = ['pending', 'processing']

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()
  const isCancellable = CANCELLABLE_STATUS.includes(order.status)

  function updateOrderStatusOnCache(orderId: string, status: OrderStatusType) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    ordersListCache?.forEach(([cacheKey, cachedData]) => {
      if (!cachedData) {
        return
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cachedData,
        orders: cachedData.orders.map((cachedOrder) => {
          return cachedOrder.orderId === orderId
            ? { ...cachedOrder, status }
            : cachedOrder
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelPending } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovePending } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliverPending } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchPending } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_data, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <SearchIcon className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell>
        {formatDistanceToNow(new Date(order.createdAt), {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApprovePending}
          >
            <ArrowRightIcon className="mr-2 size-3" />
            <span>Aprovar</span>
          </Button>
        )}
        {order.status === 'processing' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchPending}
          >
            <ArrowRightIcon className="mr-2 size-3" />
            <span>Em entrega</span>
          </Button>
        )}
        {order.status === 'delivering' && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            disabled={isDeliverPending}
          >
            <ArrowRightIcon className="mr-2 size-3" />
            <span>Entregue</span>
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={!isCancellable || isCancelPending}
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
        >
          <XIcon className="mr-2 size-3" />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
