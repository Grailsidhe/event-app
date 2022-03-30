import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import Main from "./Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/main",
    name: "main",
    props: true,
    component: Main,
  },
  {
    path: "/event/:id",
    name: "event",
    props: true,
    component: () => import("./Event.vue"),
  },
  {
    path: "/event_no_media/:id",
    name: "event_no_media",
    props: true,
    component: () => import("./EventNoMedia.vue"),
  },
  {
    path: "/guest/:id",
    name: "guest",
    props: true,
    component: () => import("./Guest.vue"),
  },
  {
    path: "/guest_no_media/:id",
    name: "guest_no_media",
    props: true,
    component: () => import("./GuestNoMedia.vue"),
  },
  {
    path: "/schedule/",
    name: "schedule",
    props: true,
    component: () => import("./Schedule.vue"),
  },
  {
    path: "/component_library",
    name: "component_library",
    props: true,
    component: () => import("./ComponentLibrary.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
