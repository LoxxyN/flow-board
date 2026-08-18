import { NavLink } from 'react-router'

export interface INavlink {
  id: number
  link: string
  title: string
}

const baseLinkStyle = 'hover:bg-accent-soft rounded px-2'
const activeLinkStyle = `bg-accent/20 text-white ${baseLinkStyle}`
const passiveLinkStyle = `text-accent/50 ${baseLinkStyle}`

export const Navlink = ({ link, title }: INavlink) => {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? activeLinkStyle : passiveLinkStyle)}
      to={link}
    >
      {title}
    </NavLink>
  )
}
