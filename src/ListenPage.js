import React, { useState } from "react";

const artists = [
  {
    name: "DJ Nova",
    logo: "/logo_triad.png",
    music: [
      { title: "Starlight Drive", url: "https://example.com/starlight" },
      { title: "Midnight Pulse", url: "https://example.com/midnight" },
    ],
  },
  {
    name: "Echo",
    logo: "/logo_mythic.webp",
    music: [
      { title: "Reflections", url: "https://example.com/reflections" },
      { title: "Lost in Sound", url: "https://example.com/lost" },
    ],
  },
  {
    name: "Luna Wave",
    logo: "/record.svg",
    music: [
      { title: "Moonlit", url: "https://example.com/moonlit" },
      { title: "Tidal", url: "https://example.com/tidal" },
    ],
  },
];

export default function ListenPage() {
  const [openArtist, setOpenArtist] = useState(null);
  return (
    <div className="listen-page">
      <h2>Listen Now</h2>
      <p>Stream music from Triad Records. (Coming soon!)</p>
      <section className="artist-listen-section">
        <h3>Our Artists</h3>
        <div className="artist-tile-list">
          {artists.map((artist, idx) => (
            <div className="artist-tile" key={artist.name}>
              <img src={artist.logo} alt={artist.name + ' logo'} className="artist-tile-logo" />
              <div className="artist-tile-info">
                <span className="artist-tile-name">{artist.name}</span>
                <button
                  className="artist-tile-dropdown-toggle"
                  onClick={() => setOpenArtist(openArtist === idx ? null : idx)}
                  aria-expanded={openArtist === idx}
                >
                  {openArtist === idx ? "Hide Music ▲" : "Show Music ▼"}
                </button>
                {openArtist === idx && (
                  <ul className="artist-music-list">
                    {artist.music.map((song) => (
                      <li key={song.title}>
                        <a href={song.url} target="_blank" rel="noopener noreferrer">
                          {song.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 