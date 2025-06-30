<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'

const { isAuthenticated, logout } = useAuth()
const { isDarkMode, toggleTheme } = useTheme()
const router = useRouter()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = () => {
  logout()
  router.push('/')
  isMenuOpen.value = false
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 dark:border-white/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <RouterLink 
          to="/" 
          class="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          @click="closeMenu"
        >
          <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">PT</span>
          </div>
          <span>Pastor Teaching</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <RouterLink 
            to="/" 
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            active-class="text-blue-600 dark:text-blue-400"
          >
            Home
          </RouterLink>
          <RouterLink 
            to="/about" 
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            active-class="text-blue-600 dark:text-blue-400"
          >
            About
          </RouterLink>
          <RouterLink 
            v-if="isAuthenticated" 
            to="/b13-junction-f38" 
            class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            active-class="text-blue-600 dark:text-blue-400"
          >
            Upload
          </RouterLink>
          
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg glass-button text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <SunIcon v-if="isDarkMode" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>

          <!-- Auth Buttons -->
          <RouterLink 
            v-if="!isAuthenticated" 
            to="/login"
            class="glass-button text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            Login
          </RouterLink>
          <button 
            v-else
            @click="handleLogout"
            class="glass-button text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
          >
            Logout
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Theme Toggle Mobile -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg glass-button text-gray-700 dark:text-gray-300"
          >
            <SunIcon v-if="isDarkMode" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>
          
          <button
            @click="toggleMenu"
            class="p-2 rounded-lg glass-button text-gray-700 dark:text-gray-300"
          >
            <Bars3Icon v-if="!isMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 glass rounded-lg mt-2 mb-2">
            <RouterLink 
              to="/" 
              @click="closeMenu"
              class="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/10 transition-colors font-medium"
              active-class="text-blue-600 dark:text-blue-400 bg-white/10"
            >
              Home
            </RouterLink>
            <RouterLink 
              to="/about" 
              @click="closeMenu"
              class="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/10 transition-colors font-medium"
              active-class="text-blue-600 dark:text-blue-400 bg-white/10"
            >
              About
            </RouterLink>
            <RouterLink 
              v-if="isAuthenticated" 
              to="/b13-junction-f38" 
              @click="closeMenu"
              class="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/10 transition-colors font-medium"
              active-class="text-blue-600 dark:text-blue-400 bg-white/10"
            >
              Upload
            </RouterLink>
            
            <div class="border-t border-white/20 my-2"></div>
            
            <RouterLink 
              v-if="!isAuthenticated" 
              to="/login"
              @click="closeMenu"
              class="block px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white/10 transition-colors font-medium"
            >
              Login
            </RouterLink>
            <button 
              v-else
              @click="handleLogout"
              class="block w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white/10 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </nav>
</template>