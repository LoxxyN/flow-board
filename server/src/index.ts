import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { tasks } from './routes/tasks.js'

const app = new Hono()

app.use('/api/*', cors())
app.get('/health', (c) => {
  return c.json({ status: 'ok' })
})

app.route('/api/tasks', tasks)

const port = Number(process.env.PORT) || 3001

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
