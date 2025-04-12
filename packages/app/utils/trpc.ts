import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@app/api'

export const trpc = createTRPCReact<AppRouter>()

const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000'

export function getEndpoint() {
  return `${baseUrl}/api/trpc`
}
