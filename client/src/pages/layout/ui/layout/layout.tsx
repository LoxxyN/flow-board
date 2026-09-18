import { Outlet } from 'react-router'
import { Header } from '../header'
import { Sidebar } from '../sidebar'
import './layout.css'

export const Layout = () => {
  return (
    <div className="layout">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="content-wrapper">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
