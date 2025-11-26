import { createFileRoute } from '@tanstack/react-router'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json()

        const result = streamText({
          model: openai('gpt-4o'),
          messages,
        })

        return result.toUIMessageStreamResponse()
      },
    },
  },
})
