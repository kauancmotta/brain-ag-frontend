import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormField } from '@/components/molecules/FormField'
import { Button } from '@/components/atoms/Button'
import { producerSchema, ProducerFormData } from '@/schemas/producer.schema'
import { theme } from '@/styles/theme'

interface ProducerFormProps {
  onSubmitSuccess: (data: ProducerFormData) => void
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

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: ${theme.spacing.sm};
`

export const ProducerForm = ({
  onSubmitSuccess,
  isLoading = false,
}: ProducerFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProducerFormData>({
    resolver: zodResolver(producerSchema),
  })

  const submitProducer = (data: ProducerFormData) => {
    onSubmitSuccess(data)
    reset()
  }

  return (
    <Form onSubmit={handleSubmit(submitProducer)} noValidate>
      <FormRow>
        <FormField
        label="Nome completo"
        htmlFor="name"
        placeholder="Ex: João da Silva"
        required
        errorMessage={errors.name?.message}
        {...register('name')}
      />
      
        <FormField
          label="Email"
          htmlFor="Email"
          placeholder="Email"
          required
          errorMessage={errors.email?.message}
          {...register('email')}
        />
      </FormRow>
      

      <FormField
        label="CPF ou CNPJ"
        htmlFor="document"
        placeholder="000.000.000-00 ou 00.000.000/0000-00"
        required
        errorMessage={errors.document?.message}
        {...register('document')}
      />

      

      <FormActions>
        <Button type="submit" isLoading={isLoading}>
          Cadastrar Produtor
        </Button>
      </FormActions>
    </Form>
  )
}
