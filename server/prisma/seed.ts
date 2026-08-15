import { prisma } from '../src/db.js'

async function main() {
	const seedTasks = [
		{
			title: 'Настроить подключение к базе данных',
			description: 'Решить вопрос с паролем postgres и применить миграции',
			priority: 'high',
			status: 'todo',
		},
		{
			title: 'Создать REST API для задач',
			description: 'CRUD-эндпоинты на Hono с валидацией через zod',
			priority: 'high',
			status: 'todo',
		},
		{
			title: 'Сверстать канбан-доску',
			description: 'Три колонки: todo, in_progress, done',
			priority: 'medium',
			status: 'in_progress',
		},
		{
			title: 'Покрыть формы тестами',
			description: 'Vitest + Testing Library',
			priority: 'low',
			status: 'done',
		},
	]

	await prisma.task.deleteMany()
	await prisma.task.createMany({ data: seedTasks })

	console.log(`Seeded ${seedTasks.length} tasks`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
