import { combineReducers } from '@reduxjs/toolkit'
import producersReducer from './slices/producers'
import entitiesReducer from './slices/entities'

export const rootReducer = combineReducers({
  producers: producersReducer,
  entities: entitiesReducer,
})
