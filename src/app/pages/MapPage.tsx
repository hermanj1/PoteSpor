"use client"; 
import React, { useMemo } from 'react';
import { useMap } from '@/app/hooks/useLeaflet'; 
import 'leaflet/dist/leaflet.css';


export const MapPage = () => {
  const { map, loading } = useMap();

  const targetPosition = useMemo(() => {
    if (typeof window === "undefined") return null;
    
    const params = new URLSearchParams(window.location.search);
    const lat = params.get("lat");
    const lng = params.get("lng");

    if (lat && lng) {
      return [parseFloat(lat), parseFloat(lng)] as [number, number];
    }
    return null;
  }, []);

  if (loading || !map) {
    return <div>Laster kart...</div>;
  }

  const { MapContainer, TileLayer, Marker } = map;
  
  const defaultPosition: [number, number] = [59.1251, 11.3875]; 
  const center = targetPosition || defaultPosition;
  const zoomLevel = targetPosition ? 13 : 10; 

  return (
    <section>
      <MapContainer 
        center={center} 
        zoom={zoomLevel} 
        style={{ height: '80vh', width: '100%' }} 
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {targetPosition && (
          <Marker position={targetPosition} />
        )}

      </MapContainer>
    </section>
  );
};