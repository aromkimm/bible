import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

const isDev = process.env.NODE_ENV === 'development'

Vue.use(Router)

const router = new Router({
  mode: isDev ? 'history' : 'abstract',
  routes
})

export default router