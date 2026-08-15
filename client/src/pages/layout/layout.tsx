import { Outlet } from 'react-router'
import './layout.css'
import { Header, Sidebar } from './ui'

export const Layout = () => {
	return (
		<div className='layout'>
			<div className='header-wrapper'>
				<Header />
			</div>
			<div className='sidebar-wrapper'>
				<Sidebar />
			</div>
			<div className='content-wrapper'>
				<main className='p-8'>
					<Outlet />
				</main>
			</div>
		</div>
	)
}
