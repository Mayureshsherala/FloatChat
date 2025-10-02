import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bot, Download, LayoutDashboard, Waves } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Bot className="size-8 text-primary" />,
    title: 'AI-Powered Chatbot',
    description: 'Interact with ARGO data using natural language. Ask complex questions and get SQL queries in return.',
  },
  {
    icon: <LayoutDashboard className="size-8 text-primary" />,
    title: 'Interactive Dashboard',
    description: 'Visualize float trajectories, analyze depth-time plots, and compare temperature and salinity profiles.',
  },
  {
    icon: <Waves className="size-8 text-primary" />,
    title: 'Real-time Data Processing',
    description: 'Ingest and process ARGO NetCDF files, storing structured data in PostgreSQL and vector summaries for search.',
  },
  {
    icon: <Download className="size-8 text-primary" />,
    title: 'Data Export',
    description: 'Easily download the results of your queries and visualized data in standard formats like CSV.',
  },
];

export default function HomePage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-ocean');
  
  return (
    <div className="flex flex-col flex-1">
      <header className="relative h-[400px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground drop-shadow-md">
            Welcome to ARGO Explorer
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/90 drop-shadow">
            An AI-powered system to explore and visualize global oceanographic data from ARGO floats.
          </p>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-8">
        <section className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Core Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-card/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader className="items-center">
                  {feature.icon}
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
