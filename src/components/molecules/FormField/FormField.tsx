import styled from '@emotion/styled'
import { InputHTMLAttributes, forwardRef } from 'react'
import { Label } from '@/components/atoms/Label'
import { Input } from '@/components/atoms/Input'
import { theme } from '@/styles/theme'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  errorMessage?: string
  htmlFor?: string
}

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const ErrorMessage = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.error};
`

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, errorMessage, htmlFor, required, ...inputProps }, ref) => (
    <FieldWrapper>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      <Input
        id={htmlFor}
        hasError={Boolean(errorMessage)}
        ref={ref}
        {...inputProps}
      />
      {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
    </FieldWrapper>
  )
)

FormField.displayName = 'FormField'
