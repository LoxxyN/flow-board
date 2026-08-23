import { NavLink } from 'react-router'

interface INavlink {
  link: string
  title: string
}

const baseClass = 'px-2 rounded-xl transition-colors hover:bg-accent-soft/70'
const activeClass = 'underline underline-offset-4 decoration-2'

export const Navlink = ({ link, title }: INavlink) => {
  return (
    <NavLink to={link} className={({ isActive }) => `${baseClass} ${isActive && activeClass}`}>
      {title}
    </NavLink>
  )
}
