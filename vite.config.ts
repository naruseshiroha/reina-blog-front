import { defineConfig } from 'vite';
import { resolve } from 'path';
import Vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md'
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        // target: 'http://1.117.89.74:8801',
        target: 'http://localhost:6219',
        // target: 'http://localhost:8801',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown(),
    // vite-plugin-pages
    Pages({
      dirs: 'src/views',
      exclude: ['**/components/*.vue'],
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'mydefault',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      // Generate corresponding .eslintrc-auto-import.json file.
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
      dts: './src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // 把 @ 指向到 src 目录去
    },
  },
  base: '/blog/'
});
