import styled from '@emotion/styled'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { Producer } from '@/types/producer.types'
import { formatDocument } from '@/utils/cpfCnpj.utils'
import { theme } from '@/styles/theme'
import { cardSurface } from '@/styles/mixins'

interface ProducerTableProps {
  producers: Producer[]
  onDeleteProducer: (id: string) => void
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

const EmptyRow = styled.tr``

const EmptyCell = styled.td`
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.sizes.sm};
`

export const ProducerTable = ({
  producers,
  onDeleteProducer,
}: ProducerTableProps) => {
  const hasProducers = producers.length > 0

  return (
    <TableWrapper>
      <Table>
        <TableHead>
          <tr>
            <TableHeadCell>Nome</TableHeadCell>
            <TableHeadCell>Documento</TableHeadCell>
            <TableHeadCell>Ações</TableHeadCell>
          </tr>
        </TableHead>
        <tbody>
          {hasProducers ? (
            producers.map((producer) => (
              <TableRow key={producer.id}>
                <TableCell>{producer.name}</TableCell>
                <TableCell>{formatDocument(producer.document)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteProducer(producer.id)}
                    aria-label={`Remover produtor ${producer.name}`}
                  >
                    <Trash2 size={16} color={theme.colors.error} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <EmptyRow>
              <EmptyCell colSpan={5}>
                Nenhum produtor cadastrado ainda.
              </EmptyCell>
            </EmptyRow>
          )}
        </tbody>
      </Table>
    </TableWrapper>
  )
}
