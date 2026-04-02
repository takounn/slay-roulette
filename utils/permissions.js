function isAdmin(interaction) {
  if (!interaction.member) return false;
  return interaction.member.roles.cache.some(
    (role) => role.name.toLowerCase() === 'admin'
  );
}

module.exports = { isAdmin };
