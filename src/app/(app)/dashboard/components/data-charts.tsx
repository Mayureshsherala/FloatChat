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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, TooltipProps } from "recharts";
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
};

export function DataCharts() {
  const [selectedFloatId, setSelectedFloatId] = useState<string>(
    argoFloats[0].id
  );

  const selectedFloat =
    argoFloats.find((f) => f.id === selectedFloatId) || argoFloats[0];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 text-sm bg-background/80 backdrop-blur-sm rounded-lg border">
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
                    stroke={chartConfig.temperature.color}
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
                    stroke={chartConfig.salinity.color}
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
          <ChartContainer config={{}} className="h-[650px] w-full">
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
                    stroke={`hsl(var(--chart-${(index % 5) + 1}))`}
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
