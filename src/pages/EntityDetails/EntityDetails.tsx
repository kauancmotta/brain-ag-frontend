import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { ArrowLeft, CalendarPlus, MapPin, Ruler } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { DashboardTemplate } from '@/components/templates/DashboardTemplate'
import { entitiesService } from '@/services/entities.service'
import { cropSeasonsService } from '@/services/crop-seasons.service'
import { Entity } from '@/types/entity.types'
import { CropSeason } from '@/types/crop-season.types'
import { formatHectares } from '@/utils/area.utils'
import { theme } from '@/styles/theme'

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`

const Title = styled.h1`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.sizes['2xl']};
`

const Subtitle = styled.p`
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.xs};
`

const Summary = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.xl};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};
`

const SummaryValue = styled.strong`
  display: block;
  color: ${theme.colors.textPrimary};
`

const SeasonsSection = styled.section`
  margin-top: ${theme.spacing.xl};
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.md};
`

const SectionTitle = styled.h2`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.sizes.xl};
`

const SeasonsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${theme.spacing.md};
`

const SeasonItem = styled.div`
  padding: ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.primaryLight};
  }
`

const SeasonYear = styled.strong`
  color: ${theme.colors.textPrimary};
  font-size: ${theme.typography.sizes.lg};
`

const SeasonMeta = styled.p`
  margin-top: ${theme.spacing.xs};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.sizes.sm};
`

const SeasonCrops = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-top: ${theme.spacing.md};
`

const SeasonCrop = styled.span`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.sizes.sm};
`

export const EntityDetails = () => {
  const { entityId } = useParams<{ entityId: string }>()
  const navigate = useNavigate()
  const [entity, setEntity] = useState<Entity | null>(null)
  const [seasons, setSeasons] = useState<CropSeason[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!entityId) return

    const loadEntity = async () => {
      try {
        const [loadedEntity, loadedSeasons] = await Promise.all([
          entitiesService.getById(entityId),
          cropSeasonsService.getByEntityId(entityId),
        ])
        setEntity(loadedEntity)
        setSeasons(loadedSeasons)
      } catch {
        setError('Não foi possível carregar os dados da fazenda.')
      }
    }

    void loadEntity()
  }, [entityId])

  return (
    <DashboardTemplate>
      <Button variant="ghost" size="sm" onClick={() => navigate('/entities')}>
        <ArrowLeft size={16} /> Voltar para fazendas
      </Button>

      {error && <p role="alert">{error}</p>}
      {!error && !entity && <p>Carregando fazenda...</p>}

      {entity && (
        <>
          <Header>
            <div>
              <Title>{entity.name}</Title>
              <Subtitle>Informações da propriedade</Subtitle>
            </div>
          </Header>

          <Summary>
            <SummaryItem>
              <MapPin size={20} />
              <div>
                <span>Localização</span>
                <SummaryValue>
                  {entity.address.city} - {entity.address.state}
                </SummaryValue>
              </div>
            </SummaryItem>
            <SummaryItem>
              <Ruler size={20} />
              <div>
                <span>Área total</span>
                <SummaryValue>{formatHectares(entity.totalArea)}</SummaryValue>
              </div>
            </SummaryItem>
            <SummaryItem>
              <Ruler size={20} />
              <div>
                <span>Uso do solo</span>
                <SummaryValue>
                  {formatHectares(entity.agricultureArea)} agricultável /{' '}
                  {formatHectares(entity.vegetationArea)} vegetação
                </SummaryValue>
              </div>
            </SummaryItem>
          </Summary>

          <SeasonsSection>
            <SectionHeader>
              <SectionTitle>Safras</SectionTitle>
              <Button
                size="sm"
                onClick={() => navigate(`/entities/${entity.id}/crop-seasons/new`)}
              >
                <CalendarPlus size={16} /> Adicionar safra
              </Button>
            </SectionHeader>

            {seasons.length === 0 ? (
              <SeasonMeta>Nenhuma safra cadastrada.</SeasonMeta>
            ) : (
              <SeasonsList>
                {seasons.map((season) => (
                  <SeasonItem
                    key={season.id}
                    onClick={() =>
                      navigate(`/entities/${entity.id}/crop-seasons/${season.id}`)
                    }
                  >
                    <SeasonYear>{season.year}</SeasonYear>
                    {season.cropSeasonCrops.length > 0 ? (
                      <SeasonCrops>
                        {season.cropSeasonCrops.map((seasonCrop) => (
                          <SeasonCrop key={seasonCrop.id}>
                            {seasonCrop.crop?.name ?? 'Cultura'} -{' '}
                            {formatHectares(seasonCrop.plantedArea)}
                          </SeasonCrop>
                        ))}
                      </SeasonCrops>
                    ) : (
                      <SeasonMeta>Nenhuma cultura cadastrada</SeasonMeta>
                    )}
                  </SeasonItem>
                ))}
              </SeasonsList>
            )}
          </SeasonsSection>
        </>
      )}
    </DashboardTemplate>
  )
}