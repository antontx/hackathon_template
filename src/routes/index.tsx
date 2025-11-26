import { createFileRoute, Link } from '@tanstack/react-router'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <MessageSquare className="size-16 text-muted-foreground" />
      <h1 className="text-4xl font-bold">AI Chat</h1>
      <p className="text-muted-foreground">Start a conversation with AI</p>
      <Button asChild size="lg">
        <Link to="/chat">Start Chatting</Link>
      </Button>
    </div>
  )
}
