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
  const { entities, createEntity, deleteEntity } = useEntities()
  const { producers } = useProducers()

  const producerNameById = buildProducerNameMap(producers)

  const handleCreateEntity = (data: EntityFormData) => {
    createEntity(data)
  }

  const handleDeleteEntity = (id: string) => {
    deleteEntity(id)
  }

  return (
    <DashboardTemplate>
      <FormPageTemplate
        title="Cadastrar Fazenda"
        description="Preencha os dados da propriedade rural. A soma das áreas agricultável e de vegetação não pode ultrapassar a área total."
        formSlot={
          <EntityForm
            producers={producers}
            onSubmitSuccess={handleCreateEntity}
          />
        }
        tableSlot={
          <EntityTable
            entities={entities}
            producerNameById={producerNameById}
            onDeleteEntity={handleDeleteEntity}
          />
        }
      />
    </DashboardTemplate>
  )
}
