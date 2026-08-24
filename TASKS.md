# flow-board — план работ

## Проект

**flow-board** — канбан-доска / трекер задач. Fullstack: клиент (React) + REST API (Hono) + PostgreSQL через Prisma.
Цель обучения: routing, асинхронные данные (TanStack Query), формы (HeroUI Form + FormData), валидация zod на сервере, REST API, ORM/база данных, тесты.

## Стек

| Слой   | Технология                                                                                      |
| ------ | ----------------------------------------------------------------------------------------------- |
| Клиент | Vite + React 19 + TS, Tailwind CSS v4, React Router v8, TanStack Query, HeroUI v3, Lucide React |
| Сервер | Hono + @hono/node-server, zod, CORS, @prisma/adapter-pg (Prisma 7)                              |
| ORM/БД | Prisma 7 + PostgreSQL 17 (localhost:5432)                                                       |
| Тесты  | Vitest + jsdom + Testing Library                                                                |

> Решение по формам: вместо React Hook Form используется HeroUI `Form` + `FormData`.
> Валидация — zod на сервере (`server/src/validation.ts`).

## Модель данных

```ts
Task {
  id: number
  title: string
  description: string | null
  priority: 'low' | 'medium' | 'high'    // Prisma enum Priority
  status: 'todo' | 'in_progress' | 'done' // Prisma enum Status
  createdAt: datetime
  updatedAt: datetime
}
```

## Структура репозитория

```
flow-board/
  AGENTS.md             <- правила для агента
  TASKS.md              <- этот файл
  server/
    prisma/             <- schema, seed, миграции
    src/index.ts         <- CORS (все роуты), /health, /api/tasks
    src/db.ts            <- PrismaClient + adapter-pg
    src/validation.ts    <- zod-схемы
    src/routes/tasks.ts  <- CRUD /api/tasks
    .env                 <- DATABASE_URL, PORT
  client/
    src/app/             <- main (QueryClientProvider + devtools), AppRouter
    src/pages/           <- layout (header/sidebar), dashboard-page, not-found
    src/widgets/         <- todo-board (колонки, карточки)
    src/features/        <- add-todo, delete-todo (api + ui)
    src/shared/
      api/               <- api-client (fetch-обёртка), tasks, use-tasks
      lib/               <- For
      types/             <- ITodo
      ui/                <- avatar, card, chip, modal, select, alert-dialog
    vite.config.ts       <- proxy /api -> localhost:3001
  index.html
```

## Текущее состояние

- [x] Сервер: Hono + Prisma 7, CRUD `/api/tasks`, CORS на все роуты, seed
- [x] БД: подключение к Postgres, миграция, seed
- [x] Клиент: Vite-скаффолд, Tailwind v4, HeroUI v3, react-router v8
- [x] Layout: grid (header + sidebar + main, `100vh`, overflow внутри зон)
- [x] Роуты: `/` (доска), `/projects`, `/command`, `*` (404)
- [x] TanStack Query: QueryClientProvider + Devtools + eslint-plugin-query
- [x] API-слой: `api-client.ts` (fetch-обёртка: JSON, ошибки HTTP, hidden-input совместимость), `tasks.ts`, `use-tasks.ts` (TASKS_KEY)
- [x] Vite proxy `/api` -> `localhost:3001` (без CORS-боли)
- [x] Доска: 3 колонки, карточки (title, description, avatar, priority chip), счётчики в колонках
- [x] Создание задачи: `AddTodoModal` (HeroUI Form + FormData, Select + PriorityTags как контролируемые компоненты с hidden-input), закрытие по onSuccess
- [x] Удаление задачи: `DeleteTodoDialog` + `AlertDialog` (подтверждение), `useDeleteTask` + инвалидация
- [x] Мутации-хуки с инвалидацией: `useCreateTask`, `useDeleteTask` (в `features/*/api/queries.ts`)
- [x] Sidebar: PriorityCountList (кол-во задач по приоритетам)
- [x] Header: Navlink (активное состояние), ThemeSwitch (HeroUI useTheme), UserAvatar
- [x] Shared UI: Avatar, Card (слоты headerRight/body/footer, isVertical), Chip (по приоритету), Modal (controlled isOpen/onOpenChange), Select (generic), AlertDialog, For
- [x] Тёмная тема: переключение через HeroUI `useTheme` (data-theme)

## Роуты

| URL         | Страница | Описание                                                      |
| ----------- | -------- | ------------------------------------------------------------- |
| `/`         | Доска    | 3 колонки (todo / in_progress / done), sidebar с приоритетами |
| `/projects` | Проекты  | Заглушка (потом)                                              |
| `/command`  | Команда  | Заглушка (потом)                                              |
| `*`         | 404      | Страница не найдена                                           |

**Создание/редактирование задачи — модалки** (не отдельные роуты), открываются из доски.

## План работ (актуальный)

### Ближайшие задачи

- [ ] Редактирование задачи: переиспользовать модалку (режим create/edit, предзаполнение), `useUpdateTask` + PATCH
- [ ] Оптимистичный апдейт для смены статуса (onMutate/onError/onSettled)
- [ ] DnD: @dnd-kit/core — DndContext на TodoBoard, useDraggable на карточке, useDroppable на колонке, onDragEnd -> PATCH status
- [ ] Фильтры: FilterButton уже есть — Popover + TagGroup по приоритетам, фильтрация массива `data` перед TodoBoard, бейдж с кол-вом активных фильтров

### Тесты (Этап 5)

- [ ] Установить (dev): vitest, jsdom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
- [ ] Zod-схемы сервера: валид / невалид
- [ ] Форма создания: вывод ошибок, сабмит
- [ ] Рендер колонки/карточки
- [ ] Мутация (create) через useMutation

## Стоп-критерии

- [x] Данные переживают перезапуск (реально в PostgreSQL)
- [x] Создал (модалка) -> увидел (доска) без перезагрузки (инвалидация кэша)
- [ ] Переместил -> отредактировал (модалка) -> удалил — полный цикл через UI
- [ ] `npm run build`, `npm run lint`, `npm test` — зелёные

## Стреч-опции (не обязательны)

- [x] Dark mode (через HeroUI useTheme)
- [ ] Фильтры в URL search params (`?priority=high`) — шареные ссылки
- [ ] Drag & drop через @dnd-kit (см. Ближайшие задачи)
- [ ] Сортировка внутри колонки (нужно поле order в модели + миграция)
- [ ] Разделы: Проекты, Команда
- [ ] Персистенция кэша React Query в localStorage
