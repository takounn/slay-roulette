# Slay Roulette — Guide d'Installation

## Prérequis

- [Node.js](https://nodejs.org/) 20 LTS ou supérieur
- Un compte Discord
- (Optionnel) [Docker Desktop](https://www.docker.com/products/docker-desktop/) pour le déploiement conteneurisé

## 1. Créer un bot Discord

1. Va sur https://discord.com/developers/applications
2. Clique **"New Application"** → nomme-le "Slay Roulette" → Create
3. Menu gauche → **"Bot"** → clique **"Reset Token"** → copie le token (c'est ton `DISCORD_TOKEN`)
4. Menu gauche → **"OAuth2"** → copie le **Client ID** (c'est ton `CLIENT_ID`)
5. Va dans **"OAuth2" → "URL Generator"** :
   - Scopes : coche `bot` et `applications.commands`
   - Bot Permissions : coche `Send Messages` et `Use Slash Commands`
   - Copie l'URL générée et ouvre-la dans ton navigateur pour inviter le bot sur ton serveur

## 2. Récupérer le Guild ID

1. Dans Discord → Paramètres utilisateur → **Avancés** → active le **Mode développeur**
2. Clic droit sur le nom du serveur → **"Copier l'identifiant du serveur"** → c'est ton `GUILD_ID`

## 3. Créer le rôle "admin"

1. Paramètres du serveur → **Rôles** → **Créer un rôle**
2. Nomme-le `admin` (insensible à la casse)
3. Assigne-le aux utilisateurs qui doivent gérer les listes

## 4. Installer et lancer

### Option A : En local (Node.js)

```bash
git clone <url-du-dépôt>
cd slay-roulette
npm install
cp .env.example .env
```

Édite `.env` avec tes valeurs :

```
DISCORD_TOKEN=ton_token_ici
CLIENT_ID=ton_client_id_ici
GUILD_ID=ton_guild_id_ici
BOT_LOCALE=fr
```

Enregistre les commandes slash et lance le bot :

```bash
node deploy-commands.js
node index.js
```

### Option B : Docker

```bash
git clone <url-du-dépôt>
cd slay-roulette
cp .env.example .env
```

Édite `.env` avec tes valeurs (identiques à ci-dessus), puis :

```bash
docker compose up -d --build
docker compose exec bot node deploy-commands.js
```

Consulter les logs :

```bash
docker compose logs -f bot
```

## 5. Vérifier

Dans ton serveur Discord, tape `/slay`. Tu devrais voir un défi aléatoire comme :

> Steampunk - Gothique - Pastel - Sneakers only

## Configuration

| Variable | Description | Par défaut |
|---|---|---|
| `DISCORD_TOKEN` | Token du bot depuis le portail développeur Discord | _(obligatoire)_ |
| `CLIENT_ID` | Client ID de l'application | _(obligatoire)_ |
| `GUILD_ID` | ID du serveur Discord cible | _(obligatoire)_ |
| `BOT_LOCALE` | Langue du bot (`en` ou `fr`) | `en` |

## Persistance des données

- Les données des listes sont stockées dans `data/lists.json`
- Le fichier est créé automatiquement au premier démarrage avec des entrées par défaut
- Avec Docker, le dossier `data/` est monté en volume — les données survivent aux redémarrages du conteneur

## Mise à jour

### En local

```bash
git pull
npm install
node deploy-commands.js   # seulement si les commandes ont changé
node index.js
```

### Docker

```bash
git pull
docker compose up -d --build
docker compose exec bot node deploy-commands.js   # seulement si les commandes ont changé
```
