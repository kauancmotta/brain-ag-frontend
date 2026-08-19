import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { theme } from '@/styles/theme'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

interface SpinnerProps {
  size?: number
}

const StyledSpinner = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 2px solid ${theme.colors.border};
  border-top-color: ${theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`

export const Spinner = ({ size = 24 }: SpinnerProps) => (
  <StyledSpinner size={size} role="status" aria-label="Carregando" />
)
