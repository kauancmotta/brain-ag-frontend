import styled from '@emotion/styled'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ChartCard } from '@/components/molecules/ChartCard'
import { theme } from '@/styles/theme'

interface ChartDataEntry {
  name: string
  value: number
}

interface DashboardChartsProps {
  farmsByCrop: ChartDataEntry[]
  farmsByState: ChartDataEntry[]
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

const chartHasData = (data: ChartDataEntry[]): boolean => data.length > 0

export const DashboardCharts = ({
  farmsByCrop,
  farmsByState,
}: DashboardChartsProps) => (
  <ChartsGrid>
    <ChartCard
      title="Fazendas por Cultura"
      isEmpty={!chartHasData(farmsByCrop)}
    >
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={farmsByCrop}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {farmsByCrop.map((_, index) => (
              <Cell
                key={`crop-cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} fazenda(s)`, '']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>

    <ChartCard
      title="Fazendas por Estado"
      isEmpty={!chartHasData(farmsByState)}
    >
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={farmsByState}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
          >
            {farmsByState.map((_, index) => (
              <Cell
                key={`state-cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} fazenda(s)`, '']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  </ChartsGrid>
)
