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

// This data is derived from the SQL dataset provided.
// Due to the nature of a static file, this is a small, representative sample.
export const argoFloats: ArgoFloat[] = [
  {
    id: '6902939',
    name: 'Float 6902939 (CORIOLIS)',
    path: [{ lat: -47.778, lng: 58.041 }],
    profiles: [
      { depth: 3.5, temperature: 7.01, salinity: 33.62 },
      { depth: 4.5, temperature: 7.00, salinity: 33.62 },
      { depth: 5.5, temperature: 6.99, salinity: 33.62 },
    ],
  },
  {
    id: '690100',
    name: 'Float 690100',
    path: [
      { lat: 11.23, lng: 77.56 },
      { lat: 8.45, lng: 83.21 },
    ],
    profiles: [
      { depth: 1125.32, temperature: 17.3, salinity: 34.92 },
      { depth: 450.32, temperature: 23.8, salinity: 34.52 },
    ],
  },
  {
    id: '690101',
    name: 'Float 690101',
    path: [
      { lat: -3.45, lng: 88.62 },
      { lat: -6.23, lng: 92.56 },
    ],
    profiles: [
      { depth: 345.61, temperature: 24.9, salinity: 34.47 },
      { depth: 1250.43, temperature: 15.5, salinity: 34.98 },
    ],
  },
  {
    id: '690102',
    name: 'Float 690102',
    path: [
      { lat: 6.12, lng: 72.91 },
      { lat: 12.34, lng: 68.45 },
    ],
    profiles: [
      { depth: 899.2, temperature: 19.2, salinity: 34.71 },
      { depth: 1750.54, temperature: 13.2, salinity: 35.11 },
    ],
  },
];
