import styled from '@emotion/styled'
import { InputHTMLAttributes, forwardRef } from 'react'
import { theme } from '@/styles/theme'
import { focusRing } from '@/styles/mixins'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const StyledInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 10px 14px;
  font-size: ${theme.typography.sizes.md};
  font-family: ${theme.typography.family};
  color: ${theme.colors.textPrimary};
  background-color: ${theme.colors.surface};
  border: 1.5px solid
    ${({ hasError }) =>
      hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: ${theme.colors.textSecondary};
  }

  &:disabled {
    background-color: ${theme.colors.background};
    cursor: not-allowed;
  }

  ${focusRing}
`

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, ...rest }, ref) => (
    <StyledInput hasError={hasError} ref={ref} {...rest} />
  )
)

Input.displayName = 'Input'
