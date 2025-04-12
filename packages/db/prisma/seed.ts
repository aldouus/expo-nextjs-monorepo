import { prisma } from '../index'

async function main() {
  await prisma.example.deleteMany()

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

  for (const example of examples) {
    await prisma.example.create({
      data: example,
    })
  }
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

