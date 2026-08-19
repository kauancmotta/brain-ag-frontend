import styled from '@emotion/styled'
import { Users, Landmark, Wheat, MapPin } from 'lucide-react'
import { DashboardTemplate } from '@/components/templates/DashboardTemplate'
import { StatCard } from '@/components/molecules/StatCard'
import { DashboardCharts } from '@/components/organisms/DashboardCharts'
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics'
import { formatHectares } from '@/utils/area.utils'
import { theme } from '@/styles/theme'

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const Dashboard = () => {
  const { totalProducers, totalFarms, totalHectares, farmsByState, farmsByCrop } =
    useDashboardMetrics()

  return (
    <DashboardTemplate>
      <MetricsGrid>
        <StatCard
          title="Total de Produtores"
          value={totalProducers}
          icon={<Users size={22} />}
          description="Produtores cadastrados"
        />
        <StatCard
          title="Total de Fazendas"
          value={totalFarms}
          icon={<Landmark size={22} />}
          description="Propriedades registradas"
        />
        <StatCard
          title="Total em Hectares"
          value={formatHectares(totalHectares)}
          icon={<Wheat size={22} />}
          description="Área total cadastrada"
        />
        <StatCard
          title="Estados cobertos"
          value={farmsByState.length}
          icon={<MapPin size={22} />}
          description="Estados com fazendas"
        />
      </MetricsGrid>

      <DashboardCharts
        farmsByCrop={farmsByCrop}
        farmsByState={farmsByState}
      />
    </DashboardTemplate>
  )
}
