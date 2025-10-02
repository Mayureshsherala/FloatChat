"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { argoFloats, type ArgoFloat } from "@/lib/data";
import { Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DataTable() {
  const [selectedFloatId, setSelectedFloatId] = useState<string>(
    argoFloats[0].id
  );

  const selectedFloat =
    argoFloats.find((f) => f.id === selectedFloatId) || argoFloats[0];

  const handleDownloadCSV = () => {
    const headers = ["depth", "temperature", "salinity"];
    const csvRows = [
      headers.join(","),
      ...selectedFloat.profiles.map((row) =>
        [row.depth, row.temperature.toFixed(4), row.salinity.toFixed(4)].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${selectedFloat.id}_profiles.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Select value={selectedFloatId} onValueChange={setSelectedFloatId}>
          <SelectTrigger className="w-[280px]">
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
        <Button onClick={handleDownloadCSV} variant="outline">
          <Download className="mr-2" />
          Download CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader className="sticky top-0 bg-muted">
              <TableRow>
                <TableHead className="w-[150px]">Depth (m)</TableHead>
                <TableHead>Temperature (°C)</TableHead>
                <TableHead>Salinity (PSU)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedFloat.profiles.map((profile, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{profile.depth}</TableCell>
                  <TableCell>{profile.temperature.toFixed(4)}</TableCell>
                  <TableCell>{profile.salinity.toFixed(4)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}
