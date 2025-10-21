"use client"; 
import { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";



type MapComponents = {
  MapContainer: typeof import('react-leaflet').MapContainer;
  TileLayer: typeof import('react-leaflet').TileLayer;
};

type LeafletStatus = {
  mapComponents: MapComponents | null;
  isLoading: boolean;
};

export function useMap() {
  const [map, setMap] = useState<MapComponents | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const modules = await import('react-leaflet');
        setMap({ 
          MapContainer: modules.MapContainer,
          TileLayer: modules.TileLayer,
        });
      } catch (e) {
        console.error("useLeafletLoader failed:", e);
      } finally {
        setLoading(false);
      }
    };
    loadLeaflet();
  }, []); 

  return { map, loading};
}