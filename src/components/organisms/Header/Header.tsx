import styled from '@emotion/styled'
import { useLocation } from 'react-router-dom'
import { theme } from '@/styles/theme'

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/producers': 'Produtores',
  '/entities': 'Fazendas',
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: ${theme.sidebar.width};
  right: 0;
  height: ${theme.header.height};
  background-color: ${theme.colors.surface};
  border-bottom: 1px solid ${theme.colors.border};
  display: flex;
  align-items: center;
  padding: 0 ${theme.spacing.xl};
  z-index: 10;
`

const PageTitle = styled.h1`
  font-size: ${theme.typography.sizes.xl};
  font-weight: ${theme.typography.weights.semibold};
  color: ${theme.colors.textPrimary};
`

export const Header = () => {
  const { pathname } = useLocation()
  const pageTitle = ROUTE_TITLES[pathname] ?? 'Brain Agriculture'

  return (
    <StyledHeader>
      <PageTitle>{pageTitle}</PageTitle>
    </StyledHeader>
  )
}
