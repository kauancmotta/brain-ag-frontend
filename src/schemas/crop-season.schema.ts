import { z } from 'zod'

export const cropSeasonSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, 'Informe o ano com quatro dígitos')
    .refine((year) => Number(year) >= 1900 && Number(year) <= 2100, {
      message: 'Informe um ano entre 1900 e 2100',
    }),
})

export type CropSeasonFormData = z.infer<typeof cropSeasonSchema>