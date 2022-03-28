import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/handlescroll",
    name: "handlescroll",
    component: () => 
    import(/* webpackChunkName: "about" */ "../views/handlescroll.vue"),
  },
  {
    path: "/comps",
    name: "comps",
    component: () => 
    import(/* webpackChunkName: "about" */ "../views/comps.vue"),
  },
  {
    path: "/echarts",
    name: "echarts",
    component: () => 
    import(/* webpackChunkName: "about" */ "../views/echarts.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
