import { camelize } from 'humps';

/**
 * @param {string} locale
 * @example toApiFormat('en-us'); // => "EN_US"
 */
export const toStoreLocaleFormat = locale =>
  locale
    .split('-')
    .map(s => s.toUpperCase())
    .join('_');

/**
 * @param {string} locale
 * @example toApiFormat('en-us'); // => "enUs"
 */
export const toApiLocaleFormat = locale => camelize(locale);
