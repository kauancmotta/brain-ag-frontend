import { Global, css } from '@emotion/react'
import { theme } from './theme'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

const globalStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${theme.typography.family};
    font-size: ${theme.typography.sizes.md};
    color: ${theme.colors.textPrimary};
    background-color: ${theme.colors.background};
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input,
  select,
  textarea {
    font-family: inherit;
  }

  ul,
  ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  :focus-visible {
    outline: 2px solid ${theme.colors.primaryLight};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`

export const GlobalStyles = () => <Global styles={globalStyles} />
