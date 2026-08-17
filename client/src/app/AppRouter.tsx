import { DashboardPage } from '@pages/dashboard-page'
import { Layout } from '@pages/layout'
import { BrowserRouter, Route, Routes } from 'react-router'

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<DashboardPage />} />
					<Route path='/command' element={'команды'} />
					<Route path='/projects' element={'проекты'} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
