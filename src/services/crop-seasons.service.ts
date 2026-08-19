import { api } from './api'
import { ApiResponse } from '@/types/api.types'
import {
  CreateCropSeasonDto,
  CreateCropSeasonRequestDto,
  CropSeason,
} from '@/types/crop-season.types'
import { Crop } from '@/types/crop.types'

interface CropSeasonApiDto {
  id: string
  entityId?: string
  entity?: { id: string }
  year: string
  cropSeasonCrops?: Array<{
    id: string
    crop: Crop
    plantedArea: number | string
  }>
  createdAt: string
  updatedAt?: string
}

type CropSeasonResponse = ApiResponse<CropSeasonApiDto> | CropSeasonApiDto
type CropSeasonsResponse = ApiResponse<CropSeasonApiDto[]> | CropSeasonApiDto[]

const unwrap = <T>(response: T | ApiResponse<T>): T =>
  typeof response === 'object' &&
  response !== null &&
  'data' in response &&
  'success' in response
    ? response.data
    : response

const normalize = (season: CropSeasonApiDto): CropSeason => ({
  ...season,
  entityId: season.entity?.id ?? season.entityId,
  cropSeasonCrops: (season.cropSeasonCrops ?? []).map((item) => ({
    id: item.id,
    crop: item.crop,
    plantedArea: Number(item.plantedArea),
  })),
})

const getByEntityId = async (entityId: string): Promise<CropSeason[]> => {
  const response = await api.get<CropSeasonsResponse>(
    `/entities/${entityId}/crop-seasons`
  )
  return unwrap(response.data).map(normalize)
}

const getById = async (
  entityId: string,
  cropSeasonId: string
): Promise<CropSeason> => {
  const response = await api.get<CropSeasonResponse>(
    `/entities/${entityId}/crop-seasons/${cropSeasonId}`
  )
  return normalize(unwrap(response.data))
}

const create = async (
  entityId: string,
  data: CreateCropSeasonDto
): Promise<CropSeason> => {
  if (!entityId) {
    throw new Error('entityId é obrigatório')
  }

  const response = await api.post<CropSeasonResponse>(
    `/entities/${entityId}/crop-seasons`,
    {
      ...data,
      entityId,
    } satisfies CreateCropSeasonRequestDto
  )
  return normalize(unwrap(response.data))
}

export const cropSeasonsService = { getByEntityId, getById, create }