export const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

export const formatDateToBrazilian = (isoDate: string): string =>
  new Date(isoDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

export const capitalizeFirstLetter = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
