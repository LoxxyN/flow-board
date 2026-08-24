import { Button, useTheme } from '@heroui/react'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme('system')

  return (
    <div className="flex items-center gap-2 bg-foreground/10 p-0.5 rounded-full">
      <Button
        className="size-7"
        isIconOnly
        variant={resolvedTheme === 'light' ? 'primary' : 'secondary'}
        onPress={() => setTheme('light')}
      >
        <Sun />
      </Button>
      <Button
        className="size-7"
        isIconOnly
        variant={resolvedTheme === 'dark' ? 'primary' : 'secondary'}
        onPress={() => setTheme('dark')}
      >
        <Moon />
      </Button>
    </div>
  )
}
