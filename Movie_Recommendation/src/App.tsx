// App.tsx
import { useState } from "react";
import RandomMovie from "./components/MovieList";
import "./index.css";

export default function App() {
  const [movie, setMovie] = useState({
    name: "Ready for your next movie?",
    year: "Click the button above",
    rating: "🎬"
  });

  return (
    <div className="app-container">
      <div className="background-overlay">
        <div className="content-wrapper">
          {/* Header Section */}
          <div className="header-section">
            <div className="logo-container">
              <span className="logo-icon">🎬</span>
              <h1 className="app-title">MovieMagic</h1>
            </div>
            <p className="app-subtitle">Discover your next cinematic adventure</p>
          </div>

          {/* Random Movie Generator Card */}
          <div className="generator-card">
            <RandomMovie sendMovie={setMovie} />
          </div>

          {/* Movie Details Card */}
          {movie.name !== "Ready for your next movie?" ? (
            <div className="movie-details-card animate-slideUp">
              <div className="card-header-gradient">
                <div className="header-content">
                  <span className="header-icon">🎯</span>
                  <h3 className="header-title">Your Movie Match</h3>
                  <span className="header-badge">Recommended</span>
                </div>
              </div>
              
              <div className="card-body">
                <div className="movie-name-section">
                  <div className="section-icon">🎥</div>
                  <div className="section-content">
                    <span className="section-label">Movie Title</span>
                    <h2 className="movie-name">{movie.name}</h2>
                  </div>
                </div>

                <div className="info-grid">
                  <div className="info-card">
                    <div className="info-icon">📅</div>
                    <div className="info-content">
                      <span className="info-label">Release Year</span>
                      <span className="info-value">{movie.year}</span>
                    </div>
                  </div>

                  <div className="info-card rating-card">
                    <div className="info-icon">⭐</div>
                    <div className="info-content">
                      <span className="info-label">IMDb Rating</span>
                      <div className="rating-value">
                        <span className="rating-number">{movie.rating}</span>
                        <span className="rating-max">/10</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="movie-actions">
                  <button className="action-btn share-btn" onClick={() => alert(`Share ${movie.name} with friends!`)}>
                    <span>📤</span> Share
                  </button>
                  <button className="action-btn watchlist-btn" onClick={() => alert(`Added ${movie.name} to watchlist!`)}>
                    <span>📝</span> Add to Watchlist
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state-card animate-fadeIn">
              <div className="empty-state-content">
                <div className="empty-icon">🍿</div>
                <h3 className="empty-title">No Movie Selected Yet</h3>
                <p className="empty-text">Click the button above to get a random movie recommendation!</p>
                <div className="empty-decoration">
                  <span>✨</span>
                  <span>🎬</span>
                  <span>⭐</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}