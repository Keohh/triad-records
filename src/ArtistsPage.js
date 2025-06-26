import React from "react";
import { useNavigate } from "react-router-dom";

export default function ArtistsPage() {
  const navigate = useNavigate();
  return (
    <div className="artists-page">
      <button className="back-btn" onClick={() => navigate("/")}> <i className="fas fa-arrow-left"></i> Back to Home </button>
      <h2>Our Artists</h2>
      <p>Meet the talented artists of Triad Records. (Coming soon!)</p>
    </div>
  );
} 