import { RootState } from '@/store'

export const selectAllEntities = (state: RootState) =>
  state.entities?.entities ?? []

export const selectTotalEntities = (state: RootState) =>
  selectAllEntities(state).length

export const selectTotalHectares = (state: RootState) =>
  selectAllEntities(state).reduce((sum, entity) => sum + entity.totalArea, 0)

export const selectEntitiesByState = (state: RootState) => {
  const countByState: Record<string, number> = {}

  selectAllEntities(state).forEach((entity) => {
    const stateCode = entity.address?.state

    if (stateCode) {
      countByState[stateCode] = (countByState[stateCode] ?? 0) + 1
    }
  })

  return Object.entries(countByState).map(([name, value]) => ({
    name,
    value,
  }))
}

export const selectEntitiesByCrop = () => []

export const selectEntitiesLoading = (state: RootState) =>
  state.entities?.isLoading ?? false

export const selectEntitiesError = (state: RootState) =>
  state.entities?.error ?? null