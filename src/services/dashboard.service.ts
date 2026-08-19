import { api } from './api'
import { ApiResponse } from '@/types/api.types'
import {
  DashboardApiResponse,
  DashboardMetrics,
} from '@/types/dashboard.types'

type DashboardResponse = ApiResponse<DashboardApiResponse> | DashboardApiResponse

const unwrap = (response: DashboardResponse): DashboardApiResponse =>
  'data' in response && 'success' in response ? response.data : response

const normalize = (response: DashboardApiResponse): DashboardMetrics => ({
  totalEntities: response.totalEntities,
  totalArea: response.totalArea,
  states: response.byState.map(({ state, total }) => ({ state, count: total })),
  crops: response.byCrop,
  landUse: {
    totalArea: response.totalArea,
    agricultureArea: response.landUse.agriculture,
    vegetationArea: response.landUse.vegetation,
  },
})

const getMetrics = async (year?: string): Promise<DashboardMetrics> => {
  const response = await api.get<DashboardResponse>('/dashboard', {
    params: year ? { year } : undefined,
  })
  return normalize(unwrap(response.data))
}

export const dashboardService = { getMetrics }