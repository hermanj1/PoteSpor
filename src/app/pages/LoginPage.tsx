"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Feil e-post eller passord");
      window.location.href = "/min-side";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="login">
      <section className="login-box">
        <h1 className="login-title">Logg inn</h1>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-post"
            className="input"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passord"
            className="input"
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn">
            Logg inn
          </button>

          <button type="button" className="btn" onClick={() => window.location.href = "/register"}>
            Registrer ny bruker
          </button>
        </form>
      </section>
    </main>
  );
}
