import type { ReactNode } from 'react'
import { NextTamaguiProvider } from './providers/next-tamagui-provider'

export const Providers = ({ children }: { children: ReactNode }) => {
  return <NextTamaguiProvider>{children}</NextTamaguiProvider>
}
