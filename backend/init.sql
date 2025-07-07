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
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS movie (
    id SERIAL PRIMARY KEY,
    tmdb_id INT NOT NULL,
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
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (cinephile_id) REFERENCES cinephile(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review (
    id SERIAL PRIMARY KEY,
    movie_id INT NOT NULL,
    cinephile_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE,
    FOREIGN KEY (cinephile_id) REFERENCES cinephile(id) ON DELETE CASCADE
);
