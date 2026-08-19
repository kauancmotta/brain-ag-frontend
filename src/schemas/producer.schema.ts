import { z } from 'zod'
import { validateCpfDigits, validateCnpjDigits } from '@/utils/cpfCnpj.utils'

const isValidDocument = (document: string): boolean => {
  const digitsOnly = document.replace(/\D/g, '')
  const normalized = document.toUpperCase().replace(/[.\-\/]/g, '')

  if (digitsOnly.length === 11) return validateCpfDigits(digitsOnly)
  if (normalized.length === 14) return validateCnpjDigits(normalized)

  return false
}

export const producerSchema = z.object({
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  document: z
    .string()
    .min(1, 'CPF ou CNPJ é obrigatório')
    .refine(isValidDocument, 'CPF ou CNPJ inválido'),
  email: z
    .string()
    .email('O email é inválido')
})

export type ProducerFormData = z.infer<typeof producerSchema>
