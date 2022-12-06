import { createRouter, createWebHistory } from "vue-router";
import ConversationsView from "@/views/ConversationsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "conversations",
      component: ConversationsView,
    },
    {
      path: "/signup",
      name: "inscription",

      component: () => import("@/views/CreerCompteView.vue"),
    },
    {
      path: "/signin",
      name: "connexion",

      component: () => import("@/views/ConnexionView.vue"),
    },
    {
      path: "/membres",
      name: "membres",

      component: () => import("@/views/MembresView.vue"),
    },
    {
      path: "/membres/:id",
      name: "profilMembre",

      component: () => import("@/views/ProfilMembreView.vue"),
    },
  ],
});

export default router;
