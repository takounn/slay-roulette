const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('del-style')
    .setDescription('Remove an entry from the Style list')
    .addStringOption((option) =>
      option.setName('nom').setDescription('The entry to remove').setRequired(true)
    ),
  adminOnly: true,
  async execute(interaction) {
    const item = interaction.options.getString('nom').trim();
    const removed = interaction.client.listService.removeItem('style', item);

    if (removed) {
      await interaction.reply({ content: t('del.success', { item, list: 'Style' }), ephemeral: true });
    } else {
      await interaction.reply({ content: t('del.notFound', { item, list: 'Style' }), ephemeral: true });
    }
  },
};
