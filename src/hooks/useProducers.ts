import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store'
import {
  addProducer,
  removeProducer,
  updateProducer,
  selectAllProducers,
  selectTotalProducers,
  selectProducersLoading,
  setLoading,
  setError,
  setProducers,
} from '@/store/slices/producers'
import { CreateProducerDto, UpdateProducerDto } from '@/types/producer.types'
import { producersService } from '@/services/producers.service'
import { AxiosError } from 'axios'

let producersLoadRequest: Promise<void> | null = null

export const useProducers = () => {
  const dispatch = useDispatch<AppDispatch>()

  const producers = useSelector(selectAllProducers)
  const totalProducers = useSelector(selectTotalProducers)
  const isLoading = useSelector(selectProducersLoading)
  const error = useSelector((state: Parameters<typeof selectProducersLoading>[0]) =>
    state.producers?.error ?? null
  )

  useEffect(() => {
    if (producersLoadRequest) return

    producersLoadRequest = (async () => {
      try {
        dispatch(setLoading(true))
        dispatch(setError(null))
        dispatch(setProducers(await producersService.getAll()))
      } catch (requestError) {
        const message =
          requestError instanceof AxiosError
            ? requestError.response?.data?.message ?? 'Erro ao carregar produtores'
            : 'Erro inesperado ao carregar produtores'
        dispatch(setError(message))
      } finally {
        dispatch(setLoading(false))
        producersLoadRequest = null
      }
    })()

    void producersLoadRequest
  }, [dispatch])

  const createProducer = async (data: CreateProducerDto) => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))

      const normalizedData = {
        ...data,
        document: data.document.toUpperCase().replace(/[.\-/]/g, ''),
      }

      const created = await producersService.create(normalizedData) 
      dispatch(addProducer(created))

    } catch (error) {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.message ?? 'Erro ao cadastrar produtor'
          : 'Erro inesperado'

      dispatch(setError(message)) 
    } finally {
      dispatch(setLoading(false))
    }
  }

  const deleteProducer = async (id: string) => {
    await producersService.remove(id);
    dispatch(removeProducer(id))
  }

  const editProducer = async (id: string, data: UpdateProducerDto) => {
    await producersService.update(id, data)
    dispatch(updateProducer({ id, data }))
  }

  return {
    producers,
    totalProducers,
    isLoading,
    error,
    createProducer,
    deleteProducer,
    editProducer,
  }
}
