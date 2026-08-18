import { Avatar as Av } from '@heroui/react'
import { UserRound } from 'lucide-react'

type AvatarProps = { imgSrc: string; alt: string; size?: 'sm' | 'md' }

export const Avatar = ({ imgSrc, alt, size = 'sm' }: AvatarProps) => {
  return (
    <Av size={size}>
      <Av.Image alt={alt} src={imgSrc} />
      <Av.Fallback>
        <UserRound size={18} />
      </Av.Fallback>
    </Av>
  )
}
