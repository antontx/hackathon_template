'use client'

import { createFileRoute } from '@tanstack/react-router'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { useState, useEffect } from 'react'
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input'
import { Loader } from '@/components/ai-elements/loader'
import * as Timeline from '@/components/ui/timeline'
import { timelineSchema } from '@/lib/schemas/timeline'
import { CalendarIcon } from 'lucide-react'

export const Route = createFileRoute('/objectDemo')({
  component: ObjectDemoPage,
})

function ObjectDemoInner() {
  const { object, submit, isLoading, error } = useObject({
    api: '/api/object',
    schema: timelineSchema,
  })

  const handleSubmit = async ({ text }: { text: string }) => {
    if (text.trim()) {
      submit({ prompt: text })
    }
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      <header className="border-b p-4 shrink-0">
        <h1 className="text-xl font-semibold text-center">Timeline Generator</h1>
        <p className="text-center text-muted-foreground text-sm mt-1">
          Describe an event to generate a timeline
        </p>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-lg">
              {error.message}
            </div>
          )}

          {isLoading && !object?.events?.length && (
            <div className="flex justify-center py-8">
              <Loader />
            </div>
          )}

          {object?.events && object.events.length > 0 && (
            <Timeline.Root activeIndex={isLoading ? object.events.length - 1 : undefined}>
              {object.events.map((event, index) => (
                event && (
                  <Timeline.Item key={index}>
                    <Timeline.Dot>
                      <CalendarIcon className="size-3" />
                    </Timeline.Dot>
                    <Timeline.Connector />
                    <Timeline.Content>
                      <Timeline.Header>
                        <Timeline.Title>{event.title ?? ''}</Timeline.Title>
                        {event.time && (
                          <Timeline.Time>{event.time}</Timeline.Time>
                        )}
                      </Timeline.Header>
                      {event.description && (
                        <Timeline.Description>
                          {event.description}
                        </Timeline.Description>
                      )}
                    </Timeline.Content>
                  </Timeline.Item>
                )
              ))}
            </Timeline.Root>
          )}

          {!isLoading && !object?.events?.length && (
            <div className="text-center text-muted-foreground py-12">
              Enter an event description below to generate a timeline
            </div>
          )}
        </div>
      </div>

      <div className="border-t bg-background p-4">
        <PromptInput
          onSubmit={handleSubmit}
          className="mx-auto max-w-2xl"
        >
          <PromptInputTextarea placeholder="Describe an event (e.g., 'The French Revolution')" />
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit disabled={isLoading} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  )
}

function ObjectDemoPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader />
      </div>
    )
  }

  return <ObjectDemoInner />
}
