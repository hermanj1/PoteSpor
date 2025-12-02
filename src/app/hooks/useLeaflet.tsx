"use client"; 
import { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";


type MapComponents = {
  MapContainer: typeof import('react-leaflet').MapContainer;
  TileLayer: typeof import('react-leaflet').TileLayer;
  Marker: typeof import('react-leaflet').Marker;
  useMapEvents: typeof import('react-leaflet').useMapEvents;
  icon: typeof import('leaflet').icon; 
};

export function useMap() {
  const [map, setMap] = useState<MapComponents | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        const reactLeaflet = await import('react-leaflet');
        const leaflet = await import('leaflet');

        setMap({ 
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          Marker: reactLeaflet.Marker,
          useMapEvents: reactLeaflet.useMapEvents,
          icon: leaflet.icon
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