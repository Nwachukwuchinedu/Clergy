<script setup lang="ts">
// About page component
import image from "../assets/pastor.jpg";
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900 pt-16"
  >
    <div class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16">
          <h1
            class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            About
            <span class="text-gradient">Rev. Fr. Thomas Enakhe Anavhe</span>
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dedicated to sharing God's word and guiding believers on their
            spiritual journey
          </p>
        </div>

        <!-- Contact Info -->
        <div class="glass-card p-8 mb-8 text-center">
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-4">
            <a
              href="mailto:frtomzess@gmail.com"
              class="glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >frtomzess@gmail.com</a
            >
            <a
              href="tel:08035449976"
              class="glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >08035449976</a
            >
            <a
              href="https://wa.me/2347082637966"
              target="_blank"
              class="glass-button text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >WhatsApp: 07082637966</a
            >
          </div>
        </div>

        <!-- Profile & Bio -->
        <div class="glass-card p-8 mb-12">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div class="order-2 md:order-1">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Profile
              </h2>
              <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Rev. Fr. Thomas Enakhe Anavhe is a devoted Catholic priest and
                native of Fugar in Etsako Central Local Government Area, Edo
                State, Nigeria. Born in September 1982, he was ordained into the
                Catholic priesthood in 2012 under the Catholic Diocese of Auchi.
              </p>
              <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                He holds a Bachelor’s degree in Philosophy from the University
                of Benin (2008) and a Bachelor’s degree in Theology from the
                prestigious Urbaniana University in Rome, Italy (2012). In 2024,
                he earned a Master’s degree in Cultural and Religious Management
                with a specialization in Christian Theology from Ambrose Alli
                University, Ekpoma, Nigeria.
              </p>
              <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Fr. Thomas currently serves as the administrator of St. Thomas
                Aquinas Catholic Church, Agiere, and St. Andrew Nursery and
                Primary School, Ekwotsor, Edo State. He is also a retreat
                director, with a special focus on healing ministrations.
              </p>
              <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                A prolific author, he has published several works, including his
                groundbreaking book,
                <strong>Divine Encounter and Healing Experience</strong>.
                Through his writings and pastoral ministry, he continues to
                bring healing, hope, and spiritual renewal to many.
              </p>
            </div>
            <div class="order-1 md:order-2">
              <div class="relative">
                <img
                  :src="image"
                  alt="Rev. Fr. Thomas Enakhe Anavhe"
                  class="w-full rounded-lg shadow-lg"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pastoral Role and Mission -->
        <div class="glass-card p-8 mb-12">
          <h3
            class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
          >
            Pastoral Role and Mission
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
            Fr. Thomas is a source of healing to the brokenhearted. He is
            passionately committed to inspiring, encouraging, and giving hope
            through the Word of God, prayer, and healing ministration. He views
            his journey through life as a continuous expression of gratitude to
            God, who has shaped him into a better version of himself.
          </p>
        </div>

        <!-- Mission Statement & Motto -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <div class="glass-card p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Mission Statement
            </h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              To bear witness to the Kingdom of God and give hope to the
              hopeless through reflections on the Word of God and healing
              ministry.
            </p>
          </div>
          <div class="glass-card p-8 flex flex-col justify-center items-center">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Motto
            </h3>
            <p
              class="text-2xl text-blue-600 dark:text-blue-400 font-semibold text-center"
            >
              The Kingdom of God is at hand.
            </p>
          </div>
        </div>

        <!-- Teaching Philosophy -->
        <div class="glass-card p-8 mb-12">
          <h3
            class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center"
          >
            Teaching Philosophy
          </h3>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center">
              <div
                class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl text-blue-600 dark:text-blue-400"
                  >📖</span
                >
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Biblical Foundation
              </h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                All teachings are grounded in Scripture and faithful to God's
                word
              </p>
            </div>
            <div class="text-center">
              <div
                class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl text-blue-600 dark:text-blue-400"
                  >💡</span
                >
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Practical Application
              </h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Connecting biblical truths to real-life situations and
                challenges
              </p>
            </div>
            <div class="text-center">
              <div
                class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-2xl text-blue-600 dark:text-blue-400"
                  >❤️</span
                >
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Compassionate Care
              </h4>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                Teaching with love, understanding, and pastoral sensitivity
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
