const { Events } = require('discord.js');
const { t } = require('../utils/i18n');
const { isAdmin } = require('../utils/permissions');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    if (command.adminOnly && !isAdmin(interaction)) {
      await interaction.reply({ content: t('permission.denied'), ephemeral: true });
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Erreur commande ${interaction.commandName}:`, error);
      try {
        const reply = { content: t('error.generic'), ephemeral: true };
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(reply);
        } else {
          await interaction.reply(reply);
        }
      } catch (replyError) {
        console.error('Failed to send error reply:', replyError);
      }
    }
  },
};
