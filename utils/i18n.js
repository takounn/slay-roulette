const ALLOWED_LOCALES = ['en', 'fr'];
const rawLocale = process.env.BOT_LOCALE || 'en';
const safeLocale = ALLOWED_LOCALES.includes(rawLocale) ? rawLocale : 'en';
const locale = require(`../locales/${safeLocale}.json`);

function t(key, params = {}) {
  let text = key.split('.').reduce((obj, k) => obj?.[k], locale) || key;
  for (const [k, v] of Object.entries(params)) {
    text = text.replaceAll(`{${k}}`, v);
  }
  return text;
}

module.exports = { t };
