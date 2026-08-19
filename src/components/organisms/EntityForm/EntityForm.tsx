import styled from '@emotion/styled'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/molecules/FormField'
import { SelectField } from '@/components/molecules/SelectField'
import { Button } from '@/components/atoms/Button'
import { Label } from '@/components/atoms/Label'
import { entitySchema, EntityFormData } from '@/schemas/entity.schema'
import { AVAILABLE_CROPS, CROP_LABELS, Crop } from '@/types/entity.types'
import { Producer } from '@/types/producer.types'
import { BRAZILIAN_STATES } from '@/utils/brazilianStates'
import { theme } from '@/styles/theme'

interface EntityFormProps {
  producers: Producer[]
  onSubmitSuccess: (data: EntityFormData) => void
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

const CropsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const CropsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`

const CropCheckbox = styled.label<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: ${theme.borderRadius.full};
  border: 1.5px solid
    ${({ isSelected }) =>
      isSelected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ isSelected }) =>
    isSelected ? theme.colors.primaryLighter : theme.colors.surface};
  color: ${({ isSelected }) =>
    isSelected ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${({ isSelected }) =>
    isSelected
      ? theme.typography.weights.semibold
      : theme.typography.weights.regular};
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;

  &:hover {
    border-color: ${theme.colors.primaryLight};
  }

  input {
    display: none;
  }
`

const ErrorMessage = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.error};
`

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${theme.spacing.sm};
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
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<EntityFormData>({
    resolver: zodResolver(entitySchema),
    defaultValues: { crops: [] },
  })

  const selectedCrops = watch('crops') as Crop[]

  const submitEntity = (data: EntityFormData) => {
    onSubmitSuccess(data)
    reset()
  }

  const isCropSelected = (crop: Crop) => selectedCrops?.includes(crop)

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
        htmlFor="producerId"
        placeholder="Selecione um produtor"
        options={buildProducerOptions(producers)}
        required
        errorMessage={errors.producerId?.message}
        {...register('producerId')}
      />

      <FormRow>
        <FormField
          label="Cidade"
          htmlFor="city"
          placeholder="Ex: Sorriso"
          required
          errorMessage={errors.city?.message}
          {...register('city')}
        />

        <SelectField
          label="Estado"
          htmlFor="state"
          placeholder="Selecione o estado"
          options={stateOptions}
          required
          errorMessage={errors.state?.message}
          {...register('state')}
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
          htmlFor="agriculturalArea"
          type="number"
          min={0}
          step="0.01"
          placeholder="0"
          required
          errorMessage={errors.agriculturalArea?.message}
          {...register('agriculturalArea', { valueAsNumber: true })}
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

      <CropsWrapper>
        <Label required>Culturas plantadas</Label>
        <Controller
          name="crops"
          control={control}
          render={({ field }) => (
            <CropsGrid>
              {AVAILABLE_CROPS.map((crop) => {
                const selected = isCropSelected(crop)
                const toggleCrop = () => {
                  const updatedCrops = selected
                    ? field.value.filter((c: string) => c !== crop)
                    : [...(field.value ?? []), crop]
                  field.onChange(updatedCrops)
                }

                return (
                  <CropCheckbox key={crop} isSelected={selected}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={toggleCrop}
                    />
                    {CROP_LABELS[crop]}
                  </CropCheckbox>
                )
              })}
            </CropsGrid>
          )}
        />
        {errors.crops && (
          <ErrorMessage role="alert">{errors.crops.message}</ErrorMessage>
        )}
      </CropsWrapper>

      <FormActions>
        <Button type="submit" isLoading={isLoading}>
          Cadastrar Fazenda
        </Button>
      </FormActions>
    </Form>
  )
}
