export interface Producer {
  id: string
  name: string
  document: string
  email: string;
  createdAt: string
  updatedAt: string
}

export interface CreateProducerDto {
  name: string
  document: string
}

export type UpdateProducerDto = Partial<CreateProducerDto>
