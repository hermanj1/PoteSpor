"use client"; 
import { useState, useEffect } from 'react';

type MapComponents = {
  MapContainer: typeof import('react-leaflet').MapContainer;
  TileLayer: typeof import('react-leaflet').TileLayer;
};

type LeafletStatus = {
  mapComponents: MapComponents | null;
  isLoading: boolean;
};

export function useLeafletLoader(): LeafletStatus {
  const [mapComponents, setMapComponents] = useState<MapComponents | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const modules = await import('react-leaflet');
        setMapComponents({ 
          MapContainer: modules.MapContainer,
          TileLayer: modules.TileLayer,
        });
      } catch (e) {
        console.error("useLeafletLoader failed:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadLeaflet();
  }, []); 

  return { mapComponents, isLoading };
}