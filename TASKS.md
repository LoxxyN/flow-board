# flow-board - план работ

## Проект

**flow-board** — канбан-доска / трекер задач. Fullstack: клиент (React) + REST API (Hono) + PostgreSQL через Prisma.  
Цель обучения: routing, асинхронные данные (TanStack Query), формы с валидацией (React Hook Form + zod), REST API, ORM/база данных, тесты.

## Стек

| Слой   | Технология                                                                                 |
| ------ | ------------------------------------------------------------------------------------------ |
| Клиент | Vite + React 19 + TS, Tailwind CSS v4, React Router, TanStack Query, React Hook Form + zod |
| Сервер | Hono + @hono/node-server, zod, CORS                                                        |
| ORM/БД | Prisma + PostgreSQL 17 (локальный, localhost:5432)                                         |
| Тесты  | Vitest + jsdom + Testing Library                                                           |

## Модель данных

```ts
Task {
  id: string (uuid)
  title: string
  description: string | null
  priority: 'low' | 'medium' | 'high'   // Prisma enum Priority
  status: 'todo' | 'in_progress' | 'done' // Prisma enum Status (подчёркивание, не дефис!)
  createdAt: datetime
  updatedAt: datetime
}
```

## Структура репозитория

```
flow-board/
  TASKS.md              <- этот файл
  server/               <- Hono + Prisma (уже есть скелет)
    prisma/schema.prisma
    prisma/seed.ts
    src/index.ts        <- точка входа, CORS, /health
    src/db.ts           <- PrismaClient
    src/validation.ts   <- zod-схемы
    src/routes/tasks.ts <- CRUD /api/tasks
    .env                <- DATABASE_URL, PORT
  client/               <- Vite + React (пока НЕ создан)
```

## Текущее состояние (сделано)

- [x] Скелет `server/`: package.json, tsconfig, prisma/schema.prisma, .env, src/\* (index, db, validation, routes/tasks), prisma/seed.ts
- [x] Зависимости сервера установлены (hono, @prisma/client, prisma, tsx, zod и т.д.)
- [x] Схема Prisma (Task + enums Priority/Status), seed с 4 задачами
- [x] `npm run db:migrate` **НЕ выполнено** (нужно подключение к Postgres)
- [x] Клиент `client/` **не создан**

## План работ (по порядку)

### Этап 0 — БД

- [x] Подключение к Postgres: решить вопрос с паролем, вписать DATABASE_URL в `server/.env`
- [x] Создать БД `flow_board` (CREATE DATABASE)
- [x] `npm run db:migrate` в `server/` — применить схему
- [x] `npm run db:seed` — заполнить тестовыми задачами
- [x] Проверить в psql: SELECT \* FROM tasks

### Этап 1 — REST API

- [ ] Запустить сервер `npm run dev` (tsx watch)
- [ ] Проверить `GET /health` и `GET /api/tasks` (curl или браузер)
- [ ] Прогнать CRUD вручную: create / update / delete через curl
- [ ] Разобрать каждый файл сервера с пользователем (что такое Hono-роут, zod-валидация, Prisma-вызовы)

### Этап 2 — Клиент: каркас

- [x] Скаффолд Vite (react-ts) в `client/` + Tailwind
- [ ] Установить react-router-dom, @tanstack/react-query, react-hook-form, zod, @hookform/resolvers
- [ ] В dev-зависимости: vitest, jsdom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event
- [ ] API-модуль: fetch к `http://localhost:3001/api/tasks` (CRUD-функции)
- [ ] Провайдеры: QueryClientProvider, Router

### Этап 3 — Клиент: страницы и данные

- [ ] Роуты: `/` (доска), `/tasks/new`, `/tasks/:id`, `/tasks/:id/edit`, `*` (404), layout с навигацией
- [ ] `useQuery` для списка задач (loading / error / retry)
- [ ] `useQuery` для одной задачи
- [ ] `useMutation` + `invalidateQueries`: create / update / delete
- [ ] Доска: 3 колонки (todo / in_progress / done), карточки, счётчики, перемещение статуса
- [ ] Карточка задачи: поля, кнопки «Редактировать» / «Удалить» (удаление с подтверждением)

### Этап 4 — Формы

- [ ] Форма создания: title (мин. 4 символа), description, priority, status — RHF + zod
- [ ] Форма редактирования с предзаполнением
- [ ] Ошибки под полями, сброс формы после сабмита

### Этап 5 — Тесты

- [ ] Zod-схема формы: валид / невалид
- [ ] Форма создания: вывод ошибок, сабмит
- [ ] Рендер колонки/карточки
- [ ] Мутация (create) через useMutation

## Стоп-критерии

- [ ] CRUD работает через UI целиком (создал → увидел → переместил → отредактировал → удалил)
- [ ] Данные переживают перезапуск (реально в PostgreSQL)
- [ ] `npm run build`, `npm run lint`, `npm test` — зелёные, без консольных ошибок в dev

## Стреч-опции (не обязательны)

- [ ] Drag & drop через @dnd-kit
- [ ] Фильтр/сортировка задач
- [ ] Dark mode
