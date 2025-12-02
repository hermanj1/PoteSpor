"use client"; 
import React, { useMemo } from 'react';
import { useMap } from '@/app/hooks/useLeaflet'; 
import type { SelectReport } from "@/db/schema/reports";
import 'leaflet/dist/leaflet.css';


export const MapPage = ({ reports = [] }: { reports?: SelectReport[] }) => {
  const { map, loading } = useMap();

  const targetPosition = useMemo(() => {
    if (typeof window === "undefined") return null;
    
    const params = new URLSearchParams(window.location.search);
    const lat = params.get("lat");
    const lng = params.get("lng");

    if (lat && lng) 
      return [parseFloat(lat), parseFloat(lng)] as [number, number];
    return null;
  }, []);

  if (loading || !map) 
    return <div>Laster kart...</div>;

  const { MapContainer, TileLayer, Marker, Popup } = map;
  
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
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {reports?.map((report) => {
          if (!report.latitude || !report.longitude) return null;

          return (
            <Marker 
              key={report.id} 
              position={[report.latitude, report.longitude]}
            >
              <Popup>
                <section className="map-popup-content">
                  <span className={`badge ${report.status}`}>{report.status}</span>
                  
                  <h4>{report.species} {report.petName ? `- ${report.petName}` : ""}</h4>
                  
                  {report.imageUrl && (
                    <img 
                      src={report.imageUrl} 
                      alt="Dyr" 
                      className="popup-image"
                    />
                  )}
                  
                  <p className="popup-desc">
                    {report.description?.slice(0, 50)}...
                  </p>
                </section>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>
      <style>{styles}</style>
    </section>
  );
};

const styles = `
  .map-popup-content { 
    width: 150px; 
  }

  .popup-image {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
    margin-top: 5px;
    display: block;
  }

  .popup-desc {
    font-size: 0.8rem;
    margin: 0;
    line-height: 1;

  }
`;