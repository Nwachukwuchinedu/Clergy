import { ref, computed } from "vue";
import axios from "axios";
import type { User, AuthState } from "@/types";

const authState = ref<AuthState>({
  isAuthenticated: false,
  user: null,
  token: null,
});

export const useAuth = () => {
  const isAuthenticated = computed(() => authState.value.isAuthenticated);
  const user = computed(() => authState.value.user);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/me");
      const user = response.data;
      authState.value.user = user;
      localStorage.setItem("auth-user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      authState.value.user = null;
      localStorage.removeItem("auth-user");
      return null;
    }
  };

  const initAuth = async () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      authState.value.token = token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await getCurrentUser();
      authState.value.isAuthenticated = !!authState.value.user;
    } else {
      authState.value.isAuthenticated = false;
      authState.value.user = null;
      authState.value.token = null;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const token = response.data.token;
      authState.value.token = token;
      localStorage.setItem("auth-token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Fetch and store user info
      const user = await getCurrentUser();
      authState.value.isAuthenticated = !!user;
      return !!user;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    authState.value = {
      isAuthenticated: false,
      user: null,
      token: null,
    };

    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    delete axios.defaults.headers.common["Authorization"];
  };

  // Mock login for demo purposes
  const mockLogin = (email: string, password: string): boolean => {
    if (email === "admin@church.com" && password === "admin123") {
      const mockUser = { id: "1", email, name: "Pastor John" };
      const mockToken = "mock-jwt-token";

      authState.value = {
        isAuthenticated: true,
        user: mockUser,
        token: mockToken,
      };

      localStorage.setItem("auth-token", mockToken);
      localStorage.setItem("auth-user", JSON.stringify(mockUser));

      return true;
    }
    return false;
  };

  return {
    isAuthenticated,
    user,
    initAuth,
    login,
    logout,
    mockLogin,
    getCurrentUser,
  };
};
