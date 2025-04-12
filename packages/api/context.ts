export async function createContext() {
  return {
    // Add your context properties here
    // Example: session, database connections, etc.
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
