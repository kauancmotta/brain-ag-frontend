import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/molecules/FormField'
import { SelectField } from '@/components/molecules/SelectField'
import { Button } from '@/components/atoms/Button'
import { entitySchema, EntityFormData } from '@/schemas/entity.schema'
import { Entity } from '@/types/entity.types'
import { Producer } from '@/types/producer.types'
import { BRAZILIAN_STATES } from '@/utils/brazilianStates'
import { theme } from '@/styles/theme'

interface EntityFormProps {
  producers: Producer[]
  onSubmitSuccess: (data: EntityFormData) => Promise<Entity | undefined>
  isLoading?: boolean
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const FormRow3 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${theme.spacing.sm};
`

const FormError = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.typography.sizes.sm};
`

const stateOptions = BRAZILIAN_STATES.map((state) => ({
  value: state.abbreviation,
  label: `${state.abbreviation} — ${state.name}`,
}))

const buildProducerOptions = (producers: Producer[]) =>
  producers.map((producer) => ({
    value: producer.id,
    label: producer.name,
  }))

export const EntityForm = ({
  producers,
  onSubmitSuccess,
  isLoading = false,
}: EntityFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EntityFormData>({ resolver: zodResolver(entitySchema) })

  const submitEntity = async (data: EntityFormData) => {
    const createdEntity = await onSubmitSuccess(data)

    if (createdEntity) {
      reset()
    }
  }

  return (
    <Form onSubmit={handleSubmit(submitEntity)} noValidate>
      <FormField
        label="Nome da Fazenda"
        htmlFor="name"
        placeholder="Ex: Fazenda Santa Clara"
        required
        errorMessage={errors.name?.message}
        {...register('name')}
      />

      <SelectField
        label="Produtor responsável"
        htmlFor="customerId"
        placeholder="Selecione um produtor"
        options={buildProducerOptions(producers)}
        required
        errorMessage={errors.customerId?.message}
        {...register('customerId')}
      />

      <FormRow>
        <FormField
          label="Rua"
          htmlFor="address.street"
          placeholder="Ex: Rodovia MT-242"
          required
          errorMessage={errors.address?.street?.message}
          {...register('address.street')}
        />

        <FormField
          label="Número"
          htmlFor="address.number"
          placeholder="Ex: 100"
          required
          errorMessage={errors.address?.number?.message}
          {...register('address.number')}
        />
      </FormRow>

      <FormRow>
        <FormField
          label="Cidade"
          htmlFor="address.city"
          placeholder="Ex: Sorriso"
          required
          errorMessage={errors.address?.city?.message}
          {...register('address.city')}
        />

        <SelectField
          label="Estado"
          htmlFor="address.state"
          placeholder="Selecione o estado"
          options={stateOptions}
          required
          errorMessage={errors.address?.state?.message}
          {...register('address.state')}
        />
      </FormRow>

      <FormRow>
        <FormField
          label="CEP"
          htmlFor="address.zipCode"
          placeholder="Ex: 78890-000"
          required
          errorMessage={errors.address?.zipCode?.message}
          {...register('address.zipCode')}
        />
      </FormRow>

      <FormRow3>
        <FormField
          label="Área Total (ha)"
          htmlFor="totalArea"
          type="number"
          min={0}
          step="0.01"
          placeholder="0"
          required
          errorMessage={errors.totalArea?.message}
          {...register('totalArea', { valueAsNumber: true })}
        />

        <FormField
          label="Área Agricultável (ha)"
          htmlFor="agricultureArea"
          type="number"
          min={0}
          step="0.01"
          placeholder="0"
          required
          errorMessage={errors.agricultureArea?.message}
          {...register('agricultureArea', { valueAsNumber: true })}
        />

        <FormField
          label="Área de Vegetação (ha)"
          htmlFor="vegetationArea"
          type="number"
          min={0}
          step="0.01"
          placeholder="0"
          required
          errorMessage={errors.vegetationArea?.message}
          {...register('vegetationArea', { valueAsNumber: true })}
        />
      </FormRow3>

      {errors.root?.message && (
        <FormError role="alert">{errors.root.message}</FormError>
      )}

      <FormActions>
        <Button type="submit" isLoading={isLoading}>
          Cadastrar Fazenda
        </Button>
      </FormActions>
    </Form>
  )
}
