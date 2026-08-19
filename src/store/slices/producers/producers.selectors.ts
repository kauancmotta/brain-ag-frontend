import { RootState } from '@/store'

export const selectAllProducers = (state: RootState) =>
  state.producers.producers

export const selectTotalProducers = (state: RootState) =>
  state.producers.producers.length

export const selectProducerById = (id: string) => (state: RootState) =>
  state.producers.producers.find((producer) => producer.id === id)

export const selectProducersLoading = (state: RootState) =>
  state.producers.isLoading

export const selectProducersError = (state: RootState) =>
  state.producers.error