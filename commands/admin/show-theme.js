const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show-theme')
    .setDescription('Display the Theme list'),
  adminOnly: true,
  async execute(interaction) {
    const items = interaction.client.listService.getList('theme');

    if (!items || items.length === 0) {
      await interaction.reply({ content: t('show.empty', { list: 'Theme' }), ephemeral: true });
      return;
    }

    const content = t('show.title', { list: 'Theme', count: String(items.length) })
      + '\n' + items.join(', ');
    await interaction.reply({ content, ephemeral: true });
  },
};
