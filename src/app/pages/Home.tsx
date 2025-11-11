
export default function Home() {
  return (
    <main className="home">
      <section className="articles" aria-labelledby="articles-heading">
        <h1>Siste oppdateringer</h1>

        <article className="article">
          <img src="src/img/white_cat.png" alt="Bilde av hvit katt" className="article-image"/>
          <span className="status savnet">Savnet</span>
          <h2>Hvit katt savnet</h2>
          <p>Forsvant fra hagen i Åsane søndag kveld. Veldig sosial og kan oppsøke folk.</p>
          <p className="meta">Område: Bergen - Åsane · 10.11.2025</p>
        </article>

        <article className="article">
          <img src="src/img/brown_dog.png" alt="Bilde av brun hund" className="article-image"/>
          <span className="status funnet">Funnet</span>
          <h2>Brun hund funnet</h2>
          <p>Funnet langs tursti i Torshov. Har halsbånd uten kontaktinfo.</p>
          <p className="meta">Område: Oslo - Torshov · 09.11.2025</p>
        </article>

        <article className="article">
          <img src="src/img/cat.jpg" alt="Bilde av grå katt" className="article-image"/>
          <span className="status gjenforent">Gjenforent</span>
          <h2>Katt tilbake hos eier</h2>
          <p>Ble observert av nabo og hentet hjem samme kveld.</p>
          <p className="meta">Område: Trondheim - Byåsen · 08.11.2025</p>
        </article>
      </section>
    </main>
  );
}
