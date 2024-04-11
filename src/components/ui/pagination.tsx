import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { Button } from './button'

interface PaginationProps {
  pageIndex: number
  perPage: number
  totalCount: number
}

export function Pagination({
  pageIndex,
  totalCount,
  perPage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  const isFirstPage = pageIndex === 0
  const isLastPage = pageIndex === pages - 1
  const hasPrevious = pageIndex > 0
  const hasNext = pageIndex < pages - 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} registro(s)
      </span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex + 1} de {pages}
        </div>
        <nav className="flex items-center gap-2">
          <Button variant="outline" size="icon-xs" disabled={isFirstPage}>
            <ChevronsLeftIcon className="size-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button variant="outline" size="icon-xs" disabled={!hasPrevious}>
            <ChevronLeftIcon className="size-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button variant="outline" size="icon-xs" disabled={!hasNext}>
            <ChevronRightIcon className="size-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button variant="outline" size="icon-xs" disabled={isLastPage}>
            <ChevronsRightIcon className="size-4" />
            <span className="sr-only">Última página</span>
          </Button>
        </nav>
      </div>
    </div>
  )
}
