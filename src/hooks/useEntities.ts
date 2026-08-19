import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store'
import {
  addEntity,
  removeEntity,
  updateEntity,
  selectAllEntities,
  selectTotalEntities,
  selectEntitiesLoading,
} from '@/store/slices/entities'
import { CreateEntityDto, UpdateEntityDto } from '@/types/entity.types'

export const useEntities = () => {
  const dispatch = useDispatch<AppDispatch>()

  const entities = useSelector(selectAllEntities)
  const totalEntities = useSelector(selectTotalEntities)
  const isLoading = useSelector(selectEntitiesLoading)

  const createEntity = (data: CreateEntityDto) => {
    dispatch(addEntity(data))
  }

  const deleteEntity = (id: string) => {
    dispatch(removeEntity(id))
  }

  const editEntity = (id: string, data: UpdateEntityDto) => {
    dispatch(updateEntity({ id, data }))
  }

  return {
    entities,
    totalEntities,
    isLoading,
    createEntity,
    deleteEntity,
    editEntity,
  }
}
