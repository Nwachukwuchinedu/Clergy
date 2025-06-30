import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/teaching/:id",
      name: "TeachingDetail",
      component: () => import("@/views/TeachingDetailView.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/b13-junction-f38",
      name: "AdminUpload",
      component: () => import("@/views/AdminUploadView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log(to, from);
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  console.log(from);

  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next("/login");
  } else {
    next();
  }
});

export default router;
