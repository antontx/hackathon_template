# Project Structure

```
src/
├── routes/
│   ├── __root.tsx          # Root layout
│   ├── index.tsx           # Landing page (/)
│   ├── chat.tsx            # Chat page (/chat)
│   └── api/
│       └── chat.ts         # Chat API endpoint (/api/chat)
├── components/
│   ├── ai-elements/        # Vercel AI Elements UI components
│   ├── ui/                 # shadcn/ui components
│   └── Chat.tsx            # Main chat component
├── db/
│   ├── index.ts            # Database connection
│   └── schema.ts           # Drizzle schema
└── lib/
    └── utils.ts            # Utility functions (cn helper)
```

## Key Files

- `app.config.ts` - TanStack Start configuration
- `drizzle.config.ts` - Drizzle ORM configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `components.json` - shadcn/ui configuration
