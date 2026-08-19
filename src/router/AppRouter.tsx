import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { Producers } from '@/pages/Producers'
import { Entities } from '@/pages/Entities'
import { EntityDetails } from '@/pages/EntityDetails'
import { CropSeasonCreate } from '@/pages/CropSeasonCreate'
import { CropSeasonDetails } from '@/pages/CropSeasonDetails'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/producers" element={<Producers />} />
      <Route path="/entities" element={<Entities />} />
      <Route path="/entities/:entityId" element={<EntityDetails />} />
      <Route
        path="/entities/:entityId/crop-seasons/new"
        element={<CropSeasonCreate />}
      />
      <Route
        path="/crop-seasons/:cropSeasonId"
        element={<CropSeasonDetails />}
      />
      <Route
        path="/entities/:entityId/crop-seasons/:cropSeasonId"
        element={<CropSeasonDetails />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)
