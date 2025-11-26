# Getting Started

## Prerequisites
- Node.js 18+
- Bun

## Setup

```bash
# Install dependencies
bun install

# Copy env and add your OpenAI API key
cp .env.example .env

# Generate database migrations
bun run db:generate

# Run migrations
bun run db:migrate

# Start dev server
bun run dev
```

Server runs at http://localhost:3000

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |
