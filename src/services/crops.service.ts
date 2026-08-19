import { api } from './api'
import { ApiResponse } from '@/types/api.types'
import { Crop } from '@/types/crop.types'

type CropsResponse = ApiResponse<Crop[]> | Crop[]

let cropsCache: Crop[] | null = null
let cropsRequest: Promise<Crop[]> | null = null

const unwrap = (response: CropsResponse): Crop[] =>
  typeof response === 'object' &&
  response !== null &&
  'data' in response &&
  'success' in response
    ? response.data
    : response

const getAll = async (): Promise<Crop[]> => {
  if (cropsCache) {
    return cropsCache
  }

  if (cropsRequest) {
    return cropsRequest
  }

  cropsRequest = (async () => {
    try {
      const response = await api.get<CropsResponse>('/crops')
      const loadedCrops = unwrap(response.data)
      cropsCache = loadedCrops
      return loadedCrops
    } finally {
      cropsRequest = null
    }
  })()

  return cropsRequest
}

export const cropsService = { getAll }