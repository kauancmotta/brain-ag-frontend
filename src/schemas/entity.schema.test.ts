import { describe, it, expect } from 'vitest'
import { entitySchema } from '@/schemas/entity.schema'

const baseValidEntity = {
  name: 'Fazenda Boa Vista',
  customerId: 'producer-123',
  address: {
    street: 'Rodovia MT-242',
    number: '100',
    city: 'Sorriso',
    state: 'MT',
    zipCode: '78890000',
  },
  totalArea: 100,
  agricultureArea: 60,
  vegetationArea: 30,
}

describe('entitySchema', () => {
  it('valida uma fazenda com dados corretos', () => {
    const result = entitySchema.safeParse(baseValidEntity)
    expect(result.success).toBe(true)
  })

  it('rejeita quando área agricultável + vegetação ultrapassa o total', () => {
    const result = entitySchema.safeParse({
      ...baseValidEntity,
      agricultureArea: 80,
      vegetationArea: 30,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const areaError = result.error.issues.find(
        (issue) => issue.path[0] === 'agricultureArea'
      )
      expect(areaError).toBeDefined()
    }
  })

  it('aprova quando a soma é exatamente igual à área total', () => {
    const result = entitySchema.safeParse({
      ...baseValidEntity,
      agricultureArea: 70,
      vegetationArea: 30,
    })
    expect(result.success).toBe(true)
  })

  it('aceita uma fazenda sem culturas cadastradas', () => {
    const result = entitySchema.safeParse(baseValidEntity)
    expect(result.success).toBe(true)
  })

  it('rejeita quando o nome da fazenda é muito curto', () => {
    const result = entitySchema.safeParse({ ...baseValidEntity, name: 'AB' })
    expect(result.success).toBe(false)
  })

  it('rejeita quando área total é zero', () => {
    const result = entitySchema.safeParse({ ...baseValidEntity, totalArea: 0 })
    expect(result.success).toBe(false)
  })
})
