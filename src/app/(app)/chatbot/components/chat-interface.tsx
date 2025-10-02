'use client';

import { getSQLFromQuestion } from '@/app/(app)/chatbot/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, ChevronRight, Loader2, User } from 'lucide-react';
import React, { FormEvent, useRef, useState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const result = await getSQLFromQuestion(input);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setMessages((prev) => prev.slice(0, -1)); // Remove the user message if the call fails
      } else {
        const botMessage: Message = { role: 'bot', content: result.query ?? '' };
        setMessages((prev) => [...prev, botMessage]);
        setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    });
  };

  const exampleQueries = [
    "Show me salinity profiles near the equator in March 2023",
    "Find all float trajectories in the Arabian Sea",
    "What is the max temperature recorded below 1000m depth?",
  ];

  const handleExampleQuery = (query: string) => {
    setInput(query);
  }

  return (
    <Card className="flex flex-col h-full max-h-[calc(100vh-4rem)] w-full">
      <CardHeader>
        <CardTitle>AI Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-4', {
                  'justify-end': message.role === 'user',
                })}
              >
                {message.role === 'bot' && (
                  <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xl rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {message.role === 'bot' ? (
                     <pre className="whitespace-pre-wrap font-code bg-background/50 p-2 rounded-md">
                      <code>{message.content}</code>
                    </pre>
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-4">
                 <Avatar>
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                <div className="bg-muted rounded-lg p-3 flex items-center space-x-2">
                  <Loader2 className="size-5 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Generating SQL...</span>
                </div>
              </div>
            )}
             {messages.length === 0 && !isPending && (
              <div className="text-center text-muted-foreground p-8 space-y-4">
                <Bot className="mx-auto size-12" />
                <p>Ask a question to get started. For example:</p>
                <div className="flex flex-col items-center gap-2">
                  {exampleQueries.map((q) => (
                     <Button key={q} variant="outline" size="sm" className="w-full max-w-md" onClick={() => handleExampleQuery(q)}>
                       "{q}"
                     </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Show me salinity profiles near the equator..."
            disabled={isPending}
            autoComplete="off"
          />
          <Button type="submit" disabled={isPending || !input.trim()}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : <ChevronRight className="size-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
