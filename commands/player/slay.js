const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slay')
    .setDescription('Generate a random style challenge'),
  async execute(interaction) {
    const combo = interaction.client.listService.getRandomCombo();

    if (!combo) {
      await interaction.reply({ content: t('slay.empty'), ephemeral: true });
      return;
    }

    await interaction.reply(t('slay.result', combo));
  },
};
