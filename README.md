# Flow Board

Flow Board - учебный fullstack-проект: простая kanban-доска задач с фронтендом, API, базой данных и миграциями.

Проект помогает потрогать связку React + REST API + PostgreSQL: клиент показывает задачи по колонкам, сервер отдает CRUD API, Prisma отвечает за схему базы и миграции.

## Что внутри

| Часть    | Технологии                                                            |
| -------- | --------------------------------------------------------------------- |
| Client   | React, Vite, TypeScript, Tailwind CSS, HeroUI, TanStack Query         |
| Server   | Hono, TypeScript, Zod, Prisma 7                                       |
| Database | PostgreSQL 17                                                         |
| Docker   | Docker Compose, отдельные сервисы `client`, `server`, `db`, `migrate` |

## Структура проекта

```txt
flow-board/
  client/              # фронтенд на React + Vite
  server/              # API на Hono + Prisma
  docker-compose.yml   # запуск всего проекта через Docker
  package.json         # root workspace-скрипты
  TASKS.md             # рабочий список задач проекта
```

Ключевые файлы:

```txt
client/src/shared/api/     # fetch-обертка и запросы к API
client/src/widgets/        # kanban-доска и карточки задач
server/src/index.ts        # точка входа API
server/src/routes/tasks.ts # CRUD-роуты задач
server/src/db.ts           # Prisma Client + подключение к PostgreSQL
server/prisma/schema.prisma
```

## Модель задачи

```ts
type Task = {
  id: string
  title: string
  description: string | null
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'in_progress' | 'done'
  createdAt: string
  updatedAt: string
}
```

## API

Базовый путь API:

```txt
/api/tasks
```

Основные маршруты:

| Метод    | Путь             | Что делает            |
| -------- | ---------------- | --------------------- |
| `GET`    | `/api/tasks`     | Получить список задач |
| `GET`    | `/api/tasks/:id` | Получить одну задачу  |
| `POST`   | `/api/tasks`     | Создать задачу        |
| `PATCH`  | `/api/tasks/:id` | Обновить задачу       |
| `DELETE` | `/api/tasks/:id` | Удалить задачу        |

## Переменные окружения

Для сервера используется `server/.env`:

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=flow_board

PORT=3000
```

В Docker `DB_HOST` переопределяется на `db`, потому что сервер подключается к PostgreSQL внутри docker-сети.

## Запуск через Docker

Это основной способ поднять весь проект сразу: фронтенд, API, базу и Prisma-миграции.

Проверить compose-файл:

```bash
docker compose config
```

Запустить проект:

```bash
docker compose up --build
```

После запуска:

```txt
Client: http://localhost:8080
Server: http://localhost:3000
Health: http://localhost:3000/health
PostgreSQL: localhost:5432
```

Остановить контейнеры:

```bash
docker compose down
```

Остановить и удалить данные базы:

```bash
docker compose down -v
```

`-v` удаляет Docker volume с PostgreSQL-данными. Используй это только когда хочешь полностью пересоздать базу.

## Как работает Docker-запуск

В `docker-compose.yml` есть четыре сервиса:

```txt
db       # PostgreSQL 17
migrate  # применяет Prisma migrations
server   # запускает Hono API
client   # собирает React и отдает его через nginx
```

Порядок запуска такой:

```txt
db -> migrate -> server -> client
```

`migrate` ждет, пока `db` станет healthy, применяет миграции через:

```bash
npx prisma migrate deploy
```

После успешных миграций стартует `server`.

## Локальный запуск без Docker

Для локального запуска нужна установленная PostgreSQL 17 и база `flow_board`.

Установить зависимости:

```bash
npm install
```

Сгенерировать Prisma Client:

```bash
npm run db:generate -w server
```

Применить миграции в dev-режиме:

```bash
npm run db:migrate -w server
```

Запустить клиент и сервер вместе:

```bash
npm run dev
```

По умолчанию сервер читает `PORT=3000` из `server/.env`.

Важный момент для локального фронтенда: в `client/vite.config.ts` proxy смотрит на `process.env.API_URL` или на `http://localhost:3001`. Если сервер запущен на `3000`, задай:

```bash
API_URL=http://localhost:3000 npm run dev -w client
```

На Windows PowerShell:

```powershell
$env:API_URL="http://localhost:3000"
npm run dev -w client
```

## Prisma 7 и ESM

В проекте используется Prisma 7 с генератором `prisma-client`.

В `server/prisma/schema.prisma` важны эти настройки:

```prisma
generator client {
  provider            = "prisma-client"
  output              = "../generated/prisma"
  moduleFormat        = "esm"
  importFileExtension = "js"
}
```

`importFileExtension = "js"` нужен для production-запуска через Node ESM. Без него Node может упасть с ошибкой вида:

```txt
ERR_MODULE_NOT_FOUND: Cannot find module .../generated/prisma/internal/class
```

## Полезные команды

```bash
npm run lint
npm run format
npm run format:check
npm run build -w server
npm run build -w client
npm run db:studio -w server
```

Что они делают:

```txt
lint          # проверяет код eslint-ом
format        # форматирует проект prettier-ом
format:check  # проверяет форматирование без изменений
build server  # компилирует сервер
build client  # собирает фронтенд
db:studio     # открывает Prisma Studio
```

## Частые проблемы

### Сервер не видит базу в Docker

Проверь, что внутри Docker используется:

```env
DB_HOST=db
DB_PORT=5432
```

`localhost` внутри контейнера означает сам контейнер, а не твой компьютер и не контейнер PostgreSQL.

### Фронтенд не видит API локально

Проверь порт сервера и Vite proxy. Если сервер на `3000`, proxy тоже должен смотреть на `3000`.

### Миграции не применились

Проверь логи сервиса `migrate`:

```bash
docker compose logs migrate
```

Если база уже была создана со старым состоянием, можно пересоздать volume:

```bash
docker compose down -v
docker compose up --build
```

## Как проверить, что все работает

После запуска через Docker открой:

```txt
http://localhost:8080
```

Затем проверь API:

```txt
http://localhost:3000/health
```

Ожидаемый ответ:

```json
{
  "status": "ok"
}
```

Если доска открылась, задачи загружаются, создание/редактирование/удаление работает - проект поднят правильно.
