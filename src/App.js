import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import CherryBlossomPetals from "./CherryBlossomPetals";
import "./styles.css";
import UpcomingReleasesCalendar, { releases } from "./UpcomingReleasesCalendar";

function Header({ navigate }) {
  return (
    <header className="docked-header">
      <button className="logo-btn" onClick={() => navigate("/")} aria-label="Back to Home">
        <img src="/logo_triad.png" alt="Triad Records Logo" className="homepage-logo" />
      </button>
      <div className="header-text">
        <h1>Welcome to Triad Records</h1>
        <p>Our Stage. Your Sound. Your Story.</p>
      </div>
      <nav className="header-nav">
        <div className="dropdown">
          <button className="dropdown-toggle" aria-label="Open menu">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} Triad Records. All rights reserved.</span>
        <span className="footer-sep">|</span>
        <a href="/mythic" className="footer-link">Only on Mythic RP</a>
      </div>
    </footer>
  );
}

const staff = [
  {
    name: "Jane Doe",
    role: "CEO & Founder",
    photo: "/logo_triad.png"
  },
  {
    name: "John Smith",
    role: "Head of Production",
    photo: "/logo_mythic.webp"
  },
  {
    name: "Alex Lee",
    role: "A&R Manager",
    photo: "/record.svg"
  }
];

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

function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [openArtist, setOpenArtist] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setFadeSplash(true), 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fadeSplash) {
      const timer = setTimeout(() => setLoading(false), 800); // match CSS transition
      return () => clearTimeout(timer);
    }
  }, [fadeSplash]);

  if (loading) {
    return (
      <div className={`splash-screen${fadeSplash ? " splash-fade-out" : ""}`}>
        <div className="splash-logo-bg">
          <img src="/logo_triad.png" alt="Triad Records Logo" />
        </div>
        <CherryBlossomPetals />
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
    <div className="homepage homepage-fade-in">
      <div className="video-bg-container">
        <video
          className="homepage-bg-video"
          src="/triadcini.mov"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="red-overlay" />
      </div>
      <Header navigate={navigate} />
      <div className="calendar-and-list">
        <UpcomingReleasesCalendar releases={releases} />
        {releases.length > 0 && (
          <div className="release-list">
            <h3>Event Details</h3>
            <ul>
              {releases.map((event, idx) => {
                // Format date as 'Month Day, Year'
                const now = new Date();
                const eventDate = new Date(now.getFullYear(), now.getMonth(), event.day);
                const day = eventDate.getDate();
                const month = eventDate.toLocaleString('default', { month: 'long' });
                const year = eventDate.getFullYear();
                // Add ordinal suffix
                const getOrdinal = (n) => {
                  if (n > 3 && n < 21) return 'th';
                  switch (n % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                  }
                };
                const formattedDate = `${month} ${day}${getOrdinal(day)}, ${year}`;
                return (
                  <li key={idx} className="release-list-item">
                    <span><i className="fas fa-music" style={{ color: '#ff3c3c', marginRight: '6px' }}></i><strong>{event.title}</strong></span><br />
                    <span><i className="fas fa-calendar" style={{ color: '#ff3c3c', marginRight: '6px' }}></i>{formattedDate}</span><br />
                    <span><i className="fas fa-clock" style={{ color: '#ff3c3c', marginRight: '6px' }}></i>{event.time}</span><br />
                    <span><i className="fas fa-map-marker-alt" style={{ color: '#ff3c3c', marginRight: '6px' }}></i>{event.location}</span><br />
                    {event.description && (
                      <span><i className="fas fa-sticky-note" style={{ color: '#ff3c3c', marginRight: '6px' }}></i>{event.description}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <section className="artist-listen-section">
        <h3>Our Artists</h3>
        <div className="artist-tile-list">
          {artists.map((artist, idx) => (
            <div className="artist-tile" key={artist.name}>
              <img src={artist.logo} alt={artist.name + ' logo'} className="artist-tile-logo" />
              <div className="artist-tile-info-below">
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
      <section className="staff-section">
        <h3>Our Staff</h3>
        <div className="staff-tile-list">
          {staff.map((member) => (
            <div className="staff-tile" key={member.name}>
              <img src={member.photo} alt={member.name + ' photo'} className="staff-tile-photo" />
              <div className="staff-tile-info-below">
                <span className="staff-tile-name">{member.name}</span>
                <span className="staff-tile-role">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

function MythicPageWithHeader() {
  const navigate = useNavigate();
  return (
    <>
      <Header navigate={navigate} />
      <div className="mythic-page">
        <div className="mythic-content">
          <img src="/logo_mythic.webp" alt="Mythic RP Logo" className="mythic-logo" />
          <h2>Only on Mythic RP</h2>
          <p className="mythic-desc">Triad Records is proud to be exclusively featured on <span className="mythic-highlight">Mythic RP</span>, the premier roleplay experience. Discover exclusive releases, live events, and a vibrant community—only on Mythic RP.</p>
          <a href="https://discord.gg/mythicrp" target="_blank" rel="noopener noreferrer" className="cta mythic-discord-btn">
            <i className="fab fa-discord"></i> Join Mythic RP Discord
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mythic" element={<MythicPageWithHeader />} />
      </Routes>
    </Router>
  );
}
