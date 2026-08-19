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
} from '@/store/slices/producers'
import { CreateProducerDto, UpdateProducerDto } from '@/types/producer.types'
import { producersService } from '@/services/producers.service'
import { AxiosError } from 'axios'

export const useProducers = () => {
  const dispatch = useDispatch<AppDispatch>()

  const producers = useSelector(selectAllProducers)
  const totalProducers = useSelector(selectTotalProducers)
  const isLoading = useSelector(selectProducersLoading)

  const createProducer = async (data: CreateProducerDto) => {
    try {
      dispatch(setLoading(true))
      dispatch(setError(null))

      const normalizedData = {
        ...data,
        document: data.document.toUpperCase().replace(/[.\-\/]/g, ''),
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
    createProducer,
    deleteProducer,
    editProducer,
  }
}
