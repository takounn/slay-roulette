# Slay Roulette — Installation Guide

## Prerequisites

- [Node.js](https://nodejs.org/) 20 LTS or later
- A Discord account
- (Optional) [Docker Desktop](https://www.docker.com/products/docker-desktop/) for containerized deployment

## 1. Create a Discord Bot

1. Go to https://discord.com/developers/applications
2. Click **"New Application"** → name it "Slay Roulette" → Create
3. Left menu → **"Bot"** → click **"Reset Token"** → copy the token (this is your `DISCORD_TOKEN`)
4. Left menu → **"OAuth2"** → copy the **Client ID** (this is your `CLIENT_ID`)
5. Go to **"OAuth2" → "URL Generator"**:
   - Scopes: check `bot` and `applications.commands`
   - Bot Permissions: check `Send Messages` and `Use Slash Commands`
   - Copy the generated URL and open it in your browser to invite the bot to your server

## 2. Get your Guild ID

1. In Discord → User Settings → **Advanced** → enable **Developer Mode**
2. Right-click on your server name → **"Copy Server ID"** → this is your `GUILD_ID`

## 3. Create the "admin" role

1. Server Settings → **Roles** → **Create Role**
2. Name it `admin` (case-insensitive)
3. Assign it to users who should manage the lists

## 4. Install and Run

### Option A: Local (Node.js)

```bash
git clone <repository-url>
cd slay-roulette
npm install
cp .env.example .env
```

Edit `.env` with your values:

```
DISCORD_TOKEN=your_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
BOT_LOCALE=fr
```

Register slash commands and start the bot:

```bash
node deploy-commands.js
node index.js
```

### Option B: Docker

```bash
git clone <repository-url>
cd slay-roulette
cp .env.example .env
```

Edit `.env` with your values (same as above), then:

```bash
docker compose up -d --build
docker compose exec bot node deploy-commands.js
```

Check logs:

```bash
docker compose logs -f bot
```

## 5. Verify

In your Discord server, type `/slay`. You should see a random challenge like:

> Steampunk - Gothique - Pastel - Sneakers only

## Configuration

| Variable | Description | Default |
|---|---|---|
| `DISCORD_TOKEN` | Bot token from Discord Developer Portal | _(required)_ |
| `CLIENT_ID` | Application Client ID | _(required)_ |
| `GUILD_ID` | Target Discord server ID | _(required)_ |
| `BOT_LOCALE` | Bot language (`en` or `fr`) | `en` |

## Data Persistence

- List data is stored in `data/lists.json`
- The file is created automatically on first startup with default entries
- With Docker, the `data/` folder is mounted as a volume — data survives container restarts

## Updating

### Local

```bash
git pull
npm install
node deploy-commands.js   # only if commands changed
node index.js
```

### Docker

```bash
git pull
docker compose up -d --build
docker compose exec bot node deploy-commands.js   # only if commands changed
```
