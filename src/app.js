import extraRoutes from '@/routes';

export function patchRoutes({ routes }) {
  routes[0].routes = extraRoutes.concat(routes[0].routes);
}
