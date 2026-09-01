import { Select as HSelect, Label, ListBox, type Key } from '@heroui/react'
import { For } from '@shared/lib'
interface SelectOption {
  id: string
  label: string
}

interface SelectProps<T> {
  label?: string
  placeholder?: string
  options: T[]
  value?: Key | Key[] | null
  defaultValue?: Key | Key[] | null
  onChange?: (value: Key | Key[] | null) => void
  selectionMode?: 'single' | 'multiple'
  variant?: 'secondary' | 'primary'
  isDisabled?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  className?: string
}

export function Select<T extends SelectOption>({
  label,
  placeholder = 'Выберите',
  options,
  value,
  defaultValue,
  onChange,
  selectionMode = 'single',
  variant = 'primary',
  isDisabled,
  isRequired,
  isInvalid,
  className,
}: SelectProps<T>) {
  return (
    <HSelect
      placeholder={placeholder}
      selectionMode={selectionMode}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      variant={variant}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}
      className={className}
    >
      {label && <Label>{label}</Label>}
      <HSelect.Trigger>
        <HSelect.Value />
        <HSelect.Indicator />
      </HSelect.Trigger>
      <HSelect.Popover>
        <ListBox>
          <For each={options}>
            {({ id, label }) => (
              <ListBox.Item key={id} id={id} textValue={label}>
                {label}
                <ListBox.ItemIndicator />
              </ListBox.Item>
            )}
          </For>
        </ListBox>
      </HSelect.Popover>
    </HSelect>
  )
}
