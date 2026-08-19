import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics'
import { dashboardService } from '@/services/dashboard.service'

vi.mock('@/services/dashboard.service', () => ({
  dashboardService: {
    getMetrics: vi.fn(),
  },
}))

const mockedGetMetrics = vi.mocked(dashboardService.getMetrics)

describe('useDashboardMetrics', () => {
  it('carrega os agregados do dashboard', async () => {
    mockedGetMetrics.mockResolvedValue({
      totalEntities: 3,
      totalArea: 1000,
      states: [
        { state: 'MT', count: 2 },
        { state: 'GO', count: 1 },
      ],
      crops: [{ crop: 'Soja', plantedArea: 450 }],
      landUse: {
        totalArea: 1000,
        agricultureArea: 700,
        vegetationArea: 300,
      },
    })

    const { result } = renderHook(() => useDashboardMetrics())

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(result.current.totalFarms).toBe(3)
    expect(result.current.totalHectares).toBe(1000)
    expect(result.current.states).toEqual([
      { state: 'MT', count: 2 },
      { state: 'GO', count: 1 },
    ])
    expect(result.current.crops[0].plantedArea).toBe(450)
    expect(result.current.landUse.agricultureArea).toBe(700)
  })

  it('encaminha o ano como filtro opcional', async () => {
    mockedGetMetrics.mockResolvedValue({
      totalEntities: 0,
      totalArea: 0,
      states: [],
      crops: [],
      landUse: { totalArea: 0, agricultureArea: 0, vegetationArea: 0 },
    })

    renderHook(() => useDashboardMetrics('2025'))

    await act(async () => {
      await Promise.resolve()
      await Promise.resolve()
    })

    expect(mockedGetMetrics).toHaveBeenCalledWith('2025')
  })
})
