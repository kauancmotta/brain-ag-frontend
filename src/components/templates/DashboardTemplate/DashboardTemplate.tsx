import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { Header } from '@/components/organisms/Header'
import { Sidebar } from '@/components/organisms/Sidebar'
import { theme } from '@/styles/theme'

interface DashboardTemplateProps {
  children: ReactNode
}

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
`

const MainContent = styled.main`
  margin-left: ${theme.sidebar.width};
  margin-top: ${theme.header.height};
  flex: 1;
  padding: ${theme.spacing.xl};
  background-color: ${theme.colors.background};
  min-height: calc(100vh - ${theme.header.height});
`

export const DashboardTemplate = ({ children }: DashboardTemplateProps) => (
  <Layout>
    <Sidebar />
    <Header />
    <MainContent>{children}</MainContent>
  </Layout>
)
