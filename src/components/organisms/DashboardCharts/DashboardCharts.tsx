import styled from '@emotion/styled'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from '@/components/molecules/ChartCard'
import {
  DashboardCropMetric,
  DashboardLandUseMetric,
  DashboardStateMetric,
} from '@/types/dashboard.types'
import { formatHectares } from '@/utils/area.utils'
import { theme } from '@/styles/theme'

interface DashboardChartsProps {
  crops: DashboardCropMetric[]
  states: DashboardStateMetric[]
  landUse: DashboardLandUseMetric
}

const CHART_COLORS = [
  '#1B4332',
  '#52B788',
  '#74C69D',
  '#95D5B2',
  '#B7E4C7',
  '#D8F3DC',
]

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FullWidthChart = styled.div`
  grid-column: 1 / -1;
`

const hasData = (data: unknown[]): boolean => data.length > 0

const buildLandUseData = (landUse: DashboardLandUseMetric) => [
  { name: 'Agricultura', value: landUse.agricultureArea },
  { name: 'Vegetação', value: landUse.vegetationArea },
]

export const DashboardCharts = ({
  crops,
  states,
  landUse,
}: DashboardChartsProps) => {
  const landUseData = buildLandUseData(landUse)

  return (
    <ChartsGrid>
      <ChartCard title="Área plantada por cultura" isEmpty={!hasData(crops)}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={crops} margin={{ left: 12, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [formatHectares(value), 'Área']}
            />
            <Bar dataKey="plantedArea" fill={theme.colors.primaryLight} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Fazendas por estado" isEmpty={!hasData(states)}>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={states}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="count"
              nameKey="state"
            >
              {states.map((item, index) => (
                <Cell
                  key={item.state}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                `${value} fazenda(s)`,
                'Quantidade',
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <FullWidthChart>
        <ChartCard title="Uso do solo" isEmpty={!hasData(landUseData)}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={landUseData}
              layout="vertical"
              margin={{ left: 24 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={90} />
              <Tooltip
                formatter={(value: number) => [formatHectares(value), 'Área']}
              />
              <Bar dataKey="value" fill={theme.colors.primary} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </FullWidthChart>
    </ChartsGrid>
  )
}
