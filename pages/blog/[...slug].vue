<script setup>
const { toc } = useContent()
const route = useRoute()
const article = await queryContent('blog').where({_path: route.path}).findOne();
const allArticles = await queryContent('blog').sort({date: -1}).only(['title', '_path', 'date']).find();

const articleIndex = allArticles.findIndex(a => a._path === route.path);
const previousArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : null;
const nextArticle = articleIndex < allArticles.length - 1 ? allArticles[articleIndex + 1] : null;

useSeoMeta({
  title: article.title,
  description: article.description,
  ogTitle: article.title,
  ogDescription: article.description,
  ogType: 'article',
  twitterTitle: article.title,
  twitterDescription: article.description
})

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

defineOgImageComponent(
  'BlogPost',
  {
    title: article.title,
    description: article.description,
    date: formatDate(article.date)
  }
)

</script>
<template>
  <main class="pt-34 px-4 xl:max-w-7xl mx-auto grid grid-cols-1 gap-x-3 gap-y-8">
    <ContentQuery :path="$route.path" find="one" v-slot="{ data }">
      <ContentRenderer :value="data" class="grid grid-cols-8">
        <header class="col-span-8 max-w-5xl">
          <h1 class="text-5xl font-medium font-display ">{{data.title}}</h1>
          <p class="font-medium opacity-70 line-clamp-3">{{data.description}}</p>
          <p class="text-sm opacity-60">{{ formatDate(data.date) }}</p>
        </header>
        <ContentRendererMarkdown :value="data" class="prose-sm text-sm md:text-md lg:text-lg col-span-4 max-w-4xl"/>
        <ul v-if="toc && toc.links" class="col-span-4 pt-16 sticky top-15 max-h-[40vh] overflow-y-auto">
          <li v-for="link in toc.links" :key="link.text">
            <a :href="`#${link.id}`" class="text-xl text-[#ECAB43]">
              {{ link.text }}
            </a>
          </li>
        </ul>
      </ContentRenderer>
      <nav class="grid grid-cols-2 gap-x-12 mt-8">
        <NuxtLink v-if="previousArticle" :to="`${previousArticle._path}`" class="text-[#ECAB43] hover:underline">
          ← {{ previousArticle.title }}
        </NuxtLink>
        <NuxtLink v-if="nextArticle" :to="`${nextArticle._path}`" class="text-[#ECAB43] hover:underline">
          {{ nextArticle.title }} →
        </NuxtLink>
      </nav>
    </ContentQuery>
  </main>
</template>
