const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('is-exist')
    .setDescription('Check if a word exists in the lists')
    .addStringOption((option) =>
      option.setName('mot').setDescription('The word to search for').setRequired(true)
    ),
  async execute(interaction) {
    const mot = interaction.options.getString('mot');
    const found = interaction.client.listService.findItem(mot);

    if (found.length === 0) {
      await interaction.reply({ content: t('isExist.notFound', { item: mot }), ephemeral: true });
      return;
    }

    await interaction.reply({
      content: t('isExist.found', { item: mot, lists: found.join(', ') }),
      ephemeral: true,
    });
  },
};
