import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@emotion/react'
import { store, persistor } from '@/store'
import { theme } from '@/styles/theme'
import { GlobalStyles } from '@/styles/GlobalStyles'
import { Spinner } from '@/components/atoms/Spinner'

interface AppProvidersProps {
  children: ReactNode
}

const LoadingFallback = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}
  >
    <Spinner size={40} />
  </div>
)

export const AppProviders = ({ children }: AppProvidersProps) => (
  <Provider store={store}>
    <PersistGate loading={<LoadingFallback />} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </PersistGate>
  </Provider>
)
