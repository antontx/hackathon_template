# API Routes

## POST /api/chat

Streams AI chat responses using OpenAI GPT-4o.

### Request

```json
{
  "messages": [
    {
      "id": "string",
      "role": "user",
      "parts": [{ "type": "text", "text": "Hello" }]
    }
  ]
}
```

### Response

Streaming response using AI SDK UI message format (`toUIMessageStreamResponse()`).

### Client Example

```typescript
import { useMemo } from 'react'
import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'

const transport = useMemo(() => new DefaultChatTransport({ api: '/api/chat' }), [])
const { messages, sendMessage, status } = useChat({ transport })

// Send a message
sendMessage({ text: 'Hello!' })
```

### Server Implementation

```typescript
// src/routes/api/chat.ts
import { createFileRoute } from '@tanstack/react-router'
import { streamText, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json()
        const result = streamText({
          model: openai('gpt-4o'),
          messages: convertToModelMessages(messages),
        })
        return result.toUIMessageStreamResponse()
      },
    },
  },
})
```

## Adding New API Routes

Create a new file in `src/routes/api/`:

```typescript
// src/routes/api/example.ts
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/example')({
  server: {
    handlers: {
      GET: async () => {
        return new Response(JSON.stringify({ hello: 'world' }), {
          headers: { 'Content-Type': 'application/json' }
        })
      },
      POST: async ({ request }) => {
        const body = await request.json()
        return new Response(JSON.stringify({ received: body }), {
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }
  }
})
```
