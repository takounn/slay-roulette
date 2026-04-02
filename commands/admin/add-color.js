const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { t } = require('../../utils/i18n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-color')
    .setDescription('Add an entry to the Color list')
    .addStringOption((option) =>
      option.setName('nom').setDescription('The entry to add').setRequired(true)
    ),
  adminOnly: true,
  async execute(interaction) {
    const item = interaction.options.getString('nom').trim();
    const listService = interaction.client.listService;
    const listKey = 'color';
    const displayName = 'Color';

    const found = listService.findItem(item);

    if (found.length === 0) {
      listService.addItem(listKey, item);
      await interaction.reply({ content: t('add.success', { item, list: displayName }), ephemeral: true });
      return;
    }

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('confirm-yes')
        .setLabel(t('confirm.yes'))
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('confirm-no')
        .setLabel(t('confirm.no'))
        .setStyle(ButtonStyle.Danger),
    );

    const response = await interaction.reply({
      content: t('add.duplicate', { item, lists: found.join(', ') }),
      components: [row],
      ephemeral: true,
    });

    try {
      const buttonInteraction = await response.awaitMessageComponent({
        componentType: ComponentType.Button,
        time: 30_000,
      });

      if (buttonInteraction.customId === 'confirm-yes') {
        listService.addItem(listKey, item);
        await buttonInteraction.update({
          content: t('add.success', { item, list: displayName }),
          components: [],
        });
      } else {
        await buttonInteraction.update({
          content: t('add.cancelled'),
          components: [],
        });
      }
    } catch (_e) {
      await interaction.editReply({
        content: t('add.timeout'),
        components: [],
      });
    }
  },
};
