// components/RandomMovie.tsx
import { useState } from "react";

export default function RandomMovie(props: any) {
    const [isGenerating, setIsGenerating] = useState(false);
    
    const movies = [
        { name: "Inception", year: 2010, rating: "8.8", genre: "Sci-Fi", director: "Christopher Nolan" },
        { name: "Interstellar", year: 2014, rating: "8.7", genre: "Sci-Fi", director: "Christopher Nolan" },
        { name: "The Dark Knight", year: 2008, rating: "9.0", genre: "Action", director: "Christopher Nolan" },
        { name: "Avengers: Endgame", year: 2019, rating: "8.4", genre: "Action", director: "Russo Brothers" },
        { name: "3 Idiots", year: 2009, rating: "8.4", genre: "Comedy", director: "Rajkumar Hirani" },
        { name: "Dangal", year: 2016, rating: "8.3", genre: "Biography", director: "Nitesh Tiwari" },
        { name: "Bahubali: The Beginning", year: 2015, rating: "8.0", genre: "Action", director: "S.S. Rajamouli" },
        { name: "KGF Chapter 1", year: 2018, rating: "8.2", genre: "Action", director: "Prashanth Neel" },
        { name: "Pushpa: The Rise", year: 2021, rating: "7.6", genre: "Action", director: "Sukumar" },
        { name: "RRR", year: 2022, rating: "7.9", genre: "Action", director: "S.S. Rajamouli" },
        { name: "Joker", year: 2019, rating: "8.4", genre: "Drama", director: "Todd Phillips" },
        { name: "Titanic", year: 1997, rating: "7.9", genre: "Romance", director: "James Cameron" },
        { name: "Sholay", year: 1975, rating: "8.2", genre: "Action", director: "Ramesh Sippy" },
        { name: "Drishyam", year: 2015, rating: "8.2", genre: "Thriller", director: "Nishikant Kamat" },
        { name: "Gadar", year: 2001, rating: "7.3", genre: "Drama", director: "Anil Sharma" }
    ];

    const generateMovie = () => {
        setIsGenerating(true);
        
        // Add delay for animation effect
        setTimeout(() => {
            let index = Math.floor(Math.random() * movies.length);
            props.sendMovie(movies[index]);
            setIsGenerating(false);
        }, 500);
    };

    return (
        <div className="random-movie-container">
            <div className="random-movie-content">
                <div className="random-movie-icon">🎲</div>
                <h3 className="random-movie-title">Need a movie suggestion?</h3>
                <p className="random-movie-text">
                    Click the button below and let fate decide your next cinematic adventure!
                </p>
                
                <button 
                    className={`generate-btn ${isGenerating ? 'generating' : ''}`}
                    onClick={generateMovie}
                    disabled={isGenerating}
                >
                    {isGenerating ? (
                        <>
                            <span className="spinner"></span>
                            Finding Movie...
                        </>
                    ) : (
                        <>
                            <span className="btn-icon">🎬</span>
                            Get Random Movie
                            <span className="btn-icon">✨</span>
                        </>
                    )}
                </button>
                
                <div className="movie-stats">
                    <div className="stat-item">
                        <span className="stat-number">{movies.length}+</span>
                        <span className="stat-label">Movies</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">6+</span>
                        <span className="stat-label">Genres</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-number">Instant</span>
                        <span className="stat-label">Recommendations</span>
                    </div>
                </div>
            </div>
        </div>
    );
}