<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useTeachings } from "@/composables/useTeachings";
import { useAuth } from "@/composables/useAuth";
import RichTextEditor from "@/components/RichTextEditor.vue";
import { PhotoIcon, VideoCameraIcon, EyeIcon } from "@heroicons/vue/24/outline";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const router = useRouter();
const { createTeaching } = useTeachings();
const { isAuthenticated } = useAuth();

// Form data
const title = ref("");
const body = ref("");
const selectedImage = ref<File | null>(null);
const youtubeUrl = ref("");
const showPreview = ref(false);
const loading = ref(false);
const error = ref("");

// Form validation
const isFormValid = computed(() => {
  return title.value.trim() && body.value.trim();
});

// Image preview
const imagePreview = computed(() => {
  if (selectedImage.value) {
    return URL.createObjectURL(selectedImage.value);
  }
  return undefined;
});

// YouTube URL validation
const isValidYouTubeUrl = computed(() => {
  if (!youtubeUrl.value) return true;
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)/;
  return regex.test(youtubeUrl.value);
});

// YouTube embed URL
const youtubeEmbedUrl = computed(() => {
  if (!youtubeUrl.value || !isValidYouTubeUrl.value) return null;

  const regex =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
  const match = youtubeUrl.value.match(regex);

  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return null;
});

// Handle image upload
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      error.value = "Please select a valid image file";
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      error.value = "Image size must be less than 5MB";
      return;
    }

    selectedImage.value = file;
    error.value = "";
  }
};

// Remove image
const removeImage = () => {
  selectedImage.value = null;
  const input = document.getElementById("image-upload") as HTMLInputElement;
  if (input) input.value = "";
};

// Toggle preview
const togglePreview = () => {
  showPreview.value = !showPreview.value;
};

// Submit form
const handleSubmit = async () => {
  if (!isFormValid.value) {
    error.value = "Please fill in all required fields";
    return;
  }

  if (youtubeUrl.value && !isValidYouTubeUrl.value) {
    error.value = "Please enter a valid YouTube URL";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const teachingData = {
      title: title.value.trim(),
      body: body.value,
      image: selectedImage.value || undefined,
      youtubeUrl: youtubeUrl.value.trim() || undefined,
    };

    const success = await createTeaching(teachingData);

    if (success) {
      // Reset form
      title.value = "";
      body.value = "";
      selectedImage.value = null;
      youtubeUrl.value = "";
      showPreview.value = false;

      // Redirect to home
      router.push("/");
    } else {
      error.value = "Failed to create teaching. Please try again.";
    }
  } catch (err) {
    error.value = "An error occurred while creating the teaching";
    console.error("Submit error:", err);
  } finally {
    loading.value = false;
  }
};

// Redirect if not authenticated
if (!isAuthenticated.value) {
  router.push("/login");
}

const imageLoading = ref(true);
const videoLoading = ref(true);

// Change password state
const showChangePassword = ref(false);
const currentPassword = ref("");
const newPassword = ref("");
const passwordLoading = ref(false);
const passwordError = ref("");
const passwordSuccess = ref("");
const showPasswordSuccessPopup = ref(false);

