require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const ListService = require('./services/list-service');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();
client.listService = new ListService();

// Load commands from commands/player/ and commands/admin/
const commandFolders = ['player', 'admin'];
for (const folder of commandFolders) {
  const folderPath = path.join(__dirname, 'commands', folder);
  if (!fs.existsSync(folderPath)) continue;
  const commandFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(folderPath, file));
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    }
  }
}

// Load event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
  const event = require(path.join(eventsPath, file));
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

if (!process.env.DISCORD_TOKEN) {
  console.error('DISCORD_TOKEN is not set. Aborting.');
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN).catch((err) => {
  console.error('Failed to login:', err);
  process.exit(1);
});
