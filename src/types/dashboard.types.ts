export interface DashboardApiStateMetric {
  state: string
  total: number
}

export interface DashboardApiCropMetric {
  crop: string
  plantedArea: number
}

export interface DashboardApiResponse {
  totalEntities: number
  totalArea: number
  byState: DashboardApiStateMetric[]
  byCrop: DashboardApiCropMetric[]
  landUse: {
    agriculture: number
    vegetation: number
  }
}

export interface DashboardStateMetric {
  state: string
  count: number
}

export interface DashboardCropMetric {
  crop: string
  plantedArea: number
}

export interface DashboardLandUseMetric {
  totalArea: number
  agricultureArea: number
  vegetationArea: number
}

export interface DashboardMetrics {
  totalEntities: number
  totalArea: number
  states: DashboardStateMetric[]
  crops: DashboardCropMetric[]
  landUse: DashboardLandUseMetric
}