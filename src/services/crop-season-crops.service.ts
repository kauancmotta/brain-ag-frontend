import { api } from './api'
import { ApiResponse } from '@/types/api.types'
import {
  CreateCropSeasonCropDto,
  CropSeasonCropRequestDto,
  CropSeasonCrop,
} from '@/types/crop.types'

interface CropSeasonCropApiDto {
  id: string
  cropId?: string
  crop?: CropSeasonCrop['crop']
  plantedArea: number | string
  cropSeasonId?: string
}

type CropSeasonCropResponse =
  | ApiResponse<CropSeasonCropApiDto>
  | CropSeasonCropApiDto
type CropSeasonCropsResponse =
  | ApiResponse<CropSeasonCropApiDto[]>
  | CropSeasonCropApiDto[]

const unwrap = <T>(response: T | ApiResponse<T>): T =>
  typeof response === 'object' &&
  response !== null &&
  'data' in response &&
  'success' in response
    ? response.data
    : response

const normalize = (item: CropSeasonCropApiDto): CropSeasonCrop => ({
  ...item,
  cropId: item.crop?.id ?? item.cropId,
  plantedArea: Number(item.plantedArea),
})

const buildRequest = (
  cropSeasonId: string,
  data: CreateCropSeasonCropDto
): CropSeasonCropRequestDto => ({
  ...data,
  cropSeasonId,
})

const getBySeasonId = async (
  entityId: string,
  cropSeasonId: string
): Promise<CropSeasonCrop[]> => {
  const response = await api.get<CropSeasonCropsResponse>(
    `/entities/${entityId}/crop-seasons/${cropSeasonId}/crop-season-crops`
  )
  return unwrap(response.data).map(normalize)
}

const create = async (
  entityId: string,
  cropSeasonId: string,
  data: CreateCropSeasonCropDto
): Promise<CropSeasonCrop> => {
  if (!entityId || !cropSeasonId) {
    throw new Error('entityId e cropSeasonId são obrigatórios')
  }

  const response = await api.post<CropSeasonCropResponse>(
    `/entities/${entityId}/crop-seasons/${cropSeasonId}/crop-season-crops`,
    buildRequest(cropSeasonId, data)
  )
  return normalize(unwrap(response.data))
}

const update = async (
  entityId: string,
  cropSeasonId: string,
  cropSeasonCropId: string,
  data: CreateCropSeasonCropDto
): Promise<CropSeasonCrop> => {
  if (!entityId || !cropSeasonId || !cropSeasonCropId) {
    throw new Error(
      'entityId, cropSeasonId e cropSeasonCropId são obrigatórios'
    )
  }

  const response = await api.put<CropSeasonCropResponse>(
    `/entities/${entityId}/crop-seasons/${cropSeasonId}/crop-season-crops/${cropSeasonCropId}`,
    { plantedArea: data.plantedArea }
  )
  return normalize(unwrap(response.data))
}

const remove = async (
  entityId: string,
  cropSeasonId: string,
  cropSeasonCropId: string
): Promise<void> => {
  await api.delete(
    `/entities/${entityId}/crop-seasons/${cropSeasonId}/crop-season-crops/${cropSeasonCropId}`
  )
}

export const cropSeasonCropsService = {
  getBySeasonId,
  create,
  update,
  remove,
}