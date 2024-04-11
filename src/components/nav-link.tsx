import { Link, LinkProps, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

export function NavLink({ className, ...props }: LinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className={cn(
        'flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground',
        className,
      )}
      {...props}
    />
  )
}
