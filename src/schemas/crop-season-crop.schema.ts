import { z } from 'zod'

export const cropSeasonCropSchema = z.object({
  cropId: z.string().min(1, 'Selecione uma cultura'),
  plantedArea: z
    .number({ invalid_type_error: 'Informe a área plantada' })
    .positive('A área plantada deve ser maior que zero'),
})

export type CropSeasonCropFormData = z.infer<typeof cropSeasonCropSchema>