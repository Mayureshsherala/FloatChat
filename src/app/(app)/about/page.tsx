import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Lightbulb, BookUser, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex-1 p-4 md:p-8">
      <header className="flex items-center gap-4 mb-8">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-3xl font-bold tracking-tight">About ARGO Explorer</h1>
      </header>

      <main className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="text-primary" />
              What is Argo?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Argo is a global array of nearly 4,000 free-drifting profiling floats that measures the temperature and salinity of the upper 2000 m of the ocean. This allows, for the first time, continuous monitoring of the temperature, salinity, and velocity of the upper ocean, with all data being relayed and made publicly available within hours after collection.
            </p>
            <p>
              The Argo program is a major component of the Global Ocean Observing System (GOOS) and provides essential data for climate science, oceanography, and weather forecasting. The data collected by Argo floats are crucial for understanding the ocean's role in the Earth's climate system.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="text-primary" />
              The ARGO Explorer Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              ARGO Explorer is a full-stack web application designed to make ARGO float data more accessible and interactive. It leverages the power of Artificial Intelligence to allow users to query the vast ARGO dataset using natural language.
            </p>
            <p>
              Our goal is to bridge the gap between complex oceanographic data and the researchers, students, and enthusiasts who want to explore it. By providing an intuitive chat-based interface and powerful visualization tools, we aim to democratize access to vital ocean data.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookUser className="text-primary" />
              How to Use This App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              <strong>Chatbot:</strong> Navigate to the Chatbot tab and type your question in the input box. For example, you could ask, "Show me temperature profiles in the Indian Ocean" or "What are the float trajectories near Japan?". The AI will generate a SQL query based on your question.
            </p>
            <p>
              <strong>Dashboard:</strong> Go to the Dashboard tab to visually explore the data. You can view float paths on an interactive map, analyze temperature and salinity profiles on charts, and view the raw data in a table.
            </p>
             <p>
              <strong>Data Export:</strong> On the Dashboard's "Data Table" tab, you can download the currently displayed data as a CSV file for your own offline analysis.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
