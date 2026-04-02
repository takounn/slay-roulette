const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show-color')
    .setDescription('Display the Color list'),
  adminOnly: true,
  async execute(interaction) {
    const items = interaction.client.listService.getList('color');

    if (!items || items.length === 0) {
      await interaction.reply({ content: t('show.empty', { list: 'Color' }), ephemeral: true });
      return;
    }

    const content = t('show.title', { list: 'Color', count: String(items.length) })
      + '\n' + items.join(', ');
    await interaction.reply({ content, ephemeral: true });
  },
};
