import { describe, it, expect } from 'vitest'
import {
  validateCpfDigits,
  validateCnpjDigits,
  formatDocument,
  normalizeDocument,
} from '@/utils/cpfCnpj.utils'

describe('validateCpfDigits', () => {
  it('validates a valid CPF', () => {
    expect(validateCpfDigits('11144477735')).toBe(true)
  })

  it('rejects CPF with all same digits', () => {
    expect(validateCpfDigits('11111111111')).toBe(false)
  })

  it('rejects CPF with wrong check digit', () => {
    expect(validateCpfDigits('11144477700')).toBe(false)
  })

  it('rejects CPF with incorrect length', () => {
    expect(validateCpfDigits('1234567')).toBe(false)
  })
})

describe('validateCnpjDigits', () => {
  it('validates a valid numeric CNPJ', () => {
    expect(validateCnpjDigits('11222333000181')).toBe(true)
  })

  it('validates a valid alphanumeric CNPJ (IN 2.229/2024)', () => {
    expect(validateCnpjDigits('JHXT1RNV000154')).toBe(true)
  })

  it('validates a valid alphanumeric CNPJ with formatting', () => {
    expect(validateCnpjDigits('BS.3R4.RGT/0001-72')).toBe(true)
  })

  it('rejects CNPJ with all same digits', () => {
    expect(validateCnpjDigits('11111111111111')).toBe(false)
  })

  it('rejects CNPJ with wrong check digit', () => {
    expect(validateCnpjDigits('11222333000100')).toBe(false)
  })

  it('rejects CNPJ with incorrect length', () => {
    expect(validateCnpjDigits('1122233300018')).toBe(false)
  })
})

describe('formatDocument', () => {
  it('formats a CPF correctly', () => {
    expect(formatDocument('11144477735')).toBe('111.444.777-35')
  })

  it('formats a numeric CNPJ correctly', () => {
    expect(formatDocument('11222333000181')).toBe('11.222.333/0001-81')
  })

  it('formats an alphanumeric CNPJ correctly', () => {
    expect(formatDocument('JHXT1RNV000154')).toBe('JH.XT1.RNV/0001-54')
  })

  it('returns the original value when format is not recognized', () => {
    expect(formatDocument('123')).toBe('123')
  })
})

describe('normalizeDocument', () => {
  it('removes formatting from a CPF', () => {
    expect(normalizeDocument('111.444.777-35')).toBe('11144477735')
  })

  it('removes formatting from a numeric CNPJ', () => {
    expect(normalizeDocument('11.222.333/0001-81')).toBe('11222333000181')
  })

  it('removes formatting from an alphanumeric CNPJ', () => {
    expect(normalizeDocument('JH.XT1.RNV/0001-54')).toBe('JHXT1RNV000154')
  })

  it('keeps uppercase letters', () => {
    expect(normalizeDocument('bs.3r4.rgt/0001-72')).toBe('BS3R4RGT000172')
  })
})