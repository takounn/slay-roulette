const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('del-theme')
    .setDescription('Remove an entry from the Theme list')
    .addStringOption((option) =>
      option.setName('nom').setDescription('The entry to remove').setRequired(true)
    ),
  adminOnly: true,
  async execute(interaction) {
    const item = interaction.options.getString('nom').trim();
    const removed = interaction.client.listService.removeItem('theme', item);

    if (removed) {
      await interaction.reply({ content: t('del.success', { item, list: 'Theme' }), ephemeral: true });
    } else {
      await interaction.reply({ content: t('del.notFound', { item, list: 'Theme' }), ephemeral: true });
    }
  },
};