// Change password handler
const handleChangePassword = async () => {
  passwordError.value = "";
  passwordSuccess.value = "";
  if (!currentPassword.value || !newPassword.value) {
    passwordError.value = "Both fields are required.";
    return;
  }
  passwordLoading.value = true;
  try {
    const token = localStorage.getItem("auth-token");
    const res = await fetch(
      "https://rev-thomas.onrender.com/api/auth/password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to change password");
    passwordSuccess.value = "Password updated successfully.";
    currentPassword.value = "";
    newPassword.value = "";
    showChangePassword.value = false;
    await nextTick();
    showPasswordSuccessPopup.value = true;
    setTimeout(() => {
      showPasswordSuccessPopup.value = false;
    }, 3000);
  } catch (err: any) {
    passwordError.value = err.message || "Failed to change password.";
  } finally {
    passwordLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900 pt-16"
  >
    <div class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create New Teaching
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            Share your message with the community
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Form Section -->
          <div class="space-y-6">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Error Message -->
              <div
                v-if="error"
                class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
              >
                <p class="text-sm text-red-800 dark:text-red-200">
                  {{ error }}
                </p>
              </div>

              <!-- Title -->
              <div class="glass-card p-6">
                <label
                  for="title"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Teaching Title *
                </label>
                <input
                  id="title"
                  v-model="title"
                  type="text"
                  required
                  class="glass w-full px-4 py-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the title of your teaching"
                />
              </div>

              <!-- Rich Text Body -->
              <div class="glass-card p-6">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Teaching Content *
                </label>
                <RichTextEditor
                  v-model="body"
                  placeholder="Write your teaching content here..."
                />
              </div>

              <!-- Image Upload -->
              <div class="glass-card p-6">
                <label
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Teaching Image (Optional)
                </label>
                <div
                  v-if="!selectedImage"
                  class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors"
                >
                  <PhotoIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p class="text-gray-600 dark:text-gray-400 mb-2">
                    Upload an image for your teaching
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    PNG, JPG up to 5MB
                  </p>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="hidden"
                  />
                  <label
                    for="image-upload"
                    class="glass-button cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  >
                    Choose Image
                  </label>
                </div>
                <div v-else class="space-y-4">
                  <img
                    :src="imagePreview"
                    alt="Preview"
                    class="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    @click="removeImage"
                    class="glass-button text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    Remove Image
                  </button>
                </div>
              </div>

              <!-- YouTube URL -->
              <div class="glass-card p-6">
                <label
                  for="youtube-url"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  YouTube Video URL (Optional)
                </label>
                <div class="relative">
                  <input
                    id="youtube-url"
                    v-model="youtubeUrl"
                    type="url"
                    :class="[
                      'glass w-full px-4 py-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-blue-500 transition-all',
                      youtubeUrl && !isValidYouTubeUrl
                        ? 'ring-2 ring-red-500 border-red-500'
                        : 'focus:ring-blue-500',
                    ]"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <VideoCameraIcon
                    class="absolute right-3 top-3 w-5 h-5 text-gray-400"
                  />
                </div>
                <p
                  v-if="youtubeUrl && !isValidYouTubeUrl"
                  class="text-sm text-red-600 dark:text-red-400 mt-1"
                >
                  Please enter a valid YouTube URL
                </p>
              </div>

              <!-- Form Actions -->
              <div class="flex space-x-4">
                <button
                  type="button"
                  @click="togglePreview"
                  :disabled="!isFormValid"
                  class="flex-1 glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <EyeIcon class="w-5 h-5" />
                  <span>{{
                    showPreview ? "Hide Preview" : "Show Preview"
                  }}</span>
                </button>

                <button
                  type="submit"
                  :disabled="!isFormValid || loading"
                  class="flex-1 glass-button bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span
                    v-if="loading"
                    class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"
                  ></span>
                  <span>{{
                    loading ? "Publishing..." : "Publish Teaching"
                  }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Preview Section -->
          <div v-if="showPreview && isFormValid" class="lg:sticky lg:top-20">
            <div class="glass-card p-6">
              <h3
                class="text-lg font-semibold text-gray-900 dark:text-white mb-4"
              >
                Preview
              </h3>

              <!-- Preview Content -->
              <div class="space-y-4">
                <div>
                  <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                    {{ title || "Teaching Title" }}
                  </h4>
                  <p class="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    {{
                      new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                  </p>
                </div>

                <div
                  v-if="body"
                  class="prose-custom text-sm"
                  v-html="body"
                ></div>

                <div v-if="imagePreview" class="mt-4 relative">
                  <SkeletonLoader
                    :height="'12rem'"
                    class="absolute inset-0 z-10"
                    v-if="imageLoading"
                  />
                  <img
                    :src="imagePreview"
                    alt="Preview"
                    class="w-full rounded-lg"
                    @load="imageLoading = false"
                    :style="imageLoading ? 'opacity:0' : 'opacity:1'"
                  />
                </div>

                <div v-if="youtubeEmbedUrl" class="mt-4 relative">
                  <SkeletonLoader
                    :height="'12rem'"
                    class="absolute inset-0 z-10"
                    v-if="videoLoading"
                  />
                  <div class="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      :src="
                        youtubeEmbedUrl +
                        '?controls=1&modestbranding=1&rel=0&fs=0&disablekb=1&iv_load_policy=3&showinfo=0'
                      "
                      title="Preview Video"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen="false"
                      class="w-full h-full"
                      @load="videoLoading = false"
                      :style="videoLoading ? 'opacity:0' : 'opacity:1'"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Change Password Section -->
        <div class="mt-16">
          <div class="glass-card p-6">
            <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Change Password
            </h2>
            <button
              @click="showChangePassword = !showChangePassword"
              class="glass-button text-blue-600 dark:text-blue-400 mb-4"
            >
              {{ showChangePassword ? "Close" : "Change Password" }}
            </button>
            <div v-if="showChangePassword" class="space-y-4">
              <div
                v-if="passwordError"
                class="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-700 dark:text-red-300"
              >
                {{ passwordError }}
              </div>
              <div
                v-if="passwordSuccess"
                class="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-green-700 dark:text-green-300"
              >
                {{ passwordSuccess }}
              </div>
              <input
                v-model="currentPassword"
                type="password"
                placeholder="Current Password"
                class="glass w-full px-4 py-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                v-model="newPassword"
                type="password"
                placeholder="New Password"
                class="glass w-full px-4 py-3 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                @click="handleChangePassword"
                :disabled="passwordLoading"
                class="glass-button bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors w-full"
              >
                <span
                  v-if="passwordLoading"
                  class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent inline-block mr-2"
                ></span>
                Change Password
              </button>
            </div>
          </div>
        </div>

        <!-- Password Success Popup -->
        <transition name="fade">
          <div
            v-if="showPasswordSuccessPopup"
            class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Password changed successfully
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
