<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { RouterLink } from "vue-router";
import { useTeachings } from "@/composables/useTeachings";
import TeachingCard from "@/components/TeachingCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const { loading, fetchTeachings, searchTeachings } = useTeachings();
const searchQuery = ref("");
const page = ref(1);
const perPage = 5;

const filteredTeachings = computed(() => {
  return searchTeachings(searchQuery.value);
});

const paginatedTeachings = computed(() => {
  const start = (page.value - 1) * perPage;
  return filteredTeachings.value.slice(start, start + perPage);
});

const totalPages = computed(() =>
  Math.ceil(filteredTeachings.value.length / perPage)
);

function goToPage(p: number) {
  if (p >= 1 && p <= totalPages.value) page.value = p;
}

onMounted(() => {
  fetchTeachings();
});

watch(searchQuery, () => {
  page.value = 1;
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900 pt-16"
  >
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h1
          class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in"
        >
          Welcome to
          <span class="text-gradient">Pastor Teaching</span>
        </h1>
        <p
          class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up"
        >
          Discover inspiring messages, biblical insights, and spiritual guidance
          to strengthen your faith journey and grow closer to God.
        </p>

        <!-- Search Bar -->
        <div
          class="max-w-md mx-auto mb-8 animate-slide-up"
          style="animation-delay: 0.2s"
        >
          <SearchBar v-model="searchQuery" placeholder="Search teachings..." />
        </div>
      </div>
    </section>

    <!-- Teachings Section -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ searchQuery ? "Search Results" : "Latest Teachings" }}
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            {{ filteredTeachings.length }}
            {{ filteredTeachings.length === 1 ? "teaching" : "teachings" }}
          </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>

        <!-- No Results -->
        <div
          v-else-if="filteredTeachings.length === 0 && searchQuery"
          class="text-center py-12"
        >
          <div class="glass-card p-8 max-w-md mx-auto">
            <h3
              class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              No teachings found
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search terms or browse all teachings.
            </p>
            <button
              @click="searchQuery = ''"
              class="glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Clear Search
            </button>
          </div>
        </div>

        <!-- Teachings Grid -->
        <div v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RouterLink
              v-for="teaching in paginatedTeachings"
              :key="teaching.id"
              :to="`/teaching/${teaching.id}`"
              class="block animate-slide-up"
            >
              <TeachingCard :teaching="teaching" />
            </RouterLink>
          </div>
          <!-- Pagination Controls -->
          <div
            v-if="totalPages > 1"
            class="flex justify-center items-center gap-2 mt-10"
          >
            <button
              @click="goToPage(page - 1)"
              :disabled="page === 1"
              class="glass-button px-4 py-2 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span class="mx-2 text-gray-700 dark:text-gray-300"
              >Page {{ page }} of {{ totalPages }}</span
            >
            <button
              @click="goToPage(page + 1)"
              :disabled="page === totalPages"
              class="glass-button px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="glass-card p-8 md:p-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Connected
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Reach out for prayer, support, or to connect with our ministry
            directly.
          </p>
          <div
            class="max-w-md mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="tel:+2348035449976"
              class="glass-button flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zm12-12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zm0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Call: 08035449976
            </a>
            <a
              href="https://wa.me/2347082637966"
              target="_blank"
              class="glass-button flex items-center gap-2 bg-green-500 text-white hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.52 3.48A12.07 12.07 0 0012 0C5.37 0 0 5.37 0 12a11.93 11.93 0 001.64 6.06L0 24l6.18-1.62A12.09 12.09 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22a9.93 9.93 0 01-5.13-1.41l-.37-.22-3.67.96.98-3.58-.24-.37A9.93 9.93 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-1 2.44s1.02 2.83 1.16 3.03c.14.2 2.01 3.08 4.88 4.2.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"
                />
              </svg>
              WhatsApp: 07082637966
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
