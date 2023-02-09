/**
 * @name ConfigPagesPlugin
 * @description 动态生成路由
 */
import Pages from 'vite-plugin-pages';
export const ConfigPagesPlugin = () => {
  return Pages({
    // pagesDir: [{ dir: 'src/views', baseRoute: '' }],
    dirs: [
      { dir: 'src/views', baseRoute: '' },
      { dir: 'src/test2/pages', baseRoute: 'test2' },
    ],
    importMode: 'async',
    extensions: ['vue', 'md'],
    exclude: ['**/components/*.vue'],
    nuxtStyle: true,
  });
};
