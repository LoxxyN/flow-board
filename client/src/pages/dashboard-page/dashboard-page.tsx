import type { ITodo } from '@shared/types'
import { TodoBoard } from '@widgets/todo-board'

const TODOS: ITodo[] = [
  {
    id: 1,
    title: 'REST API',
    description: 'CRUD на Nestjs, написать валидацию и контроллеры',
    status: 'done',
    priority: 'medium',
  },
  {
    id: 2,
    title: 'Авторизация',
    description: 'JWT токены, регистрация и логин',
    status: 'in_progress',
    priority: 'high',
  },
  {
    id: 3,
    title: 'UI дашборда',
    description: 'Сверстать основную страницу с карточками задач',
    status: 'in_progress',
    priority: 'medium',
  },
  {
    id: 4,
    title: 'Фильтры задач',
    description: 'Фильтрация по статусу и приоритету',
    status: 'todo',
    priority: 'low',
  },
  {
    id: 5,
    title: 'Деплой на VPS',
    description: 'Настроить Docker и nginx',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 6,
    title: 'Тесты API',
    description: 'Unit-тесты для сервисов и контроллеров',
    status: 'todo',
    priority: 'medium',
  },
]

export const DashboardPage = () => {
  return (
    <div>
      <h2 className="font-extrabold text-2xl mb-6">Разработка MVP</h2>
      <TodoBoard todos={TODOS} />
    </div>
  )
}
