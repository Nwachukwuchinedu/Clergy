<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTeachings } from "@/composables/useTeachings";
import {
  ArrowLeftIcon,
  CalendarIcon,
  PlayIcon,
} from "@heroicons/vue/24/outline";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import type { Teaching } from "@/types";

const route = useRoute();
const router = useRouter();
const { getTeaching } = useTeachings();

const teaching = ref<Teaching | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const videoLoading = ref(true);
const imageLoading = ref(true);
const copySuccess = ref(false);

const formattedDate = computed(() => {
  if (!teaching.value) return "";
  return new Date(teaching.value.createdAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const youtubeEmbedUrl = computed(() => {
  if (!teaching.value?.youtubeUrl) return null;

  // Extract video ID from YouTube URL
  const regex =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
  const match = teaching.value.youtubeUrl.match(regex);

  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return null;
});

const goBack = () => {
  router.push("/");
};

const onVideoLoad = () => {
  videoLoading.value = false;
};
const onImageLoad = () => {
  imageLoading.value = false;
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copySuccess.value = true;
    setTimeout(() => (copySuccess.value = false), 2000);
  } catch (e) {
    copySuccess.value = false;
  }
};

onMounted(async () => {
  const teachingId = route.params.id as string;

  try {
    const result = await getTeaching(teachingId);
    if (result) {
      teaching.value = result;
    } else {
      error.value = "Teaching not found";
    }
  } catch (err) {
    error.value = "Failed to load teaching";
    console.error("Error loading teaching:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900 pt-16"
  >
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center min-h-[50vh]">
      <LoadingSpinner size="lg" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto text-center">
        <div class="glass-card p-8">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ error }}
          </h1>
          <button
            @click="goBack"
            class="glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            ← Back to Teachings
          </button>
        </div>
      </div>
    </div>

    <!-- Teaching Content -->
    <article v-else-if="teaching" class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Back Button -->
        <button
          @click="goBack"
          class="glass-button text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-8 inline-flex items-center space-x-2"
        >
          <ArrowLeftIcon class="w-4 h-4" />
          <span>Back to Teachings</span>
        </button>

        <!-- Teaching Header -->
        <header v-if="teaching" class="mb-8">
          <div class="glass-card p-8">
            <div
              class="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-4"
            >
              <CalendarIcon class="w-5 h-5" />
              <time :datetime="teaching.createdAt" class="text-sm font-medium">
                {{ formattedDate }}
              </time>
            </div>
            <h1
              class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              {{ teaching.title }}
            </h1>
          </div>
        </header>

        <!-- Teaching Content -->
        <div v-if="teaching" class="glass-card p-8 mb-8">
          <div class="prose-custom" v-html="teaching.body"></div>
        </div>

        <!-- Teaching Image -->
        <div v-if="teaching && teaching.image" class="mb-8">
          <div class="glass-card p-4 relative">
            <SkeletonLoader
              v-if="imageLoading"
              height="12rem"
              class="absolute inset-0 z-10"
            />
            <img
              :src="teaching.image"
              :alt="teaching.title"
              class="w-full rounded-lg shadow-lg"
              @load="onImageLoad"
              :style="imageLoading ? 'opacity:0' : 'opacity:1'"
            />
          </div>
        </div>

        <!-- YouTube Video -->
        <div v-if="youtubeEmbedUrl" class="mb-8">
          <div class="glass-card p-6 relative">
            <div class="flex items-center space-x-2 mb-4">
              <PlayIcon class="w-5 h-5 text-red-600" />
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Watch Teaching Video
              </h3>
            </div>
            <div class="aspect-video rounded-lg overflow-hidden relative">
              <SkeletonLoader
                v-if="videoLoading"
                height="100%"
                class="absolute inset-0 z-10"
              />
              <iframe
                :src="
                  youtubeEmbedUrl +
                  '?controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&iv_load_policy=3&showinfo=0'
                "
                title="Teaching Video"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="false"
                class="w-full h-full"
                @load="onVideoLoad"
                :style="videoLoading ? 'opacity:0' : 'opacity:1'"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- Share Section -->
        <div class="glass-card p-6 text-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Share This Teaching
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Help others discover this message by sharing it with your community.
          </p>
          <div class="flex justify-center space-x-4">
            <!-- <button
              class="glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Share on Facebook
            </button>
            <button
              class="glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              Share on Twitter
            </button> -->
            <button
              @click="copyLink"
              class="glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <span v-if="!copySuccess">Copy Link</span>
              <span v-else class="text-green-500">Copied!</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
