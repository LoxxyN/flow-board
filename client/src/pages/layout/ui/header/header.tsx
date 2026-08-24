import { Logo } from './logo'
import { Navbar } from './nav-bar'
import { ThemeSwitch } from './theme-switch'
import { UserAvatar } from './user-avatar'

export const Header = () => {
  return (
    <header className="px-6 py-4 flex justify-between border-b">
      <Logo />
      <Navbar />
      <div className="flex items-center gap-6">
        <ThemeSwitch />
        <UserAvatar />
      </div>
    </header>
  )
}
