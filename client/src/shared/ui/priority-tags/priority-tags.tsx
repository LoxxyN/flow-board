import { Label, Tag, TagGroup, type Key } from '@heroui/react'
import { For } from '@shared/lib'

type TagsOption = {
  id: string | number
  label: string
}

const priorityTags: TagsOption[] = [
  { id: 'high', label: 'high' },
  { id: 'medium', label: 'medium' },
  { id: 'low', label: 'low' },
]

interface PriorityTagsProps {
  label: string
  selectedKeys?: Iterable<Key>
  onSelectionChange?: (keys: Iterable<Key>) => void
}

export const PriorityTags = ({ label, selectedKeys, onSelectionChange }: PriorityTagsProps) => {
  return (
    <TagGroup
      onSelectionChange={onSelectionChange}
      selectedKeys={selectedKeys}
      selectionMode="single"
      size="lg"
    >
      <Label className="mb-1.5">{label}</Label>
      <TagGroup.List>
        <For each={priorityTags}>
          {(tag) => (
            <Tag key={tag.id} id={tag.id}>
              {tag.label}
            </Tag>
          )}
        </For>
      </TagGroup.List>
    </TagGroup>
  )
}
