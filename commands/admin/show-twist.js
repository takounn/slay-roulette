const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show-twist')
    .setDescription('Display the Twist list'),
  adminOnly: true,
  async execute(interaction) {
    const items = interaction.client.listService.getList('twist');

    if (!items || items.length === 0) {
      await interaction.reply({ content: t('show.empty', { list: 'Twist' }), ephemeral: true });
      return;
    }

    const content = t('show.title', { list: 'Twist', count: String(items.length) })
      + '\n' + items.join(', ');
    await interaction.reply({ content, ephemeral: true });
  },
};
