export type Crop =
  | 'soja'
  | 'milho'
  | 'algodao'
  | 'cafe'
  | 'cana-de-acucar'

export const CROP_LABELS: Record<Crop, string> = {
  soja: 'Soja',
  milho: 'Milho',
  algodao: 'Algodão',
  cafe: 'Café',
  'cana-de-acucar': 'Cana-de-açúcar',
}

export const AVAILABLE_CROPS: Crop[] = [
  'soja',
  'milho',
  'algodao',
  'cafe',
  'cana-de-acucar',
]

export interface Entity {
  id: string
  name: string
  producerId: string
  city: string
  state: string
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
  crops: Crop[]
  createdAt: string
}

export interface CreateEntityDto {
  name: string
  producerId: string
  city: string
  state: string
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
  crops: Crop[]
}

export type UpdateEntityDto = Partial<CreateEntityDto>
