import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  getManagedRestaurant,
  type GetManagedRestaurantResponse,
} from '@/api/get-managed-restaurant'
import { updateProfile, type UpdateProfileBody } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().trim(),
})

type StoreProfileData = z.infer<typeof storeProfileSchema>

interface StoreProfileDialogProps {
  onClose: () => void
}

export function StoreProfileDialog({ onClose }: StoreProfileDialogProps) {
  const queryClient = useQueryClient()

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  })

  function updateManagedRestaurantCache(profileBody: UpdateProfileBody) {
    const cached = queryClient.getQueryData<GetManagedRestaurantResponse>([
      'managed-restaurant',
    ])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(
        ['managed-restaurant'],
        { ...cached, ...profileBody },
      )
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate: (variables) => {
      const { cached } = updateManagedRestaurantCache(variables)
      return { previousProfile: cached }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileData>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  const handleSaveProfile = async ({ name, description }: StoreProfileData) => {
    try {
      await updateProfileFn({
        name,
        description: description || null,
      })

      toast.success('Perfil atualizado com sucesso!')
      onClose()
    } catch {
      toast.error('Falha ao atualizar o perfil, tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>

      <form id="profile-form" onSubmit={handleSubmit(handleSaveProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" className="col-span-3" {...register('name')} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>
      </form>

      <DialogFooter>
        <Button variant="ghost" className="mr-2" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          form="profile-form"
          type="submit"
          variant="success"
          disabled={isSubmitting}
        >
          Salvar
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
