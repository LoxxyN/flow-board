import { Navlink, type INavlink } from './nav-link'

const LINKS: INavlink[] = [
  { id: 1, title: 'Доска', link: '/' },
  { id: 2, title: 'Проекты', link: '/projects' },
  { id: 3, title: 'Команда', link: '/command' },
]

export const Navbar = () => {
  return (
    <nav className="w-1/5 flex justify-between items-center">
      {LINKS.map((link) => (
        <Navlink key={link.id} {...link} />
      ))}
    </nav>
  )
}
