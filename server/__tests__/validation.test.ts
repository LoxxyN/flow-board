import { describe, expect, it } from 'vitest'
import { createTaskSchema } from '../src/validation.js'

describe('createTaskSchema', () => {
  it('принимает валидную задачу', () => {
    const result = createTaskSchema.safeParse({ title: 'Сделать тесты' })
    expect(result.success).toBe(true)
  })

  it('отклоняет короткий title', () => {
    const result = createTaskSchema.safeParse({ title: 'ха' })
    expect(result.success).toBe(false)
  })
})
