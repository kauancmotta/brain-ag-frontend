import { describe, it, expect } from 'vitest'
import {
  isValidFarmAreaDistribution,
  calculateUndeclaredArea,
  formatHectares,
} from '@/utils/area.utils'

describe('isValidFarmAreaDistribution', () => {
  it('aprova quando a soma é menor que a área total', () => {
    expect(
      isValidFarmAreaDistribution({
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 30,
      })
    ).toBe(true)
  })

  it('aprova quando a soma é exatamente igual à área total', () => {
    expect(
      isValidFarmAreaDistribution({
        totalArea: 100,
        agriculturalArea: 70,
        vegetationArea: 30,
      })
    ).toBe(true)
  })

  it('rejeita quando a soma ultrapassa a área total', () => {
    expect(
      isValidFarmAreaDistribution({
        totalArea: 100,
        agriculturalArea: 80,
        vegetationArea: 30,
      })
    ).toBe(false)
  })
})

describe('calculateUndeclaredArea', () => {
  it('calcula corretamente a área não declarada', () => {
    expect(
      calculateUndeclaredArea({
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 20,
      })
    ).toBe(20)
  })

  it('retorna 0 quando não há área restante', () => {
    expect(
      calculateUndeclaredArea({
        totalArea: 100,
        agriculturalArea: 60,
        vegetationArea: 40,
      })
    ).toBe(0)
  })
})

describe('formatHectares', () => {
  it('formata número inteiro corretamente', () => {
    expect(formatHectares(1000)).toBe('1.000 ha')
  })

  it('formata número decimal corretamente', () => {
    expect(formatHectares(123.5)).toBe('123,5 ha')
  })
})
