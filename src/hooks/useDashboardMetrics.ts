import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { dashboardService } from '@/services/dashboard.service'
import { DashboardMetrics } from '@/types/dashboard.types'

const dashboardRequests = new Map<string, Promise<DashboardMetrics>>()

export const useDashboardMetrics = (year?: string) => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const requestKey = year ?? 'all'
    let request = dashboardRequests.get(requestKey)

    if (!request) {
      request = dashboardService.getMetrics(year)
      dashboardRequests.set(requestKey, request)
      void request.then(
        () => {
          if (dashboardRequests.get(requestKey) === request) {
            dashboardRequests.delete(requestKey)
          }
        },
        () => {
          if (dashboardRequests.get(requestKey) === request) {
            dashboardRequests.delete(requestKey)
          }
        }
      )
    }

    const loadMetrics = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setMetrics(await request)
      } catch (requestError) {
        const message =
          requestError instanceof AxiosError
            ? requestError.response?.data?.message ?? 'Erro ao carregar o dashboard'
            : 'Erro inesperado ao carregar o dashboard'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    void loadMetrics()
  }, [year])

  const states = metrics?.states ?? []
  const crops = metrics?.crops ?? []
  const landUse = metrics?.landUse ?? {
    totalArea: 0,
    agricultureArea: 0,
    vegetationArea: 0,
  }

  return {
    totalFarms: metrics?.totalEntities ?? 0,
    totalHectares: metrics?.totalArea ?? landUse.totalArea,
    states,
    crops,
    landUse,
    isLoading,
    error,
  }
}
