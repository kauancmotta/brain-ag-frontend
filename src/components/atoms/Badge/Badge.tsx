import styled from '@emotion/styled'
import { theme } from '@/styles/theme'

type BadgeVariant = 'success' | 'primary' | 'neutral'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  success: `
    background-color: ${theme.colors.successLight};
    color: ${theme.colors.success};
  `,
  primary: `
    background-color: ${theme.colors.primaryLighter};
    color: ${theme.colors.primary};
  `,
  neutral: `
    background-color: ${theme.colors.border};
    color: ${theme.colors.textSecondary};
  `,
}

const StyledBadge = styled.span<{ variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.semibold};
  ${({ variant }) => VARIANT_STYLES[variant]}
`

export const Badge = ({ label, variant = 'neutral' }: BadgeProps) => (
  <StyledBadge variant={variant}>{label}</StyledBadge>
)
