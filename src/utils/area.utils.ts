interface FarmAreaInput {
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
}

export const isValidFarmAreaDistribution = ({
  totalArea,
  agriculturalArea,
  vegetationArea,
}: FarmAreaInput): boolean => agriculturalArea + vegetationArea <= totalArea

export const calculateUndeclaredArea = ({
  totalArea,
  agriculturalArea,
  vegetationArea,
}: FarmAreaInput): number =>
  Math.max(0, totalArea - agriculturalArea - vegetationArea)

export const formatHectares = (hectares: number): string =>
  `${hectares.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} ha`
