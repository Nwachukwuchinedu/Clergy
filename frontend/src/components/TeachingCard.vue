<script setup lang="ts">
import { computed } from 'vue'
import type { Teaching } from '@/types'

interface Props {
  teaching: Teaching
}

const props = defineProps<Props>()

const formattedDate = computed(() => {
  return new Date(props.teaching.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const excerpt = computed(() => {
  if (props.teaching.excerpt) return props.teaching.excerpt
  
  // Generate excerpt from body if not provided
  const textContent = props.teaching.body.replace(/<[^>]*>/g, '')
  return textContent.length > 120 ? textContent.substring(0, 120) + '...' : textContent
})
</script>

<template>
  <div class="glass-card group cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
    <div v-if="teaching.image" class="aspect-video overflow-hidden rounded-t-xl">
      <img 
        :src="teaching.image" 
        :alt="teaching.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    
    <div class="p-6">
      <div class="mb-2">
        <p class="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {{ formattedDate }}
        </p>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ teaching.title }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
        {{ excerpt }}
      </p>
      
      <div class="mt-4 flex items-center justify-between">
        <span class="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
          Read More →
        </span>
        
        <div class="flex items-center space-x-2">
          <div v-if="teaching.image" class="w-2 h-2 bg-green-500 rounded-full" title="Has image"></div>
          <div v-if="teaching.youtubeUrl" class="w-2 h-2 bg-red-500 rounded-full" title="Has video"></div>
        </div>
      </div>
    </div>
  </div>
</template>