import { z } from 'zod'
import { AVAILABLE_CROPS } from '@/types/entity.types'

const MAX_FARM_AREA_HECTARES = 999_999

export const entitySchema = z
  .object({
    name: z
      .string()
      .min(3, 'Nome da fazenda deve ter pelo menos 3 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),
    producerId: z.string().min(1, 'Selecione um produtor'),
    city: z
      .string()
      .min(2, 'Cidade deve ter pelo menos 2 caracteres')
      .max(60, 'Cidade deve ter no máximo 60 caracteres'),
    state: z.string().length(2, 'Selecione um estado'),
    totalArea: z
      .number({ invalid_type_error: 'Informe a área total' })
      .positive('Área total deve ser maior que zero')
      .max(MAX_FARM_AREA_HECTARES, 'Área total excede o limite permitido'),
    agriculturalArea: z
      .number({ invalid_type_error: 'Informe a área agricultável' })
      .nonnegative('Área agricultável não pode ser negativa'),
    vegetationArea: z
      .number({ invalid_type_error: 'Informe a área de vegetação' })
      .nonnegative('Área de vegetação não pode ser negativa'),
    crops: z
      .array(z.enum(AVAILABLE_CROPS as [string, ...string[]]))
      .min(1, 'Selecione pelo menos uma cultura'),
  })
  .refine(
    ({ agriculturalArea, vegetationArea, totalArea }) =>
      agriculturalArea + vegetationArea <= totalArea,
    {
      message:
        'Área agricultável + área de vegetação não pode ultrapassar a área total',
      path: ['agriculturalArea'],
    }
  )

export type EntityFormData = z.infer<typeof entitySchema>
