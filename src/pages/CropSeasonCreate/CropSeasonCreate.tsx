import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules/FormField'
import { DashboardTemplate } from '@/components/templates/DashboardTemplate'
import { cropSeasonsService } from '@/services/crop-seasons.service'
import {
  cropSeasonSchema,
  CropSeasonFormData,
} from '@/schemas/crop-season.schema'
import { theme } from '@/styles/theme'

const FormCard = styled.section`
  max-width: 640px;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
`

const Title = styled.h1`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.sizes['2xl']};
`

const Description = styled.p`
  margin: ${theme.spacing.xs} 0 ${theme.spacing.xl};
  color: ${theme.colors.textSecondary};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.md};
`

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  font-size: ${theme.typography.sizes.sm};
`

export const CropSeasonCreate = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const navigate = useNavigate()
  const [requestError, setRequestError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CropSeasonFormData>({ resolver: zodResolver(cropSeasonSchema) })

  const submit = async (data: CropSeasonFormData) => {
    if (!entityId) return

    try {
      setIsLoading(true)
      setRequestError(null)
      await cropSeasonsService.create(entityId, data)
      navigate(`/entities/${entityId}`)
    } catch {
      setRequestError(
        'Não foi possível cadastrar a safra. Verifique se esse ano já foi cadastrado para a fazenda.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardTemplate>
      <FormCard>
        <Title>Adicionar safra</Title>
        <Description>
          Informe o ano da safra. Uma fazenda não pode ter duas safras no mesmo
          ano.
        </Description>

        <Form onSubmit={handleSubmit(submit)} noValidate>
          <FormField
            label="Ano da safra"
            htmlFor="year"
            placeholder="Ex: 2025"
            maxLength={4}
            inputMode="numeric"
            required
            errorMessage={errors.year?.message}
            {...register('year')}
          />

          {requestError && <ErrorMessage role="alert">{requestError}</ErrorMessage>}

          <Actions>
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(`/entities/${entityId}`)}
            >
              <ArrowLeft size={16} /> Cancelar
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Cadastrar safra
            </Button>
          </Actions>
        </Form>
      </FormCard>
    </DashboardTemplate>
  )
}