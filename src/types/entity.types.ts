export interface EntityAddress {
  id?: string
  street: string
  number: string
  city: string
  state: string
  zipCode: string
}

export interface EntityCustomer {
  id: string
  document: string
  name: string
  email: string
}

export interface Entity {
  id: string
  name: string
  customerId?: string
  customer?: EntityCustomer
  address: EntityAddress
  totalArea: number
  agricultureArea: number
  vegetationArea: number
  createdAt: string
}

export interface CreateEntityDto {
  name: string
  customerId: string
  address: EntityAddress
  totalArea: number
  agricultureArea: number
  vegetationArea: number
}

export type UpdateEntityDto = Partial<CreateEntityDto>
