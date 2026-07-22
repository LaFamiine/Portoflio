# Portfolio — Anastasia Said

Portfolio de formation Intégratrice Web (OpenClassrooms).
Étape 1 : front-end + environnement de dev. Le back-end (Node.js + Express + MongoDB) viendra ensuite.

## Structure du projet

```
portfolio-anastasia/
├── front/
│   ├── index.html
│   ├── css/style.css
│   └── js/script.js
├── package.json
├── .gitignore
└── README.md
```

## Installer l'environnement

Prérequis : [Node.js](https://nodejs.org/) installé (version 18+ recommandée).

```bash
# 1. Se placer dans le dossier du projet
cd portfolio-anastasia

# 2. Installer les dépendances (live-server, pour prévisualiser en local avec rechargement auto)
npm install

# 3. Lancer le serveur de dev
npm run dev
```

Le site s'ouvre automatiquement dans le navigateur sur `http://127.0.0.1:5500`, et se recharge à chaque sauvegarde.

## Mettre le projet sur GitHub

```bash
git init
git add .
git commit -m "Premier commit : front-end du portfolio"
git branch -M main
git remote add origin https://github.com/<ton-pseudo>/portfolio-anastasia.git
git push -u origin main
```

## À faire avant de continuer

Dans `front/index.html`, remplace :
- [ ] Les 3 blocs "PROJET — À REMPLACER" par tes vrais projets OpenClassrooms
- [ ] Les liens GitHub / LinkedIn / email dans la section Contact
- [ ] Les pourcentages de compétences (`data-level`) selon ton niveau réel

## Étapes suivantes

1. ✅ Front-end (HTML/CSS/JS) + environnement — fait
2. ⬜ Back-end Node.js + Express (API pour le formulaire de contact, gestion des projets)
3. ⬜ Base de données MongoDB (stocker les projets dynamiquement au lieu de les coder en dur)
4. ⬜ Déploiement (ex : Vercel/Render pour le back, Netlify/GitHub Pages pour le front)
