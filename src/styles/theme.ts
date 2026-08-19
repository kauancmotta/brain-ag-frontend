export const theme = {
  colors: {
    primary: '#1B4332',
    primaryLight: '#52B788',
    primaryLighter: '#D8F3DC',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    textPrimary: '#1C1C1C',
    textSecondary: '#6B7280',
    error: '#DC2626',
    errorLight: '#FEE2E2',
    success: '#16A34A',
    successLight: '#DCFCE7',
    border: '#E5E7EB',
    borderFocus: '#52B788',
    sidebarBg: '#1B4332',
    sidebarText: '#D8F3DC',
    sidebarActive: '#52B788',
  },
  typography: {
    family: "'Inter', sans-serif",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 8px 24px rgba(0,0,0,0.10)',
  },
  sidebar: {
    width: '240px',
  },
  header: {
    height: '64px',
  },
} as const

export type Theme = typeof theme
