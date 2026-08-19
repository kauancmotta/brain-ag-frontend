import styled from '@emotion/styled'
import { theme } from '@/styles/theme'
import { ButtonVariant, ButtonSize } from './Button.types'

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: `
    background-color: ${theme.colors.primary};
    color: ${theme.colors.surface};
    &:hover:not(:disabled) { background-color: #163829; }
  `,
  secondary: `
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 1.5px solid ${theme.colors.primary};
    &:hover:not(:disabled) { background-color: ${theme.colors.primaryLighter}; }
  `,
  danger: `
    background-color: ${theme.colors.error};
    color: ${theme.colors.surface};
    &:hover:not(:disabled) { background-color: #b91c1c; }
  `,
  ghost: `
    background-color: transparent;
    color: ${theme.colors.textSecondary};
    &:hover:not(:disabled) { background-color: ${theme.colors.border}; }
  `,
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: `
    padding: 6px 12px;
    font-size: ${theme.typography.sizes.sm};
  `,
  md: `
    padding: 10px 20px;
    font-size: ${theme.typography.sizes.md};
  `,
  lg: `
    padding: 14px 28px;
    font-size: ${theme.typography.sizes.lg};
  `,
}

interface StyledButtonProps {
  variant: ButtonVariant
  size: ButtonSize
  fullWidth: boolean
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.weights.medium};
  font-family: ${theme.typography.family};
  cursor: pointer;
  transition: background-color 0.2s ease, opacity 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ variant }) => VARIANT_STYLES[variant]}
  ${({ size }) => SIZE_STYLES[size]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
