import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import HomeView from "../views/HomeView.vue"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    // {
    //     path: "/about",
    //     name: "about",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
    // },
    // {
    //     path: "/animation",
    //     component: () => import("../views/AnimationView.vue"),
    //     name: "animation",
    // },
    // {
    //     path: "/orm",
    //     name: "orm",
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ "../views/OrmView.vue"),
    // },
    // {
    //     path: "/messages",
    //     name: "messages",
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ "../views/Messages.vue"),
    // },
    // {
    //     path: "/collapse",
    //     name: "collapse",
    //     component: () => import("../views/Clps/Clps.vue"),
    // },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
