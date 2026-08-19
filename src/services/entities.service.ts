import { api } from './api'
import { Entity, CreateEntityDto, UpdateEntityDto } from '@/types/entity.types'
import { ApiResponse } from '@/types/api.types'

const ENTITIES_ENDPOINT = '/entities'

const getAll = async (): Promise<Entity[]> => {
  const response = await api.get<ApiResponse<Entity[]>>(ENTITIES_ENDPOINT)
  return response.data.data
}

const getById = async (id: string): Promise<Entity> => {
  const response = await api.get<ApiResponse<Entity>>(
    `${ENTITIES_ENDPOINT}/${id}`
  )
  return response.data.data
}

const create = async (data: CreateEntityDto): Promise<Entity> => {
  const response = await api.post<ApiResponse<Entity>>(ENTITIES_ENDPOINT, data)
  return response.data.data
}

const update = async (id: string, data: UpdateEntityDto): Promise<Entity> => {
  const response = await api.put<ApiResponse<Entity>>(
    `${ENTITIES_ENDPOINT}/${id}`,
    data
  )
  return response.data.data
}

const remove = async (id: string): Promise<void> => {
  await api.delete(`${ENTITIES_ENDPOINT}/${id}`)
}

export const entitiesService = { getAll, getById, create, update, remove }
