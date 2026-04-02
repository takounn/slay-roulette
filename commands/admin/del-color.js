const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('del-color')
    .setDescription('Remove an entry from the Color list')
    .addStringOption((option) =>
      option.setName('nom').setDescription('The entry to remove').setRequired(true)
    ),
  adminOnly: true,
  async execute(interaction) {
    const item = interaction.options.getString('nom').trim();
    const removed = interaction.client.listService.removeItem('color', item);

    if (removed) {
      await interaction.reply({ content: t('del.success', { item, list: 'Color' }), ephemeral: true });
    } else {
      await interaction.reply({ content: t('del.notFound', { item, list: 'Color' }), ephemeral: true });
    }
  },
};
