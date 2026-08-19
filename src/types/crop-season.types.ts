import { CropSeasonCrop } from './crop.types'

export interface CropSeason {
  id: string
  entityId?: string
  year: string
  cropSeasonCrops: CropSeasonCrop[]
  createdAt: string
  updatedAt?: string
}

export interface CreateCropSeasonDto {
  year: string
}

export interface CreateCropSeasonRequestDto extends CreateCropSeasonDto {
  entityId: string
}