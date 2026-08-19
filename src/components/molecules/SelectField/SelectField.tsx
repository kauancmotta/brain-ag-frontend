import styled from '@emotion/styled'
import { SelectHTMLAttributes, forwardRef } from 'react'
import { Label } from '@/components/atoms/Label'
import { theme } from '@/styles/theme'
import { focusRing } from '@/styles/mixins'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  errorMessage?: string
  htmlFor?: string
  placeholder?: string
}

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

const StyledSelect = styled.select<{ hasError: boolean }>`
  width: 100%;
  padding: 10px 14px;
  font-size: ${theme.typography.sizes.md};
  font-family: ${theme.typography.family};
  color: ${theme.colors.textPrimary};
  background-color: ${theme.colors.surface};
  border: 1.5px solid
    ${({ hasError }) => (hasError ? theme.colors.error : theme.colors.border)};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:disabled {
    background-color: ${theme.colors.background};
    cursor: not-allowed;
  }

  ${focusRing}
`

const ErrorMessage = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.error};
`

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    { label, options, errorMessage, htmlFor, placeholder, required, ...rest },
    ref
  ) => (
    <FieldWrapper>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      <StyledSelect
        id={htmlFor}
        hasError={Boolean(errorMessage)}
        ref={ref}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
    </FieldWrapper>
  )
)

SelectField.displayName = 'SelectField'
