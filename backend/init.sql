DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS watchlist;
DROP TABLE IF EXISTS movie;
DROP TABLE IF EXISTS cinephile;

CREATE TABLE IF NOT EXISTS cinephile (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    biography TEXT,
    role VARCHAR(50) CHECK (role IN ('user', 'admin')) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    tmdb_id VARCHAR(255) NOT NULL,
    poster_path VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS watchlist (
    id SERIAL PRIMARY KEY,
    cinephile_id INT NOT NULL,
    movie_id INT NOT NULL,
    watched BOOLEAN DEFAULT FALSE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    updated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (cinephile_id) REFERENCES cinephile(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);
