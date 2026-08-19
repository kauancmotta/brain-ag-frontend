import { css } from '@emotion/react'
import { theme } from './theme'

export const truncateText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const cardSurface = css`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.border};
`

export const focusRing = css`
  &:focus {
    outline: none;
    border-color: ${theme.colors.borderFocus};
    box-shadow: 0 0 0 3px ${theme.colors.primaryLighter};
  }
`
