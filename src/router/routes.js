import { ROUTE_NAMES } from '../constants'

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.MAIN,
    component: () => import('src/views/Main')
  },
  {
    path: '/page',
    name: ROUTE_NAMES.PAGE,
    component: () => import('src/views/Page'),
    props: route => ({ ...route.params })
  }
]
export default routes
