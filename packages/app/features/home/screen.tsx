import {
  Button,
  H1,
  Paragraph,
  Separator,
  Sheet,
  Spinner,
  ScrollView,
  SwitchThemeButton,
  useToastController,
  XStack,
  YStack,
  H2,
} from '@app/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState, useCallback } from 'react'
import { Platform, RefreshControl } from 'react-native'
import { useLink } from 'solito/navigation'
import { trpc } from '../..//utils/trpc'

export function HomeScreen() {
  const linkTarget = '/user'
  const linkProps = useLink({
    href: `${linkTarget}/example`,
  })

  const { data: examples, isLoading, refetch } = trpc.example.getAll.useQuery()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch().finally(() => setRefreshing(false))
  }, [refetch])

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justify: 'center',
        items: 'center',
        gap: '$6',
        p: '$4',
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <XStack
        width="100%"
        gap="$6"
        justify="center"
        flexWrap="wrap"
      >
        {Platform.OS === 'web' && (
          <>
            <SwitchThemeButton />
          </>
        )}
      </XStack>

      <YStack
        gap="$4"
        width="100%"
        style={{ maxWidth: 600 }}
      >
        <H1
          text="center"
          color="$color12"
        >
          Welcome to Tamagui.
        </H1>
        <Paragraph
          text="center"
          color="$color10"
        >
          This screen uses the same code on Next.js and React Native.
        </Paragraph>
        <Separator />

        <YStack gap="$2">
          <H1
            size="$5"
            text="center"
            color="$color11"
          >
            Example Data from tRPC
          </H1>

          {isLoading ? (
            <Spinner size="large" />
          ) : examples && examples.length > 0 ? (
            <YStack
              gap="$2"
              mx="$2"
            >
              {examples.map((example, index: number) => (
                <YStack key={index}>
                  <Paragraph fontWeight="bold">{example.name}</Paragraph>
                  {example.description && (
                    <Paragraph
                      fontSize="$2"
                      color="$color11"
                    >
                      {example.description}
                    </Paragraph>
                  )}
                </YStack>
              ))}
            </YStack>
          ) : (
            <Paragraph
              text="center"
              color="$color10"
            >
              No example data found. Add some data to your database!
            </Paragraph>
          )}
        </YStack>
      </YStack>

      <Button {...linkProps}>Link to user</Button>

      <SheetDemo />
    </ScrollView>
  )
}

function SheetDemo() {
  const toast = useToastController()

  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(0)

  return (
    <>
      <Button
        size="$6"
        icon={open ? ChevronDown : ChevronUp}
        circular
        onPress={() => setOpen((x) => !x)}
      />
      <Sheet
        modal
        animation="medium"
        open={open}
        onOpenChange={setOpen}
        snapPoints={[80]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay
          bg="$shadow4"
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle bg="$color8" />
        <Sheet.Frame
          items="center"
          justify="center"
          gap="$10"
          background="$color2"
        >
          <H2>Modal</H2>
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false)
              toast.show('Sheet closed!', {
                message: 'Just showing how toast works...',
              })
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
