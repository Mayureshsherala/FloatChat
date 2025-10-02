"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { Polyline } from "@vis.gl/react-google-maps/compat";
import { useState } from "react";
import { argoFloats, type ArgoFloat } from "@/lib/data";
import { Ship } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function MapView() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const [selectedFloat, setSelectedFloat] = useState<ArgoFloat | null>(null);

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-lg">
        <p className="text-destructive text-center p-4">
          Google Maps API key is not configured.
          <br />
          Please set the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.
        </p>
      </div>
    );
  }
  
  const mapCenter = { lat: 5, lng: 80 };

  return (
    <Card className="h-[calc(100vh-10rem)] w-full overflow-hidden">
        <CardContent className="p-0 h-full">
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={mapCenter}
                    defaultZoom={4}
                    mapId="argoExplorerMap"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {argoFloats.map((float, index) => (
                        <Polyline
                            key={float.id}
                            path={float.path}
                            strokeColor={`hsl(var(--chart-${(index % 5) + 1}))`}
                            strokeOpacity={0.8}
                            strokeWeight={3}
                        />
                    ))}
                    {argoFloats.map((float, index) => (
                        <AdvancedMarker
                            key={float.id}
                            position={float.path[float.path.length - 1]}
                            onClick={() => setSelectedFloat(float)}
                        >
                            <div className="p-1 rounded-full bg-background border-2" style={{borderColor: `hsl(var(--chart-${(index % 5) + 1}))`}}>
                                <Ship className="size-5" style={{color: `hsl(var(--chart-${(index % 5) + 1}))`}} />
                            </div>
                        </AdvancedMarker>
                    ))}
                    {selectedFloat && (
                        <InfoWindow
                            position={selectedFloat.path[selectedFloat.path.length - 1]}
                            onCloseClick={() => setSelectedFloat(null)}
                        >
                            <div className="p-2">
                                <h3 className="font-bold text-sm">{selectedFloat.name}</h3>
                                <p className="text-xs text-muted-foreground">ID: {selectedFloat.id}</p>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </CardContent>
    </Card>
  );
}
