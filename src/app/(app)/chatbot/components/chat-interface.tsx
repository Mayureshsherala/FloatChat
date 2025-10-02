'use client';

import { getSQLFromQuestion } from '@/app/(app)/chatbot/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, ChevronRight, Loader2, User, Thermometer, Waves, Wind, HelpCircle, Send } from 'lucide-react';
import React, { FormEvent, useRef, useState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { DataCharts } from '../../dashboard/components/data-charts';
import { Separator } from '@/components/ui/separator';

type Message = {
  role: 'user' | 'bot' | 'data' | 'info';
  content: string;
  timestamp?: string;
};

const exampleSuggestions = [
    { icon: <Thermometer className="size-4 text-red-500" />, text: "Sea surface temperatures with temporal trends" },
    { icon: <Waves className="size-4 text-blue-500" />, text: "Salinity levels by region and depth" },
    { icon: <Wind className="size-4 text-green-500" />, text: "Ocean current-velocity patterns" },
    { icon: <div className="size-4 bg-orange-500 rounded-sm" />, text: "Pollution distribution analysis" }
];


export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'info', content: 'I provide visual oceanographic data analysis.\nAsk me about:' },
  ]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
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
        const botMessage: Message = { role: 'bot', content: result.query ?? 'Sorry, I could not generate a query.', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages((prev) => [...prev, botMessage]);
        setTimeout(() => {
          scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }, 100);
      }
    });
  };

  const handleExampleQuery = (query: string) => {
    setInput(query);
  }

  return (
    <Card className="flex flex-col h-full max-h-[calc(100vh-2rem)] w-full shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar>
            <AvatarFallback><Bot /></AvatarFallback>
        </Avatar>
        <div>
            <CardTitle className="text-lg">Ocean Assistant</CardTitle>
            <CardDescription className="text-sm">Ask about oceanographic data</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-start gap-3', {
                  'justify-end': message.role === 'user',
                })}
              >
                {message.role !== 'user' && (
                   <Avatar className="size-8 mt-1">
                    <AvatarFallback><Bot /></AvatarFallback>
                  </Avatar>
                )}
                 <div
                  className={cn(
                    'max-w-md rounded-lg p-3 text-sm',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted',
                    (message.role === 'data' || message.role === 'info') ? 'w-full p-0 bg-transparent' : ''
                  )}
                >
                  {message.role === 'bot' && 
                    <div>
                      <p className="font-mono bg-background/50 p-2 rounded-md">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                    </div>
                  }
                  {message.role === 'user' && 
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-primary-foreground/70 mt-1">{message.timestamp}</p>
                    </div>
                  }
                  {message.role === 'data' && (
                     <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">{message.content}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataCharts isMiniature={true} />
                            <p className="text-xs text-muted-foreground mt-2">Peak temps in May (28.7°C) with monsoon cooling from June.</p>
                            <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                        </CardContent>
                     </Card>
                  )}
                   {message.role === 'info' && (
                     <Card className="bg-muted/50 border-dashed">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Oceanographic Data Assistant</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{message.content}</p>
                            <div className="space-y-2 mt-4">
                                {exampleSuggestions.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-background text-sm">
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                             <p className="text-xs text-muted-foreground pt-2">Try: "Show me sea surface temperature in Bay of Bengal"</p>
                        </CardContent>
                    </Card>
                  )}
                </div>
                {message.role === 'user' && (
                   <Avatar className="size-8">
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
                  <span className="text-sm text-muted-foreground">Generating...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="p-3">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about data..."
            disabled={isPending}
            autoComplete="off"
            className="flex-1 bg-background"
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            <Send className="size-5" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
