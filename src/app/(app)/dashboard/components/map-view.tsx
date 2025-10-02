"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useMap,
} from "@vis.gl/react-google-maps";
import { argoFloats, type ArgoFloat } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, LocateFixed } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Thermometer } from "lucide-react";

// Custom Polyline Component to draw lines on the map
const CustomPolyline = ({ path }: { path: google.maps.LatLngLiteral[] }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      const polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: "#007BFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });

      polyline.setMap(map);

      return () => {
        polyline.setMap(null);
      };
    }
  }, [map, path]);

  return null;
};

const CircleOverlay = ({ center, radius, color, name }: { center: google.maps.LatLngLiteral, radius: number, color: string, name?: string }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      const circle = new google.maps.Circle({
        strokeColor: color,
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: color,
        fillOpacity: 0.2,
        map,
        center,
        radius,
      });
      
      let label: google.maps.Marker | undefined;
      if (name) {
          label = new google.maps.Marker({
            position: center,
            map: map,
            label: {
              text: name,
              color: '#333',
              fontSize: '12px',
              fontWeight: 'bold',
            },
            icon: {
              path: 'M 0,0',
            }
          });
      }

      return () => {
        circle.setMap(null);
        if (label) {
            label.setMap(null);
        }
      };
    }
  }, [map, center, radius, color, name]);

  return null;
};


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

  const mapStyles = [
    {
      "featureType": "all",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ebe3cd"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#523735"
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f1e6"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b9d3c2"
        }
      ]
    }
  ];

  const MapControls = () => {
    const map = useMap();

    const zoomIn = () => map && map.setZoom(map.getZoom()! + 1);
    const zoomOut = () => map && map.setZoom(map.getZoom()! - 1);
    const resetCenter = () => map && map.setCenter(mapCenter);

    return (
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button size="icon" variant="ghost" className="bg-background/80"><ZoomIn /></Button>
        <Button size="icon" variant="ghost" className="bg-background/80"><ZoomOut /></Button>
        <Button size="icon" variant="ghost" className="bg-background/80"><LocateFixed /></Button>
      </div>
    );
  }
  
  const overlays = [
      { center: { lat: 50, lng: -40 }, radius: 1000000, color: '#FF6347', name: 'Atlantic' }, // Atlantic
      { center: { lat: 20, lng: 160 }, radius: 1500000, color: '#90EE90', name: 'Pacific' }, // Pacific
      { center: { lat: 10, lng: 140 }, radius: 1200000, color: '#FFD700' }, // West Pacific
  ];

  return (
    <Card className="h-full w-full overflow-hidden relative">
        <CardContent className="p-0 h-full">
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={mapCenter}
                    defaultZoom={3}
                    mapId="argoExplorerMap"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    styles={mapStyles}
                >
                    <Card className="absolute top-4 left-4 w-60">
                        <CardHeader className="p-3">
                            <CardTitle className="text-sm">Current View</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <div className="flex items-center gap-2">
                                            <Thermometer className="size-4 text-red-500" />
                                            <span>Temperature</span>
                                        </div>
                                        <ChevronDown className="size-4"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-52">
                                    <DropdownMenuItem>Salinity</DropdownMenuItem>
                                    <DropdownMenuItem>Ocean Currents</DropdownMenuItem>
                                    <DropdownMenuItem>Pollution</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                             <p className="text-xs text-muted-foreground mt-2">2025-09-11</p>
                        </CardContent>
                    </Card>

                    {overlays.map((overlay, index) => (
                        <CircleOverlay key={index} {...overlay} />
                    ))}

                    {argoFloats.map((float) => (
                        <React.Fragment key={float.id}>
                            <AdvancedMarker
                                position={float.path[float.path.length - 1]}
                                onClick={() => setSelectedFloat(float)}
                            >
                                <div className="p-1 rounded-full bg-teal-500/20 border-2 border-teal-500">
                                    <div className="size-3 rounded-full bg-teal-500" />
                                </div>
                            </AdvancedMarker>
                        </React.Fragment>
                    ))}

                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg text-center">
                        <h2 className="font-bold text-lg">Global Ocean Monitoring</h2>
                        <p className="text-sm text-muted-foreground">Real-time Oceanographic Data Visualization</p>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg text-sm w-48">
                        <h3 className="font-bold mb-2">Data Layers</h3>
                        <ul className="space-y-1">
                            <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"/>Temperature</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"/>Salinity</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"/>Currents</li>
                            <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/>Pollution</li>
                        </ul>
                        <div className="border-t my-2"/>
                        <div>Zoom: 1.0x</div>
                        <div>Active Stations: 10</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>Live Data</div>
                    </div>


                    {selectedFloat && (
                        <InfoWindow
                            position={selectedFloat.path[selectedFloat.path.length - 1]}
                            onCloseClick={() => setSelectedFloat(null)}
                            headerContent={
                                <div className="font-bold text-base">{selectedFloat.name}</div>
                            }
                        >
                            <div className="p-2 w-48">
                                <p className="text-xs text-muted-foreground">ID: {selectedFloat.id}</p>
                                <div className="mt-2 text-sm">
                                    <p>Lat: {selectedFloat.path[selectedFloat.path.length - 1].lat.toFixed(2)}</p>
                                    <p>Lng: {selectedFloat.path[selectedFloat.path.length - 1].lng.toFixed(2)}</p>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                    <MapControls />
                </Map>
            </APIProvider>
        </CardContent>
    </Card>
  );
}
