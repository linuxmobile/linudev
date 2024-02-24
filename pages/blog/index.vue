<script setup>
import { useFormatTime } from '~/composables/useFormatTime.ts'

const { data: latestArticles } = await useAsyncData('latestArticles', () => 
  queryContent('blog')
    .sort({date: -1})
    .limit(6)
    .find()
)

const { formatTimeAgo } = useFormatTime()
</script>
<template>
  <main class="px-4 xl:max-w-7xl mx-auto grid grid-cols-1 pt-34 gap-y-4">
    <h2 class="font-black font-display text-5xl">Artículos Recientes</h2>
    <section class="grid gap-y-3">
      <article v-for="article in latestArticles" :key="article._path" class="grid gap-y-4 rounded-lg px-3 py-2 relative bg-white/5 border border-white/10">
        <NuxtLink :to="article._path" class="px-4 py-3 w-full block flex flex-col gap-y-2">
          <h2 class="font-display font-black text-2xl">{{ article.title }}</h2>
          <p class="text-gray-300 font-medium line-clamp-2">{{ article.description }}</p>
          <p class="text-gray-400 text-sm">{{ formatTimeAgo(new Date(article.date)) }}</p>
        </NuxtLink>
      </article>
    </section>
  </main>
</template>
