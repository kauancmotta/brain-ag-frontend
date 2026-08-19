import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders } from './providers/AppProviders'
import { AppRouter } from './router/AppRouter'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Elemento root não encontrado no DOM')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
)
