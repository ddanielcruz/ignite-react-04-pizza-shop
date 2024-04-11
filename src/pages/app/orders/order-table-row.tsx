import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <SearchIcon className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        cluuhm96t000008l1hq6chhet
      </TableCell>
      <TableCell>há 15 minutos</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Pendente</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">Daniel Cruz</TableCell>
      <TableCell className="font-medium">R$ 49,90</TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRightIcon className="mr-2 size-3" />
          <span>Aprovar</span>
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="xs">
          <XIcon className="mr-2 size-3" />
          <span>Cancelar</span>
        </Button>
      </TableCell>
    </TableRow>
  )
}
