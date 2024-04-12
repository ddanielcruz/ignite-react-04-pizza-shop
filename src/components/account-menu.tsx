import { useQuery } from '@tanstack/react-query'
import { BuildingIcon, ChevronDownIcon, LogOutIcon } from 'lucide-react'
import { useState } from 'react'

import { getManagedRestaurant } from '@/api/get-managed-restaurant'
import { getProfile } from '@/api/get-profile'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const [isProfileDialogOpened, setIsProfileDialogOpened] = useState(false)

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
    })

  const handleCloseProfileDialog = () => {
    setIsProfileDialogOpened(false)
  }

  return (
    <Dialog
      open={isProfileDialogOpened}
      onOpenChange={setIsProfileDialogOpened}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
          >
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-32" />
            ) : (
              <span>{managedRestaurant?.name}</span>
            )}
            <ChevronDownIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <BuildingIcon className="mr-2 size-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="text-red-500 focus:text-red-500 dark:text-red-400">
            <LogOutIcon className="mr-2 size-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog onClose={handleCloseProfileDialog} />
    </Dialog>
  )
}
