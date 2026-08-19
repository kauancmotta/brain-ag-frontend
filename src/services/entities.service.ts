import { api } from './api'
import {
  Entity,
  CreateEntityDto,
  UpdateEntityDto,
  EntityAddress,
  EntityCustomer,
} from '@/types/entity.types'
import { ApiResponse } from '@/types/api.types'

const ENTITIES_ENDPOINT = '/entities'

interface EntityApiDto {
  id: string
  name: string
  address: EntityAddress
  customer?: EntityCustomer
  totalArea: number | string
  agricultureArea: number | string
  vegetationArea: number | string
  createdAt: string
}

type EntityApiResponse = ApiResponse<EntityApiDto> | EntityApiDto
type EntitiesApiResponse = ApiResponse<EntityApiDto[]> | EntityApiDto[]

const isApiResponse = <T>(response: T | ApiResponse<T>): response is ApiResponse<T> =>
  typeof response === 'object' &&
  response !== null &&
  'data' in response &&
  'success' in response

const unwrap = <T>(response: T | ApiResponse<T>): T =>
  isApiResponse(response) ? response.data : response

const normalizeEntity = (
  entity: EntityApiDto,
  customerId?: string
): Entity => ({
  ...entity,
  customerId: entity.customer?.id ?? customerId,
  totalArea: Number(entity.totalArea),
  agricultureArea: Number(entity.agricultureArea),
  vegetationArea: Number(entity.vegetationArea),
})

const getAll = async (): Promise<Entity[]> => {
  const response = await api.get<EntitiesApiResponse>(ENTITIES_ENDPOINT)
  return unwrap(response.data).map((entity) => normalizeEntity(entity))
}

const getById = async (id: string): Promise<Entity> => {
  const response = await api.get<EntityApiResponse>(
    `${ENTITIES_ENDPOINT}/${id}`
  )
  return normalizeEntity(unwrap(response.data))
}

const create = async (data: CreateEntityDto): Promise<Entity> => {
  const response = await api.post<EntityApiResponse>(ENTITIES_ENDPOINT, data)
  return normalizeEntity(unwrap(response.data), data.customerId)
}

const update = async (id: string, data: UpdateEntityDto): Promise<Entity> => {
  const response = await api.put<EntityApiResponse>(
    `${ENTITIES_ENDPOINT}/${id}`,
    data
  )
  return normalizeEntity(unwrap(response.data), data.customerId)
}

const remove = async (id: string): Promise<void> => {
  await api.delete(`${ENTITIES_ENDPOINT}/${id}`)
}

export const entitiesService = { getAll, getById, create, update, remove }
