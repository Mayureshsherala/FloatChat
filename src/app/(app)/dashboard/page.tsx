import { MapView } from "./components/map-view";
import { ChatInterface } from "../chatbot/components/chat-interface";
import { DatasetLayers } from "./components/dataset-layers";
import { Header } from "./components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-muted/20">
      <main className="flex flex-1 gap-4 p-4 overflow-hidden">
        <div className="w-[300px] flex-shrink-0 flex flex-col gap-4">
          <DatasetLayers />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Legend</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Temperature: 15-30°C</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Salinity: 30-37 PSU</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Current: 0-2 m/s</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Pollution: Low-High</span>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="text-base">Parameter Scale</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="h-2 w-full rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500"></div>
                 <div className="flex justify-between text-xs mt-1">
                     <span>Cold</span>
                     <span>Hot</span>
                 </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex-1 flex flex-col gap-4">
            <Header />
            <MapView />
        </div>
        <div className="w-[450px] flex-shrink-0">
          <ChatInterface />
        </div>
      </main>
    </div>
  );
}
