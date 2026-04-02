require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');

const commands = [];

// Load commands from commands/player/ and commands/admin/
const commandFolders = ['player', 'admin'];
for (const folder of commandFolders) {
  const folderPath = path.join(__dirname, 'commands', folder);
  if (!fs.existsSync(folderPath)) continue;
  const commandFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(folderPath, file));
    if ('data' in command) {
      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(`Enregistrement de ${commands.length} commande(s)...`);

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log(`${commands.length} commande(s) enregistrée(s) avec succès.`);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des commandes:', error);
  }
})();
