
import { useMap } from "@/app/hooks/useLeaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";

interface ReportMapProps {
  onPositionChange: (lat: number, lng: number) => void;
}

export const ReportMap = ({ onPositionChange }: ReportMapProps) => {
  const { map, loading } = useMap();
  const [position, setPosition] = useState<{lat: number, lng: number} | null>(null);

  if (loading || !map) return <div className="map-loading">Laster kart...</div>;

  const { MapContainer, TileLayer, Marker, useMapEvents } = map;

 
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng); 
        onPositionChange(e.latlng.lat, e.latlng.lng); 
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <div className="map-wrapper">
      <MapContainer 
        center={[59.9139, 10.7522]} 
        zoom={10} 
        style={{ height: "300px", width: "100%" }}
      >
        <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
      
      {position ? (
        <p className="map-hint">Markert posisjon: {position.lat.toFixed(4)}, {position.lng.toFixed(4)}</p>
      ) : (
        <p className="map-hint">Klikk i kartet for å markere hvor dyret ble borte</p>
      )}

    </div>
  );
};