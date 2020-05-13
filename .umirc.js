import { defineConfig } from 'umi';

export default defineConfig({
  sula: {},
  hash: true,
  history: {
    type: 'hash',
  },
  locale: {
    default: 'en-US',
    antd: true,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      name: 'Home',
      path: '/',
      component: '../layout',
      routes: [
        {
          component: './exception/404',
        },
      ],
    },
  ],
});
