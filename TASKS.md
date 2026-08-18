# flow-board — план работ

## Проект

**flow-board** — канбан-доска / трекер задач. Fullstack: клиент (React) + REST API (Hono) + PostgreSQL через Prisma.
Цель обучения: routing, асинхронные данные (TanStack Query), формы с валидацией (React Hook Form + zod), REST API, ORM/база данных, тесты.

## Стек

| Слой   | Технология                                                                                                             |
| ------ | ---------------------------------------------------------------------------------------------------------------------- |
| Клиент | Vite + React 19 + TS, Tailwind CSS v4, React Router v8, TanStack Query, React Hook Form + zod, HeroUI v3, Lucide React |
| Сервер | Hono + @hono/node-server, zod, CORS, @prisma/adapter-pg (Prisma 7)                                                     |
| ORM/БД | Prisma 7 + PostgreSQL 17 (localhost:5432)                                                                              |
| Тесты  | Vitest + jsdom + Testing Library                                                                                       |

## Модель данных

```ts
Task {
  id: string (uuid)
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
    prisma/schema.prisma
    prisma/seed.ts
    prisma.config.ts
    src/index.ts         <- CORS, /health, /api/tasks
    src/db.ts            <- PrismaClient + adapter-pg
    src/validation.ts    <- zod-схемы
    src/routes/tasks.ts  <- CRUD /api/tasks
    .env                 <- DATABASE_URL, PORT=3002
  client/
    src/app/             <- main, AppRouter, globals
    src/pages/           <- layout, dashboard, not-found
    src/shared/          <- UI-компоненты (avatar и т.д.)
    index.html
```

## Текущее состояние

- [x] Сервер: Hono + Prisma 7, CRUD /api/tasks, .env, seed
- [x] БД: подключение к Postgres, миграция, seed (4 задачи)
- [x] Клиент: Vite-скаффолд, Tailwind v4, HeroUI v3, react-router v8
- [x] Layout: header (навигация), sidebar (заглушка)
- [x] Роуты: `/` (доска), `/projects`, `/command`, `/settings` (заглушки), `*` (404)
- [ ] Недостающие пакеты: @tanstack/react-query, react-hook-form, zod, @hookform/resolvers, vitest, jsdom, @testing-library/\*
- [ ] API-модуль (fetch-функции для CRUD)
- [ ] Провайдеры: QueryClientProvider
- [ ] Доска: 3 колонки с карточками
- [ ] Модалки: создание / редактирование задачи

## Роуты (по макету)

| URL         | Страница  | Описание                                                   |
| ----------- | --------- | ---------------------------------------------------------- |
| `/`         | Доска     | 3 колонки (todo / in_progress / done), sidebar с фильтрами |
| `/projects` | Проекты   | Заглушка (потом)                                           |
| `/command`  | Команда   | Заглушка (потом)                                           |
| `/settings` | Настройки | Заглушка (потом)                                           |
| `*`         | 404       | Страница не найдена                                        |

**Создание/редактирование задачи — модалки** (не отдельные роуты), открываются из доски.

## План работ (по порядку)

### Этап 2 — Клиент: каркас (продолжение)

- [ ] Установить: @tanstack/react-query, react-hook-form, @hookform/resolvers, zod
- [ ] API-модуль: `client/src/shared/api/tasks.ts` — 5 функций (getTasks, getTask, createTask, updateTask, deleteTask)
- [ ] Провайдеры: QueryClientProvider в main.tsx
- [ ] Базовый URL API: вынести `http://localhost:3002` в константу
- [ ] Установить (dev): vitest, jsdom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event

### Этап 3 — Клиент: доска и данные

- [ ] `useQuery` для списка задач (loading / error / retry)
- [ ] `useQuery` для одной задачи
- [ ] `useMutation` + `invalidateQueries`: create / update / delete
- [ ] Доска: 3 колонки (todo / in_progress / done), карточки, счётчики
- [ ] Sidebar: фильтры (Все задачи, Мои задачи, Проекты, Приоритеты)

### Этап 4 — Модалки и формы

- [ ] Модалка создания задачи: title (мин. 4 символа), description, priority, status — RHF + zod
- [ ] Модалка редактирования с предзаполнением
- [ ] Ошибки под полями, сброс формы после сабмита

### Этап 5 — Тесты

- [ ] Zod-схема формы: валид / невалид
- [ ] Форма создания: вывод ошибок, сабмит
- [ ] Рендер колонки/карточки
- [ ] Мутация (create) через useMutation

## Стоп-критерии

- [ ] CRUD работает через UI: создал (модалка) → увидел (доска) → переместил → отредактировал (модалка) → удалил
- [ ] Данные переживают перезапуск (реально в PostgreSQL)
- [ ] `npm run build`, `npm run lint`, `npm test` — зелёные

## Стреч-опции (не обязательны)

- [ ] Drag & drop через @dnd-kit
- [ ] Фильтр/сортировка задач
- [ ] Dark mode
- [ ] Разделы: Проекты, Команда, Настройки
