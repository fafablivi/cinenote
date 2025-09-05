# Frontend - CineNote

**CineNote** est une application web qui permet à un utilisateur de gérer ses films : en ajouter, les noter, les commenter et les classer dans une watchlist.
L’application met en place une authentification sécurisée avec **JWT** et protège les routes sensibles via un middleware.

Ce dépôt correspond à la **partie frontend**, développée avec **Next.js** (TypeScript). Le frontend communique avec un backend (Hono, PostgreSQL) pour la gestion des données et de l’authentification.

## ✨ Fonctionnalités

* **Page d'accueil** `/` → présentation et accès aux fonctionnalités
* **Inscription** `/register` → création d’un compte utilisateur
* **Connexion** `/login` → authentification et génération d’un token JWT
* **Tableau de bord** `/dashboard` → aperçu global (films, raccourcis, watchlist, films populaires)
* **Profil utilisateur** `/profile` → affichage des informations personnelles
* **Recherche de film** `/search` → recherche de films dans la base
* **Watchlist** `/watchlist` → gestion des films à voir (ajout, suppression, consultation)

## 🚀 Lancer le projet

⚠️ **Le backend doit être lancé** pour assurer le bon fonctionnement de toutes les fonctionnalités.

1. Créer un fichier `.env.local` en copiant le contenu de `.env.local.example`.

2. Installer les dépendances :

```bash
npm install
```

2. Démarrer le serveur de développement :

```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.
