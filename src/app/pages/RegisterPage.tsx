"use client";

import { FormEvent, useState } from "react";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json",        },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json() as { error?: string };

      if (!res.ok) {
        setError(data?.error ?? "Noe gikk galt under registrering");
      } else {
        setMessage("Bruker ble opprettet! 🎉");
      }
    } catch (err) {
      console.error(err);
      setError("Kunne ikke kontakte serveren");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register">
      <section className="register-box">
        <h1 className="register-title">Registrer bruker</h1>

        <form onSubmit={handleSubmit} className="register-form">
          <label>
            <input className="input"
              type="email"
              value={email}
              placeholder="E-post"
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            <input className="input"
              type="password"
              value={password}
              placeholder="Passord"
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            <input className="input"
              type="name"
              value={name}
              placeholder="Fullt navn"
              onChange={e => setName(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Registrerer..." : "Registrer"}
          </button>
        </form>
      </section>
      
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      {message && <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>}
    </main>
  );
}