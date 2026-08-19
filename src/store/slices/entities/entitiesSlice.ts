import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Entity, CreateEntityDto } from '@/types/entity.types'
import { generateId } from '@/utils/formatters'

interface EntitiesState {
  entities: Entity[]
  isLoading: boolean
  error: string | null
}

const initialState: EntitiesState = {
  entities: [],
  isLoading: false,
  error: null,
}

const entitiesSlice = createSlice({
  name: 'entities',
  initialState,
  reducers: {
    addEntity: (state, action: PayloadAction<CreateEntityDto>) => {
      const newEntity: Entity = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date().toISOString(),
      }
      state.entities.push(newEntity)
    },
    removeEntity: (state, action: PayloadAction<string>) => {
      state.entities = state.entities.filter(
        (entity) => entity.id !== action.payload
      )
    },
    updateEntity: (
      state,
      action: PayloadAction<{ id: string; data: Partial<CreateEntityDto> }>
    ) => {
      const entityIndex = state.entities.findIndex(
        (entity) => entity.id === action.payload.id
      )
      if (entityIndex !== -1) {
        state.entities[entityIndex] = {
          ...state.entities[entityIndex],
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

export const { addEntity, removeEntity, updateEntity, setLoading, setError } =
  entitiesSlice.actions

export default entitiesSlice.reducer
