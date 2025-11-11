"use client";

import { useMap } from "@/app/hooks/useLeaflet";
import "leaflet/dist/leaflet.css";

export default function NewReportPage() {
  const { map, loading } = useMap(); 

  return (
    <form className="report-layout">
      <div className="form-column">
        <h1>Opprett ny annonse</h1>

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          className="input"
          defaultValue="savnet"
        >
          <option value="savnet">Savnet</option>
          <option value="funnet">Funnet</option>
          <option value="gjenforent">Gjenforent</option>
        </select>

        <label htmlFor="id-chip">Er dyret id chippet?</label>
        <select
          id="id-chip"
          name="id-chip"
          className="input"
          defaultValue="Ja"
        >
          <option value="ja">Ja</option>
          <option value="nei">Nei</option>
          <option value="vet ikke">Vet ikke</option>
        </select>

        <label htmlFor="animalSpecies">Hva slags dyr er det?</label>
        <select
          id="animalSpecies"
          name="animalSpecies"
          className="input"
          defaultValue="Hund"
        >
          <option value="hund">Hund</option>
          <option value="katt">Katt</option>
          <option value="fugl">Fugl</option>
        </select>

        <label htmlFor="animalSex">Hvilket kjønn er dyret?</label>
        <select
          id="animalSex"
          name="animalSex"
          className="input"
          defaultValue="Hunn"
        >
          <option value="hunn">Hunn</option>
          <option value="hann">Hann</option>
          <option value="vet ikke">Vet ikke</option>
        </select>

        <label htmlFor="animalSterilized">Er dyret sterilisert?</label>
        <select
          id="animalSterilized"
          name="animalSterilized"
          className="input"
          defaultValue="Ja"
        >
          <option value="ja">Ja</option>
          <option value="nei">Nei</option>
          <option value="vet ikke">Vet ikke</option>
        </select>

        <label htmlFor="dateMissing">Når ble dyret borte?</label>
        <input
          id="dateMissing"
          name="dateMissing"
          type="date"
          className="input"
        />

        
<label htmlFor="location">Hvor ble dyret borte?</label>
        
        {loading && (
          <div
            className="input map-placeholder"
          >
          </div>
        )}

        {!loading && map && (
          <map.MapContainer
            center={[59.9139, 10.7522]}
            zoom={13}
            className="report-map-container"
          >
            <map.TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </map.MapContainer>
        )}
        

        <label htmlFor="description">Gi en beskrivelse av hva som skjedde</label>
        <textarea
          id="description"
          name="description"
          className="input"
          placeholder="Skriv her.."
        ></textarea>
      </div>

     
      <div className="form-column">
        <h1>Om dyret</h1>

        <label htmlFor="petName">Dyrets navn (hvis kjent)</label>
        <input
          id="petName"
          name="petName"
          type="text"
          className="input"
          
        />

        <label htmlFor="petBreed">Rase (hvis kjent)</label>
        <input
          id="petBreed"
          name="petBreed"
          type="text"
          className="input"
          placeholder="Golden Retriever, Siameser, etc."
        />

        <label htmlFor="petColors">Farger</label>
        <input
          id="petColors"
          name="petColors"
          type="text"
          className="input"
          placeholder="Svart med hvite poter..."
        />

        <label htmlFor="petFeatures">Spesielle kjennetegn</label>
        <textarea
          id="petFeatures"
          name="petFeatures"
          className="input"
          placeholder="Har på seg et rødt halsbånd, halter litt på venstre bakben..."
          rows={4}
        ></textarea>

        <label htmlFor="petImage">Last opp bilde</label>
        <input
          id="petImage"
          name="petImage"
          type="file"
          className="input"
          accept="image/png, image/jpeg"
        />
      </div>


      <section className="form-submit-row">
        <button type="submit" className="btn" disabled>
          Publiser annonse (Funker ikke enda)
        </button>
      </section>
    </form>
  );
}