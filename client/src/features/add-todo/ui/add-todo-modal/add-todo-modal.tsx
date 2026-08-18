import {
	Button,
	FieldError,
	Form,
	Input,
	Label,
	TextArea,
	TextField,
} from '@heroui/react'
import { Modal, Select } from '@shared/ui'
import { PriorityTags } from '../priority-tags'

export const AddTodoModal = ({
	triggerButton,
}: {
	triggerButton: React.ReactNode
}) => {
	return (
		<Modal
			title='Новая задача'
			size='md'
			triggerButton={triggerButton}
			footer={
				<>
					<Button variant='outline' slot='close'>
						Отмена
					</Button>
					<Button variant='primary' slot='close'>
						Создать
					</Button>
				</>
			}
		>
			<Form className='flex flex-col gap-5'>
				<TextField isRequired name='task name' type='text'>
					<Label className='mb-1.5'>Название задачи</Label>
					<Input variant='secondary' placeholder='Введите название задачи...' />
					<FieldError />
				</TextField>

				<TextField isRequired name='task_description' type='text'>
					<Label className='mb-1.5'>Описание</Label>
					<TextArea
						variant='secondary'
						placeholder='Введите название задачи...'
						className='h-14'
					/>
					<FieldError />
				</TextField>

				<TextField>
					<Label className='mb-1.5'>Статус</Label>
					<Select
						variant='secondary'
						defaultValue='todo'
						options={[
							{ id: 'todo', label: 'Todo' },
							{ id: 'in_progress', label: 'In progress' },
							{ id: 'done', label: 'Done' },
						]}
					/>
				</TextField>

				<TextField>
					<PriorityTags label='Приоритет' />
				</TextField>
			</Form>
		</Modal>
	)
}
