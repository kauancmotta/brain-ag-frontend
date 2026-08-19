import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { theme } from '@/styles/theme'
import { cardSurface } from '@/styles/mixins'

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  description?: string
}

const Card = styled.div`
  ${cardSurface}
  padding: ${theme.spacing.lg};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${theme.borderRadius.md};
  background-color: ${theme.colors.primaryLighter};
  color: ${theme.colors.primary};
  flex-shrink: 0;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const Title = styled.span`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.typography.weights.medium};
`

const Value = styled.strong`
  font-size: ${theme.typography.sizes['2xl']};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.textPrimary};
  line-height: 1.2;
`

const Description = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.textSecondary};
`

export const StatCard = ({ title, value, icon, description }: StatCardProps) => (
  <Card>
    <IconWrapper>{icon}</IconWrapper>
    <Content>
      <Title>{title}</Title>
      <Value>{value}</Value>
      {description && <Description>{description}</Description>}
    </Content>
  </Card>
)
