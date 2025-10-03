
'use client';

import { getAnswerAndChart } from '@/app/(app)/chatbot/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, ChevronRight, Loader2, User, Thermometer, Waves, Wind, Send, BarChart, ScatterChart, LineChartIcon } from 'lucide-react';
import React, { FormEvent, useRef, useState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChartContainer } from '@/components/ui/chart';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, Legend, Scatter } from 'recharts';

type ChartSeries = {
  name: string;
  data: { x: any; y: any }[];
};

type Message = {
  role: 'user' | 'bot' | 'data' | 'info';
  content: string;
  timestamp?: string;
  chartData?: ChartSeries[];
  chartType?: 'line' | 'bar' | 'scatter';
  chartLabels?: { x: string; y: string };
};

const exampleSuggestions = [
    { icon: <Thermometer className="size-4 text-red-500" />, text: "Compare temperature for floats 690100 and 690101" },
    { icon: <Waves className="size-4 text-blue-500" />, text: "Show salinity vs pressure for float 690102" },
    { icon: <BarChart className="size-4 text-green-500" />, text: "What is the average temperature for each float?" },
    { icon: <ScatterChart className="size-4 text-orange-500" />, text: "Plot temperature vs salinity for float 690100" }
];

const chartColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];


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
    const currentInput = input;
    setInput('');

    startTransition(async () => {
      const result = await getAnswerAndChart(currentInput);
      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        setMessages((prev) => prev.slice(0, -1)); // Remove the user message if the call fails
      } else {
        const botMessage: Message = {
          role: 'data',
          content: result.answer || "I couldn't find an answer.",
          chartData: result.chartData,
          chartType: result.chartType,
          chartLabels: result.chartLabels,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
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
  
  const chartConfig = {}; // Will be populated dynamically

  const renderChart = (message: Message) => {
    if (!message.chartData || message.chartData.length === 0) return null;
    
    const combinedData = message.chartData.reduce((acc: any[], series) => {
        series.data.forEach(point => {
            let entry = acc.find(d => d.x === point.x);
            if (!entry) {
                entry = { x: point.x };
                acc.push(entry);
            }
            entry[series.name] = point.y;
        });
        return acc;
    }, []);

    const DynamicChart = ({chartType}: {chartType: string | undefined}) => {
        switch (chartType) {
            case 'bar':
                return (
                    <ResponsiveContainer>
                        <BarChart data={combinedData} margin={{ top: 5, right: 10, left: -20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="x" fontSize={10} tickLine={false} axisLine={false} label={{ value: message.chartLabels?.x, position: 'insideBottom', offset: -10, fontSize: 10 }} />
                            <YAxis fontSize={10} tickLine={false} axisLine={false} domain={['dataMin', 'dataMax']} label={{ value: message.chartLabels?.y, angle: -90, position: 'insideLeft', fontSize: 10 }} />
                            <Tooltip contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontSize: '12px' }} />
                            <Legend wrapperStyle={{fontSize: "10px"}}/>
                            {message.chartData?.map((series, i) => <Bar key={series.name} dataKey={series.name} fill={chartColors[i % chartColors.length]} />)}
                        </BarChart>
                    </ResponsiveContainer>
                )
            case 'scatter':
                return (
                     <ResponsiveContainer>
                        <ScatterChart margin={{ top: 5, right: 10, left: -20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis type="number" dataKey="x" name={message.chartLabels?.x} fontSize={10} tickLine={false} axisLine={false} label={{ value: message.chartLabels?.x, position: 'insideBottom', offset: -10, fontSize: 10 }} domain={['dataMin', 'dataMax']} />
                            <YAxis type="number" dataKey="y" name={message.chartLabels?.y} fontSize={10} tickLine={false} axisLine={false} label={{ value: message.chartLabels?.y, angle: -90, position: 'insideLeft', fontSize: 10 }} domain={['dataMin', 'dataMax']} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontSize: '12px' }} />
                            <Legend wrapperStyle={{fontSize: "10px"}}/>
                            {message.chartData?.map((series, i) => <Scatter key={series.name} name={series.name} data={series.data} fill={chartColors[i % chartColors.length]} />)}
                        </ScatterChart>
                     </ResponsiveContainer>
                )
            case 'line':
            default:
                 return (
                    <ResponsiveContainer>
                        <LineChart data={combinedData} margin={{ top: 5, right: 10, left: -20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="x" fontSize={10} tickLine={false} axisLine={false} label={{ value: message.chartLabels?.x, position: 'insideBottom', offset: -10, fontSize: 10 }} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} domain={['dataMin', 'dataMax']} label={{ value: message.chartLabels?.y, angle: -90, position: 'insideLeft', fontSize: 10 }} />
                        <Tooltip contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', fontSize: '12px' }} />
                        <Legend wrapperStyle={{fontSize: "10px"}} />
                        {message.chartData?.map((series, i) => (
                          <Line key={series.name} dataKey={series.name} type="monotone" stroke={chartColors[i % chartColors.length]} strokeWidth={2} dot={false} name={series.name} />
                        ))}
                        </LineChart>
                    </ResponsiveContainer>
                )
        }
    }
    return <ChartContainer config={chartConfig} className="h-[150px] w-full"><DynamicChart chartType={message.chartType} /></ChartContainer>;
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
                    (message.role === 'data' || message.role === 'info') ? 'w-full max-w-full p-0 bg-transparent' : ''
                  )}
                >
                  {message.role === 'bot' && 
                    <div>
                      <p className="bg-background/50 p-2 rounded-md">{message.content}</p>
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
                             <CardDescription>{message.content}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {renderChart(message)}
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
                                    <button key={index} onClick={() => handleExampleQuery(item.text)} className="w-full flex items-center gap-2 p-2 rounded-md bg-background text-sm text-left hover:bg-accent transition-colors">
                                        {item.icon}
                                        <span>{item.text}</span>
                                    </button>
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
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t">
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
