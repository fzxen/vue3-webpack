import { createRouter, createWebHistory } from "vue-router";

const history = createWebHistory();
const router = createRouter({
  history,
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("../views/home.vue"),
    },
  ],
});

export default router;
