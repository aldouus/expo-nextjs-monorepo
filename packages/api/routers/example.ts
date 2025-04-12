import { router, publicProcedure } from '../trpc'
import prisma from '@app/db'
import { z } from 'zod'

export const exampleRouter = router({
  getAll: publicProcedure.query(async () => {
    const examples = [
      {
        name: 'Example 1',
        description: 'This is the first example from our seed script',
      },
      {
        name: 'Example 2',
        description: 'A second example with some different data',
      },
      {
        name: 'Example 3',
        description: 'Third example showing tRPC working correctly',
      },
    ]
    return examples
  }),

  getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    return await prisma.example.findUnique({
      where: { id: input.id },
    })
  }),

  create: publicProcedure
    .input(z.object({ name: z.string(), description: z.string().optional() }))
    .mutation(async ({ input }) => {
      return await prisma.example.create({
        data: input,
      })
    }),
})
