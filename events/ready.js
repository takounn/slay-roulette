const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
    console.log(`${client.commands.size} commande(s) chargée(s)`);
  },
};
