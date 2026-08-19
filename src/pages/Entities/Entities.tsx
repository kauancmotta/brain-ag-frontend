import { useNavigate } from 'react-router-dom'
import { DashboardTemplate } from '@/components/templates/DashboardTemplate'
import { FormPageTemplate } from '@/components/templates/FormPageTemplate'
import { EntityForm } from '@/components/organisms/EntityForm'
import { EntityTable } from '@/components/organisms/EntityTable'
import { useEntities } from '@/hooks/useEntities'
import { useProducers } from '@/hooks/useProducers'
import { EntityFormData } from '@/schemas/entity.schema'
import { Producer } from '@/types/producer.types'

const buildProducerNameMap = (producers: Producer[]): Record<string, string> =>
  Object.fromEntries(producers.map((producer) => [producer.id, producer.name]))

export const Entities = () => {
  const navigate = useNavigate()
  const { entities, createEntity, deleteEntity, isLoading, error } = useEntities()
  const { producers } = useProducers()

  const producerNameById = buildProducerNameMap(producers)

  const handleCreateEntity = async (data: EntityFormData) => {
    const createdEntity = await createEntity(data)

    if (createdEntity) {
      navigate(`/entities/${createdEntity.id}`)
    }

    return createdEntity
  }

  const handleDeleteEntity = (id: string) => {
    deleteEntity(id)
  }

  return (
    <DashboardTemplate>
      <FormPageTemplate
        title="Cadastrar Fazenda"
        description="Preencha os dados da propriedade rural. As culturas serão cadastradas dentro de cada safra após o salvamento."
        formSlot={
          <>
            {error && <p role="alert">{error}</p>}
            <EntityForm
              producers={producers}
              onSubmitSuccess={handleCreateEntity}
              isLoading={isLoading}
            />
          </>
        }
        tableSlot={
          <EntityTable
            entities={entities}
            producerNameById={producerNameById}
            onViewEntity={(id) => navigate(`/entities/${id}`)}
            onDeleteEntity={handleDeleteEntity}
          />
        }
      />
    </DashboardTemplate>
  )
}
