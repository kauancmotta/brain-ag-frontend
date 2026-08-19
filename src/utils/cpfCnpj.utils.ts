const CPF_LENGTH = 11
const CNPJ_LENGTH = 14
const CPF_FIRST_DIGIT_WEIGHT = 10
const CPF_SECOND_DIGIT_WEIGHT = 11
const CNPJ_WEIGHTS_FIRST = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const CNPJ_WEIGHTS_SECOND = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
const MODULO_DIVISOR = 11

const hasAllSameDigits = (digits: string): boolean =>
  digits.split('').every((digit) => digit === digits[0])

const calculateCpfDigit = (digits: string, weight: number): number => {
  const sum = digits
    .split('')
    .reduce((acc, digit, index) => acc + Number(digit) * (weight - index), 0)

  const remainder = sum % MODULO_DIVISOR
  return remainder < 2 ? 0 : MODULO_DIVISOR - remainder
}

/** Validates the check digits of a CPF (numbers only, no formatting) */
export const validateCpfDigits = (cpf: string): boolean => {
  if (cpf.length !== CPF_LENGTH) return false
  if (hasAllSameDigits(cpf)) return false

  const firstDigit = calculateCpfDigit(cpf.slice(0, 9), CPF_FIRST_DIGIT_WEIGHT)
  if (firstDigit !== Number(cpf[9])) return false

  const secondDigit = calculateCpfDigit(cpf.slice(0, 10), CPF_SECOND_DIGIT_WEIGHT)
  return secondDigit === Number(cpf[10])
}

/**
 * Converts a character to its numeric value per IN 2.229/2024.
 * Uses charCode - 48 for all characters:
 * '0'-'9' → 0-9 | 'A'-'Z' → 17-42
 */
const convertCharToValue = (char: string): number =>
  char.toUpperCase().charCodeAt(0) - 48

const calculateCnpjVerifierDigit = (
  chars: string[],
  weights: number[]
): number => {
  const sum = chars.reduce(
    (acc, char, index) => acc + convertCharToValue(char) * weights[index],
    0
  )
  const remainder = sum % MODULO_DIVISOR
  return remainder < 2 ? 0 : MODULO_DIVISOR - remainder
}

/**
 * Validates both numeric and alphanumeric CNPJ (IN 2.229/2024).
 * Both formats share the same algorithm — the difference is handled
 * by convertCharToValue.
 */
export const validateCnpjDigits = (cnpj: string): boolean => {
  const normalized = cnpj.toUpperCase().replace(/[.\-/]/g, '')

  if (normalized.length !== CNPJ_LENGTH) return false
  if (hasAllSameDigits(normalized)) return false

  const chars = normalized.split('')

  const firstDigit = calculateCnpjVerifierDigit(chars.slice(0, 12), CNPJ_WEIGHTS_FIRST)
  if (firstDigit !== Number(chars[12])) return false

  const secondDigit = calculateCnpjVerifierDigit(chars.slice(0, 13), CNPJ_WEIGHTS_SECOND)
  return secondDigit === Number(chars[13])
}

/** Formats a raw CPF (11 digits) for display: 000.000.000-00 */
export const formatCpf = (cpf: string): string =>
  cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

/** Formats a CNPJ for display — supports alphanumeric format: AB.CDE.FGH/0001-00 */
export const formatCnpj = (cnpj: string): string => {
  const normalized = cnpj.toUpperCase().replace(/[.\-/]/g, '')
  return normalized.replace(/^(.{2})(.{3})(.{3})(.{4})(.{2})$/, '$1.$2.$3/$4-$5')
}

/** Formats a CPF or CNPJ for display based on its length */
export const formatDocument = (document: string): string => {
  if (!document) return '—'

  const normalized = document.toUpperCase().replace(/[.\-/\s]/g, '')

  if (normalized.length === CPF_LENGTH && /^\d+$/.test(normalized))
    return formatCpf(normalized)

  if (normalized.length === CNPJ_LENGTH)
    return formatCnpj(normalized)

  return document
}
export const normalizeDocument = (document: string): string =>
  document.toUpperCase().replace(/[.\-/\s]/g, '')