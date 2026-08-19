import styled from '@emotion/styled'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Landmark } from 'lucide-react'
import { theme } from '@/styles/theme'

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/producers', label: 'Produtores', icon: <Users size={20} /> },
  { path: '/entities', label: 'Fazendas', icon: <Landmark size={20} /> },
]

const StyledSidebar = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: ${theme.sidebar.width};
  height: 100vh;
  background-color: ${theme.colors.sidebarBg};
  display: flex;
  flex-direction: column;
  z-index: 20;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`

const LogoText = styled.span`
  font-size: ${theme.typography.sizes.md};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.surface};
  line-height: 1.2;
`

const LogoSubtext = styled.span`
  font-size: ${theme.typography.sizes.xs};
  color: ${theme.colors.primaryLight};
  display: block;
  font-weight: ${theme.typography.weights.regular};
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.md} 0;
  gap: 2px;
`

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: 12px ${theme.spacing.md};
  color: ${theme.colors.sidebarText};
  font-size: ${theme.typography.sizes.sm};
  font-weight: ${theme.typography.weights.medium};
  border-radius: 0;
  transition: background-color 0.15s ease, color 0.15s ease;
  margin: 0 ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: ${theme.colors.surface};
  }

  &.active {
    background-color: ${theme.colors.primaryLight};
    color: ${theme.colors.primary};
    font-weight: ${theme.typography.weights.semibold};
  }
`

const BrainIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="8" fill="#52B788" />
    <path
      d="M8 16c0-4.418 3.582-8 8-8s8 3.582 8 8"
      stroke="#1B4332"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="16" cy="16" r="3" fill="#1B4332" />
    <path
      d="M16 13v-3M13.5 14.5l-2-2M18.5 14.5l2-2"
      stroke="#1B4332"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M10 20c1-2 3-3 6-3s5 1 6 3"
      stroke="#1B4332"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

export const Sidebar = () => (
  <StyledSidebar>
    <LogoWrapper>
      <BrainIcon />
      <LogoText>
        Brain
        <LogoSubtext>Agriculture</LogoSubtext>
      </LogoText>
    </LogoWrapper>
    <Nav>
      {NAV_ITEMS.map(({ path, label, icon }) => (
        <StyledNavLink
          key={path}
          to={path}
          end={path === '/'}
        >
          {icon}
          {label}
        </StyledNavLink>
      ))}
    </Nav>
  </StyledSidebar>
)
