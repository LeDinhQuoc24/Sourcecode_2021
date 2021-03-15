import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _74449a00 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _1e752176 = () => interopDefault(import('..\\pages\\hello.vue' /* webpackChunkName: "pages/hello" */))
const _280022bd = () => interopDefault(import('..\\pages\\hello2.vue' /* webpackChunkName: "pages/hello2" */))
const _38ce8ae6 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _42f7225c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _d6b38628 = () => interopDefault(import('..\\pages\\notfound.vue' /* webpackChunkName: "pages/notfound" */))
const _2b8f0820 = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages/product/index" */))
const _e2963b8a = () => interopDefault(import('..\\pages\\refreshToken.vue' /* webpackChunkName: "pages/refreshToken" */))
const _295a6ada = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _794f7f45 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _74449a00,
    name: "admin"
  }, {
    path: "/hello",
    component: _1e752176,
    name: "hello"
  }, {
    path: "/hello2",
    component: _280022bd,
    name: "hello2"
  }, {
    path: "/inspire",
    component: _38ce8ae6,
    name: "inspire"
  }, {
    path: "/login",
    component: _42f7225c,
    name: "login"
  }, {
    path: "/notfound",
    component: _d6b38628,
    name: "notfound"
  }, {
    path: "/product",
    component: _2b8f0820,
    name: "product"
  }, {
    path: "/refreshToken",
    component: _e2963b8a,
    name: "refreshToken"
  }, {
    path: "/user",
    component: _295a6ada,
    name: "user"
  }, {
    path: "/",
    component: _794f7f45,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
