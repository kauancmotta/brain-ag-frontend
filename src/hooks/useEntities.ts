import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AxiosError } from 'axios'
import { AppDispatch } from '@/store'
import {
  addEntity,
  removeEntity,
  updateEntity,
  setEntities,
  setLoading,
  setError,
  selectAllEntities,
  selectTotalEntities,
  selectEntitiesLoading,
  selectEntitiesError,
} from '@/store/slices/entities'
import { CreateEntityDto, UpdateEntityDto } from '@/types/entity.types'
import { entitiesService } from '@/services/entities.service'

let entitiesLoadRequest: Promise<void> | null = null

export const useEntities = () => {
  const dispatch = useDispatch<AppDispatch>()

  const entities = useSelector(selectAllEntities)
  const totalEntities = useSelector(selectTotalEntities)
  const isLoading = useSelector(selectEntitiesLoading)
  const error = useSelector(selectEntitiesError)

  useEffect(() => {
    if (entitiesLoadRequest) {
      return
    }

    entitiesLoadRequest = (async () => {
      try {
        dispatch(setLoading(true))
        dispatch(setError(null))
        const loadedEntities = await entitiesService.getAll()
        dispatch(setEntities(loadedEntities))
      } catch (error) {
        const message =
          error instanceof AxiosError
            ? error.response?.data?.message ?? 'Erro ao carregar fazendas'
            : 'Erro inesperado ao carregar fazendas'
        dispatch(setError(message))
      } finally {
        dispatch(setLoading(false))
        entitiesLoadRequest = null
      }
    })()

    void entitiesLoadRequest
  }, [dispatch])

  const createEntity = async (data: CreateEntityDto) => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))
      const createdEntity = await entitiesService.create(data)
      dispatch(addEntity(createdEntity))
      return createdEntity
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message ?? 'Erro ao cadastrar fazenda'
          : 'Erro inesperado ao cadastrar fazenda'
      dispatch(setError(message))
      return undefined
    } finally {
      dispatch(setLoading(false))
    }
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
    error,
    createEntity,
    deleteEntity,
    editEntity,
  }
}
