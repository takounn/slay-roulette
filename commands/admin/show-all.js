const { SlashCommandBuilder } = require('discord.js');
const { t } = require('../../utils/i18n');

const LIST_NAMES = {
  theme: 'Theme',
  style: 'Style',
  color: 'Color',
  twist: 'Twist',
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('show-all')
    .setDescription('Display all four lists'),
  adminOnly: true,
  async execute(interaction) {
    const all = interaction.client.listService.getAll();
    const sections = [];

    for (const [key, displayName] of Object.entries(LIST_NAMES)) {
      const items = all[key] || [];
      if (items.length === 0) {
        sections.push(t('show.empty', { list: displayName }));
      } else {
        sections.push(
          t('show.title', { list: displayName, count: String(items.length) })
            + '\n' + items.join(', ')
        );
      }
    }

    const content = t('show.allTitle') + '\n\n' + sections.join('\n\n');
    await interaction.reply({ content, ephemeral: true });
  },
};
