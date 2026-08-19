export interface Crop {
  id: string
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface CropSeasonCrop {
  id: string
  cropSeasonId?: string
  cropId?: string
  plantedArea: number
  crop?: Crop
}

export interface CreateCropSeasonCropDto {
  cropId: string
  plantedArea: number
}

export interface CropSeasonCropRequestDto extends CreateCropSeasonCropDto {
  cropSeasonId: string
}