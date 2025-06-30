<template>
  <div
    class="skeleton-loader animate-skeleton w-full h-full rounded-lg bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 overflow-hidden"
    :style="{ height }"
  >
    <div class="skeleton-bar"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{ height?: string }>();
</script>

<style scoped>
.skeleton-loader {
  position: relative;
  background-size: 200% 100%;
}
.skeleton-bar {
  position: absolute;
  top: 0;
  left: -50%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: skeleton-bar-move 1.2s infinite linear;
}
@keyframes skeleton-bar-move {
  0% {
    left: -50%;
  }
  100% {
    left: 100%;
  }
}
</style>
