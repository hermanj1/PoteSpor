"use client";

import { useState } from "react";
import { useMap } from "@/app/hooks/useLeaflet";
import "leaflet/dist/leaflet.css";
import type { SelectUser } from "@/db/schema/users";
import { REPORT_STATUSES, SPECIES, SEX_OPTIONS, YES_NO_OPTIONS } from "@/app/lib/constants";
import { FormInput, FormSelect, FormTextArea } from "@/app/components/FormFields";

export default function NewReportPage({ user }: { user?: SelectUser }) {
  const { map, loading: mapLoading } = useMap(); 
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    status: REPORT_STATUSES[0],
    isChipped: YES_NO_OPTIONS[2], 
    species: SPECIES[0],
    sex: SEX_OPTIONS[2], 
    isSterilized: YES_NO_OPTIONS[2], 
    dateMissing: "",
    description: "",
    petName: "",
    breed: "",
    colors: "",
    features: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      window.location.href = "/min-side";
    } catch {
      setError("Noe gikk galt.");
      setSubmitting(false);
    }
  };

  return (
    <form className="report-layout" onSubmit={handleSubmit}>
      <div className="form-column">
        <h1>Opprett ny annonse</h1>

        <FormSelect label="Status" name="status" value={formData.status} onChange={handleChange} options={REPORT_STATUSES} />
        <FormSelect label="Er dyret id chippet?" name="isChipped" value={formData.isChipped} onChange={handleChange} options={YES_NO_OPTIONS} />
        <FormSelect label="Hva slags dyr er det?" name="species" value={formData.species} onChange={handleChange} options={SPECIES} />
        <FormSelect label="Hvilket kjønn er dyret?" name="sex" value={formData.sex} onChange={handleChange} options={SEX_OPTIONS} />
        <FormSelect label="Er dyret sterilisert?" name="isSterilized" value={formData.isSterilized} onChange={handleChange} options={YES_NO_OPTIONS} />
        <FormInput label="Når ble dyret borte?" name="dateMissing" type="date" value={formData.dateMissing} onChange={handleChange} />

        <label>Hvor ble dyret borte?</label>
        {mapLoading && <div className="input map-placeholder"></div>}
        {!mapLoading && map && (
          <map.MapContainer center={[59.9139, 10.7522]}
           zoom={13} 
           className="report-map-container" >
            <map.TileLayer
             attribution='&copy; 
             OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
             />
          </map.MapContainer>
        )}
        
        <FormTextArea label="Beskrivelse av hendelse" name="description" value={formData.description} onChange={handleChange} />
      </div>

      <div className="form-column">
        <h1>Om dyret</h1>
        <FormInput label="Dyrets navn" name="petName" value={formData.petName} onChange={handleChange} />
        <FormInput label="Rase" name="breed" placeholder="F.eks Golden Retriever" value={formData.breed} onChange={handleChange} />
        <FormInput label="Farger" name="colors" placeholder="Svart med hvite poter" value={formData.colors} onChange={handleChange} />
        <FormTextArea label="Kjennetegn" name="features" placeholder="Rødt halsbånd..." value={formData.features} onChange={handleChange} />
        <FormInput label="Bilde" name="petImage" type="file" value="" onChange={()=>{}} disabled />

      </div>

      <section className="form-submit-row">
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Lagrer..." : "Publiser annonse"}
        </button>
      </section>
    </form>
  );
}