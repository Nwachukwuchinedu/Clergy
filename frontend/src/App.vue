<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'
import NavBar from '@/components/NavBar.vue'
import FooterSection from '@/components/FooterSection.vue'

const { initAuth } = useAuth()
const { initTheme } = useTheme()

onMounted(() => {
  initAuth()
  initTheme()
})
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <NavBar />
    
    <main class="flex-1">
      <RouterView />
    </main>
    
    <FooterSection />
  </div>
</template>