import { FormEvent, useState } from 'react'
import styled from '@emotion/styled'
import { Landmark, Wheat, MapPin } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules/FormField'
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

const FilterBar = styled.form`
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  padding: ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;
  }
`

const YearField = styled.div`
  width: 180px;

  @media (max-width: 600px) {
    width: 100%;
  }
`

const FilterActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`

export const Dashboard = () => {
  const [yearInput, setYearInput] = useState('')
  const [selectedYear, setSelectedYear] = useState<string | undefined>()
  const { totalFarms, totalHectares, states, crops, landUse, isLoading, error } =
    useDashboardMetrics(selectedYear)

  const handleFilter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (yearInput === '' || /^\d{4}$/.test(yearInput)) {
      setSelectedYear(yearInput || undefined)
    }
  }

  const clearFilter = () => {
    setYearInput('')
    setSelectedYear(undefined)
  }

  return (
    <DashboardTemplate>
      <FilterBar onSubmit={handleFilter}>
        <YearField>
          <FormField
            label="Ano da safra"
            htmlFor="dashboard-year"
            placeholder="Ex: 2025"
            value={yearInput}
            maxLength={4}
            inputMode="numeric"
            onChange={(event) => setYearInput(event.target.value.replace(/\D/g, ''))}
          />
        </YearField>
        <FilterActions>
          <Button type="submit" size="sm">
            Filtrar
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={clearFilter}>
            Limpar
          </Button>
        </FilterActions>
      </FilterBar>

      <MetricsGrid>
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
          value={states.length}
          icon={<MapPin size={22} />}
          description="Estados com fazendas"
        />
      </MetricsGrid>

      {isLoading && <p>Carregando métricas...</p>}
      {error && <p role="alert">{error}</p>}

      <DashboardCharts
        crops={crops}
        states={states}
        landUse={landUse}
      />
    </DashboardTemplate>
  )
}
