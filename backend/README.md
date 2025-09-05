# Backend - CineNote

**CineNote** est une application web qui permet à un utilisateur de gérer ses films : en ajouter, les noter, les commenter et les classer dans une watchlist.
L’application met en place une authentification sécurisée avec **JWT** et protège les routes sensibles via un middleware.

Ce dépôt correspond à la **partie backend**, développée avec **Next.js** (TypeScript). Le frontend communique avec un backend (Hono, PostgreSQL) pour la gestion des données et de l’authentification.

## 📖 Endpoints

### Routes publiques

* **Inscription** – `POST /register`
  Crée un nouvel utilisateur avec un nom, un email et un mot de passe.

* **Connexion** – `POST /login`
  Authentifie un utilisateur et retourne un token JWT à utiliser pour les appels protégés.

* **Liste des films (CineNote)** – `GET /movie`
  Récupère tous les films enregistrés dans la base CineNote.

* **Recherche de films (TMDB)** – `GET /movie/search?searchedTitle=...`
  Recherche des films par titre via l’API TMDB.

* **Détails d’un film (TMDB)** – `GET /movie/details/:id`
  Récupère les informations détaillées d’un film depuis TMDB grâce à son identifiant.

* **Films populaires (TMDB)** – `GET /movie/popular`
  Récupère la liste des films populaires du moment depuis TMDB.

---

### Routes protégées (JWT requis via middleware)

* **Récupération d’un utilisateur** – `GET /cinephile/:id`
  Récupère les informations d’un utilisateur à partir de son identifiant.

* **Ajouter un film à la watchlist** – `POST /watchlist/:movieId`
  Ajoute un film dans la watchlist de l’utilisateur authentifié.

* **Récupérer une watchlist** – `GET /watchlist/:cinephileId`
  Récupère la watchlist complète d’un utilisateur à partir de son identifiant.

* **Supprimer un film de la watchlist** – `DELETE /watchlist/:movieId`
  Retire un film de la watchlist de l’utilisateur.

* **Marquer un film comme vu** – `PATCH /watchlist/:movieId`
  Met à jour le statut d’un film dans la watchlist de l’utilisateur pour indiquer qu’il a été vu.

* **Noter un film** – `POST /watchlist/:movieId/rate`
  Ajoute une note et/ou un commentaire sur un film présent dans la watchlist.

* **Statistiques watchlist** – `GET /watchlist/stats/:cinephileId`
  Récupère des statistiques sur la watchlist d’un utilisateur (nombre de films vus, restant à voir, moyenne des notes, etc.).

## 🤙 Exemples d'appels

### Exemple 1 : Connexion

```
POST http://localhost:3001/api/login
```

Body :

```json
{
  "identifier": "cinephile2.0",
  "password": "motdepasse"
}
```

Réponse (exemple) :

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
```

---

### Exemple 2 : Ajouter un film à la watchlist

```
POST http://localhost:3001/api/watchlist/123
```

Headers :

```
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Réponse (exemple) :

```json
{
    "message": "Film ajouté à la watchlist avec succès",
    "movieId": 123
}
```

Status : **201 Created**


## 🚀 Lancer le projet

1. Installer les dépendances :

```bash
npm install
```

2. Mettre en place la base de données PostgreSQL et exécuter le script d’initialisation :

```bash
psql -U <username> -d <database> -f init.sql
```

3. Créer un fichier `.env` en copiant le contenu de `.env.example` et en remplissant les valeurs nécessaires.

4. Démarrer le serveur de développement :

```bash
npm run dev
```

5. Effectuer des appels à [http://localhost:3030](http://localhost:3000).