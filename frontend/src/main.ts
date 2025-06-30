import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { useAuth } from "@/composables/useAuth";

async function bootstrap() {
  const { initAuth } = useAuth();
  await initAuth();
  createApp(App).use(router).mount("#app");
}

bootstrap();
