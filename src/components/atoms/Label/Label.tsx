import styled from '@emotion/styled'
import { LabelHTMLAttributes } from 'react'
import { theme } from '@/styles/theme'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

const StyledLabel = styled.label`
  display: block;
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  color: ${theme.colors.textPrimary};
  margin-bottom: ${theme.spacing.xs};
`

const RequiredMark = styled.span`
  color: ${theme.colors.error};
  margin-left: 2px;
`

export const Label = ({ children, required, ...rest }: LabelProps) => (
  <StyledLabel {...rest}>
    {children}
    {required && <RequiredMark aria-hidden>*</RequiredMark>}
  </StyledLabel>
)
