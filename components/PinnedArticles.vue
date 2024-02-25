<script setup>
import { useFormatTime } from '~/composables/useFormatTime.ts'

const { data: pinnedArticles } = await useAsyncData('pinnedArticles', () => queryContent('blog').where({ isPinned: true }).find())

const { formatTimeAgo } = useFormatTime()

</script>
<template>
  <section class="grid gap-y-4 lg:grid-cols-2">
    <h3 class="font-display text-5xl font-black lg:text-8xl">Artículos Fijados</h3>
    <article v-for="article in pinnedArticles" :key="article._path" class="rounded-lg bg-white/5 border border-white/10 lg:col-start-1">
      <NuxtLink :to="article._path" class="px-4 py-3 w-full block flex flex-col gap-y-2">
        <h2 class="font-display font-black text-2xl">{{ article.title }}</h2>
        <p class="text-gray-300 font-medium line-clamp-2">{{ article.description }}</p>
        <p class="text-gray-400 text-sm">{{ formatTimeAgo(new Date(article.date)) }}</p>
      </NuxtLink>
    </article>
  </section>
</template>
