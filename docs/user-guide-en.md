# Slay Roulette — User Guide

Slay Roulette is a Discord bot that generates random style challenges for Infinity Nikki players. It combines one word from each of four categories — **Theme**, **Style**, **Color**, and **Twist** — to create unique dress-up challenges.

## Player Commands

These commands are available to everyone on the server.

### `/slay`

Generates a random style challenge.

**Example response:**
> Steampunk - Gothique - Pastel - Sneakers only

Each draw is completely random and independent. Just run it again if you want a new combination!

### `/is-exist <mot>`

Checks if a word exists in any of the four lists.

| Parameter | Description |
|---|---|
| `mot` | The word or expression to search for |

**Examples:**
- `/is-exist Steampunk` → Found in: **Theme**
- `/is-exist Dragon` → Not found in any list

This is useful before suggesting a new word to the admin — check if it already exists first.

> Note: This response is only visible to you (ephemeral).

## Admin Commands

These commands require the **admin** role on the Discord server. All responses are ephemeral (only visible to the admin).

### Adding entries

| Command | Description |
|---|---|
| `/add-theme <nom>` | Add an entry to the Theme list |
| `/add-style <nom>` | Add an entry to the Style list |
| `/add-color <nom>` | Add an entry to the Color list |
| `/add-twist <nom>` | Add an entry to the Twist list |

If the word already exists in another list, the bot will ask for confirmation with **Yes / No** buttons. You have 30 seconds to respond.

### Removing entries

| Command | Description |
|---|---|
| `/del-theme <nom>` | Remove an entry from the Theme list |
| `/del-style <nom>` | Remove an entry from the Style list |
| `/del-color <nom>` | Remove an entry from the Color list |
| `/del-twist <nom>` | Remove an entry from the Twist list |

If the word is not found, the bot will let you know.

### Viewing lists

| Command | Description |
|---|---|
| `/show-theme` | Display the Theme list |
| `/show-style` | Display the Style list |
| `/show-color` | Display the Color list |
| `/show-twist` | Display the Twist list |
| `/show-all` | Display all four lists |

## Tips

- The `/slay` response is **public** — everyone in the channel sees the challenge. All other responses are private.
- Searches are **case-insensitive**: `/is-exist steampunk` and `/is-exist Steampunk` give the same result.
- Changes are saved immediately — no need to restart the bot after adding or removing entries.
- If a list is empty, `/slay` will show an error instead of an incomplete challenge.
