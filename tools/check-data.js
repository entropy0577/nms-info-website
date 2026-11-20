// `npm run check`: run the same data checks as the build (YAML syntax, schemas, item names) without building.
import { loadAll, report } from './vite-plugin-data.js';

const { files, errors } = loadAll();
if (errors.length) {
  console.error(report(errors));
  process.exit(1);
}
console.log(`✓ ${Object.keys(files).length} data files OK.`);
