import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MapView } from "./components/map-view";
import { DataCharts } from "./components/data-charts";
import { DataTable } from "./components/data-table";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Map, BarChart2, Table } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 p-4 md:p-8">
      <header className="flex items-center gap-4 mb-8">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </header>
      <main>
        <Tabs defaultValue="map">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="map">
              <Map className="mr-2" /> Map View
            </TabsTrigger>
            <TabsTrigger value="charts">
              <BarChart2 className="mr-2" /> Charts
            </TabsTrigger>
            <TabsTrigger value="table">
              <Table className="mr-2" /> Data Table
            </TabsTrigger>
          </TabsList>
          <TabsContent value="map">
            <MapView />
          </TabsContent>
          <TabsContent value="charts">
            <DataCharts />
          </TabsContent>
          <TabsContent value="table">
            <DataTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
