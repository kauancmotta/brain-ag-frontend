import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Dashboard } from '@/pages/Dashboard'
import { Producers } from '@/pages/Producers'
import { Entities } from '@/pages/Entities'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/producers" element={<Producers />} />
      <Route path="/entities" element={<Entities />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
)
