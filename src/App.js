import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="splash-screen">
        <div className="logo">TRIAD RECORDS</div>
        <img
          src="/record.svg"
          alt="Spinning Record"
          className="record-spinner"
        />
      </div>
    );
  }

  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Triad Records</h1>
        <p>Your sound. Your story. Our stage.</p>
      </header>
      <main>
        <button className="cta">Explore Artists</button>
        <button className="cta">Listen Now</button>
      </main>
    </div>
  );
}
