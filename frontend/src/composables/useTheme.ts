import { ref, watch } from 'vue'

const isDarkMode = ref(false)

export const useTheme = () => {
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDarkMode.value = savedTheme === 'dark'
    } else {
      // Check system preference
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateDOM()
  }

  const updateDOM = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Watch for changes and update DOM and localStorage
  watch(isDarkMode, (newValue) => {
    updateDOM()
    localStorage.setItem('theme', newValue ? 'dark' : 'light')
  })

  return {
    isDarkMode,
    toggleTheme,
    initTheme
  }
}