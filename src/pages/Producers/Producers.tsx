import { DashboardTemplate } from '@/components/templates/DashboardTemplate'
import { FormPageTemplate } from '@/components/templates/FormPageTemplate'
import { ProducerForm } from '@/components/organisms/ProducerForm'
import { ProducerTable } from '@/components/organisms/ProducerTable'
import { useProducers } from '@/hooks/useProducers'
import { ProducerFormData } from '@/schemas/producer.schema'
import { useSelector } from 'react-redux'
import { selectProducersError } from '@/store/slices/producers'
import { theme } from '@/styles/theme'
import styled from '@emotion/styled'

export const Producers = () => {
  const { producers, createProducer, deleteProducer } = useProducers()

  const handleCreateProducer = (data: ProducerFormData) => {
    createProducer(data)
  }

  const handleDeleteProducer = (id: string) => {
    deleteProducer(id)
  }

  const error = useSelector(selectProducersError)

  const ErrorAlert = styled.div`
    background-color: ${theme.colors.errorLight};
    border: 1px solid ${theme.colors.error};
    border-radius: ${theme.borderRadius.md};
    padding: ${theme.spacing.md};
    color: ${theme.colors.error};
    font-size: ${theme.typography.sizes.sm};
    margin-bottom: ${theme.spacing.md};
  `

  return (
    <DashboardTemplate>
      <FormPageTemplate
        title="Cadastrar Produtor"
        description="Preencha os dados do produtor rural. O documento (CPF ou CNPJ) será validado automaticamente."
        formSlot={
          <>
          {error && <ErrorAlert>{error}</ErrorAlert>}
            <ProducerForm onSubmitSuccess={handleCreateProducer} />
          </>
        }
        tableSlot={
          <ProducerTable
            producers={producers}
            onDeleteProducer={handleDeleteProducer}
          />
        }
      />
    </DashboardTemplate>
  )
}
