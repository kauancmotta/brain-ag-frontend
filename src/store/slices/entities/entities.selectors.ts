import { RootState } from '@/store'
import { Crop, CROP_LABELS } from '@/types/entity.types'

export const selectAllEntities = (state: RootState) =>
  state.entities.entities

export const selectTotalEntities = (state: RootState) =>
  state.entities.entities.length

export const selectTotalHectares = (state: RootState) =>
  state.entities.entities.reduce((sum, entity) => sum + entity.totalArea, 0)

export const selectEntitiesByState = (state: RootState) => {
  const countByState: Record<string, number> = {}

  state.entities.entities.forEach((entity) => {
    countByState[entity.state] = (countByState[entity.state] ?? 0) + 1
  })

  return Object.entries(countByState).map(([name, value]) => ({
    name,
    value,
  }))
}

export const selectEntitiesByCrop = (state: RootState) => {
  const countByCrop: Record<string, number> = {}

  state.entities.entities.forEach((entity) => {
    entity.crops.forEach((crop: Crop) => {
      const label = CROP_LABELS[crop]
      countByCrop[label] = (countByCrop[label] ?? 0) + 1
    })
  })

  return Object.entries(countByCrop).map(([name, value]) => ({
    name,
    value,
  }))
}

export const selectEntitiesLoading = (state: RootState) =>
  state.entities.isLoading

export const selectEntitiesError = (state: RootState) =>
  state.entities.error