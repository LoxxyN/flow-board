import { Hono } from 'hono'
import { prisma } from '../db.js'
import { createTaskSchema, updateTaskSchema } from '../validation.js'

export const tasks = new Hono()

tasks.get('/', async (c) => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return c.json(tasks)
})

tasks.get('/:id', async (c) => {
  const task = await prisma.task.findUnique({
    where: { id: c.req.param('id') },
  })
  if (!task) return c.json({ error: 'Task not found' }, 404)
  return c.json(task)
})

tasks.post('/', async (c) => {
  const body = await c.req.json()
  const parsed = createTaskSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)

  const task = await prisma.task.create({ data: parsed.data })
  return c.json(task, 201)
})

tasks.patch('/:id', async (c) => {
  const body = await c.req.json()
  const parsed = updateTaskSchema.safeParse(body)
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400)

  const task = await prisma.task.update({
    where: { id: c.req.param('id') },
    data: parsed.data,
  })
  return c.json(task)
})

tasks.delete('/:id', async (c) => {
  await prisma.task.delete({
    where: { id: c.req.param('id') },
  })
  return c.body(null, 204)
})
