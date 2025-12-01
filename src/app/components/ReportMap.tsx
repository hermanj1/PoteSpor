
import { useMap } from "@/app/hooks/useLeaflet";
import "leaflet/dist/leaflet.css";
export const ReportMap = () => {
  const { map, loading } = useMap();
  if (loading) return <div>Laster kart...</div>;
  
  if (!map) return null;
  return (
    <map.MapContainer 
      center={[59.9139, 10.7522]} 
      zoom={13} 
      className="report-map-container"
    >
      <map.TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </map.MapContainer>
  );
};