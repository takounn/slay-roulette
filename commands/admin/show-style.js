const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show-style')
    .setDescription('Display the Style list'),
  adminOnly: true,
  async execute(interaction) {
    const items = interaction.client.listService.getList('style');

    if (!items || items.length === 0) {
      await interaction.reply({ content: t('show.empty', { list: 'Style' }), ephemeral: true });
      return;
    }

    const content = t('show.title', { list: 'Style', count: String(items.length) })
      + '\n' + items.join(', ');
    await interaction.reply({ content, ephemeral: true });
  },
};
