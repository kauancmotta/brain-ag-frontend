import styled from '@emotion/styled'
import { Eye, Trash2 } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Entity } from '@/types/entity.types'
import { formatHectares } from '@/utils/area.utils'
import { theme } from '@/styles/theme'
import { cardSurface } from '@/styles/mixins'

interface EntityTableProps {
  entities: Entity[]
  producerNameById: Record<string, string>
  onViewEntity: (id: string) => void
  onDeleteEntity: (id: string) => void
}

const TableWrapper = styled.div`
  ${cardSurface}
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const TableHead = styled.thead`
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
`

const TableHeadCell = styled.th`
  padding: ${theme.spacing.md};
  text-align: left;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.textSecondary};
  white-space: nowrap;
`

const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.border};
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${theme.colors.background};
  }
`

const TableCell = styled.td`
  padding: ${theme.spacing.md};
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.textPrimary};
`

const EmptyCell = styled.td`
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.sizes.sm};
`

export const EntityTable = ({
  entities,
  producerNameById,
  onViewEntity,
  onDeleteEntity,
}: EntityTableProps) => {
  const hasEntities = entities.length > 0

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Produtor</TableHeadCell>
            <TableHeadCell>Estado</TableHeadCell>
            <TableHeadCell>Área Total</TableHeadCell>
            <TableHeadCell>Ações</TableHeadCell>
          </tr>
        </TableHead>
        <tbody>
          {hasEntities ? (
            entities.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell>{entity.name}</TableCell>
                <TableCell>
                  {entity.customer?.name ??
                    (entity.customerId
                    ? producerNameById[entity.customerId] ?? '—'
                    : '—')}
                </TableCell>
                <TableCell>{entity.address?.state ?? '—'}</TableCell>
                <TableCell>{formatHectares(entity.totalArea)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewEntity(entity.id)}
                    aria-label={`Visualizar fazenda ${entity.name}`}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteEntity(entity.id)}
                    aria-label={`Remover fazenda ${entity.name}`}
                  >
                    <Trash2 size={16} color={theme.colors.error} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <tr>
                <EmptyCell colSpan={5}>
                Nenhuma fazenda cadastrada ainda.
              </EmptyCell>
            </tr>
          )}
        </tbody>
      </Table>
    </TableWrapper>
  )
}
