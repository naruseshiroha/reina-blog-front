/**
 * @name ConfigLayoutsPlugin
 * @description 动态布局
 */
// import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
export const ConfigLayoutsPlugin = () => {
  return Layouts({
    layoutsDirs: ['src/layouts'],
    defaultLayout: 'mydefault',
  });
};
