import { Logo } from './logo'
import { Navbar } from './nav-bar'
import { UserAvatar } from './user-avatar'

export const Header = () => {
	return (
		<header className='px-6 py-4 flex justify-between border-b'>
			<Logo />
			<Navbar />
			<UserAvatar />
		</header>
	)
}
