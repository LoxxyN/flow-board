import { For } from '@shared/lib'
import { Navlink } from './nav-link'

const LINKS = [
  { title: 'Доска', link: '/' },
  { title: 'Проекты', link: '/projects' },
  { title: 'Команда', link: '/command' },
]

export const Navbar = () => {
  return (
    <nav className="w-1/5 flex justify-between items-center">
      <For each={LINKS}>
        {({ link, title }) => <Navlink key={link} link={link} title={title} />}
      </For>
    </nav>
  )
}
