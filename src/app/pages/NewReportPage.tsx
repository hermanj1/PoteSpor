"use client";

import { useState } from "react";
import type { SelectUser } from "@/db/schema/users";
import { REPORT_STATUSES, SPECIES, SEX_OPTIONS, YES_NO_OPTIONS } from "@/app/lib/constants";
import { FormInput, FormSelect, FormTextArea } from "@/app/components/FormFields";
import { ReportMap } from "@/app/components/ReportMap";
import { uploadImage } from "@/app/lib/storage";

export default function NewReportPage({ user }: { user?: SelectUser }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
    imageUrl: "", 
    latitude: 0, 
    longitude: 0,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const url = selectedFile ? await uploadImage(selectedFile) : "";

      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, imageUrl: url }),
      });
      if (!res.ok) throw new Error();
      window.location.href = "/min-side";
    } catch (err) {
      console.error(err);
      setError("Noe gikk galt.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
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
        <ReportMap onPositionChange={handleMapClick} />
      </div>

      <div className="form-column">
        <h1>Om dyret</h1>
        <FormInput label="Dyrets navn" name="petName" value={formData.petName} onChange={handleChange} />
        <FormInput label="Rase" name="breed" placeholder="F.eks Golden Retriever" value={formData.breed} onChange={handleChange} />
        <FormInput label="Farger" name="colors" placeholder="Svart med hvite poter" value={formData.colors} onChange={handleChange} />
        <FormTextArea label="Kjennetegn" name="features" placeholder="Rødt halsbånd..." value={formData.features} onChange={handleChange} />
        <FormTextArea label="Beskrivelse av hendelse" name="description" value={formData.description} onChange={handleChange} />
        
        <label htmlFor="petImage" className="image-upload">
            {previewUrl ? "Endre bilde" : "Last opp bilde"}
        </label>
        <input id="petImage" type="file" accept="image/*" onChange={handleFileChange} style={{display: 'none'}} />

        {previewUrl && (
          <div>
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>

      <section className="form-submit-row">
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Lagrer..." : "Publiser annonse"}
        </button>
      </section>

      <style>{`
        .report-layout {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem 1rem;
        }

        @media (min-width: 768px) {
            .report-layout {
                grid-template-columns: 1fr 1fr;
            }
        }

        .image-upload {
            padding: 10px;
            border-radius: 6px;
            margin: 16px 0;
            cursor: pointer;
            text-align: center;
            font-weight: 500;
            background-color: #EEC6F5;
        }

        .preview-image {
            width: 100%;
            border-radius: 8px;
            object-fit: cover;
            max-height: 300px;
        }

        .btn {
            background-color: #EEC6F5;
            padding: 12px 32px;
            border-radius: 6px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            font-size: 1rem;
            color: #000000;
        }

      `}</style>
    </form>
  );
}