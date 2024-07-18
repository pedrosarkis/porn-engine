import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import htmlPlugin from '@rollup/plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    htmlPlugin({
      include: '**/*.html',
      inject: true, 
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer
      ],
    },
  },
});
