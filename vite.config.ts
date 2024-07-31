import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineConfig({
  plugins: [
    preact(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './src/assets/icon')],
      symbolId: 'icon-[name]',
    }),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
