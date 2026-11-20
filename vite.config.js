import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import nmsData from './tools/vite-plugin-data.js';

// base: './' keeps asset paths relative so the built site works from any folder or sub-path.
// nmsData compiles and checks src/lib/data/*.yaml — see tools/vite-plugin-data.js.
export default defineConfig({
  base: './',
  plugins: [nmsData(), svelte()],
});
