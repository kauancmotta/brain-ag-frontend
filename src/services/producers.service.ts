import { api } from './api'
import { Producer, CreateProducerDto, UpdateProducerDto } from '@/types/producer.types'
import { ApiResponse } from '@/types/api.types'

const PRODUCERS_ENDPOINT = '/customers'

type ProducersResponse = ApiResponse<Producer[]> | Producer[]
type ProducerResponse = ApiResponse<Producer> | Producer

const unwrap = <T>(response: T | ApiResponse<T>): T =>
  typeof response === 'object' &&
  response !== null &&
  'data' in response &&
  'success' in response
    ? response.data
    : response

/** Fetches all registered producers */
const getAll = async (): Promise<Producer[]> => {
  const response = await api.get<ProducersResponse>(PRODUCERS_ENDPOINT)
  return unwrap(response.data)
}

/** Fetches a producer by its unique identifier */
const getById = async (id: string): Promise<Producer> => {
  const response = await api.get<ProducerResponse>(`${PRODUCERS_ENDPOINT}/${id}`)
  return unwrap(response.data)
}

/** Creates a new producer */
const create = async (data: CreateProducerDto): Promise<Producer> => {
  const response = await api.post<ProducerResponse>(PRODUCERS_ENDPOINT, data)
  return unwrap(response.data)
}

/** Updates an existing producer */
const update = async (id: string, data: UpdateProducerDto): Promise<Producer> => {
  const response = await api.put<ProducerResponse>(`${PRODUCERS_ENDPOINT}/${id}`, data)
  return unwrap(response.data)
}

/** Removes a producer by its unique identifier */
const remove = async (id: string): Promise<void> => {
  await api.delete(`${PRODUCERS_ENDPOINT}/${id}`)
}

export const producersService = { getAll, getById, create, update, remove }