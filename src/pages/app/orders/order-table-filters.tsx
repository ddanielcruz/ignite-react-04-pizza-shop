import { SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function OrderTableFilters() {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>
      <Input placeholder="ID do pedido" className="h-8 w-auto" />
      <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="canceled">Cancelado</SelectItem>
            <SelectItem value="processing">Em preparo</SelectItem>
            <SelectItem value="delivering">Em entrega</SelectItem>
            <SelectItem value="delivered">Entregue</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="xs">
        <SearchIcon className="mr-2 size-4" />
        <span>Filtrar resultados</span>
      </Button>

      <Button type="button" variant="outline" size="xs">
        <XIcon className="mr-2 size-4" />
        <span>Remover filtros</span>
      </Button>
    </form>
  )
}
