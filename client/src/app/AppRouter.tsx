import { Toast } from '@heroui/react'
import { DashboardPage } from '@pages/dashboard-page'
import { Layout } from '@pages/layout'
import { NotFound } from '@pages/not-found'
import { BrowserRouter, Route, Routes } from 'react-router'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Toast.Provider placement="top" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/command" element={'команды'} />
          <Route path="/projects" element={'проекты'} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
