export type ArgoProfile = {
  depth: number;
  temperature: number;
  salinity: number;
};

export type ArgoFloat = {
  id: string;
  name: string;
  path: { lat: number; lng: number }[];
  profiles: ArgoProfile[];
};

export const argoFloats: ArgoFloat[] = [
  {
    id: "F001",
    name: "Argo Float 1 (Indian Ocean)",
    path: [
      { lat: -5.2, lng: 80.5 },
      { lat: -5.8, lng: 81.1 },
      { lat: -6.5, lng: 81.9 },
      { lat: -7.1, lng: 82.5 },
      { lat: -7.9, lng: 83.2 },
    ],
    profiles: Array.from({ length: 20 }, (_, i) => ({
      depth: i * 100,
      temperature: 25 - i * 1.2 + Math.random() * 2 - 1,
      salinity: 34.5 + Math.sin(i / 5) * 0.5 + Math.random() * 0.1 - 0.05,
    })),
  },
  {
    id: "F002",
    name: "Argo Float 2 (Bay of Bengal)",
    path: [
      { lat: 10.1, lng: 90.2 },
      { lat: 10.5, lng: 89.8 },
      { lat: 10.9, lng: 89.5 },
      { lat: 11.4, lng: 89.1 },
      { lat: 12.0, lng: 88.6 },
    ],
    profiles: Array.from({ length: 20 }, (_, i) => ({
      depth: i * 100,
      temperature: 28 - i * 1.1 + Math.random() * 1.5 - 0.75,
      salinity: 33.8 + Math.cos(i / 4) * 0.4 + Math.random() * 0.1 - 0.05,
    })),
  },
  {
    id: "F003",
    name: "Argo Float 3 (Arabian Sea)",
    path: [
      { lat: 15.5, lng: 65.0 },
      { lat: 15.2, lng: 65.7 },
      { lat: 14.8, lng: 66.3 },
      { lat: 14.3, lng: 66.9 },
      { lat: 13.7, lng: 67.4 },
    ],
    profiles: Array.from({ length: 20 }, (_, i) => ({
      depth: i * 100,
      temperature: 26.5 - i * 1.3 + Math.random() * 2 - 1,
      salinity: 35.0 + Math.sin(i / 6) * 0.6 + Math.random() * 0.15 - 0.075,
    })),
  },
];
