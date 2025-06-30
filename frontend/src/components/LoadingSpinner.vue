<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'text-blue-600'
})

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8', 
  lg: 'w-12 h-12'
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div 
      :class="[sizeClasses[size], color]"
      class="animate-spin rounded-full border-2 border-transparent border-t-current"
    ></div>
  </div>
</template>