import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Producer } from '@/types/producer.types'

export interface ProducersState {
  producers: Producer[]
  isLoading: boolean
  error: string | null
}

const initialState: ProducersState = {
  producers: [],
  isLoading: false,
  error: null,
}

const producersSlice = createSlice({
  name: 'producers',
  initialState,
  reducers: {
    setProducers: (state, action: PayloadAction<Producer[]>) => {
      state.producers = action.payload
    },
    addProducer: (state, action: PayloadAction<Producer>) => {
      state.producers.push(action.payload)
    },
    removeProducer: (state, action: PayloadAction<string>) => {
      state.producers = state.producers.filter(
        (producer) => producer.id !== action.payload
      )
    },
    updateProducer: (
      state,
      action: PayloadAction<{ id: string; data: Partial<Producer> }>
    ) => {
      const index = state.producers.findIndex(
        (producer) => producer.id === action.payload.id
      )
      if (index !== -1) {
        state.producers[index] = {
          ...state.producers[index],
          ...action.payload.data,
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setProducers,
  addProducer,
  removeProducer,
  updateProducer,
  setLoading,
  setError,
} = producersSlice.actions

export default producersSlice.reducer