import { api } from './api'
import { Producer, CreateProducerDto, UpdateProducerDto } from '@/types/producer.types'

const PRODUCERS_ENDPOINT = '/customers'

/** Fetches all registered producers */
const getAll = async (): Promise<Producer[]> => {
  const response = await api.get<Producer[]>(PRODUCERS_ENDPOINT)
  return response.data
}

/** Fetches a producer by its unique identifier */
const getById = async (id: string): Promise<Producer> => {
  const response = await api.get<Producer>(`${PRODUCERS_ENDPOINT}/${id}`)
  return response.data
}

/** Creates a new producer */
const create = async (data: CreateProducerDto): Promise<Producer> => {
  const response = await api.post<Producer>(PRODUCERS_ENDPOINT, data)
  return response.data
}

/** Updates an existing producer */
const update = async (id: string, data: UpdateProducerDto): Promise<Producer> => {
  const response = await api.put<Producer>(`${PRODUCERS_ENDPOINT}/${id}`, data)
  return response.data
}

/** Removes a producer by its unique identifier */
const remove = async (id: string): Promise<void> => {
  await api.delete(`${PRODUCERS_ENDPOINT}/${id}`)
}

export const producersService = { getAll, getById, create, update, remove }