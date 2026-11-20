// Alias → canonical item name, without loading the full item index (used by ItemLink on every page).
import { tradeGoodAliases } from './data/economy.yaml';
import { itemAliases } from './data/items.yaml';
import { makeCanonical } from './item-index.js';

export const { canonical } = makeCanonical(tradeGoodAliases, itemAliases);
