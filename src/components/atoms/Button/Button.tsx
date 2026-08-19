import { Loader2 } from 'lucide-react'
import { ButtonProps } from './Button.types'
import { StyledButton } from './Button.styles'

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  ...rest
}: ButtonProps) => (
  <StyledButton
    variant={variant}
    size={size}
    fullWidth={fullWidth}
    disabled={disabled || isLoading}
    {...rest}
  >
    {isLoading && <Loader2 size={16} className="spin" />}
    {children}
  </StyledButton>
)
