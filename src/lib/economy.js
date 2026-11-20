// Economy helpers (data in data/economy.yaml).
import { economies } from './data/economy.yaml';

export const economyById = Object.fromEntries(economies.map((e) => [e.id, e]));
