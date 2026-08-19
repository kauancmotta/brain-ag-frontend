import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics'
import producersReducer from '@/store/slices/producers'
import entitiesReducer from '@/store/slices/entities'
import { Producer } from '@/types/producer.types'
import { Entity } from '@/types/entity.types'

const buildMockProducer = (overrides: Partial<Producer> = {}): Producer => ({
  id: 'p1',
  name: 'João Silva',
  document: '11144477735',
  city: 'Cuiabá',
  state: 'MT',
  createdAt: new Date().toISOString(),
  ...overrides,
})

const buildMockEntity = (overrides: Partial<Entity> = {}): Entity => ({
  id: 'e1',
  name: 'Fazenda Boa Vista',
  producerId: 'p1',
  city: 'Sorriso',
  state: 'MT',
  totalArea: 200,
  agriculturalArea: 120,
  vegetationArea: 50,
  crops: ['soja', 'milho'],
  createdAt: new Date().toISOString(),
  ...overrides,
})

const buildTestStore = (
  producers: Producer[] = [],
  entities: Entity[] = []
) =>
  configureStore({
    reducer: {
      producers: producersReducer,
      entities: entitiesReducer,
    },
    preloadedState: {
      producers: { producers, isLoading: false, error: null },
      entities: { entities, isLoading: false, error: null },
    },
  })

const buildWrapper = (store: ReturnType<typeof buildTestStore>) => {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  )
  Wrapper.displayName = 'TestWrapper'
  return Wrapper
}

describe('useDashboardMetrics', () => {
  it('retorna zeros quando o store está vazio', () => {
    const store = buildTestStore()
    const { result } = renderHook(() => useDashboardMetrics(), {
      wrapper: buildWrapper(store),
    })

    expect(result.current.totalProducers).toBe(0)
    expect(result.current.totalFarms).toBe(0)
    expect(result.current.totalHectares).toBe(0)
    expect(result.current.farmsByState).toHaveLength(0)
    expect(result.current.farmsByCrop).toHaveLength(0)
  })

  it('calcula o total de hectares corretamente', () => {
    const entities = [
      buildMockEntity({ id: 'e1', totalArea: 100 }),
      buildMockEntity({ id: 'e2', totalArea: 250 }),
    ]
    const store = buildTestStore([], entities)
    const { result } = renderHook(() => useDashboardMetrics(), {
      wrapper: buildWrapper(store),
    })

    expect(result.current.totalHectares).toBe(350)
  })

  it('agrupa fazendas por estado corretamente', () => {
    const entities = [
      buildMockEntity({ id: 'e1', state: 'MT' }),
      buildMockEntity({ id: 'e2', state: 'GO' }),
      buildMockEntity({ id: 'e3', state: 'MT' }),
    ]
    const store = buildTestStore([], entities)
    const { result } = renderHook(() => useDashboardMetrics(), {
      wrapper: buildWrapper(store),
    })

    const mtEntry = result.current.farmsByState.find((s) => s.name === 'MT')
    const goEntry = result.current.farmsByState.find((s) => s.name === 'GO')

    expect(mtEntry?.value).toBe(2)
    expect(goEntry?.value).toBe(1)
  })

  it('retorna o total de produtores corretamente', () => {
    const producers = [buildMockProducer({ id: 'p1' }), buildMockProducer({ id: 'p2' })]
    const store = buildTestStore(producers)
    const { result } = renderHook(() => useDashboardMetrics(), {
      wrapper: buildWrapper(store),
    })

    expect(result.current.totalProducers).toBe(2)
  })
})
