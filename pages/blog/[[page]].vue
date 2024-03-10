<script setup>
import { useFormatTime } from '~/composables/useFormatTime.ts'

definePageMeta(
  {
    path: '/blog/:page(\\d+)?'
  }
)

useHead({
  title: 'LinuDev - Blog - Un blog sobre programación para novatos',
  meta: [
    { name: 'title', content: 'LinuDev - Blog - Un blog sobre programación para novatos' },
    { name: 'description', content: 'Un blog sobre programación para novatos, javascript, react, rust, bash, y sobre todo linux.' }
  ]
});

const route = useRoute();
const page = ref(route.params.page ? parseInt(route.params.page) : 1);
const limit = ref(6);

const articlesCount = await queryContent('blog')
    .count();

const latestArticles = await queryContent('blog')
    .skip(limit.value * (page.value - 1))
    .limit(limit.value)
    .sort({ date: -1 })
    .find()

if(latestArticles.length == 0) {
  throw createError({
    statusCode:404,
    statusMessage: `No Blog posts found for path: ${route.path}`
  })
}

const { formatTimeAgo } = useFormatTime()
</script>

<template>
  <main class="px-4 xl:max-w-7xl mx-auto grid grid-cols-1 pt-34 gap-y-4">
    <h2 class="font-black font-display text-5xl">Artículos Recientes</h2>
    <section class="grid gap-3 xl:grid-cols-2">
      <article v-for="article in latestArticles" :key="article._path" class="grid gap-y-4 rounded-lg px-3 py-2 relative bg-white/5 border border-white/10">
        <NuxtLink :to="article._path" class="px-4 py-3 w-full block flex flex-col gap-y-2">
          <h2 class="font-display font-black text-2xl">{{ article.title }}</h2>
          <p class="text-gray-300 font-medium line-clamp-2">{{ article.description }}</p>
          <p class="text-gray-400 text-sm">{{ formatTimeAgo(new Date(article.date)) }}</p>
        </NuxtLink>
      </article>
    </section>
    <BlogPagination :limit="limit" :page="page" :count="articlesCount" />
  </main>
</template>
