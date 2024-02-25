<script setup>
import { useFormatTime } from '~/composables/useFormatTime.ts'

const { data: latestArticles } = await useAsyncData('latestArticles', () => 
  queryContent('blog')
    .where({ isPinned: { $ne: true } })
    .sort({date: -1})
    .limit(4)
    .find()
)

const { formatTimeAgo } = useFormatTime()
</script>
<template>
  <section class="grid gap-4 lg:grid-cols-2">
    <h3 class="font-display text-5xl font-black lg:col-span-2">Últimos Articulos</h3>
    <article v-for="article in latestArticles" :key="article._path" class="rounded-lg bg-white/5 border border-white/10">
      <NuxtLink :to="article._path" class="px-4 py-3 w-full block flex flex-col gap-y-2">
        <h2 class="font-display font-black text-2xl">{{ article.title }}</h2>
        <p class="text-gray-300 font-medium line-clamp-2">{{ article.description }}</p>
        <p class="text-gray-400 text-sm">{{ formatTimeAgo(new Date(article.date)) }}</p>
      </NuxtLink>
    </article>
    <NuxtLink to="/blog" class="uppercase py-2 bg-gray-600/40 rounded-md text-center lg:col-start-2">más artículos</NuxtLink>
  </section>
</template>
