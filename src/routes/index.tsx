import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">AI Demos</h1>
      <p className="text-muted-foreground">Explore AI SDK features</p>
      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link to="/demo/chat">
            <MessageSquare className="mr-2 size-5" />
            Chat
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/demo/object">
            <Clock className="mr-2 size-5" />
            Generate Timeline
          </Link>
        </Button>
      </div>
    </div>
  )
}
