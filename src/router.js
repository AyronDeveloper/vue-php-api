import { createRouter, createWebHistory } from "vue-router";

const router=createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass:"active",
    routes:[
        {
            path:"/",
            name:"Inicio",
            component:()=>import("./views/Inicio.vue")
        },
        {
            path:"/create",
            name:"create",
            component:()=>import("./views/CreateFood.vue")
        },
        {
            path:"/edit/:id",
            name:"edit",
            component:()=>import("./views/EditFood.vue")
        },
        {
            path:"/:catchAll(.*)",
            redirect:"/"
        }
    ]
})

export default router