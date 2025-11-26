# API Routes

## POST /api/chat

Streams AI chat responses.

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

Streaming response using AI SDK UI message format.

### Example

```typescript
import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'

const transport = new DefaultChatTransport({ api: '/api/chat' })
const { messages, sendMessage } = useChat({ transport })

// Send a message
sendMessage({ text: 'Hello!' })
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
      }
    }
  }
})
```
