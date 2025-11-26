import { createFileRoute } from "@tanstack/react-router";
import { streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { messages } = body;

          const result = streamText({
            model: openai("gpt-4o"),
            system: `Antworte immer auf Deutsch.

Formatierung:
- Nutze Markdown für Formatierung (Listen, Fettschrift, etc.)
- Für Mathe: Inline-Formeln mit $...$, Display-Formeln mit $$...$$
- Beispiel inline: Die Formel $n^2$ berechnet...
- Beispiel display:
$$\\frac{n(n+1)}{2}$$
- Tabellen im Markdown-Format mit | und ---`,
            messages: convertToModelMessages(messages),
          });

          return result.toUIMessageStreamResponse();
        } catch (error) {
          console.error("API error:", error);
          return new Response(JSON.stringify({ error: String(error) }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
