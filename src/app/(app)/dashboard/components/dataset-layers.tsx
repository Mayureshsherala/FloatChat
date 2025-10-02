"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Thermometer, Waves, Wind, AlertTriangle } from "lucide-react"
import React from "react"


const layers = [
    {id: "temp", label: "Sea Surface Temperature", icon: Thermometer},
    {id: "salinity", label: "Salinity Levels", icon: Waves},
    {id: "currents", label: "Ocean Currents", icon: Wind},
    {id: "pollution", label: "Pollution Levels", icon: AlertTriangle},
]

export function DatasetLayers() {
    const [activeLayer, setActiveLayer] = React.useState("temp");

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Dataset Layers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {layers.map(layer => (
                    <div key={layer.id} className="p-3 rounded-lg border bg-muted/30">
                        <div className="flex items-center justify-between">
                            <Label htmlFor={layer.id} className="flex items-center gap-2 font-medium">
                                <layer.icon className="size-5 text-primary" />
                                {layer.label}
                            </Label>
                            <Switch 
                                id={layer.id} 
                                checked={activeLayer === layer.id}
                                onCheckedChange={() => setActiveLayer(layer.id)}
                            />
                        </div>
                        {activeLayer === layer.id && (
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-xs font-semibold text-red-500">Active</span>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor={`${layer.id}-opacity`} className="text-xs">Opacity</Label>
                                    <div className="flex items-center gap-2">
                                        <Slider id={`${layer.id}-opacity`} defaultValue={[80]} max={100} step={1} />
                                        <span className="text-xs w-8 text-right">80%</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
