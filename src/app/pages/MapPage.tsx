"use client"; 
import React from 'react';
import { useMap } from '@/app/hooks/useLeaflet'; 
import 'leaflet/dist/leaflet.css';


export const MapPage = () => {
  const { map, loading } = useMap();

  if (loading || !map) {
    return (
      <section>
      </section>
    );
  }

  const { MapContainer, TileLayer } = map;
  const position: [number, number] = [59.1251, 11.3875]; 

  return (
    <section>
      <MapContainer 
        center={position} 
        zoom={9} 
        style={{ height: '70vh', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </section>
  );
};