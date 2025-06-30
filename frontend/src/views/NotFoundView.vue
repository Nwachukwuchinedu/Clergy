<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900 pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <div class="glass-card p-8">
        <div class="mb-6">
          <h1 class="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Page Not Found
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <RouterLink 
          to="/"
          class="glass-button bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300"
        >
          Return Home
        </RouterLink>
      </div>
    </div>
  </div>
</template>