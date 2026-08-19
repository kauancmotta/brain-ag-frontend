import { useSelector } from 'react-redux'
import { selectTotalProducers } from '@/store/slices/producers'
import {
  selectTotalEntities,
  selectTotalHectares,
  selectEntitiesByState,
  selectEntitiesByCrop,
} from '@/store/slices/entities'

export const useDashboardMetrics = () => {
  const totalProducers = useSelector(selectTotalProducers)
  const totalFarms = useSelector(selectTotalEntities)
  const totalHectares = useSelector(selectTotalHectares)
  const farmsByState = useSelector(selectEntitiesByState)
  const farmsByCrop = useSelector(selectEntitiesByCrop)

  return {
    totalProducers,
    totalFarms,
    totalHectares,
    farmsByState,
    farmsByCrop,
  }
}
