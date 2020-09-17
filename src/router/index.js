import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "@/views/NotFound";
import Home from "@/views/Home";
import Biography from "@/views/Biography";
import Gallery from "@/views/Gallery";
import GalleryId from "@/components/Gallery/GalleryId";
import Contact from "@/views/Contact";
import Login from "@/views/Auth/Login";
import AdminPanel from "@/views/Admin/AdminPanel";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "*",
    name: "Not Found",
    component: NotFound
  },
  {
    path: "/biography",
    name: "biography",
    component: Biography
  },
  {
    path: "/gallery",
    name: "gallery",
    component: Gallery
  },
  {
    path: "/gallery/:id",
    props: true,
    name: "gallery",
    component: GalleryId
  },
  {
    path: "/contact",
    name: "contact",
    component: Contact
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPanel
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes
});

export default router;
