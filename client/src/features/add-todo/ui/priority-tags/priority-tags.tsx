import { Label, Tag, TagGroup } from '@heroui/react'

type TagsOption = {
	id: string | number
	label: string
}

const priorityTags: TagsOption[] = [
	{ id: 'high', label: 'high' },
	{ id: 'medium', label: 'medium' },
	{ id: 'low', label: 'low' },
]

export const PriorityTags = ({ label }: { label: string }) => {
	return (
		<TagGroup selectionMode='single' size='lg'>
			<Label className='mb-1.5'>{label}</Label>
			<TagGroup.List>
				{priorityTags.map(tag => (
					<Tag key={tag.id} id={tag.id}>
						{tag.label}
					</Tag>
				))}
			</TagGroup.List>
		</TagGroup>
	)
}
