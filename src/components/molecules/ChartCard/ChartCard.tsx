import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { theme } from '@/styles/theme'
import { cardSurface } from '@/styles/mixins'

interface ChartCardProps {
  title: string
  children: ReactNode
  isEmpty?: boolean
}

const Card = styled.div`
  ${cardSurface}
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const CardTitle = styled.h3`
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.textPrimary};
`

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.sizes.sm};
`

export const ChartCard = ({ title, children, isEmpty }: ChartCardProps) => (
  <Card>
    <CardTitle>{title}</CardTitle>
    {isEmpty ? (
      <EmptyState>Nenhum dado disponível ainda</EmptyState>
    ) : (
      children
    )}
  </Card>
)
