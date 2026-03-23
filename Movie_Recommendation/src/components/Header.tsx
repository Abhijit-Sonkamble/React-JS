// Header Component
export default function Header() {
    return (
        <header className="movie-header">
            <div className="header-content">
                <div className="container">
                    <h1 className="header-title">
                        🎬 CineMatch
                        <span className="title-badge">Recommender</span>
                    </h1>
                    <p className="header-subtitle">Discover your next favorite movie</p>
                </div>
            </div>
        </header>
    );
}