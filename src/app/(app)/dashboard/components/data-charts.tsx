"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { argoFloats, type ArgoFloat } from "@/lib/data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, TooltipProps, ResponsiveContainer } from "recharts";
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const chartConfig = {
  temperature: {
    label: "Temperature (°C)",
    color: "hsl(var(--chart-1))",
  },
  salinity: {
    label: "Salinity (PSU)",
    color: "hsl(var(--chart-2))",
  },
  temp: {
    label: "Temp",
    color: "hsl(var(--chart-1))",
  },
  avg: {
    label: "Avg",
    color: "hsl(var(--chart-2))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-3))",
  }
};

type DataChartsProps = {
  isMiniature?: boolean;
}

export function DataCharts({ isMiniature = false }: DataChartsProps) {
  const [selectedFloatId, setSelectedFloatId] = useState<string>(
    argoFloats[0].id
  );

  const selectedFloat =
    argoFloats.find((f) => f.id === selectedFloatId) || argoFloats[0];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 text-xs bg-background/80 backdrop-blur-sm rounded-lg border">
          <p className="font-bold">{`Depth: ${label} m`}</p>
          {payload.map((pld, index) => (
             <p key={index} style={{ color: pld.color }}>
              {`${pld.name}: ${Number(pld.value).toFixed(2)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  if (isMiniature) {
    const miniatureData = [
        { name: 'Jan', temp: 22, avg: 24, low: 20 },
        { name: 'Feb', temp: 23, avg: 25, low: 21 },
        { name: 'Mar', temp: 25, avg: 27, low: 23 },
        { name: 'Apr', temp: 27, avg: 29, low: 25 },
        { name: 'May', temp: 28.7, avg: 30, low: 26 },
        { name: 'Jun', temp: 27, avg: 29, low: 25 },
        { name: 'Jul', temp: 26, avg: 28, low: 24 },
        { name: 'Aug', temp: 26.5, avg: 28.5, low: 24.5 },
        { name: 'Sep', temp: 26, avg: 28, low: 24 },
        { name: 'Oct', temp: 25, avg: 27, low: 23 },
        { name: 'Nov', temp: 24, avg: 26, low: 22 },
        { name: 'Dec', temp: 23, avg: 25, low: 21 },
      ];

    return (
        <ChartContainer config={chartConfig} className="h-[150px] w-full">
            <ResponsiveContainer>
                <LineChart data={miniatureData} margin={{ top: 5, right: 10, left: -20, bottom: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false}/>
                    <YAxis fontSize={10} domain={[20, 32]} tickLine={false} axisLine={false}/>
                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent
                            indicator="line"
                            labelClassName="text-xs"
                            className="text-xs"
                            />
                        }
                    />
                    <Line dataKey="temp" stroke="var(--color-temp)" strokeWidth={2} dot={false} name="Temp"/>
                    <Line dataKey="avg" stroke="var(--color-avg)" strokeWidth={2} dot={false} name="Avg" />
                    <Line dataKey="low" stroke="var(--color-low)" strokeWidth={2} dot={false} name="Low" />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Data Profiles</CardTitle>
            <CardDescription>{selectedFloat.name}</CardDescription>
          </div>
          <Select value={selectedFloatId} onValueChange={setSelectedFloatId}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a float" />
            </SelectTrigger>
            <SelectContent>
              {argoFloats.map((float) => (
                <SelectItem key={float.id} value={float.id}>
                  {float.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Temperature vs. Depth</h3>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={selectedFloat.profiles} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="temperature"
                    type="number"
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tickFormatter={(tick) => tick.toFixed(1)}
                    label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis 
                    dataKey="depth" 
                    reversed 
                    label={{ value: "Depth (m)", angle: -90, position: 'insideLeft' }}
                  />
                  <ChartTooltip content={<CustomTooltip />} />
                  <Line
                    dataKey="temperature"
                    type="monotone"
                    stroke="var(--color-temperature)"
                    strokeWidth={2}
                    dot={false}
                    name="Temperature"
                  />
                </LineChart>
              </ChartContainer>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Salinity vs. Depth</h3>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <LineChart data={selectedFloat.profiles} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                   <XAxis
                    dataKey="salinity"
                    type="number"
                    domain={['dataMin - 0.1', 'dataMax + 0.1']}
                    tickFormatter={(tick) => tick.toFixed(1)}
                    label={{ value: "Salinity (PSU)", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis 
                    dataKey="depth" 
                    reversed 
                    label={{ value: "Depth (m)", angle: -90, position: 'insideLeft' }}
                  />
                  <ChartTooltip content={<CustomTooltip />} />
                  <Line
                    dataKey="salinity"
                    type="monotone"
                    stroke="var(--color-salinity)"
                    strokeWidth={2}
                    dot={false}
                    name="Salinity"
                  />
                </LineChart>
              </ChartContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Comparison</CardTitle>
          <CardDescription>Temperature profiles of all floats</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{
            "Argo Float 1 (Indian Ocean)": { color: "hsl(var(--chart-1))" },
            "Argo Float 2 (Bay of Bengal)": { color: "hsl(var(--chart-2))" },
            "Argo Float 3 (Arabian Sea)": { color: "hsl(var(--chart-3))" },
          }} className="h-[650px] w-full">
            <LineChart margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis
                    dataKey="temperature"
                    type="number"
                    domain={[0, 30]}
                    label={{ value: "Temperature (°C)", position: "insideBottom", offset: -5 }}
                  />
                <YAxis dataKey="depth" type="number" reversed domain={[0, 2000]} label={{ value: "Depth (m)", angle: -90, position: 'insideLeft' }} />
                <ChartTooltip content={<CustomTooltip />} />
                <ChartLegend content={<ChartLegendContent />} />
                {argoFloats.map((float, index) => (
                  <Line
                    key={float.id}
                    data={float.profiles}
                    dataKey="temperature"
                    name={float.name}
                    stroke={`var(--color-${float.name})`}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

    