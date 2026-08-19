import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules/FormField'
import { SelectField } from '@/components/molecules/SelectField'
import { DashboardTemplate } from '@/components/templates/DashboardTemplate'
import { cropSeasonCropsService } from '@/services/crop-season-crops.service'
import { cropSeasonsService } from '@/services/crop-seasons.service'
import { cropsService } from '@/services/crops.service'
import {
  cropSeasonCropSchema,
  CropSeasonCropFormData,
} from '@/schemas/crop-season-crop.schema'
import { CropSeason } from '@/types/crop-season.types'
import { Crop, CropSeasonCrop } from '@/types/crop.types'
import { formatHectares } from '@/utils/area.utils'
import { theme } from '@/styles/theme'

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`

const Title = styled.h1`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.sizes['2xl']};
`

const Subtitle = styled.p`
  margin-top: ${theme.spacing.xs};
  color: ${theme.colors.textSecondary};
`

const Panel = styled.section`
  max-width: 760px;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: end;
  gap: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.xl};
  border-bottom: 1px solid ${theme.colors.border};

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xl};
`

const CropRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
`

const CropName = styled.strong`
  color: ${theme.colors.textPrimary};
`

const CropArea = styled.span`
  color: ${theme.colors.textSecondary};
`

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
`

const ErrorMessage = styled.p`
  grid-column: 1 / -1;
  color: ${theme.colors.error};
  font-size: ${theme.typography.sizes.sm};
`

export const CropSeasonDetails = () => {
  const { entityId, cropSeasonId } = useParams<{
    entityId?: string
    cropSeasonId?: string
  }>()
  const navigate = useNavigate()
  const [season, setSeason] = useState<CropSeason | null>(null)
  const [crops, setCrops] = useState<Crop[]>([])
  const [seasonCrops, setSeasonCrops] = useState<CropSeasonCrop[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [requestError, setRequestError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CropSeasonCropFormData>({
    resolver: zodResolver(cropSeasonCropSchema),
  })

  useEffect(() => {
    if (!entityId || !cropSeasonId) {
      setRequestError('Identificadores da fazenda e da safra são obrigatórios.')
      return
    }

    const load = async () => {
      try {
        const [loadedSeason, loadedCrops] = await Promise.all([
          cropSeasonsService.getById(entityId, cropSeasonId),
          cropsService.getAll(),
        ])
        setSeason(loadedSeason)
        setCrops(loadedCrops)
        setSeasonCrops(loadedSeason.cropSeasonCrops)
      } catch {
        setRequestError('Não foi possível carregar a safra.')
      }
    }

    void load()
  }, [entityId, cropSeasonId])

  const submit = async (data: CropSeasonCropFormData) => {
    if (!cropSeasonId) return

    try {
      setIsLoading(true)
      setRequestError(null)
      if (!entityId) {
        throw new Error('Identificador da fazenda não informado')
      }

      const saved = editingId
        ? await cropSeasonCropsService.update(
            entityId,
            cropSeasonId,
            editingId,
            data
          )
        : await cropSeasonCropsService.create(entityId, cropSeasonId, data)
      setSeasonCrops((current) =>
        editingId
          ? current.map((item) => (item.id === saved.id ? saved : item))
          : [...current, saved]
      )
      setEditingId(null)
      reset()
    } catch {
      setRequestError('Não foi possível salvar a cultura nesta safra.')
    } finally {
      setIsLoading(false)
    }
  }

  const editCrop = (item: CropSeasonCrop) => {
    const cropId = item.crop?.id ?? item.cropId

    if (!cropId) {
      setRequestError('Não foi possível identificar a cultura para edição.')
      return
    }

    setEditingId(item.id)
    reset({ cropId, plantedArea: item.plantedArea })
  }

  const removeCrop = async (id: string) => {
    try {
      setRequestError(null)
      if (!entityId || !cropSeasonId) {
        throw new Error('Identificadores da fazenda e da safra não informados')
      }

      await cropSeasonCropsService.remove(entityId, cropSeasonId, id)
      setSeasonCrops((current) => current.filter((item) => item.id !== id))
    } catch {
      setRequestError('Não foi possível remover a cultura.')
    }
  }

  return (
    <DashboardTemplate>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          const farmId = entityId ?? season?.entityId

          if (farmId) {
            navigate(`/entities/${farmId}`)
          }
        }}
      >
        <ArrowLeft size={16} /> Voltar para fazenda
      </Button>

      {!season && !requestError && <p>Carregando safra...</p>}
      {requestError && <ErrorMessage role="alert">{requestError}</ErrorMessage>}
      {season && (
        <>
          <Header>
            <div>
              <Title>Safra {season.year}</Title>
              <Subtitle>Gerencie as culturas e áreas plantadas</Subtitle>
            </div>
          </Header>

          <Panel>
            <Form onSubmit={handleSubmit(submit)} noValidate>
              <SelectField
                label="Cultura"
                htmlFor="cropId"
                placeholder="Selecione uma cultura"
                options={crops.map((crop) => ({ value: crop.id, label: crop.name }))}
                required
                errorMessage={errors.cropId?.message}
                {...register('cropId')}
              />
              <FormField
                label="Área plantada (ha)"
                htmlFor="plantedArea"
                type="number"
                min={0}
                step="0.01"
                placeholder="0"
                required
                errorMessage={errors.plantedArea?.message}
                {...register('plantedArea', { valueAsNumber: true })}
              />
              <Button type="submit" isLoading={isLoading}>
                {editingId ? 'Salvar edição' : 'Adicionar cultura'}
              </Button>
            </Form>

            <List>
              {seasonCrops.length === 0 && <Subtitle>Nenhuma cultura cadastrada.</Subtitle>}
              {seasonCrops.map((item) => (
                <CropRow key={item.id}>
                  <CropName>
                    {item.crop?.name ??
                      crops.find((crop) => crop.id === item.cropId)?.name ??
                      'Cultura'}
                  </CropName>
                  <CropArea>{formatHectares(item.plantedArea)}</CropArea>
                  <Actions>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Editar ${item.crop?.name ?? 'cultura'}`}
                      onClick={() => editCrop(item)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      aria-label={`Remover ${item.crop?.name ?? 'cultura'}`}
                      onClick={() => void removeCrop(item.id)}
                    >
                      <Trash2 size={16} color={theme.colors.error} />
                    </Button>
                  </Actions>
                </CropRow>
              ))}
            </List>
          </Panel>
        </>
      )}
    </DashboardTemplate>
  )
}