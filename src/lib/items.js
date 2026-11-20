// The cross-referenced item index (see item-index.js), built from the data files. Loaded by pages that need full
// item details; the search box and the home page use the slim build-time copies in virtual:nms-search / virtual:nms-stats.
import { economies, tierValues, tradeGoodAliases, smuggledGoods } from './data/economy.yaml';
import { production } from './data/settlements.yaml';
import { resources } from './data/resources.yaml';
import { crafted } from './data/crafting.yaml';
import { refinerRecipes } from './data/refiner.yaml';
import { dishes } from './data/cooking.yaml';
import { technology } from './data/tech.yaml';
import { otherItems, itemAliases } from './data/items.yaml';
import { buildItemIndex } from './item-index.js';

export const { allItems, findItem, canonical, aliasesOf } = buildItemIndex({
  economies, tierValues, tradeGoodAliases, smuggledGoods, production, resources, crafted, refinerRecipes, dishes, technology,
  otherItems, itemAliases,
});
