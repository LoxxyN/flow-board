type Options = {
  method?: 'GET' | 'PATCH' | 'POST' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
}

export const apiClient = async <T>(
  url: string,
  { method = 'GET', body, signal }: Options = {},
): Promise<T> => {
  const response = await fetch(`/api/${url}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  if (!response.ok) {
    throw new Error(`Api error: ${response.status}: ${response.statusText}`)
  }

  if (response.status === 204) return undefined as T

  return response.json()
}
