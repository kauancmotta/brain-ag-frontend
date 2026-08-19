import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { theme } from '@/styles/theme'
import { cardSurface } from '@/styles/mixins'

interface FormPageTemplateProps {
  title: string
  description?: string
  formSlot: ReactNode
  tableSlot: ReactNode
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`

const FormCard = styled.section`
  ${cardSurface}
  padding: ${theme.spacing.xl};
`

const CardHeader = styled.div`
  margin-bottom: ${theme.spacing.lg};
`

const CardTitle = styled.h2`
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.textPrimary};
`

const CardDescription = styled.p`
  font-size: ${theme.typography.sizes.sm};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.xs};
`

const TableSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

const TableTitle = styled.h3`
  font-size: ${theme.typography.sizes.lg};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.textPrimary};
`

export const FormPageTemplate = ({
  title,
  description,
  formSlot,
  tableSlot,
}: FormPageTemplateProps) => (
  <PageWrapper>
    <FormCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {formSlot}
    </FormCard>

    <TableSection>
      <TableTitle>Registros cadastrados</TableTitle>
      {tableSlot}
    </TableSection>
  </PageWrapper>
)
